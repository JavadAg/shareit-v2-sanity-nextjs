"use client"

import { ThemeProvider } from "next-themes"

interface DefaultTheme {
  children: React.ReactNode
  defaultTheme: string
}

export default function ClientThemeProvider(props: DefaultTheme) {
  return <ThemeProvider {...props} />
}
