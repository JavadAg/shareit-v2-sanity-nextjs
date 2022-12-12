"use client"

import { ThemeProvider } from "@wits/next-themes"
import { ThemeProviderProps } from "@wits/next-themes/dist/types"

export default function ThemeProviderProvider(props: ThemeProviderProps) {
  return <ThemeProvider {...props} />
}
