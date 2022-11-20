import { Tab } from "@headlessui/react"
import React from "react"
import { categories } from "../../../utils/constants"

const Category = () => {
  return (
    <Tab.List className="flex justify-start items-center space-x-1 mt-2 overflow-x-scroll md:overflow-hidden rounded-xl bg-white p-2 w-full gap-1 md:justify-center border border-gray-300/50">
      <Tab
        className={`rounded-lg py-2 px-2 text-sm font-bold leading-5 text-indigo-700 outline-none ui-selected:bg-gradient-to-br from-indigo-400 to-violet-400 ui-selected:text-white border border-gray-200 ui-not-selected:text-indigo-400/60 ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-indigo-500/60 transition-all duration-300`}
      >
        All
      </Tab>
      {categories.map((category) => (
        <Tab
          key={category}
          className={`rounded-lg py-2 px-2 text-sm font-bold leading-5 text-indigo-700 outline-none ui-selected:bg-gradient-to-br from-indigo-400 to-violet-400 ui-selected:text-white border border-gray-200 ui-not-selected:text-indigo-400/60 ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-indigo-500/80 transition-all duration-300`}
        >
          {category}
        </Tab>
      ))}
    </Tab.List>
  )
}

export default Category
