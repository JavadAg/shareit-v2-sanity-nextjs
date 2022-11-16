"use client"

import React, { useState } from "react"
import Image from "next/image"
import PostCarousel from "./PostCarousel/PostCarousel"
import { HiOutlineDotsHorizontal, HiOutlineAnnotation } from "react-icons/hi"
import { useSession } from "next-auth/react"
import moment from "moment"
import Comments from "./Comments/Comments"
import Likes from "./Likes/Likes"
import SavePost from "./SavePost/SavePost"
import { Disclosure } from "@headlessui/react"

const Post = ({ post }: any) => {
  const [postDetails, setPostDetails] = useState(post)
  const { data: session, status } = useSession()

  const handleDropDown = () => {}

  return (
    <div className="flex justify-center items-center flex-col space-y-2 bg-white w-full h-full rounded-2xl p-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center rounded-3xl space-x-2 relative bg-gray-100 p-2">
          <div className="relative block w-8 h-8 before:content-[''] before:rounded-full before:-top-0.5 before:-left-0.5 before:bg-gradient-to-br from-indigo-200 to-pink-300 before:absolute before:w-9 before:h-9 before:block">
            <Image
              alt="avatar"
              loading="lazy"
              width="35"
              height="35"
              src={post?.postedBy?.avatar}
              className="rounded-full relative max-h-full max-w-full w-auto h-auto object-contain block border-2 border-gray-400 "
            />
          </div>
          <div className="flex justify-center items-start flex-col text-sm text-start">
            <span className="capitalize text-sm font-bold">
              {post.postedBy.name}
            </span>
            <span className="text-xs text-gray-500">
              {moment(post._createdAt).fromNow()}
            </span>
          </div>
        </div>
        <span aria-hidden="true" className="bg-gray-100 p-2 rounded-full">
          <HiOutlineDotsHorizontal aria-hidden="true" />
        </span>
      </div>
      <PostCarousel assets={post.assets} />
      <Disclosure>
        <div className="flex justify-between items-center bg-gray-100 h-10 rounded-2xl w-full px-1 ">
          <div className="flex justify-center items-center space-x-1">
            <Likes postDetails={postDetails} setPostDetails={setPostDetails} />

            <Disclosure.Button className="relative space-x-1 px-1 text-4xl border border-gray-200 text-gray-500 flex justify-center items-center bg-white rounded-full h-8">
              <HiOutlineAnnotation className="w-5 h-5" />
              {postDetails.comments?.length > 0 && (
                <span className="text-sm text-gray-800">
                  {postDetails.comments.length}
                </span>
              )}
            </Disclosure.Button>
          </div>
          <SavePost postDetails={postDetails} setPostDetails={setPostDetails} />
        </div>
        <div className="flex flex-col justify-center items-start bg-gray-100 p-2 text-sm rounded-2xl w-full gap-4">
          <span className="text-gray-900">{post.caption}</span>
          <div className="flex justify-start items-center w-full gap-1">
            {post.tags.map((tag: string) => (
              <span
                onClick={() => {}}
                className="font-bold text-xs text-slate-500 cursor-pointer hover:text-slate-700 duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        {status === "authenticated" ? (
          <div className="flex justify-start items-center w-full space-x-1">
            <Comments
              postDetails={postDetails}
              setPostDetails={setPostDetails}
            />
          </div>
        ) : (
          ""
        )}
      </Disclosure>
    </div>
  )
}

export default Post
