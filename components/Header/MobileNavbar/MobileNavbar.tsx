import Link from "next/link"
import React from "react"
import UploadModal from "../UploadModal/UploadModal"

const MobileNavbar = () => {
  return (
    <div className="fixed left-0 right-0 bottom-2 bg-white border border-gray-100 shadow-sm flex justify-center items-center h-12 z-40 w-full rounded-full">
      <ul className="flex justify-evenly items-center space-x-2 text-sm font-bold text-gray-700 w-full">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <UploadModal />
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileNavbar
