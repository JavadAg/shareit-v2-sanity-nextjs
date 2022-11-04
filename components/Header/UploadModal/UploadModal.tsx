import React, { useCallback, useEffect, useRef, useState } from "react"
import PreviewCarousel from "./PreviewCarousel/PreviewCarousel"
import UploadSVG from "./UploadSVG"
import { MdDeleteForever } from "react-icons/md"
import { categories } from "../../../utils/constants"
import Resizer from "react-image-file-resizer"
import makeid from "../../../utils/makeid"
import { client } from "../../../utils/client"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"

const imageTypes = /image\/(png|jpg|jpeg|webp)/i
const videoTypes = /video\/(mp4|webm)/i

const UploadModal = () => {
  const [files, setFiles] = useState<File[]>()
  const [caption, setCaption] = useState("")
  const [category, setCategory] = useState("")
  const [modalToggle, setModalToggle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filePreview, setFilePreview] = useState<{
    imagesURL: string[]
    videosURL: string[]
  }>({
    imagesURL: [],
    videosURL: []
  })
  const [error, setError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const { data: session, status } = useSession()

  console.log(session, status)

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1500,
        1500,
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
    setError("")
    if (e.target.files!?.length > 5) {
      setError("More than 5 file selected")
      return
    }
    let count = 0
    let fileArray: File[] = []
    for (const iterator of e.target.files!) {
      if (iterator.type.match(videoTypes)) {
        count = count + 1
        if (iterator.size > 25000000 || count > 1) {
          setError("Select only 1 video up to 20MB")
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
    setFiles(fileArray)
  }

  const deleteFiles = () => {
    setFilePreview({
      imagesURL: [],
      videosURL: []
    })
    setFiles(undefined)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setIsUploading(true)

    const promises = files!.map(async (element) => {
      const promise = await client.assets.upload("file", element, {
        contentType: element.type,
        filename: element.name
      })
      return promise
    })

    const uploadedFiles = await Promise.all(promises)

    setIsUploading(false)

    if (caption && !isUploading && uploadedFiles && category) {
      const doc = {
        _type: "post",
        caption,
        assets: uploadedFiles.map((file) => {
          return {
            _type: "file",
            _key: uuidv4(),
            asset: {
              _type: "reference",
              _ref: file._id
            }
          }
        }),
        /*  userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id
        }, */
        category
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, doc)
    }

    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setModalToggle(true)} className="btn btn-primary">
        Upload Post
      </button>
      {modalToggle ? (
        <div
          onClick={() => {
            setModalToggle(false)
          }}
          className="flex justify-center items-center fixed inset-0 bg-neutral-content bg-opacity-70"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex  justify-center items-center bg-base-100 p-2 rounded-xl flex-col"
          >
            <h3 className="text-lg font-bold">Share with friends!</h3>
            <div className="bg-base-100 rounded-lg flex flex-wrap justify-center items-center p-4">
              {loading ? (
                <p className="text-center text-3xl text-red-400 font-semibold">
                  Uploading...
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  {!files ? (
                    <label className="border-dashed w-96 h-[28rem] rounded-xl border-4 p-5 flex flex-col justify-center items-center outline-none cursor-pointer hover:border-accent hover:bg-base-300">
                      <div className="flex flex-col justify-center items-center">
                        <UploadSVG />
                        <span className="">Select video & photo to upload</span>
                      </div>
                      <span className=" text-center mt-10 text-sm leading-10">
                        Jpg, Png ,Webp, Mp4 <br />
                        Max 5 file <br />
                        720x1280 resolution or higher <br />
                        Only 1 video per post <br />
                        Less than 20 MB
                      </span>
                      <div className="form-control w-full max-w-xs">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => previewhandler(e)}
                          className="file-input input-bordered w-full max-w-xs"
                        />
                      </div>
                      {error.length > 0 ? (
                        <span className="text-error pt-1">{error}</span>
                      ) : (
                        ""
                      )}
                    </label>
                  ) : (
                    <>
                      <PreviewCarousel filePreview={filePreview} />
                      <div className="flex justify-center items-center flex-col space-y-2 m-2 w-full">
                        {files ? (
                          <button
                            onClick={deleteFiles}
                            className="btn-error btn text-2xl"
                          >
                            <MdDeleteForever />
                          </button>
                        ) : (
                          ""
                        )}
                        <input
                          onChange={(e) => setCaption(e.target.value)}
                          className="input w-full max-w-xs input-bordered"
                          type="text"
                          maxLength={100}
                          placeholder="caption"
                        />
                        <select
                          onChange={(e) => setCategory(e.target.value)}
                          className="select select-bordered w-full max-w-xs"
                        >
                          <option disabled selected>
                            Pick Category
                          </option>
                          {categories.map((category) => (
                            <option value={category}>{category}</option>
                          ))}
                        </select>

                        <input
                          disabled={caption.length < 1 || category.length < 1}
                          type="submit"
                          value="Share it"
                          className="btn btn-primary w-full max-w-xs"
                        />
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
