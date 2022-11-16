"use client"

import React, { useState } from "react"
import Image from "next/image"
import PostModal from "./PostModal/PostModal"

const GridPosts = ({ posts }: any) => {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(45%,_1fr))] auto-rows-[50px] gap-2 p-2">
      {posts.map((post: any) => (
        <React.Fragment key={post._id}>
          <div
            className={`flex relative justify-center items-center group ${
              post.assets[0].width === post.assets[0].height
                ? "row-span-3"
                : post.assets[0].width > post.assets[0].height
                ? "row-span-2"
                : "row-span-4"
            }`}
          >
            <button
              onClick={() => setToggleModal((current) => !current)}
              className="opacity-0 z-[1] absolute w-full h-full inset-0 block group-hover:opacity-70 bg-indigo-300 duration-300 rounded-2xl overflow-hidden cursor-pointer"
            >
              {post.comments.length}
            </button>

            {post.assets[0].resource_type === "image" ? (
              <div className="relative object-cover min-w-full h-full flex justify-center overflow-hidden">
                <Image
                  alt="post_image"
                  width="0"
                  height="0"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                  src={post.assets[0].url}
                  className="rounded-2xl w-full h-full max-w-full max-h-full object-cover block"
                />
              </div>
            ) : post.assets[0].resource_type === "video" ? (
              <div>
                <video src={post.assets[0].url} />
              </div>
            ) : (
              ""
            )}
          </div>
          {toggleModal && (
            <PostModal
              post={post}
              toggleModa={toggleModal}
              setToggleModal={setToggleModal}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default GridPosts
