import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { client } from "../../../utils/client"



export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60
  },

  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === "google" && profile) {
        const user = {
          _id: profile.sub,
          _type: "user",
          name: profile.name,
          email: profile.email,
          avatar: profile.picture
        }
        client
          .createIfNotExists(user)
          .then(() => console.log("Successfully created"))

        return true
      }
      return true
    },

    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          user: user
        }
      }

      return token
    },

    async session({ session, token }: any) {
      if (token) {
        session.user = token.user
      }
      return session
    }
  }
})
