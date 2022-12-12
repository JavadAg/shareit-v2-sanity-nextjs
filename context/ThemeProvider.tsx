"use client"
import { ThemeProvider } from "next-themes"

function ThemeProviderProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderProvider
