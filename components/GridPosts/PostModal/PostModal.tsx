import React, { useState } from "react"
import { PostsType } from "../../../types/posts.types"
import Post from "../../Posts/Post/Post"

interface IProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
  post: PostsType | undefined
}

const PostModal: React.FC<IProps> = ({ setToggleModal, post }) => {
  return (
    <>
      <div
        onClick={() => setToggleModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-7 backdrop-blur-md 00/70 overscroll-contain"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="block w-5/6 max-w-xl max-h-full ml-auto mr-auto overflow-y-auto bg-white dark:bg-black rounded-2xl overscroll-contain"
        >
          <Post post={post!} />
        </div>
      </div>
    </>
  )
}

export default PostModal
