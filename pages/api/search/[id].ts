// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { searchTag, searchUser } from "../../../utils/sanity_queries"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    switch (req.query.type) {
      case "user":
        try {
          const { id } = req.query
          const query = searchUser(id!)
          const data = await client.fetch(query)
          res.status(200).json(data)
        } catch (error) {
          console.log(error)
        }

        break

      case "post":
        try {
          const { id } = req.query
          const query = searchTag(id!)
          const data = await client.fetch(query)

          res.status(200).json(data)
        } catch (error) {
          console.log(error)
        }

        break
    }
  }
}
