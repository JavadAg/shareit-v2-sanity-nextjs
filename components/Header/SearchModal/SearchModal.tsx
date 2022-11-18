import React, { useCallback, useRef, useState } from "react"
import { RiSearch2Line } from "react-icons/ri"
import { debounce } from "lodash"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const SearchModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchData, setSearchData] = useState<[]>([])
  const searchTerm = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDebounceFn = async (value: any) => {
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
    debounce((e) => handleDebounceFn(e.target.value), 1000),
    []
  )
  return (
    <div className="flex relative justify-center items-center rounded-full min-w-[2rem] h-8">
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex w-8 h-8 bg-gray-100 relative justify-center items-center rounded-full z-40"
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
          className="flex justify-start pt-44 items-center flex-col fixed inset-0 backdrop-blur-md bg-gray-800 bg-opacity-90 h-screen w-screen z-50"
        >
          <div
            className="flex justify-center items-center flex-col space-y-2 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-gray-200">Search tag or username</span>
            <input
              ref={searchTerm}
              type="search"
              onChange={(e) => debounceFn(e)}
              className="bg-gray-200 h-8 w-4/6 rounded-2xl outline-none border-none px-2"
            />
            {searchData?.length > 0 ? (
              <div className="flex justify-between items-start bg-gray-200 w-9/12 px-2 text-sm rounded-2xl py-2">
                <div className=" flex justify-center items-start flex-col gap-2">
                  <span className="font-bold text-black">Tags</span>
                  <span
                    onClick={() => {
                      router.push(`/search/${searchTerm.current?.value}`)
                      setSearchData([]),
                        (searchTerm.current!.value = ""),
                        setIsModalOpen(false)
                    }}
                    className="bg-gradient-to-tr from-blue-500 to-cyan-300 p-1 rounded-xl px-2 cursor-pointer"
                  >
                    #{searchTerm.current?.value}
                  </span>
                </div>
                <div className=" flex justify-center items-start flex-col gap-2">
                  <span className="font-bold text-black">Users</span>
                  {searchData.map((item: any) => (
                    <span
                      onClick={() => {
                        router.push(`/profile/${item._id}`)
                        setSearchData([]),
                          (searchTerm.current!.value = ""),
                          setIsModalOpen(false)
                      }}
                      className="bg-gradient-to-tr from-indigo-200 to-violet-300 p-1 rounded-xl px-2 cursor-pointer"
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
