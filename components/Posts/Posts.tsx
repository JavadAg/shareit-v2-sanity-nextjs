import React from "react"
import Post from "./Post/Post"

interface IProps {
  posts: any
}

const Posts: React.FC<IProps> = ({ posts }) => {
  return (
    <div className="flex justify-center items-center flex-col flex-1 space-y-6 w-full mt-4">
      {posts.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Posts
