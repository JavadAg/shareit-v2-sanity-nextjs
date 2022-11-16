import "../styles/globals.css"
import { getSession } from "../lib/session"
import { headers } from "next/headers"
import SessionProvider from "../context/SessionProvider"
import ThemeProvider from "../context/ThemeProvider"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import { Manrope } from "@next/font/google"

interface RootLayoutProps {
  children: React.ReactNode
  props?: any
}

const manrope = Manrope({ subsets: ["latin"] })

export default async function RootLayout({ children, props }: RootLayoutProps) {
  const session = await getSession(headers().get("cookie") ?? "")

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SessionProvider session={session}>
          <ThemeProvider defaultTheme="system">
            <div className={`bg-gray-100 ${manrope.className} pb-16`}>
              <Header />
              <Sidebar />
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
