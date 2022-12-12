import { Disclosure } from "@headlessui/react"
import axios from "axios"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import { RiEditBoxFill } from "react-icons/ri"
import { UserData } from "../../../types/posts.types"

interface IProps {
  userData: UserData
}

const EditProfile: React.FC<IProps> = ({ userData }) => {
  const [profileChanges, setProfileChanges] = useState({
    description: userData.user.description
  })
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()

  const handleProfile = async () => {
    setLoading(true)
    if (profileChanges.description.length < 121) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${session?.user.id}`,
        { description: profileChanges, type: "edit" }
      )

      if (res.status === 200) {
        userData.user.description = res.data.description
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Disclosure>
        <Disclosure.Button className="flex items-center gap-1 px-2 py-1 text-sm font-bold text-white transition-all duration-300 ease-in-out border dark:text-gray-800 bg-gradient-to-br from-indigo-400 to-indigo-500 border-indigo-200/50 dark:border-neutral-800 hover:from-indigo-500 hover:to-indigo-600 rounded-2xl">
          Edit Profile <RiEditBoxFill className="text-base" />
        </Disclosure.Button>
        <Disclosure.Panel className="p-2 space-y-2 text-gray-500 border border-gray-200 shadow-sm rounded-3xl dark:border-neutral-900 shadow-gray-400/10 bg-gradient-to-tr dark:from-indigo-600 from-indigo-200 dark:to-pink-700 to-pink-200">
          {({ close }) => (
            <>
              <span className="font-semibold dark:text-gray-400">
                Max 120 character
              </span>
              <input
                type="text"
                maxLength={120}
                value={profileChanges.description}
                onChange={(e) =>
                  setProfileChanges({
                    description: e.target.value
                  })
                }
                placeholder="description"
                className="w-full px-2 py-1 border border-gray-300 outline-none dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700 rounded-2xl"
              />
              <button
                className="px-2 py-1 duration-300 bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-gray-300 rounded-2xl hover:bg-gray-100"
                disabled={loading}
                type="button"
                onClick={async () => {
                  await handleProfile(), close()
                }}
              >
                Save
              </button>
            </>
          )}
        </Disclosure.Panel>
      </Disclosure>
    </>
  )
}

export default EditProfile
