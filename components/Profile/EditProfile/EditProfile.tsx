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
      <span className="font-bold capitalize">{userData.user.name}</span>
      <span className="text-gray-600 break-all">
        {userData.user.description}
      </span>
      <Disclosure>
        <Disclosure.Button className="bg-gradient-to-br transition-all ease-in-out duration-300 from-indigo-400 to-indigo-500 border border-indigo-200/50 py-1 hover:from-indigo-500 hover:to-indigo-600 text-sm rounded-2xl px-2 font-bold flex items-center gap-1 text-white">
          Edit Profile <RiEditBoxFill className="text-base" />
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500 border rounded-3xl border-gray-200 shadow-sm shadow-gray-400/10 space-y-2 p-2 bg-gradient-to-tr from-indigo-200 to-pink-200">
          {({ close }) => (
            <>
              <span className="font-semibold">Max 120 character</span>
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
                className="px-2 py-1 border border-gray-300 rounded-2xl w-full outline-none"
              />
              <button
                className="bg-white px-2 py-1 rounded-2xl hover:bg-gray-100 duration-300"
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
