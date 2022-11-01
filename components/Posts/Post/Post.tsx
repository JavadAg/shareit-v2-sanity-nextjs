import React from "react"

const Post = ({ video }: any) => {
  return (
    <div className="flex justify-center items-center flex-col space-y-2 bg-red-100  w-44">
      <span>{video.caption}</span>
      <span>{video.postedBy.userName}</span>
      <div className="flex justify-center items-center overflow-scroll">
        {video?.video?.map((file: any) => (
          <img src={file.asset.url} />
        ))}
      </div>
    </div>
  )
}

export default Post
