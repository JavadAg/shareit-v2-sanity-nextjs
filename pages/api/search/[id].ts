// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { searchPostsQuery } from "../../../utils/sanity_queries"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { id } = req.query
    const query = searchPostsQuery(id!)
    const data = await client.fetch(query)

    res.status(200).json(data)
  }
}
