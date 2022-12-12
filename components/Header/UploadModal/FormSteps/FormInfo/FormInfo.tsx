import React, { useState } from "react"
import { HiOutlineX, HiPlusCircle } from "react-icons/hi"
import { categories } from "../../../../../utils/constants"
import { useSession } from "next-auth/react"
import { Listbox } from "@headlessui/react"
import { RiArrowDropDownLine, RiCheckFill } from "react-icons/ri"
import { FormData } from "../../../../../types/upload.types"

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
        <div className="flex flex-col items-center justify-center w-3/4 mt-4 space-y-4 md:gap-6">
          <input
            onChange={(e) => setFormData({ caption: e.target.value })}
            className="w-full h-8 px-2 border border-gray-200 outline-none dark:border-neutral-800 rounded-3xl dark:bg-neutral-800"
            type="text"
            maxLength={100}
            placeholder="Caption"
          />
          {formData.tags.length > 0 && (
            <div className="flex items-center justify-center w-full gap-1 py-2 overflow-x-scroll">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-1 space-x-2 text-center bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:border-neutral-800"
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

          <div className="relative flex items-center justify-center w-full h-8 px-2 border border-gray-200 dark:bg-neutral-800 dark:border-neutral-800 rounded-3xl">
            <input
              className="w-full h-full outline-none dark:bg-neutral-800"
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
              className="absolute right-0 p-1 text-2xl disabled:opacity-30"
            >
              <HiPlusCircle />
            </button>
          </div>

          <Listbox
            value={formData.category}
            onChange={(value) => setFormData({ category: value })}
          >
            <div className="relative w-full">
              <Listbox.Button className="relative w-full h-8 px-2 text-left border border-gray-200 outline-none cursor-default dark:border-neutral-800 rounded-3xl dark:bg-neutral-800">
                <span className="block truncate">
                  {formData.category ? formData.category : "Select Category"}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <RiArrowDropDownLine
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-neutral-900 max-h-60 ring-1 ring-black dark:ring-neutral-700 ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category}
                    value={category}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-indigo-100 text-indigo-900 dark:bg-neutral-800 dark:text-indigo-100"
                          : "text-gray-900 dark:text-gray-200"
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
                              className="w-5 h-5"
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
            className="w-full h-8 px-2 text-white duration-300 bg-indigo-400 border border-gray-200 cursor-pointer hover:bg-indigo-500 dark:text-neutral-900 dark:border-neutral-800 rounded-3xl disabled:bg-indigo-200/40 disabled:text-gray-200"
          />
        </div>
      ) : (
        <span className="p-1 px-2 text-red-500 rounded-lg">
          Login to send post!
        </span>
      )}
    </>
  )
}

export default FormInfo
