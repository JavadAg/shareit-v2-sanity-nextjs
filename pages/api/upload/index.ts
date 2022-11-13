// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { v2 as cloudinary } from "cloudinary"
import { FilePreview } from "../../../components/Header/UploadModal/UploadModal"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "26mb" // Set desired value here
    }
  }
}

const uploader = async (file: FilePreview) =>
  await cloudinary.uploader
    .upload(file.base64, {
      allowed_formats: ["jpg", "png", "webp", "jpeg", "webm", "mp4", "mkv"],
      secure: true,
      resource_type: "auto",
      transformation: {
        width: file.croppedAreaPixels?.width,
        height: file.croppedAreaPixels?.height,
        x: file.croppedAreaPixels?.x,
        y: file.croppedAreaPixels?.y,
        crop: "crop"
      }
    })
    .then((result) => console.log(result))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const doc: FilePreview[] = req.body
      for (const file of doc) {
        await uploader(file)
      }

      res.status(201).json("Upload Successful")
    } catch (error) {
      console.log("error", error)
    }
  }
}
