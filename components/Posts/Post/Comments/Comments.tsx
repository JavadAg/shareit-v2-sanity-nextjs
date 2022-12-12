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
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <div className="flex items-center justify-center w-full gap-2">
        <div className="relative block w-10 h-10 md:w-11 md:h-11">
          <Image
            alt="avatar"
            loading="lazy"
            fill
            src={session?.user.image as string}
            className="block w-auto h-auto max-w-full max-h-full border-2 border-gray-100 rounded-full dark:border-neutral-800"
          />
        </div>
        <div className="flex items-center justify-center flex-1 h-10 text-sm border border-gray-200 rounded-full dark:border-neutral-800 md:text-base">
          <input
            onChange={(e) => setComment(e.target.value)}
            maxLength={40}
            value={comment}
            contentEditable="true"
            className="w-full h-full pl-2 outline-none rounded-3xl dark:bg-black"
            type="text"
            placeholder="write a comment"
          />
          <button
            disabled={isLoading || comment.length < 1}
            className="px-2 py-1 mr-2 text-gray-100 rounded-full dark:text-gray-200 bg-gradient-to-br from-indigo-300 to-violet-400 disabled:opacity-30"
            onClick={() => handleComment()}
          >
            Send
          </button>
        </div>
      </div>
      <Disclosure.Panel className="w-full px-4 pt-4 pb-2 space-y-4 text-sm text-gray-500">
        {postDetails.comments.length > 0 ? (
          postDetails.comments.map((obj, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center w-full"
            >
              <div className="flex w-full">
                <span className="font-bold text-gray-700 dark:text-gray-400">
                  {obj.postedBy.name}:{"  "}
                </span>
                <span className="break-all dark:text-gray-500">
                  {obj.comment}
                </span>
              </div>
            </div>
          ))
        ) : (
          <span className="flex justify-center font-bold text-center text-orange-400">
            No comment !
          </span>
        )}
      </Disclosure.Panel>
    </div>
  )
}

export default Comments
