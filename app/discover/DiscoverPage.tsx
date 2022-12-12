import React from "react"
import { NextPage } from "next"
import GridPosts from "../../components/GridPosts/GridPosts"
import { PostsType } from "../../types/posts.types"

interface IProps {
  posts: PostsType[]
}

const DiscoverPage: NextPage<IProps> = ({ posts }) => {
  return (
    <main className="h-full flex justify-start items-center flex-col w-full min-h-[calc(100vh-4rem)] px-2 text-slate-800 dark:text-gray-200">
      <GridPosts posts={posts} />
    </main>
  )
}

export default DiscoverPage
