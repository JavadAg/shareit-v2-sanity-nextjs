"use client"

import Link from "next/link"
import React, { useState, useCallback } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import UploadModal from "./UploadModal/UploadModal"
import { useTheme } from "next-themes"
import axios from "axios"
import SearchModal from "./SearchModal/SearchModal"
import MobileNavbar from "./MobileNavbar/MobileNavbar"

const Header = () => {
  const { data: session, status } = useSession()
  /* const { theme, setTheme } = useTheme() */

  return (
    <div className="flex relative justify-between px-4 py-4 items-center bg-white rounded-b-2xl">
      <Link href="/">
        <span className="font-black text-base italic pl-1">Share</span>
        <span className="font-black text-base italic text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600 pr-1">
          It
        </span>
      </Link>
      <SearchModal />
      <div className="hidden space-x-2 md:flex justify-center items-center">
        <UploadModal />
        <span>{session?.user?.name}</span>
        {status === "authenticated" ? (
          <button className="" onClick={() => signOut()}>
            Sign out
          </button>
        ) : (
          <button className="" onClick={() => signIn()}>
            Sign in
          </button>
        )}

        <div className="inline-block w-10">
          {/*  <input
            type="checkbox"
            onChange={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }}
          /> */}
        </div>
      </div>
      <MobileNavbar />
    </div>
  )
}

export default Header
