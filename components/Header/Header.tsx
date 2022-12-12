"use client"

import Link from "next/link"
import React from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import SearchModal from "./SearchModal/SearchModal"
import Navbar from "./Navbar/Navbar"
import { Menu } from "@headlessui/react"
import { RiLoginCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import Image from "next/image"
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch"

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <div className="relative flex items-center justify-between h-16 px-4 bg-white rounded-b-3xl dark:bg-black">
      <div className="flex items-center justify-start gap-2 lg:flex-1 lg:mr-auto lg:flex">
        <Link href="/">
          <span className="text-base italic font-black md:text-lg">Share</span>
          <span className="pr-1 text-base italic font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600 md:text-lg">
            It
          </span>
        </Link>
        <ThemeSwitch />
      </div>
      <Navbar />
      <div className="flex items-center justify-end gap-2 lg:flex-1 lg:ml-auto">
        {status === "authenticated" ? (
          <Menu as="div" className="relative z-30 inline-block text-left">
            <Menu.Button className="flex items-center justify-center w-full h-8 px-2 text-sm font-medium text-gray-800 duration-300 bg-gray-100 outline-none dark:hover:text-gray-300 dark:text-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 rounded-2xl hover:bg-gray-200 md:text-base md:h-9">
              <div className="relative block w-6 h-6 md:w-7 md:h-7">
                <Image
                  fill
                  src={session.user.image as string}
                  alt="avatar"
                  className="block w-auto h-auto max-w-full max-h-full rounded-full"
                />
              </div>
              <span className="pl-1 capitalize">{session.user.name}</span>
              <i className="text-xl md:text-2xl">
                <RiArrowDropDownFill />
              </i>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <button
                  onClick={() => signOut()}
                  className={`hover:bg-red-500 bg-red-400 dark:text-neutral-900 dark:hover:text-black duration-200 hover:text-gray-200 text-gray-100 flex w-full items-center rounded-md px-2 py-1.5 text-sm md:text-base`}
                >
                  Logout
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <div
            onClick={() => signIn()}
            className="relative z-40 flex items-center justify-center w-8 h-8 duration-200 bg-gray-100 rounded-full cursor-pointer dark:bg-neutral-800 hover:bg-gray-200 hover:dark:bg-neutral-900 md:w-9 md:h-9 md:text-xl"
          >
            <RiLoginCircleLine />
          </div>
        )}
        <SearchModal />
      </div>
    </div>
  )
}

export default Header
