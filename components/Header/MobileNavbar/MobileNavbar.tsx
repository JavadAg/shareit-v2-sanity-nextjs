import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import UploadModal from "../UploadModal/UploadModal"
import {
  RiUserSmileLine,
  RiUserSmileFill,
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiCompassDiscoverLine,
  RiCompassDiscoverFill
} from "react-icons/ri"
import { useSession, signIn } from "next-auth/react"

const MobileNavbar = () => {
  const { data: session, status } = useSession()
  const currentPath = usePathname()

  const links = [
    {
      path: "/",
      isActive: <RiHomeSmile2Fill />,
      notActive: <RiHomeSmile2Line />
    },
    {
      path: "/discover",
      isActive: <RiCompassDiscoverFill />,
      notActive: <RiCompassDiscoverLine />
    },
    {
      path: `/profile/${session?.user.id}`,
      isActive: <RiUserSmileFill />,
      notActive: <RiUserSmileLine />
    }
  ]
  return (
    <>
      <div className="fixed left-0 right-0 bottom-2 bg-white border border-gray-100 shadow-sm flex justify-center items-center h-12 z-40 w-full rounded-full">
        <>
          <ul className="relative flex justify-evenly items-center gap-2 text-sm font-bold text-gray-700 w-full">
            {links.map((link, index) => (
              <li
                key={index}
                className={`relative w-12 h-12 flex justify-center items-center ${
                  currentPath === link.path
                    ? "bg-indigo-400 text-white rounded-full -translate-y-2"
                    : ""
                }`}
              >
                {status === "unauthenticated" &&
                link.path.includes("/profile") ? (
                  <button
                    onClick={() => signIn()}
                    className={`relative z-50 text-2xl w-full h-full flex justify-center items-center before:content-[''] before:absolute before:top-2 before:left-0 before:w-full before:h-full before:bg-indigo-600 before:rounded-full before:-z-[1] before:blur-sm ${
                      currentPath === link.path
                        ? "before:opacity-50 text-indigo-50"
                        : "before:opacity-0 text-gray-700"
                    }`}
                  >
                    {currentPath === link.path ? link.isActive : link.notActive}
                  </button>
                ) : (
                  <Link className="w-full h-full" href={link.path}>
                    <span
                      className={`relative z-50 text-2xl w-full h-full flex justify-center items-center before:content-[''] before:absolute before:top-2 before:left-0 before:w-full before:h-full before:bg-indigo-600 before:rounded-full before:-z-[1] before:blur-sm ${
                        currentPath === link.path
                          ? "before:opacity-50 text-indigo-50"
                          : "before:opacity-0 text-gray-700"
                      }`}
                    >
                      {currentPath === link.path
                        ? link.isActive
                        : link.notActive}
                    </span>
                  </Link>
                )}
              </li>
            ))}
            <li>
              <UploadModal />
            </li>
          </ul>
        </>
      </div>
    </>
  )
}

export default MobileNavbar
