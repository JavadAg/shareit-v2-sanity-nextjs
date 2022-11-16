import axios from "axios"
import React, { useEffect, useState } from "react"
import { HiOutlineHeart, HiHeart } from "react-icons/hi"
import { useSession } from "next-auth/react"
import { stat } from "fs"

interface IProps {
  postDetails: any
  setPostDetails: any
}

const Likes: React.FC<IProps> = ({ postDetails, setPostDetails }) => {
  const { data: session, status } = useSession()
  const [liked, setLiked] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (status === "authenticated") {
      setIsLoading(true)
      const userid = session?.user.id
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postDetails._id}`,
        { userid, type: "like", liked }
      )
      const data = res.data
      setPostDetails({ ...postDetails, likes: res.data.likes })
      setIsLoading(false)
      return data
    }
  }

  let filterLikes = postDetails.likes?.filter(
    (item: any) => item._ref === session?.user.id
  )

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [filterLikes])

  return (
    <div className="relative space-x-1 group px-1 text-center border border-gray-200 text-4xl text-red-500 flex justify-center items-center bg-white rounded-full min-w-[32px] h-8">
      <button
        disabled={isLoading}
        onClick={() => handleLike()}
        className="relative group text-center flex justify-center items-center"
      >
        <HiHeart
          className={`absolute w-5 h-5 transition-all duration-1000 ease-out transform overflow-hidden text-red-500 ${
            liked ? "scale-100 opacity-90" : "scale-0 opacity-0"
          } origin-bottom`}
        />
        <HiOutlineHeart className="w-5 h-5" />
      </button>
      {postDetails.likes?.length > 0 && (
        <span className="text-sm text-gray-800">
          {postDetails.likes.length}
        </span>
      )}
    </div>
  )
}

export default Likes
