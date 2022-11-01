import React from "react"
import Post from "./Post/Post"

interface IProps {
  videos: any
}

const Posts: React.FC<IProps> = ({ videos }) => {
  return (
    <div className="flex justify-center items-center flex-col flex-1 space-y-4 w-full">
      {/* {videos.map((video: any) => (
        <Post video={video} />
      ))} */}
    </div>
  )
}

export default Posts
