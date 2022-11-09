import React, { useCallback, useState } from "react"
import { RiSearch2Line } from "react-icons/ri"
import { debounce } from "lodash"
import axios from "axios"

const SearchModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchData, setSearchData] = useState<[][]>([])

  const handleDebounceFn = async (value: any) => {
    if (value) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${value}`
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
            setSearchData([]), setIsModalOpen(false)
          }}
          className="flex justify-start pt-44 items-center flex-col fixed inset-0 bg-gray-800 bg-opacity-90 h-screen w-screen z-50"
        >
          <div
            className="flex justify-center items-center flex-col space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-gray-200">Search for users</span>
            <input
              type="search"
              onChange={(e) => debounceFn(e)}
              className="bg-gray-200 h-8 w-44 rounded-full outline-none border-none "
            />
            {searchData[0]?.length > 0 || searchData[1]?.length > 0 ? (
              <div className="flex justify-center items-center bg-gray-200">
                <div className=" flex justify-center items-center flex-col">
                  {searchData[0].map((item: any) => (
                    <span>{item._id}</span>
                  ))}
                </div>
                <div className=" flex justify-center items-center flex-col">
                  {searchData[1].map((item: any) => (
                    <span>{item._id}</span>
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
