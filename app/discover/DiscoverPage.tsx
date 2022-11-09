import React from "react"
import Image from "next/image"
import { imageTypes, videoTypes } from "../../utils/constants"

const DiscoverPage = ({ posts }: any) => {
  return (
    <div className="grid grid-cols-2 w-full p-2 gap-2">
      {posts.map((post: any) => (
        <div className="flex justify-center w-full h-48 items-center ">
          {post.assets[0].filetype?.match(imageTypes) ? (
            <div className="relative object-cover min-w-full h-full flex justify-center overflow-hidden">
              <Image
                alt="post_image"
                width="0"
                height="0"
                loading="lazy"
                sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                src={post.assets[0].asset.url}
                className="rounded-2xl w-full h-full max-w-full max-h-full object-cover block"
              />
            </div>
          ) : post.assets[0].filetype?.match(videoTypes) ? (
            <div>
              <video src={post.assets[0].asset.url} />
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  )
}

export default DiscoverPage
