import React, { useReducer, useState } from "react"
import { formSteps } from "../../../utils/constants"

import { client } from "../../../utils/client"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"
import "react-image-crop/dist/ReactCrop.css"
import FormPreview from "./FormSteps/FormPreview/FormPreview"
import FormInfo from "./FormSteps/FormInfo/FormInfo"
import FormUpload from "./FormSteps/FormUpload/FormUpload"
import { Area, Point } from "react-easy-crop"
import { getCroppedImg } from "./FormSteps/FormPreview/canvasUtils"
import Resizer from "react-image-file-resizer"
import makeid from "../../../utils/makeid"

declare module "next-auth" {
  interface User {
    id: number
  }

  interface Session {
    user: User
  }
}

/* export interface ImagePreview {
  url?: string
  id?: number
  type?: string
  croppedArea?: { x: number; y: number }
  croppedAreaPixels?: {
    width: number
    height: number
    x: number
    y: number
  }
}*/

export interface FilePreview {
  url?: string
  id?: number
  type?: string
  crop?: Point
  croppedAreaPixels?: Area
  base64: string
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
  const [filesPreview, setFilesPreview] = useState<FilePreview[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [croppedImage, setCroppedImage] = useState<string[]>([])

  const stepDisplay = () => {
    if (currentStep === 0) {
      return (
        <FormPreview
          formState={formState}
          setFormState={setFormState}
          formData={formData}
          setFormData={setFormData}
          filesPreview={filesPreview}
          setFilesPreview={setFilesPreview}
        />
      )
    } else if (currentStep === 1) {
      return (
        <FormInfo
          status={status}
          formState={formState}
          setFormState={setFormState}
          formData={formData}
          setFormData={setFormData}
          filesPreview={filesPreview}
          setFilesPreview={setFilesPreview}
        />
      )
    } else if (currentStep === 2 || formState.loading === true) {
      return <FormUpload />
    }
  }

  const { data: session, status } = useSession()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
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
    setFilesPreview([])
    setCurrentStep(0)
    setModalToggle(false)
  }

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
  console.log(filesPreview)
  const handleNextButton = async () => {
    //crop and resize image

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      filesPreview
    )

    const data = res.data
    console.log(data)
    /*  filesPreview.map(async (element: FilePreview) => {
      const croppedFile: any = await getCroppedImg(element)
      if (croppedImage.length === 0) {
        setCroppedImage((prev) => [...prev, croppedFile])
      }
    })

    let fileArray: File[] = []
    setCurrentStep(currentStep + 1) */
    /*   filesPreview.map(async (obj) => {
      if (obj.type === "image") {
        const resizedImage = (await resizeFile(obj)) as File
        const newImage = new File(
          [resizedImage],
          `${makeid(10) + Date.now()}.webp`,
          {
            type: "image/webp"
          }
        )
        fileArray.push(newImage)
      }
    })

    setFormData({ files: fileArray }) */
  }

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
            className="flex relative justify-center items-center bg-white w-full mx-2 p-2 rounded-3xl flex-col space-y-4"
          >
            <div className="flex justify-between items-center w-full">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(currentStep - 1)}
                className=" bg-gray-100 rounded-full top-4 left-4 text-lg p-1 disabled:opacity-0"
              >
                <HiOutlineArrowSmLeft />
              </button>

              <h3 className="text-lg font-bold">Share with friends!</h3>

              <button
                type="button"
                disabled={filesPreview.length < 1 || currentStep === 1}
                onClick={handleNextButton}
                className=" bg-gray-100 rounded-full top-4 right-4 text-lg p-1 disabled:opacity-0"
              >
                <HiOutlineArrowSmRight />
              </button>
            </div>
            <div className="flex relative justify-evenly items-center w-full">
              <div className="w-36 h-full absolute flex justify-center items-center">
                <div
                  className={`bg-indigo-500 h-2 block left-0 absolute ${
                    currentStep === 0
                      ? "w-0"
                      : currentStep === 1
                      ? "w-2/4"
                      : "w-full"
                  }`}
                ></div>
              </div>
              {formSteps.map((step, index) => (
                <>
                  <div
                    className={`
                    ${
                      index === currentStep
                        ? "bg-indigo-400"
                        : index < currentStep
                        ? "bg-indigo-500"
                        : "bg-indigo-100"
                    } 
                     rounded-full h-8 w-8 flex justify-center items-center relative`}
                  >
                    {index}
                  </div>
                </>
              ))}
            </div>
            <span>{formSteps[currentStep]}</span>
            <div className="rounded-3xl flex justify-center items-center w-full">
              <form
                className="w-full flex justify-center items-center flex-col"
                onSubmit={handleSubmit}
              >
                {stepDisplay()}
              </form>
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
