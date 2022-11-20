import type { NextPage } from "next"
import Posts from "../components/Posts/Posts"
import { PostsType } from "../types/posts.types"

interface IProps {
  posts: PostsType[]
}

const HomePage: NextPage<IProps> = ({ posts }) => {
  return (
    <main
      className={`h-full flex justify-start items-center flex-col w-full px-2 text-slate-800 `}
    >
      <Posts posts={posts} />
    </main>
  )
}

export default HomePage
