import React from "react"

import { NextPage } from "next"
import GridPosts from "../../components/GridPosts/GridPosts"

const DiscoverPage: NextPage = ({ posts }: any) => {
  return (
    <main className="h-full flex flex-col w-full min-h-[calc(100vh-4rem)] bg-gray-100 px-2 text-slate-800">
      {posts.length > 0 ? (
        <GridPosts posts={posts} />
      ) : (
        <span className="w-full h-screen text-center font-bold">
          No post yet!
        </span>
      )}
    </main>
  )
}

export default DiscoverPage
