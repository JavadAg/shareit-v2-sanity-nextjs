"use client"

import Link from "next/link"
import React from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import SearchModal from "./SearchModal/SearchModal"
import MobileNavbar from "./Navbar/Navbar"
import { Menu } from "@headlessui/react"
import { RiLoginCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import Image from "next/image"
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch"

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <div className="flex relative justify-between px-4 h-16 items-center bg-white rounded-b-3xl">
      <div className="flex justify-start items-center gap-2 lg:flex-1 lg:mr-auto lg:flex">
        <Link href="/">
          <span className="font-black text-base italic md:text-lg">Share</span>
          <span className="font-black text-base italic text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600 pr-1 md:text-lg">
            It
          </span>
        </Link>
        {/* <ThemeSwitch /> */}
      </div>
      <MobileNavbar />
      <div className="flex justify-end items-center gap-2 lg:flex-1 lg:ml-auto">
        {status === "authenticated" ? (
          <Menu as="div" className="relative inline-block text-left z-30">
            <Menu.Button className="flex w-full h-8 px-2 justify-center items-center rounded-2xl bg-gray-100 text-sm font-medium text-gray-800 hover:bg-gray-200 duration-300 outline-none md:text-base md:h-9">
              <div className="relative block w-6 h-6 md:w-7 md:h-7">
                <Image
                  fill
                  src={session.user.image as string}
                  alt="avatar"
                  className="rounded-full w-auto h-auto max-h-full max-w-full block"
                />
              </div>
              <span className="pl-1 capitalize">{session.user.name}</span>
              <i className="text-xl md:text-2xl">
                <RiArrowDropDownFill />
              </i>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <button
                  onClick={() => signOut()}
                  className={`hover:bg-red-400 duration-200 hover:text-white text-gray-900 flex w-full items-center rounded-md px-2 py-1.5 text-sm md:text-base`}
                >
                  Logout
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <div
            onClick={() => signIn()}
            className="flex w-8 h-8 bg-gray-100 relative justify-center items-center rounded-full z-40 cursor-pointer hover:bg-gray-200 duration-200"
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
