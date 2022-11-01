import Link from "next/link"
import React, { useEffect } from "react"
import { signIn, useSession, signOut } from "next-auth/react"
import { themeChange } from "theme-change"
import UploadModal from "./UploadModal/UploadModal"

const Header = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    themeChange(false)
  }, [])

  const themeNames = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "halloween",
    "garden",
    "forest",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night"
  ]

  return (
    <div className="flex justify-between px-4 py-4 items-center ">
      <Link href="/">Shareit</Link>
      <div>Search</div>
      <div className="space-x-2 flex justify-center items-center">
        <UploadModal />
        <span>{session?.user?.name}</span>
        {status === "authenticated" ? (
          <button className="btn btn-primary" onClick={() => signOut()}>
            Sign out
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => signIn()}>
            Sign in
          </button>
        )}
        <select
          className="gradientselect select select-primary"
          data-choose-theme
        >
          <option disabled value="">
            Pick a theme
          </option>
          {themeNames.map((theme) => (
            <option value={theme}>{theme}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Header
