import React, { useState } from "react"
import Image from "next/image"
import PostCarousel from "./PostCarousel/PostCarousel"
import {
  HiOutlineDotsHorizontal,
  HiOutlineHeart,
  HiHeart,
  HiOutlineAnnotation,
  HiOutlineBookmarkAlt
} from "react-icons/hi"
import { userLikedPostsQuery } from "../../../utils/sanity_queries"

const Post = ({ post }: any) => {
  const [liked, setLiked] = useState(false)
  console.log(post)
  return (
    <div className="flex justify-center items-center flex-col space-y-2 bg-white w-full h-full rounded-2xl p-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center rounded-3xl space-x-2 relative bg-gray-100 p-2">
          <div className="relative block w-8 h-8">
            <Image
              alt="avatar"
              loading="lazy"
              width="35"
              height="35"
              src={post?.postedBy?.avatar}
              className="rounded-full max-h-full max-w-full w-auto h-auto object-contain block"
            />
          </div>

          <span className="capitalize text-sm font-bold">
            {post.postedBy.name}
          </span>
        </div>
        <span aria-hidden="true" className="bg-gray-100 p-2 rounded-full">
          <HiOutlineDotsHorizontal aria-hidden="true" />
        </span>
      </div>
      <PostCarousel assets={post.assets} />
      <div className="flex justify-between items-center bg-gray-100 h-10 rounded-2xl w-full px-1 ">
        <div className="flex justify-center items-center space-x-1">
          <div
            onClick={() => setLiked((prev) => !prev)}
            className="relative space-x-1  group px-1 text-center text-4xl text-red-500 flex justify-center items-center bg-white rounded-full min-w-[32px] h-8"
          >
            <div className="relative group text-center flex justify-center items-center">
              <HiOutlineHeart className=" w-5 h-5" />
              <HiHeart className="absolute w-5 h-5 scale-0 opacity-0 transition-all duration-1000 ease-out transform overflow-hidden text-red-500 group-hover:scale-100 group-hover:opacity-90 origin-bottom" />
            </div>

            <span className="text-base text-gray-800">
              {post.likes?.length}
            </span>
          </div>
          <div
            onClick={() => setLiked((prev) => !prev)}
            className="relative  text-4xl text-gray-500 flex justify-center items-center bg-white rounded-full w-8 h-8"
          >
            <HiOutlineAnnotation className="w-5 h-5" />
            <span className="text-base text-gray-800">
              {post.comments?.length}
            </span>
          </div>
        </div>
        <div
          onClick={() => setLiked((prev) => !prev)}
          className="relative  text-4xl text-gray-500 flex justify-center items-center bg-white rounded-full w-8 h-8"
        >
          <HiOutlineBookmarkAlt className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

export default Post
