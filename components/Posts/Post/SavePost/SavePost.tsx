import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { HiBookmarkAlt, HiOutlineBookmarkAlt } from "react-icons/hi"
import { PostsType } from "../../../../types/posts.types"

interface IProps {
  postDetails: PostsType
  setPostDetails: React.Dispatch<React.SetStateAction<PostsType>>
}

const SavePost: React.FC<IProps> = ({ postDetails, setPostDetails }) => {
  const { data: session, status } = useSession()
  const [saved, setSaved] = useState<Boolean>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSavePost = async () => {
    if (status === "authenticated") {
      const userid = session?.user.id
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postDetails._id}`,
        { userid, type: "save", saved }
      )
      const data = res.data
      setPostDetails({ ...postDetails, savedBy: res.data.savedBy })

      setIsLoading(false)

      return data
    }
  }

  let filterSaved = postDetails.savedBy?.filter(
    (item) => item._id === (session?.user.id as unknown as string)
  )

  useEffect(() => {
    if (filterSaved?.length > 0 && status === "authenticated") {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [filterSaved])

  return (
    <button
      disabled={isLoading || status === "unauthenticated"}
      onClick={() => handleSavePost()}
      className="relative group text-4xl text-gray-700 flex justify-center items-center border border-gray-200 bg-white rounded-full w-8 h-8 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
    >
      <HiOutlineBookmarkAlt
        className={`w-5 h-5 ${
          saved ? "opacity-0" : "opacity-100"
        } transition-all duration-1000 ease-out md:w-6 md:h-6`}
      />
      <HiBookmarkAlt
        className={`absolute w-5 h-5 transition-all duration-1000 ease-out transform overflow-hidden text-gray-700 ${
          saved ? "opacity-100" : "opacity-0"
        } origin-center md:w-6 md:h-6`}
      />
    </button>
  )
}

export default SavePost
