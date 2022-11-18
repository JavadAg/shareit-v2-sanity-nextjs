import React from "react"
import { NextPage } from "next"
import Profile from "../../../components/Profile/Profile"
import { UserData } from "../../../types/posts.types"

interface IProps {
  user: UserData
}

const ProfilePage: NextPage<IProps> = ({ user }) => {
  return (
    <main className="h-full flex flex-col w-full min-h-[calc(100vh-4rem)] bg-gray-100 p-2 text-slate-800">
      <Profile user={user} />
    </main>
  )
}

export default ProfilePage
