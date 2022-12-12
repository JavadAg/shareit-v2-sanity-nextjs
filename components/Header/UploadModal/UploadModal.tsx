import React, { useReducer, useState } from "react"
import { RiAddCircleLine } from "react-icons/ri"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"
import FormPreview from "./FormSteps/FormPreview/FormPreview"
import FormInfo from "./FormSteps/FormInfo/FormInfo"
import FormUpload from "./FormSteps/FormUpload/FormUpload"
import { FilePreview, FormData, FormState } from "../../../types/upload.types"
import { useRouter, usePathname } from "next/navigation"
import FormProgress from "./FormProgress/FormProgress"
declare module "next-auth" {
  interface User {
    id: number
  }

  interface Session {
    user: User
  }
}

const formDataInitData: FormData = {
  caption: "",
  category: "",
  tags: []
}

const formStateInitData: FormState = {
  error: "",
  loading: false,
  isUploading: false
}

const UploadModal = () => {
  const router = useRouter()
  const path = usePathname()
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

  const steps = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormPreview
            formState={formState}
            setFormState={setFormState}
            filesPreview={filesPreview}
            setFilesPreview={setFilesPreview}
          />
        )

      case 1:
        return <FormInfo formData={formData} setFormData={setFormData} />

      case 2:
        return <FormUpload formState={formState} />
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

    const uploaded_files: any[] = await res.data

    setFormState({ isUploading: false })

    if (
      formData.caption &&
      !formState.isUploading &&
      uploaded_files.length == filesPreview.length &&
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
      if (path === "/") {
        router.refresh()
      } else {
        router.push("/")
      }
    } else {
      setFormState({ error: "something happened try again" })
    }
  }

  return (
    <>
      <button
        onClick={() => setModalToggle(true)}
        className="flex items-center justify-center w-12 h-12 text-2xl text-gray-600 duration-300 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-900 md:text-3xl"
      >
        <RiAddCircleLine />
      </button>
      {modalToggle ? (
        <div
          onClick={() => {
            setModalToggle(false)
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/70 dark:bg-neutral-700/70 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex relative w-96 justify-start py-6 items-center bg-white dark:bg-neutral-900 rounded-3xl flex-col space-y-4 h-[32rem] mx-4 px-4 md:h-[36rem]"
          >
            <FormProgress
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              filesPreview={filesPreview}
            />

            <div className="flex items-center justify-center w-full rounded-3xl">
              <form
                className="flex flex-col items-center justify-center w-full"
                onSubmit={handleSubmit}
              >
                {steps()}
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
