import React from "react"
import Post from "./Post/Post"

interface IProps {
  posts: any
}

const Posts: React.FC<IProps> = ({ posts }) => {
  return (
    <div className="flex justify-center items-center flex-col flex-1 space-y-6 w-full mt-4">
      {posts.length > 0 ? (
        posts.map((post: any) => <Post key={post._id} post={post} />)
      ) : (
        <span className="w-full text-center h-screen font-bold">
          No post yet!
        </span>
      )}
    </div>
  )
}

export default Posts
