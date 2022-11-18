import React, { useEffect } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { UserData } from "../../../types/posts.types"

interface IProps {
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const Follow: React.FC<IProps> = ({ userData, setUserData }) => {
  const { data: session, status } = useSession()

  const filterUser = userData.user.followers.filter(
    (obj) => obj._id === (session?.user.id as unknown as string)
  )

  const handleUnfollow = async () => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userData.user._id}`,
      { type: "unfollow", myId: session?.user.id }
    )

    setUserData({
      ...userData,
      user: {
        ...userData.user,
        followers: userData.user.followers.filter(
          (user) => user._id !== (session?.user.id as unknown as string)
        )
      }
    })
  }

  const handleFollow = async () => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userData.user._id}`,
      { type: "follow", myId: session?.user.id }
    )

    setUserData({
      ...userData,
      user: {
        ...userData.user,
        followers: [
          ...userData.user.followers,
          { _id: session?.user.id! as unknown as string }
        ]
      }
    })
  }

  return (
    <div>
      {filterUser.length > 0 ? (
        <button
          className="bg-gradient-to-br from-indigo-300 to-indigo-400 border border-indigo-200/50 py-1 text-sm rounded-2xl px-2 font-bold flex items-center gap-1 text-white"
          onClick={() => handleUnfollow()}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="bg-gradient-to-br from-indigo-300 to-indigo-400 border border-indigo-200/50 py-1 text-sm rounded-2xl px-2 font-bold flex items-center gap-1 text-white"
          onClick={() => handleFollow()}
        >
          Follow
        </button>
      )}
    </div>
  )
}

export default Follow
