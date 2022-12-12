"use client"

import React from "react"
import { NextPage } from "next"
import GridPosts from "../../../components/GridPosts/GridPosts"
import { PostsType } from "../../../types/posts.types"

interface IProps {
  posts: PostsType[]
}

const SearchPage: NextPage<IProps> = ({ posts }) => {
  return (
    <main className="h-full flex justify-start items-center flex-col w-full min-h-[calc(100vh-4rem)] px-2 text-slate-800 dark:text-gray-200">
      {posts.length > 0 ? (
        <GridPosts posts={posts} />
      ) : (
        <span className="w-full h-screen font-bold text-center">
          No post yet!
        </span>
      )}
    </main>
  )
}

export default SearchPage
