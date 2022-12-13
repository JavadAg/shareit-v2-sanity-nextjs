import React from "react"
import { PostsType } from "../../types/posts.types"
import Post from "./Post/Post"

interface IProps {
  posts: PostsType[]
}

const Posts: React.FC<IProps> = ({ posts }) => {
  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full max-w-lg mt-4 space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <span className="w-full h-screen font-bold text-center">
          No post yet!
        </span>
      )}
    </div>
  )
}

export default Posts
