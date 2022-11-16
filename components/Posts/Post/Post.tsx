"use client"

import React, { useState } from "react"
import Image from "next/image"
import PostCarousel from "./PostCarousel/PostCarousel"
import {
  HiOutlineDotsHorizontal,
  HiOutlineAnnotation,
  HiOutlineBookmarkAlt,
  HiBookmarkAlt
} from "react-icons/hi"
import { useSession } from "next-auth/react"
import moment from "moment"
import Comments from "./Comments/Comments"
import Likes from "./Likes/Likes"

const Post = ({ post }: any) => {
  const [postDetails, setPostDetails] = useState(post)
  const { data: session, status } = useSession()

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
      <div className="flex justify-between items-center bg-gray-100 h-10 rounded-2xl w-full px-1 ">
        <div className="flex justify-center items-center space-x-1">
          <Likes postDetails={postDetails} setPostDetails={setPostDetails} />
          <div className="relative space-x-1 px-1 text-4xl border border-gray-200 text-gray-500 flex justify-center items-center bg-white rounded-full h-8">
            <HiOutlineAnnotation className="w-5 h-5" />
            {postDetails.comments?.length > 0 && (
              <span className="text-sm text-gray-800">
                {postDetails.comments.length}
              </span>
            )}
          </div>
        </div>
        <div className="relative group text-4xl text-gray-500 flex justify-center items-center border border-gray-200 bg-white rounded-full w-8 h-8">
          <HiOutlineBookmarkAlt className="w-5 h-5 group-hover:opacity-0 transition-all duration-1000 ease-out" />
          <HiBookmarkAlt className="absolute w-5 h-5 opacity-0 transition-all duration-1000 ease-out transform overflow-hidden text-gray-700 group-hover:opacity-100 origin-center" />
        </div>
      </div>
      <div className="flex justify-start items-center bg-gray-100 p-2 text-sm rounded-2xl w-full">
        <span className="text-gray-800 font-semibold">{post.caption}</span>
      </div>
      {status === "authenticated" ? (
        <div className="flex justify-start items-center w-full space-x-1">
          <div className="relative block w-10 h-10 ">
            <Image
              alt="avatar"
              loading="lazy"
              fill
              src={session?.user.image as string}
              className="rounded-full max-h-full max-w-full w-auto h-auto block border-2 border-gray-100 "
            />
          </div>
          <Comments postDetails={postDetails} setPostDetails={setPostDetails} />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Post
