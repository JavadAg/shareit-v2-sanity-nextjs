import React, { useCallback, useRef, useState } from "react"
import { RiSearch2Line } from "react-icons/ri"
import { debounce } from "lodash"
import axios from "axios"
import { useRouter } from "next/navigation"
import { User } from "../../../types/posts.types"

const SearchModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchData, setSearchData] = useState<User[]>([])
  const searchTerm = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDebounceFn = async (value: string) => {
    if (value) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${value}`,
        {
          params: { type: "user" }
        }
      )
      const data = res.data

      setSearchData(data)
    }
  }

  const debounceFn = useCallback(
    debounce(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        handleDebounceFn(e.target.value),
      1000
    ),
    []
  )
  return (
    <div className="flex relative justify-center items-center rounded-full min-w-[2rem] h-8">
      <div
        onClick={() => setIsModalOpen(true)}
        className="relative z-40 flex items-center justify-center w-8 h-8 duration-200 bg-gray-100 rounded-full cursor-pointer dark:bg-neutral-800 dark:hover:bg-neutral-900 hover:bg-gray-200 md:w-9 md:h-9 md:text-xl"
      >
        <RiSearch2Line />
      </div>
      {isModalOpen ? (
        <div
          onClick={() => {
            setSearchData([]),
              (searchTerm.current!.value = ""),
              setIsModalOpen(false)
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start w-screen h-screen bg-gray-800 pt-44 backdrop-blur-md bg-opacity-90"
        >
          <div
            className="flex flex-col items-center justify-center w-full space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-gray-200 dark:text-neutral-400">
              Search tag or username
            </span>
            <input
              ref={searchTerm}
              type="search"
              onChange={(e) => debounceFn(e)}
              className="w-56 h-8 px-2 bg-gray-200 border-none outline-none dark:bg-neutral-800 rounded-2xl sm:w-64"
            />
            {searchData?.length > 0 ? (
              <div className="flex items-start justify-between w-64 px-2 py-2 text-sm bg-gray-200 dark:bg-neutral-900 rounded-2xl sm:w-72 md:text-base">
                <div className="flex flex-col items-start justify-center gap-2 ">
                  <span className="font-bold text-black dark:text-white">
                    Tags
                  </span>
                  <span
                    onClick={() => {
                      router.push(`/search/${searchTerm.current?.value}`)
                      setSearchData([]),
                        (searchTerm.current!.value = ""),
                        setIsModalOpen(false)
                    }}
                    className="p-1 px-2 cursor-pointer bg-gradient-to-tr from-blue-500 to-cyan-300 rounded-xl"
                  >
                    #{searchTerm.current?.value}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center gap-2 ">
                  <span className="font-bold text-black dark:text-white">
                    Users
                  </span>
                  {searchData.map((item) => (
                    <span
                      key={item._id}
                      onClick={() => {
                        router.push(`/profile/${item._id}`)
                        setSearchData([]),
                          (searchTerm.current!.value = ""),
                          setIsModalOpen(false)
                      }}
                      className="p-1 px-2 cursor-pointer bg-gradient-to-tr from-indigo-300 to-violet-400 rounded-xl"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default SearchModal
