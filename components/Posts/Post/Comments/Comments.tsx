import axios from "axios"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Disclosure, Transition } from "@headlessui/react"
import { PostsType } from "../../../../types/posts.types"

interface IProps {
  postDetails: PostsType
  setPostDetails: React.Dispatch<React.SetStateAction<PostsType>>
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

    //since returned data using default query (poster info not included!) we extract poster name from session
    setPostDetails({
      ...postDetails,
      comments: [
        ...postDetails.comments,
        {
          comment: res.data.comments.slice(-1)[0].comment,
          postedBy: {
            name: session?.user.name!,
            avatar: session?.user.image!,
            _id: session?.user.id! as unknown as string
          },
          _key: res.data.comments.slice(-1)[0]._key
        }
      ]
    })
    setComment("")
    setIsLoading(false)
  }

  return (
    <div className="flex justify-center items-center flex-col w-full gap-2">
      <div className="flex justify-center items-center w-full gap-2">
        <div className="relative block w-10 h-10 md:w-11 md:h-11">
          <Image
            alt="avatar"
            loading="lazy"
            fill
            src={session?.user.image as string}
            className="rounded-full max-h-full max-w-full w-auto h-auto block border-2 border-gray-100"
          />
        </div>
        <div className="flex justify-center items-center rounded-full border border-gray-200 h-10 text-sm flex-1 md:text-base">
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
            disabled={isLoading || comment.length < 1}
            className="bg-gradient-to-br from-indigo-300 to-violet-400 rounded-full px-2 py-1 text-gray-100 disabled:opacity-30 mr-2"
            onClick={() => handleComment()}
          >
            Send
          </button>
        </div>
      </div>
      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 w-full space-y-4">
        {postDetails.comments.length > 0 ? (
          postDetails.comments.map((obj, index) => (
            <div
              key={index}
              className="flex justify-center items-start flex-col w-full"
            >
              <div className="flex w-full">
                <span className="font-bold text-gray-700">
                  {obj.postedBy.name}:{"  "}
                </span>
                <span className="break-all">{obj.comment}</span>
              </div>
            </div>
          ))
        ) : (
          <span className="text-center text-orange-400 font-bold flex justify-center">
            No comment !
          </span>
        )}
      </Disclosure.Panel>
    </div>
  )
}

export default Comments
