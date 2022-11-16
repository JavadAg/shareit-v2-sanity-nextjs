import React from "react"
import { NextPage } from "next"
import Profile from "../../../components/Profile/Profile"

interface IProps {
  user: any
}

const ProfilePage: NextPage<IProps> = ({ user }) => {
  return (
    <main className="h-full flex flex-col w-full min-h-[calc(100vh-4rem)] bg-gray-100 p-2 text-slate-800">
      <Profile userData={user} />
    </main>
  )
}

export default ProfilePage
