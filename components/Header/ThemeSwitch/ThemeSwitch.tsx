import React, { useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "@wits/next-themes"
import { RiSunLine, RiMoonLine } from "react-icons/ri"

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      className="relative z-40 flex items-center justify-center w-8 h-8 duration-200 bg-gray-100 rounded-full cursor-pointer dark:bg-neutral-800 dark:hover:bg-neutral-900 hover:bg-gray-200 md:w-9 md:h-9 md:text-xl"
      onClick={() => setTheme(`${theme === "light" ? "dark" : "light"}`)}
    >
      {theme === "light" ? <RiSunLine /> : <RiMoonLine />}
    </button>
  )
}

export default ThemeSwitch
