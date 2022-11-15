import React, { useReducer, useState } from "react"
import { formSteps } from "../../../utils/constants"
import { RiAddCircleLine } from "react-icons/ri"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"
import FormPreview from "./FormSteps/FormPreview/FormPreview"
import FormInfo from "./FormSteps/FormInfo/FormInfo"
import FormUpload from "./FormSteps/FormUpload/FormUpload"
import { Area, Point } from "react-easy-crop"
import { UploadApiResponse } from "cloudinary"
declare module "next-auth" {
  interface User {
    id: number
  }

  interface Session {
    user: User
  }
}

export interface FilePreview {
  url?: string
  id?: number
  type?: string
  crop?: Point
  croppedAreaPixels?: Area
  base64: string
}

interface FormData {
  caption: string
  category: string
  tags: string[]
}
const formDataInitData: FormData = {
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

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      filesPreview
    )

    const uploaded_files: UploadApiResponse[] = await res.data

    setFormState({ isUploading: false })

    if (
      formData.caption &&
      !formState.isUploading &&
      uploaded_files &&
      formData.category
    ) {
      const { caption, tags, category } = formData
      const doc = {
        _type: "post",
        caption,
        tags,
        assets: uploaded_files.map((file) => {
          return {
            _type: "cloudinary.asset",
            _key: uuidv4(),
            _version: 1,
            access_mode: "public",
            bytes: file.bytes,
            created_at: file.created_at,
            duration: file.duration,
            format: file.format,
            height: file.height,
            metadata: file.metadata,
            public_id: file.public_id,
            resource_type: file.resource_type,
            secure_url: file.secure_url,
            tags: file.tags,
            type: file.type,
            url: file.url,
            version: file.version,
            width: file.width
          }
        }),
        userId: session!.user!.id,
        postedBy: {
          _type: "postedBy",
          _ref: session!.user!.id
        },
        category,
        savedBy: [],
        comments: [],
        likes: []
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, doc)

      setFormState({ loading: false })
      setFormData({ caption: "", tags: [], category: "" })
      setFilesPreview([])
      setCurrentStep(0)
      setModalToggle(false)
    }
  }

  const handleNextButton = async () => {
    //crop and resize image
  }

  return (
    <>
      <button
        onClick={() => setModalToggle(true)}
        className="flex justify-center items-center text-2xl text-gray-700"
      >
        <RiAddCircleLine />
      </button>
      {modalToggle ? (
        <div
          onClick={() => {
            setModalToggle(false)
          }}
          className="flex justify-center bg-gray-300/70 items-center fixed inset-0 z-50 backdrop-blur-md"
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
                onClick={() => setCurrentStep(currentStep + 1)}
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
