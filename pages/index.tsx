import type { NextPage } from "next"
import Header from "../components/Header/Header"
import { client } from "../utils/client"
import { getAllPosts } from "../utils/sanity_queries"
import axios from "axios"
import Sidebar from "../components/Sidebar/Sidebar"
import Posts from "../components/Posts/Posts"

interface IProps {
  videos: any
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div className="h-screen flex flex-col w-full">
      <Header />
      <main className="h-full flex justify-between items-center">
        <Sidebar />
        <Posts videos={videos} />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
  const data = res.data

  return { props: { videos: data } }
}
