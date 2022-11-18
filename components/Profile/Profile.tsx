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

const Profile = ({ user }: any) => {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData>(user)

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
        {status === "authenticated" &&
        (session?.user.id as unknown as string) == userData.user._id ? (
          <EditProfile userData={userData} />
        ) : (
          <Follow userData={userData} setUserData={setUserData} />
        )}
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
