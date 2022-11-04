// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { getAllPosts } from "../../../utils/sanity_queries"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const query = getAllPosts()
      const data = await client.fetch(query)

      res.status(200).json(data)
    } catch (error) {
      console.log("error", error)
    }
  } else if (req.method === "POST") {
    try {
      const doc = req.body
      console.log("doc", doc)
      client.create(doc)
      res.status(201).json("Upload Successful")
    } catch (error) {
      console.log("error", error)
    }
  }
}
