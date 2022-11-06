import Link from "next/link"
import React from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import UploadModal from "./UploadModal/UploadModal"
import { useTheme } from "next-themes"

const Header = () => {
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-between px-4 py-4 items-center bg-white">
      <Link href="/">Shareit</Link>
      <div>Search</div>
      <div className="space-x-2 flex justify-center items-center">
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
          <input
            type="checkbox"
            onChange={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
