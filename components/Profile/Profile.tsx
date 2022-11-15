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

const Profile = ({ userData }: any) => {
  const [togglePostView, setTogglePostView] = useState(false)
  console.log(userData)
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
        <button className="bg-gradient-to-br from-indigo-300 to-violet-400 border border-indigo-200/50 py-1 text-sm rounded-2xl px-2 font-bold flex items-center gap-1">
          Edit Profile <RiEditBoxFill className="text-base" />
        </button>
      </div>

      <div className="border-t w-full border-gray-300">
        <label
          htmlFor="switchPostType"
          className="relative flex cursor-pointer select-none items-center justify-center bg-white p-1 gap-4"
        >
          <input
            onClick={() => setTogglePostView((current) => !current)}
            type="checkbox"
            name="switchPostType"
            id="switchPostType"
            className="sr-only peer"
          />
          <span
            title="created posts"
            className="flex items-center space-x-[6px] py-2 text-3xl transition-all duration-300 ease-in-out text-gray-300 peer-checked:text-indigo-500 "
          >
            <RiLayout4Line />
          </span>
          <span
            title="saved posts"
            className="flex items-center space-x-[6px] py-2 text-3xl transition-all duration-300 ease-in-out peer-checked:text-gray-300 text-indigo-500 "
          >
            <RiBookmark2Line />
          </span>
        </label>

        {togglePostView ? (
          <GridPosts posts={userData.userPosts} />
        ) : (
          <GridPosts posts={userData.userSavedPosts} />
        )}
      </div>
    </div>
  )
}

export default Profile
