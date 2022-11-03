import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ThemeProvider } from "next-themes"

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="system">
        <Component data-theme="cupcake" {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
