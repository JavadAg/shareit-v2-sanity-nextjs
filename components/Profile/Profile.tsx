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
import { User, UserData } from "../../types/posts.types"

interface IProps {
  user: UserData
}

const Profile: React.FC<IProps> = ({ user }) => {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData>(user)

  return (
    <div className="flex justify-start items-center bg-white rounded-3xl w-full h-full flex-col gap-4 p-2 mr-auto ml-auto max-w-2xl border border-gray-300/50">
      <div className="flex justify-evenly items-center w-full mt-2">
        <div className="flex flex-col justify-center items-center text-sm">
          <span className="font-bold md:text-base">
            {userData.user?.followers.length}
          </span>
          <span className="text-gray-400 text-xs md:text-sm">Followers</span>
        </div>
        <div className="w-24 h-24 block relative lg:w-32 lg:h-32">
          <Image
            className="w-auto h-auto max-w-full max-h-full block rounded-full"
            src={userData.user.avatar}
            alt="user_avatar"
            fill
          />
        </div>
        <div className="flex flex-col justify-center items-center text-sm">
          <span className="font-bold md:text-base">
            {userData.user?.following.length}
          </span>
          <span className="text-gray-400 text-xs md:text-sm">Following</span>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col text-sm gap-4 border-t border-gray-200 pt-2 w-full text-center">
        <span className="font-bold capitalize">{userData.user.name}</span>
        <span className="text-gray-600 break-all">
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
          <Tab.List className="flex bg-indigo-400 space-x-1 p-1 text-2xl justify-center items-center rounded-3xl">
            <Tab
              title="created posts"
              className="ui-selected:bg-white ui-selected:hover:text-indigo-500 duration-300 ui-not-selected:hover:text-gray-100 rounded-2xl px-3 ui-selected:text-indigo-400 ui-not-selected:text-white outline-none"
            >
              <RiLayout4Fill className="ui-selected:block ui-not-selected:hidden" />
              <RiLayout4Line className="ui-selected:hidden ui-not-selected:block" />
            </Tab>
            <Tab
              title="saved posts"
              className="ui-selected:bg-white ui-selected:hover:text-indigo-500 duration-300 ui-not-selected:hover:text-gray-100 rounded-2xl px-3 ui-selected:text-indigo-400 ui-not-selected:text-white outline-none"
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
