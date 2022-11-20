import React, { useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "@wits/next-themes"

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
  console.log(theme)
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </ThemeProvider>
  )
}

export default ThemeSwitch
