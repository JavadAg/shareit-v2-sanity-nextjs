import { Tab } from "@headlessui/react"
import React from "react"
import { categories } from "../../../utils/constants"

const Category = () => {
  return (
    <Tab.List className="flex items-center justify-start w-full gap-1 p-2 mt-2 space-x-1 overflow-x-scroll bg-white border dark:border-neutral-900 md:overflow-hidden rounded-xl dark:bg-black md:justify-center border-gray-300/50">
      <Tab
        className={`rounded-lg py-2 px-2 text-sm font-bold leading-5 text-indigo-700 outline-none ui-selected:bg-gradient-to-br from-indigo-400 to-violet-400 ui-selected:text-white border border-gray-200 dark:border-neutral-800 ui-not-selected:text-indigo-400/60 ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-indigo-500/60 transition-all duration-300`}
      >
        All
      </Tab>
      {categories.map((category) => (
        <Tab
          key={category}
          className={`rounded-lg py-2 px-2 text-sm font-bold leading-5 text-indigo-700 outline-none ui-selected:bg-gradient-to-br from-indigo-400 to-violet-400 ui-selected:text-white border border-gray-200 dark:border-neutral-800 ui-not-selected:text-indigo-400/60 ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-indigo-500/80 transition-all duration-300`}
        >
          {category}
        </Tab>
      ))}
    </Tab.List>
  )
}

export default Category
