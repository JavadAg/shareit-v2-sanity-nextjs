"use client"

import React, { useState } from "react"
import Image from "next/image"
import PostModal from "./PostModal/PostModal"
import { Tab } from "@headlessui/react"
import { categories } from "../../utils/constants"

const GridPosts = ({ posts }: any) => {
  const [toggleModal, setToggleModal] = useState(false)
  const [modalPost, setModalPost] = useState()

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex justify-start items-center space-x-1 mt-2 overflow-x-scroll rounded-xl bg-white p-2 w-full gap-1">
          <Tab
            className={`rounded-lg py-2 px-2 text-sm font-medium leading-5 text-indigo-700 outline-none ui-selected:bg-gradient-to-br from-indigo-300 to-violet-300 ui-selected:text-white border border-gray-200 ui-not-selected:text-gray-400 ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-white transition-all duration-300`}
          >
            All
          </Tab>
          {categories.map((category) => (
            <Tab
              key={category}
              className={`rounded-lg py-2 px-2 text-sm font-medium leading-5 text-indigo-700 outline-none ui-selected:bg-gradient-to-br from-indigo-300 to-violet-300 ui-selected:text-white border border-gray-200 ui-not-selected:text-gray-400 ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-white transition-all duration-300`}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            {posts.length > 0 ? (
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
                        onClick={() => {
                          setModalPost(post),
                            setToggleModal((current) => !current)
                        }}
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
            <Tab.Panel className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
              {posts.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(45%,_1fr))] auto-rows-[50px] gap-2 p-2">
                  {posts
                    .filter((post: any) => post.category === category)
                    .map((post: any) => (
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
                            onClick={() => {
                              setModalPost(post),
                                setToggleModal((current) => !current)
                            }}
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
                    <PostModal
                      post={modalPost}
                      setToggleModal={setToggleModal}
                    />
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
    </>
  )
}

export default GridPosts
