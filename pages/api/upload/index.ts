// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { FilePreview } from "../../../components/Header/UploadModal/UploadModal"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "26mb" // Set desired value here
    }
  }
}
const uploaded_files: UploadApiResponse[] = []
const uploader = async (file: FilePreview) =>
  await cloudinary.uploader
    .upload(file.base64, {
      allowed_formats: ["jpg", "png", "webp", "jpeg", "webm", "mp4", "mkv"],
      secure: true,
      resource_type: "auto",
      transformation: [
        {
          width: file.croppedAreaPixels?.width,
          height: file.croppedAreaPixels?.height,
          x: file.croppedAreaPixels?.x,
          y: file.croppedAreaPixels?.y,
          crop: "crop"
        },
        { height: 1080, width: 1080, crop: "limit" }
      ]
    })
    .then((result) => uploaded_files.push(result))
    .catch((error) => console.log(error))

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

      res.status(201).json(uploaded_files)
    } catch (error) {
      console.log("error", error)
    }
  }
}
