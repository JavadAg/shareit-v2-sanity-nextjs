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
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PostsType } from "../../../types/posts.types"

interface IProps {
  post: PostsType
}

const Post: React.FC<IProps> = ({ post }) => {
  const [postDetails, setPostDetails] = useState(post)
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 space-y-2 bg-white border dark:bg-black rounded-2xl dark:border-neutral-900 border-gray-300/50">
      <div className="flex items-center justify-between w-full">
        <div
          onClick={() => router.push(`/profile/${post.postedBy._id}`)}
          className="relative flex items-center justify-center p-2 space-x-2 bg-gray-100 cursor-pointer dark:bg-neutral-900 rounded-3xl"
        >
          <div className="relative block w-8 h-8 before:content-[''] before:rounded-full before:-top-0.5 before:-left-0.5 before:bg-gradient-to-br from-indigo-200 to-pink-300 before:absolute before:w-9 before:h-9 before:block md:w-10 md:h-10 md:before:w-[44px] md:before:h-[44px] md:before:-left-[2px] md:before:-top-[2px]">
            <Image
              alt="avatar"
              loading="lazy"
              width="35"
              height="35"
              src={post?.postedBy?.avatar}
              className="relative block object-contain w-auto h-auto max-w-full max-h-full border-2 border-gray-400 rounded-full dark:border-neutral-800 "
            />
          </div>
          <div className="flex flex-col items-start justify-center text-sm text-start">
            <span className="font-bold capitalize break-all">
              {post.postedBy.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
              {moment(post._createdAt).fromNow()}
            </span>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="p-2 rounded-full bg-gray-100/40 dark:bg-neutral-900 dark:text-neutral-200/70 md:text-xl text-gray-900/20"
        >
          <HiOutlineDotsHorizontal aria-hidden="true" />
        </span>
      </div>
      <PostCarousel assets={post.assets} />
      <Disclosure>
        <div className="flex items-center justify-between w-full h-10 px-1 bg-gray-100 dark:bg-neutral-900 rounded-2xl ">
          <div className="flex items-center justify-center space-x-1">
            <Likes postDetails={postDetails} setPostDetails={setPostDetails} />
            <Disclosure.Button
              disabled={status === "unauthenticated"}
              className="relative flex items-center justify-center h-8 px-1 space-x-1 text-4xl text-gray-700 bg-white border border-gray-200 rounded-full dark:text-gray-200 dark:bg-black dark:border-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <HiOutlineAnnotation className="w-5 h-5 md:w-6 md:h-6" />
              {postDetails.comments?.length > 0 && (
                <span className="text-sm text-gray-800 dark:text-gray-200 md:text-base">
                  {postDetails.comments.length}
                </span>
              )}
            </Disclosure.Button>
          </div>
          <SavePost postDetails={postDetails} setPostDetails={setPostDetails} />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-4 p-2 text-sm bg-gray-100 dark:bg-neutral-900 rounded-2xl md:text-base">
          <span className="text-gray-900 break-words break-all dark:text-gray-200">
            {post.caption}
          </span>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-start w-full gap-1">
              {post.tags.map((tag: string, index: number) => (
                <Link
                  key={index}
                  className="text-xs font-bold duration-300 cursor-pointer text-slate-500 dark:text-slate-300 dark:hover:text-slate-400 hover:text-slate-700 md:text-sm"
                  href={`/search/${tag}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        {status === "authenticated" ? (
          <div className="flex items-center justify-start w-full space-x-1">
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
