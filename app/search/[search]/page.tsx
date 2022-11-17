import axios from "axios"
import React from "react"
import SearchPage from "./SearchPage"

interface Params {
  params: { search: string }
}

async function getPosts(search: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${search}`,
    { params: { type: "post" } }
  )
  const data = res.data

  return data
}

export default async function Search({ params: { search } }: Params) {
  const posts = await getPosts(search)
  return <SearchPage posts={posts} />
}
