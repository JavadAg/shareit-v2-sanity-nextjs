"use client"

import React from "react"
import Image from "next/image"
import { imageTypes, videoTypes } from "../../utils/constants"
import { NextPage } from "next"
import GridPosts from "../../components/GridPosts/GridPosts"

const DiscoverPage: NextPage = ({ posts }: any) => {
  return (
    <main>
      <GridPosts posts={posts} />
    </main>
  )
}

export default DiscoverPage
