// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "../../../types/posts.types"
import { client } from "../../../utils/client"
import {
  getAllPosts,
  getFollowingUserPosts,
  userQuery
} from "../../../utils/sanity_queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    switch (req.query.type) {
      case "followingPosts":
        try {
          const { id } = req.query

          const userQ = userQuery(id!)

          const user = await client.fetch(userQ)

          const userData: User = user[0]
          var ids: string[] = userData.following.map((item) => {
            return item._id
          })
          const query = getFollowingUserPosts(ids)
          const data = await client.fetch(query)
          console.log(query)
          res.status(200).json(data)
        } catch (error) {
          console.log("error", error)
        }
        break

      case "allPosts":
        try {
          const query = getAllPosts()
          const data = await client.fetch(query)
          res.status(200).json(data)
        } catch (error) {
          console.log("error", error)
        }
        break
    }
  } else if (req.method === "POST") {
    try {
      const doc = req.body
      client.create(doc)
      res.status(201).json("Upload Successful")
    } catch (error) {
      console.log("error", error)
    }
  }
}
