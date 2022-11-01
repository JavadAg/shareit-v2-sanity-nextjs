import React from "react"

const Sidebar = () => {
  return (
    <div className="flex justify-between py-2 items-center flex-col bg-gray-100 w-2/12 h-full">
      <button>Home</button>
      <div className="flex justify-center items-center flex-col space-y-2 ">
        <span>Categories</span>
        <div className="flex justify-center items-center flex-col space-y-2 ">
          <span>Car</span>
          <span>People</span>
          <span>Nature</span>
          <span>A</span>
        </div>
      </div>
      <div>Popular tags</div>
    </div>
  )
}

export default Sidebar
