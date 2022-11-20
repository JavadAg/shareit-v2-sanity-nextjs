import React from "react"
import { NextPage } from "next"
import Profile from "../../../components/Profile/Profile"
import { UserData } from "../../../types/posts.types"

interface IProps {
  user: UserData
}

const ProfilePage: NextPage<IProps> = ({ user }) => {
  return (
    <main className="h-screen flex justify-start items-center flex-col w-full p-2 text-slate-800">
      <Profile user={user} />
    </main>
  )
}

export default ProfilePage
