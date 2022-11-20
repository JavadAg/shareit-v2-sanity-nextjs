import React, { useState } from "react"
import Post from "../../Posts/Post/Post"

const PostModal = ({ setToggleModal, post }: any) => {
  return (
    <>
      <div
        onClick={() => setToggleModal(false)}
        className="fixed z-50 inset-0 bg-gray-7 backdrop-blur-md 00/70 flex justify-center items-center w-full h-full overscroll-contain"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-5/6 max-h-full rounded-2xl block overscroll-contain overflow-y-auto max-w-xl mr-auto ml-auto"
        >
          <Post post={post} />
        </div>
      </div>
    </>
  )
}

export default PostModal
