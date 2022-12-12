import React from "react"
import { NextPage } from "next"
import Profile from "../../../components/Profile/Profile"
import { UserData } from "../../../types/posts.types"

interface IProps {
  user: UserData
}

const ProfilePage: NextPage<IProps> = ({ user }) => {
  return (
    <main className="flex flex-col items-center justify-start w-full h-screen p-2 text-slate-800 dark:text-gray-200">
      <Profile user={user} />
    </main>
  )
}

export default ProfilePage
