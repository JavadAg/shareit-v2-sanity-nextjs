import axios from "axios"
import HomePage from "./HomePage"

async function getPosts() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
  const data = res.data

  return data
}

export default async function Page() {
  const posts = await getPosts()
  return <HomePage posts={posts} />
}
