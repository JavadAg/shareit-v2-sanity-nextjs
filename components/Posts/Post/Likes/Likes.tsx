import axios from "axios"
import React, { useEffect, useState } from "react"
import { HiOutlineHeart, HiHeart } from "react-icons/hi"
import { useSession } from "next-auth/react"
import { stat } from "fs"
import { PostsType } from "../../../../types/posts.types"

interface IProps {
  postDetails: PostsType
  setPostDetails: React.Dispatch<React.SetStateAction<PostsType>>
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
    (item) => item._ref === (session?.user.id as unknown as string)
  )

  useEffect(() => {
    if (filterLikes?.length > 0 && status === "authenticated") {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [filterLikes])

  return (
    <div
      className={`relative space-x-1 group px-1 text-center border border-gray-200 text-red-500 flex justify-center items-center bg-white rounded-full min-w-[32px] h-8 ${
        status === "unauthenticated"
          ? "cursor-not-allowed opacity-40"
          : "opacity-100 cursor-pointer"
      }`}
    >
      <button
        disabled={isLoading || status === "unauthenticated"}
        onClick={() => handleLike()}
        className="relative group text-center flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-40"
      >
        <HiHeart
          className={`absolute w-5 h-5 transition-all duration-1000 ease-out transform overflow-hidden text-red-500 ${
            liked ? "scale-100 opacity-90" : "scale-0 opacity-0"
          } origin-bottom md:w-6 md:h-6`}
        />
        <HiOutlineHeart className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      {postDetails.likes?.length > 0 && (
        <span className="text-sm text-gray-800 md:text-base">
          {postDetails.likes.length}
        </span>
      )}
    </div>
  )
}

export default Likes
