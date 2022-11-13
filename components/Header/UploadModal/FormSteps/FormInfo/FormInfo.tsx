import React, { useState } from "react"
import { HiOutlineX, HiPlusCircle } from "react-icons/hi"
import { categories } from "../../../../../utils/constants"
import { useSession } from "next-auth/react"

interface FormData {
  files: File[] | undefined
  caption: string
  category: string
  tags: string[]
}

interface FormState {
  error: string
  loading: boolean
  isUploading: boolean
}

interface IProps {}

const FormInfo = ({
  formState,
  setFormState,
  formData,
  setFormData,
  filePreview,
  setFilePreview
}: any) => {
  const { data: session, status } = useSession()
  const [tag, setTag] = useState("")

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex justify-center items-center flex-col w-3/4 space-y-2">
          <input
            onChange={(e) => setFormData({ caption: e.target.value })}
            className="w-full rounded-3xl h-8 border border-gray-200 px-2 outline-none"
            type="text"
            maxLength={100}
            placeholder="Caption"
          />
          <div className="flex w-full justify-center items-center flex-wrap gap-1">
            {formData.tags.length > 0 &&
              formData.tags.map((tag: any) => (
                <div className=" bg-gray-100 rounded-lg border border-gray-200 shadow-sm p-1 flex justify-center items-center space-x-2 text-center">
                  <span className="text-gray-500">#{tag}</span>
                  <button
                    className=""
                    type="button"
                    onClick={() =>
                      setFormData({
                        tags: formData.tags.filter((i: any) => i != tag)
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
              disabled={(tag.length < 4, formData.tags.length > 7)}
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
            onChange={(e) => setFormData({ category: e.target.value })}
            className="w-full rounded-3xl h-8 border border-gray-200 px-2 outline-none"
          >
            <option disabled selected>
              Pick Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            disabled={
              formData.caption.length < 1 || formData.category.length < 1
            }
            type="submit"
            value="Share it"
            className="w-full rounded-3xl h-8 border border-gray-200 px-2 bg-indigo-200 disabled:bg-indigo-200/40 disabled:text-gray-200"
          />
        </div>
      ) : (
        <span className="p-1 rounded-lg px-2">Login to send post!</span>
      )}
    </>
  )
}

export default FormInfo
