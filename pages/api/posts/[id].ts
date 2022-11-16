// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import { getAllPosts } from "../../../utils/sanity_queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { comment, userid } = req.body

      const { id }: any = req.query
      console.log(req.body, req.query)
      const data = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: randomUUID(),
            postedBy: { _type: "postedBy", _ref: userid }
          }
        ])
        .commit()

      res.status(200).json(data)
    } catch (error) {
      console.log("error", error)
    }
  }
}
