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
    <main
      className={`h-full flex flex-col w-full bg-gray-100 px-2 text-slate-800 ${manrope.className}`}
    >
      <Posts posts={posts} />
    </main>
  )
}

export default HomePage
