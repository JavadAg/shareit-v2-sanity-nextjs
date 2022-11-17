"use client"

import React, { useState } from "react"
import Image from "next/image"
import GridPosts from "../GridPosts/GridPosts"
import {
  RiBookmark2Line,
  RiBookmark2Fill,
  RiLayout4Line,
  RiLayout4Fill,
  RiEditBoxFill
} from "react-icons/ri"
import { Disclosure, Tab, Transition } from "@headlessui/react"
import axios from "axios"
import { useSession } from "next-auth/react"

const Profile = ({ userData }: any) => {
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
        profileChanges
      )

      if (res.status === 200) {
        userData.user.description = res.data.description
      }
    }
    setLoading(false)
  }
  return (
    <div className="flex justify-center items-center bg-white rounded-3xl w-full h-full flex-col gap-4 p-2">
      <div className="flex justify-evenly items-center w-full">
        <div className="flex flex-col justify-center items-center text-sm">
          <span className="font-bold">{userData.user?.followers.length}</span>
          <span className="text-gray-400 text-xs">Followers</span>
        </div>

        <div className="w-24 h-24 block relative">
          <Image
            className="w-auto h-auto max-w-full max-h-full block rounded-full"
            src={userData.user.avatar}
            alt="user_avatar"
            fill
          />
        </div>
        <div className="flex flex-col justify-center items-center text-sm">
          <span className="font-bold">{userData.user?.following.length}</span>
          <span className="text-gray-400 text-xs">Following</span>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col text-sm gap-4 border-t border-gray-200 pt-2 w-full text-center">
        <span className="font-bold capitalize">{userData.user.name}</span>
        <span className="text-gray-600 break-all">
          {userData.user.description}
        </span>
        <Disclosure>
          <Disclosure.Button className="bg-gradient-to-br from-indigo-300 to-indigo-400 border border-indigo-200/50 py-1 text-sm rounded-2xl px-2 font-bold flex items-center gap-1 text-white">
            Edit Profile <RiEditBoxFill className="text-base" />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          />
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
      </div>

      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex bg-indigo-400 space-x-1 p-1 text-2xl justify-center items-center rounded-3xl">
          <Tab
            title="created posts"
            className="ui-selected:bg-white rounded-2xl px-3 ui-selected:text-indigo-300 ui-not-selected:text-white outline-none"
          >
            <RiLayout4Fill className="ui-selected:block ui-not-selected:hidden" />
            <RiLayout4Line className="ui-selected:hidden ui-not-selected:block" />
          </Tab>
          <Tab
            title="saved posts"
            className="ui-selected:bg-white rounded-2xl px-3 ui-selected:text-indigo-300 ui-not-selected:text-white outline-none"
          >
            <RiBookmark2Fill className="ui-selected:block ui-not-selected:hidden" />
            <RiBookmark2Line className="ui-selected:hidden ui-not-selected:block" />
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <GridPosts posts={userData.userPosts} />
          </Tab.Panel>
          <Tab.Panel>
            <GridPosts posts={userData.userSavedPosts} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Profile
