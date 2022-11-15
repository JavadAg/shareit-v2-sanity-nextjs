import axios from "axios"
import React from "react"
import ProfilePage from "./ProfilePage"

interface Params {
  params: { userid: string }
}

async function getUser(userid: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userid}`
  )
  const data = res.data
  return data
}

export default async function Profile({ params: { userid } }: Params) {
  const user = await getUser(userid)

  return <ProfilePage user={user} />
}
