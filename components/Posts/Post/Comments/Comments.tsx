import axios from "axios"
import React, { useState } from "react"
import { useSession } from "next-auth/react"

interface IProps {
  postDetails: any
  setPostDetails: any
}

const Comments: React.FC<IProps> = ({ postDetails, setPostDetails }) => {
  const { data: session, status } = useSession()
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleComment = async () => {
    setIsLoading(true)
    const userid = session?.user.id
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postDetails._id}`,
      { comment, userid, type: "comment" }
    )
    const data = res.data

    setPostDetails({ ...postDetails, comments: res.data.comments })
    setComment("")
    setIsLoading(false)
  }

  return (
    <div className="flex justify-center items-center rounded-full border border-gray-200 h-10 text-sm flex-1">
      <input
        onChange={(e) => setComment(e.target.value)}
        maxLength={40}
        value={comment}
        contentEditable="true"
        className="h-full w-full rounded-3xl pl-2 outline-none"
        type="text"
        placeholder="write a comment"
      />
      <button
        disabled={isLoading}
        className="bg-gradient-to-br from-indigo-300 to-violet-400 rounded-full px-2 py-1 text-gray-100 disabled:opacity-30 mr-2"
        onClick={() => handleComment()}
      >
        Send
      </button>
    </div>
  )
}

export default Comments
