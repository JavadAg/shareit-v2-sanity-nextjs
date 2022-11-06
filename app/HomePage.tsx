"use client"

import type { NextPage } from "next"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import Posts from "../components/Posts/Posts"
import { Nunito } from "@next/font/google"

interface IProps {
  posts: any
}

const nunito = Nunito()

const HomePage: NextPage<IProps> = ({ posts }) => {
  return (
    <div
      className={`h-full flex flex-col w-full bg-gray-100 text-slate-800 ${nunito.className}`}
    >
      <Header />
      <main className="h-full flex justify-between items-start px-2">
        <Sidebar />
        <Posts posts={posts} />
      </main>
    </div>
  )
}

export default HomePage
