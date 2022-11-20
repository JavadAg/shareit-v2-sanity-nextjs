"use client"

import React, { useState } from "react"
import Image from "next/image"
import PostModal from "./PostModal/PostModal"
import { Tab } from "@headlessui/react"
import { categories } from "../../utils/constants"
import Category from "./Category/Category"
import { usePathname } from "next/navigation"
import { RiChat1Fill, RiHeartFill } from "react-icons/ri"
import { PostsType } from "../../types/posts.types"

interface IProps {
  posts: PostsType[]
}

const GridPosts: React.FC<IProps> = ({ posts }) => {
  const [toggleModal, setToggleModal] = useState(false)
  const [modalPost, setModalPost] = useState<PostsType>()
  const pathname = usePathname()

  return (
    <Tab.Group>
      {pathname === "/discover" && <Category />}
      <Tab.Panels className="mt-2 w-full max-w-6xl ">
        <Tab.Panel className="rounded-2xl bg-white focus:outline-none border border-gray-300/50">
          {posts.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(45%,_1fr))] auto-rows-[50px] gap-2 p-2 lg:grid-cols-[repeat(auto-fill,_minmax(32%,_1fr))]">
              {posts.map((post) => (
                <React.Fragment key={post._id}>
                  <div
                    className={`flex relative justify-center items-center group ${
                      post.assets[0].width === post.assets[0].height
                        ? "row-span-3 sm:row-span-4 md:row-span-5"
                        : post.assets[0].width > post.assets[0].height
                        ? "row-span-2 sm:row-span-3 md:row-span-4"
                        : "row-span-5 sm:row-span-6 md:row-span-6"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setModalPost(post),
                          setToggleModal((current) => !current)
                      }}
                      className="opacity-0 flex gap-4 justify-center items-center z-[1] absolute w-full h-full inset-0 group-hover:opacity-70 bg-indigo-300 duration-300 rounded-2xl overflow-hidden cursor-pointer"
                    >
                      <span className="flex justify-center items-center">
                        <RiHeartFill />: {post.likes.length}
                      </span>
                      <span className="flex justify-center items-center">
                        <RiChat1Fill />: {post.comments.length}
                      </span>
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
                      <div className="relative object-cover min-w-full h-full flex justify-center overflow-hidden">
                        <video
                          className="rounded-2xl w-full h-full max-w-full max-h-full object-cover block"
                          src={post.assets[0].url}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </React.Fragment>
              ))}
              {toggleModal && (
                <PostModal post={modalPost} setToggleModal={setToggleModal} />
              )}
            </div>
          ) : (
            <span className="w-full mt-4 text-center font-bold self-center flex justify-center items-center">
              No post yet!
            </span>
          )}
        </Tab.Panel>
        {categories.map((category: string) => (
          <Tab.Panel
            key={category}
            className="rounded-2xl bg-white focus:outline-none"
          >
            {posts.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(45%,_1fr))] auto-rows-[50px] gap-2 p-2 lg:grid-cols-[repeat(auto-fill,_minmax(32%,_1fr))]">
                {posts
                  .filter((post) => post.category === category)
                  .map((post) => (
                    <React.Fragment key={post._id}>
                      <div
                        className={`flex relative justify-center items-center group ${
                          post.assets[0].width === post.assets[0].height
                            ? "row-span-3 sm:row-span-4 md:row-span-5"
                            : post.assets[0].width > post.assets[0].height
                            ? "row-span-2 sm:row-span-3 md:row-span-4"
                            : "row-span-5 sm:row-span-6 md:row-span-6"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setModalPost(post),
                              setToggleModal((current) => !current)
                          }}
                          className="opacity-0 z-[1] absolute w-full h-full inset-0 block group-hover:opacity-70 bg-indigo-300 duration-300 rounded-2xl overflow-hidden cursor-pointer"
                        >
                          Likes:{post.likes.length}
                          <br />
                          Comments:{post.comments.length}
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
                          <div className="relative object-cover min-w-full h-full flex justify-center overflow-hidden">
                            <video
                              className="rounded-2xl w-full h-full max-w-full max-h-full object-cover block"
                              src={post.assets[0].url}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                {toggleModal && (
                  <PostModal post={modalPost} setToggleModal={setToggleModal} />
                )}
              </div>
            ) : (
              <span className="w-full mt-4 text-center font-bold self-center flex justify-center items-center">
                No post yet!
              </span>
            )}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default GridPosts
