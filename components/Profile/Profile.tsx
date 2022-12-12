"use client"

import React, { useState } from "react"
import Image from "next/image"
import GridPosts from "../GridPosts/GridPosts"
import {
  RiBookmark2Line,
  RiBookmark2Fill,
  RiLayout4Line,
  RiLayout4Fill
} from "react-icons/ri"
import { Tab } from "@headlessui/react"
import { useSession } from "next-auth/react"
import EditProfile from "./EditProfile/EditProfile"
import Follow from "./Follow/Follow"
import { UserData } from "../../types/posts.types"

interface IProps {
  user: UserData
}

const Profile: React.FC<IProps> = ({ user }) => {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData>(user)

  return (
    <div className="flex flex-col items-center justify-start w-full h-full max-w-2xl gap-4 p-2 ml-auto mr-auto bg-white border dark:bg-black rounded-3xl border-gray-300/50 dark:border-neutral-900">
      <div className="flex items-center w-full mt-2 justify-evenly">
        <div className="flex flex-col items-center justify-center text-sm">
          <span className="font-bold md:text-base dark:text-gray-400">
            {userData.user?.followers.length}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-200 md:text-sm">
            Followers
          </span>
        </div>
        <div className="relative block w-24 h-24 lg:w-32 lg:h-32">
          <Image
            className="block w-auto h-auto max-w-full max-h-full rounded-full"
            src={userData.user.avatar}
            alt="user_avatar"
            fill
          />
        </div>
        <div className="flex flex-col items-center justify-center text-sm">
          <span className="font-bold md:text-base dark:text-gray-400">
            {userData.user?.following.length}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-200 md:text-sm">
            Following
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 pt-2 text-sm text-center border-t border-gray-200 dark:border-neutral-800">
        <span className="font-bold capitalize dark:text-gray-300">
          {userData.user.name}
        </span>
        <span className="text-gray-600 break-all dark:text-gray-300">
          {userData.user.description}
        </span>
        {(session?.user.id as unknown as string) == userData.user._id ? (
          <EditProfile userData={userData} />
        ) : status === "authenticated" ? (
          <Follow userData={userData} setUserData={setUserData} />
        ) : (
          ""
        )}
      </div>

      <Tab.Group defaultIndex={0}>
        {userData.user._id === (session?.user.id as unknown as string) && (
          <Tab.List className="flex items-center justify-center p-1 space-x-1 text-2xl bg-indigo-400 rounded-3xl">
            <Tab
              title="created posts"
              className="px-3 duration-300 outline-none ui-selected:bg-white ui-selected:hover:text-indigo-500 ui-not-selected:hover:text-gray-100 rounded-2xl ui-selected:text-indigo-400 ui-not-selected:text-white dark:ui-selected:bg-black dark:ui-not-selected:text-gray-700"
            >
              <RiLayout4Fill className="ui-selected:block ui-not-selected:hidden" />
              <RiLayout4Line className="ui-selected:hidden ui-not-selected:block" />
            </Tab>
            <Tab
              title="saved posts"
              className="px-3 duration-300 outline-none ui-selected:bg-white ui-selected:hover:text-indigo-500 ui-not-selected:hover:text-gray-100 rounded-2xl ui-selected:text-indigo-400 ui-not-selected:text-white dark:ui-selected:bg-black dark:ui-not-selected:text-gray-700"
            >
              <RiBookmark2Fill className="ui-selected:block ui-not-selected:hidden" />
              <RiBookmark2Line className="ui-selected:hidden ui-not-selected:block" />
            </Tab>
          </Tab.List>
        )}

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
