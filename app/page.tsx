import axios from "axios"
import { PostsType } from "../types/posts.types"
import HomePage from "./HomePage"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"

async function getPosts(/* id: number */) {
  /* fetch posts from people who we follow (uncomment all codes in file) . for previewing this project we fetch all posts  */

  /* const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    params: { type: "followingPosts", id }
  })
 */

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    params: { type: "allPosts" }
  })

  const data = res.data

  return data
}

export default async function Page() {
  /* const session = await unstable_getServerSession(authOptions)

  if (session) { */
  const posts: PostsType[] = await getPosts(/* session?.user.id */)
  return <HomePage posts={posts} />
  /* } else {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="font-bold md:text-2xl text-red-400">
          Please Login to display following posts
        </span>
      </div>
    )
  } */
}
