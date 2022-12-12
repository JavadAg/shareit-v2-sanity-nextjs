import "../styles/globals.css"
import SessionProvider from "../context/SessionProvider"
import Header from "../components/Header/Header"
import { Manrope } from "@next/font/google"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { Suspense } from "react"
import ThemeProviderProvider from "../context/ThemeProvider"
import { ServerThemeProvider } from "@wits/next-themes"
import Loading from "./loading"

interface RootLayoutProps {
  children: React.ReactNode
  props?: any
}

const manrope = Manrope({ subsets: ["latin"] })

export default async function RootLayout({ children, props }: RootLayoutProps) {
  const session = await unstable_getServerSession(authOptions)

  return (
    <ServerThemeProvider>
      <html>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body>
          <ThemeProviderProvider attribute="class" defaultTheme="dark">
            <SessionProvider session={session}>
              <div
                className={`bg-neutral-50 dark:bg-neutral-900 dark:text-white ${manrope.className} pb-16`}
              >
                <Header />
                {children}
              </div>
            </SessionProvider>
          </ThemeProviderProvider>
        </body>
      </html>
    </ServerThemeProvider>
  )
}
