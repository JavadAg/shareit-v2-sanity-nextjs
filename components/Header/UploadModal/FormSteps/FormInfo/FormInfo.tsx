import React, { useState } from "react"
import { HiOutlineX, HiPlusCircle } from "react-icons/hi"
import { categories } from "../../../../../utils/constants"
import { useSession } from "next-auth/react"
import { Listbox } from "@headlessui/react"
import { RiArrowDropDownLine, RiCheckFill } from "react-icons/ri"
import {
  FilePreview,
  FormData,
  FormState
} from "../../../../../types/upload.types"

interface IProps {
  formData: FormData
  setFormData: React.Dispatch<Partial<FormData>>
}

const FormInfo: React.FC<IProps> = ({ formData, setFormData }) => {
  const { data: session, status } = useSession()
  const [tag, setTag] = useState("")

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex justify-center items-center flex-col w-3/4 space-y-4 mt-4 md:gap-6">
          <input
            onChange={(e) => setFormData({ caption: e.target.value })}
            className="w-full rounded-3xl h-8 border border-gray-200 px-2 outline-none"
            type="text"
            maxLength={100}
            placeholder="Caption"
          />
          {formData.tags.length > 0 && (
            <div className="flex w-full justify-center items-center overflow-x-scroll gap-1 py-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg border border-gray-200 shadow-sm p-1 flex justify-center items-center space-x-2 text-center"
                >
                  <span className="text-gray-500">#{tag}</span>
                  <button
                    className=""
                    type="button"
                    onClick={() =>
                      setFormData({
                        tags: formData.tags.filter((i) => i != tag)
                      })
                    }
                  >
                    <HiOutlineX />
                  </button>
                </div>
              ))}
            </div>
          )}

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
                (tag.length < 4, tag.length > 15, formData.tags.length > 6)
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

          <Listbox
            value={formData.category}
            onChange={(value) => setFormData({ category: value })}
          >
            <div className="relative w-full">
              <Listbox.Button className="relative w-full cursor-default border border-gray-200 rounded-3xl px-2 h-8 text-left outline-none">
                <span className="block truncate">
                  {formData.category ? formData.category : "Select Category"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <RiArrowDropDownLine
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category}
                    value={category}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-indigo-100 text-indigo-900"
                          : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {category}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            <RiCheckFill
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <input
            disabled={
              formData.caption.length < 1 || formData.category.length < 1
            }
            type="submit"
            value="Share it"
            className="w-full rounded-3xl h-8 border border-gray-200 px-2 text-white bg-indigo-400 disabled:bg-indigo-200/40 disabled:text-gray-200"
          />
        </div>
      ) : (
        <span className="p-1 rounded-lg px-2 text-red-500">
          Login to send post!
        </span>
      )}
    </>
  )
}

export default FormInfo
