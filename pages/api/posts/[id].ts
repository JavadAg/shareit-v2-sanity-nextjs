// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.body.type) {
    case "comment":
      try {
        const { comment, userid } = req.body

        const { id } = req.query

        const data = await client
          .patch(id as string)
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
      break

    case "like":
      try {
        const { userid, liked } = req.body
        const { id } = req.query

        const data = liked
          ? await client
              .patch(id as string)
              .unset([`likes[_ref=="${userid}"]`])
              .commit()
          : await client
              .patch(id as string)
              .setIfMissing({ likes: [] })
              .insert("after", "likes[-1]", [
                {
                  _key: randomUUID(),
                  _ref: userid
                }
              ])
              .commit()

        res.status(200).json(data)
      } catch (error) {
        console.log("error", error)
      }
      break

    case "save":
      try {
        const { userid, saved } = req.body
        const { id } = req.query

        const data = saved
          ? await client
              .patch(id as string)
              .unset([`savedBy[_ref=="${userid}"]`])
              .commit()
          : await client
              .patch(id as string)
              .setIfMissing({ savedBy: [] })
              .insert("after", "savedBy[-1]", [
                {
                  _key: randomUUID(),
                  _ref: userid
                }
              ])
              .commit()

        res.status(200).json(data)
      } catch (error) {
        console.log("error", error)
      }
      break
  }
}
