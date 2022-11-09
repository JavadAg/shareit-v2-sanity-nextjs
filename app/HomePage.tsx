"use client"

import type { NextPage } from "next"
import Posts from "../components/Posts/Posts"
import { Manrope } from "@next/font/google"

interface IProps {
  posts: any
}

const manrope = Manrope({ subsets: ["latin"] })

const HomePage: NextPage<IProps> = ({ posts }) => {
  return (
    <div
      className={`h-full flex flex-col w-full bg-gray-100 text-slate-800 ${manrope.className}`}
    >
      <main className="h-full flex justify-between items-start px-2">
        <Posts posts={posts} />
      </main>
    </div>
  )
}

export default HomePage
