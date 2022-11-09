import React, { LegacyRef, useReducer, useRef, useState } from "react"
import PreviewCarousel from "./PreviewCarousel/PreviewCarousel"
import UploadSVG from "./UploadSVG"
import { MdDeleteForever } from "react-icons/md"
import { categories, imageTypes, videoTypes } from "../../../utils/constants"
import Resizer from "react-image-file-resizer"
import makeid from "../../../utils/makeid"
import { client } from "../../../utils/client"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"
import { HiPlusCircle, HiOutlineX } from "react-icons/hi"

declare module "next-auth" {
  interface User {
    id: number
  }

  interface Session {
    user: User
  }
}

interface FormData {
  files: File[] | undefined
  caption: string
  category: string
  tags: string[]
}
const formDataInitData: FormData = {
  files: undefined,
  caption: "",
  category: "",
  tags: []
}

interface FormState {
  error: string
  loading: boolean
  isUploading: boolean
}
const formStateInitData: FormState = {
  error: "",
  loading: false,
  isUploading: false
}

const UploadModal = () => {
  const [formData, setFormData] = useReducer(
    (formData: FormData, setFormData: Partial<FormData>) => ({
      ...formData,
      ...setFormData
    }),
    formDataInitData
  )

  const [formState, setFormState] = useReducer(
    (formState: FormState, setFormState: Partial<FormState>) => ({
      ...formState,
      ...setFormState
    }),
    formStateInitData
  )

  const [modalToggle, setModalToggle] = useState(false)
  const [filePreview, setFilePreview] = useState<{
    imagesURL: string[]
    videosURL: string[]
  }>({
    imagesURL: [],
    videosURL: []
  })

  const [tag, setTag] = useState("")

  const { data: session, status } = useSession()

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        1080,
        "webp",
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        "blob"
      )
    })

  const previewhandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ error: "" })
    if (e.target.files!?.length > 5) {
      setFormState({ error: "More than 5 file selected" })
      return
    }
    let count = 0
    let fileArray: File[] = []
    for (const iterator of e.target.files!) {
      if (iterator.type.match(videoTypes)) {
        count = count + 1
        if (iterator.size > 25000000 || count > 1) {
          setFormState({ error: "Select only 1 video up to 20MB" })
          return
        }
        fileArray.push(iterator)
      }
      if (iterator.type.match(imageTypes)) {
        const resizedImage = (await resizeFile(iterator)) as File
        const newImage = new File(
          [resizedImage],
          `${makeid(10) + Date.now()}.webp`,
          {
            type: "image/webp"
          }
        )
        fileArray.push(newImage)
      }
    }

    const filesURL: { imagesURL: string[]; videosURL: string[] } = {
      imagesURL: [],
      videosURL: []
    }
    for (let i = 0; i < fileArray.length; i++) {
      if (fileArray[i].type.match(imageTypes)) {
        const url: string = URL.createObjectURL(fileArray[i])
        filesURL.imagesURL.push(url)
      } else if (fileArray[i].type.match(videoTypes)) {
        const url: string = URL.createObjectURL(fileArray[i])
        filesURL.videosURL.push(url)
      }
    }
    setFilePreview(filesURL)
    setFormData({ files: fileArray })
  }

  const deleteFiles = () => {
    setFilePreview({
      imagesURL: [],
      videosURL: []
    })
    setFormData({ files: undefined })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState({ loading: true, isUploading: true })

    const promises = formData.files!.map(async (element) => {
      const promise = await client.assets.upload("file", element, {
        contentType: element.type,
        filename: element.name
      })
      return promise
    })

    const uploadedFiles = await Promise.all(promises)
    setFormState({ isUploading: false })

    if (
      formData.caption &&
      !formState.isUploading &&
      uploadedFiles &&
      formData.category
    ) {
      const { caption, tags, category } = formData
      const doc = {
        _type: "post",
        caption,
        tags,
        assets: uploadedFiles.map((file) => {
          return {
            _type: "file",
            _key: uuidv4(),
            filetype: file.mimeType,
            asset: {
              _type: "reference",
              _ref: file._id
            }
          }
        }),
        userId: session!.user!.id,
        postedBy: {
          _type: "postedBy",
          _ref: session!.user!.id
        },
        category
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, doc)
    }

    setFormState({ loading: false })
    setFormData({ caption: "", tags: [], category: "", files: undefined })
    setFilePreview({
      imagesURL: [],
      videosURL: []
    })
    setModalToggle(false)
  }
  console.log(formData.tags)
  return (
    <>
      <button onClick={() => setModalToggle(true)} className="">
        Upload Post
      </button>
      {modalToggle ? (
        <div
          onClick={() => {
            setModalToggle(false)
          }}
          className="flex justify-center bg-gray-300/70 items-center fixed inset-0 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex justify-center items-center bg-white w-full mx-2 p-2 rounded-3xl flex-col space-y-4"
          >
            <h3 className="text-lg font-bold">Share with friends!</h3>
            <div className="rounded-3xl flex justify-center items-center w-full">
              {formState.loading ? (
                <p className="text-center text-3xl text-red-400 font-semibold">
                  Uploading...
                </p>
              ) : (
                <form
                  className="w-full flex justify-center items-center flex-col"
                  onSubmit={handleSubmit}
                >
                  {!formData.files ? (
                    <label className="border-dashed space-y-4 border-gray-400 bg-gray-100 hover:bg-gray-200 rounded-2xl border-4 p-5 flex flex-col justify-center items-center outline-none cursor-pointer m-4">
                      <UploadSVG />
                      <span className="text-center text-sm leading-10">
                        Jpg, Png ,Webp, Mp4 <br />
                        Max 5 file <br />
                        1 video per post <br />
                        Less than 25 MB
                      </span>
                      <div className="w-full max-w-xs">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => previewhandler(e)}
                          className="w-full max-w-xs"
                        />
                      </div>
                      {formState.error.length > 0 ? (
                        <span className="pt-1">{formState.error}</span>
                      ) : (
                        ""
                      )}
                    </label>
                  ) : (
                    <>
                      <PreviewCarousel filePreview={filePreview} />
                      <div className="flex justify-center items-center flex-col space-y-2 m-2 w-full mx-2">
                        {formData.files ? (
                          <button
                            onClick={deleteFiles}
                            className="text-2xl text-red-500"
                          >
                            <MdDeleteForever />
                          </button>
                        ) : (
                          ""
                        )}
                        {status === "authenticated" ? (
                          <div className="flex justify-center items-center flex-col w-3/4 space-y-2">
                            <input
                              onChange={(e) =>
                                setFormData({ caption: e.target.value })
                              }
                              className="w-full rounded-3xl h-8 border border-gray-200 px-2 outline-none"
                              type="text"
                              maxLength={100}
                              placeholder="Caption"
                            />
                            <div className="flex w-full justify-center items-center flex-wrap gap-1">
                              {formData.tags.length > 0 &&
                                formData.tags.map((tag) => (
                                  <div className=" bg-gray-100 rounded-lg border border-gray-200 shadow-sm p-1 flex justify-center items-center space-x-2 text-center">
                                    <span className="text-gray-500">
                                      #{tag}
                                    </span>
                                    <button
                                      className=""
                                      type="button"
                                      onClick={() =>
                                        setFormData({
                                          tags: formData.tags.filter(
                                            (i) => i != tag
                                          )
                                        })
                                      }
                                    >
                                      <HiOutlineX />
                                    </button>
                                  </div>
                                ))}
                            </div>
                            <div className="relative flex h-8 justify-center items-center border border-gray-200 rounded-3xl px-2 w-full">
                              <input
                                className="w-full h-full outline-none"
                                type="text"
                                value={tag}
                                maxLength={15}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Tags"
                              />
                              <button
                                disabled={
                                  (tag.length < 4, formData.tags.length > 7)
                                }
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    tags: [...formData.tags, tag]
                                  }),
                                    setTag("")
                                }}
                                className="p-1 text-2xl absolute right-0 disabled:opacity-30"
                              >
                                <HiPlusCircle />
                              </button>
                            </div>

                            <select
                              onChange={(e) =>
                                setFormData({ category: e.target.value })
                              }
                              className="w-full rounded-3xl h-8 border border-gray-200 px-2 outline-none"
                            >
                              <option disabled selected>
                                Pick Category
                              </option>
                              {categories.map((category) => (
                                <option value={category}>{category}</option>
                              ))}
                            </select>
                            <input
                              disabled={
                                formData.caption.length < 1 ||
                                formData.category.length < 1
                              }
                              type="submit"
                              value="Share it"
                              className="w-full rounded-3xl h-8 border border-gray-200 px-2 bg-indigo-200 disabled:bg-indigo-200/40 disabled:text-gray-200"
                            />
                          </div>
                        ) : (
                          <span className="p-1 rounded-lg px-2">
                            Login to send post!
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default UploadModal
