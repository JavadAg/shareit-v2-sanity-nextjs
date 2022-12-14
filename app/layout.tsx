import "../styles/globals.css"
import SessionProvider from "../context/SessionProvider"
import Header from "../components/Header/Header"
import { Manrope } from "@next/font/google"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import ThemeProviderProvider from "../context/ThemeProvider"

interface RootLayoutProps {
  children: React.ReactNode
  props?: any
}

const manrope = Manrope({ subsets: ["latin"] })

export default async function RootLayout({ children, props }: RootLayoutProps) {
  const session = await unstable_getServerSession(authOptions)

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProviderProvider>
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
  )
}
