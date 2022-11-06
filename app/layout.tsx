import "../styles/globals.css"
import { getSession } from "../lib/session"
import { headers } from "next/headers"
import SessionProvider from "../context/SessionProvider"
import ThemeProvider from "../context/ThemeProvider"

interface RootLayoutProps {
  children: React.ReactNode
  props?: any
}

export default async function RootLayout({ children, props }: RootLayoutProps) {
  const session = await getSession(headers().get("cookie") ?? "")

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SessionProvider session={session}>
          <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
