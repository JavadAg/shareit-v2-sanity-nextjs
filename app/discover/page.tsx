import axios from "axios"
import React from "react"
import DiscoverPage from "./DiscoverPage"

async function getPosts() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
  const data = res.data

  return data
}

export default async function Discover() {
  const posts = await getPosts()
  return <DiscoverPage posts={posts} />
}
