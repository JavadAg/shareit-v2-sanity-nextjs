import React, { useState } from "react"
import Post from "../Posts/Post/Post"

const PostDetails = ({ toggleModal, setToggleModal, post }: any) => {
  return (
    <>
      <div
        onClick={() => setToggleModal(false)}
        className="fixed z-50 inset-0 bg-red-400/70 flex justify-center items-center w-full h-full"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-5/6 h-auto  rounded-2xl "
        >
          <Post post={post} />
        </div>
      </div>
    </>
  )
}

export default PostDetails
