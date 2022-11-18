// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomUUID } from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../utils/client"
import {
  userCreatedPostsQuery,
  userQuery,
  userSavedPostsQuery
} from "../../../utils/sanity_queries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { userid } = req.query
      const userQ = userQuery(userid!)
      const userPostsQuery = userCreatedPostsQuery(userid!)
      const userSavedQuery = userSavedPostsQuery(userid!)

      const user = await client.fetch(userQ)
      const userPosts = await client.fetch(userPostsQuery)
      const userSavedPosts = await client.fetch(userSavedQuery)

      const data = { user: user[0], userPosts, userSavedPosts }

      res.status(200).json(data)
    } catch (error) {
      console.log("error", error)
    }
  } else if (req.method === "PUT") {
    switch (req.body.type) {
      case "edit":
        try {
          const { userid } = req.query
          const { description } = req.body.description

          const data = await client
            .patch(userid as string)
            .set({ description: description })
            .commit()

          res.status(200).json(data)
        } catch (error) {
          console.log(error)
        }
        break

      case "follow":
        try {
          const { myId } = req.body
          const { userid } = req.query

          const targetPatch = client
            .patch(userid as string)
            .insert("after", "followers[-1]", [
              {
                _key: randomUUID(),
                _ref: myId
              }
            ])

          const myPatch = client
            .patch(myId as string)
            .insert("after", "following[-1]", [
              {
                _key: randomUUID(),
                _ref: userid
              }
            ])

          const data = await client
            .transaction()
            .patch(targetPatch)
            .patch(myPatch)
            .commit()

          res.status(200).json(data)
        } catch (error) {
          console.log("error", error)
        }
        break

      case "unfollow":
        try {
          const { myId } = req.body
          const { userid } = req.query

          const targetPatch = client
            .patch(userid as string)
            .unset([`followers[_ref=="${myId}"]`])

          const myPatch = client
            .patch(myId as string)
            .unset([`following[_ref=="${userid}"]`])

          const data = await client
            .transaction()
            .patch(targetPatch)
            .patch(myPatch)
            .commit()

          res.status(200).json(data)
        } catch (error) {
          console.log("error", error)
        }
        break
    }
  }
}
