import React, { Dispatch, useCallback, useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import UploadSVG from "../../../../../assets/UploadSVG"
import { imageTypes, videoTypes } from "../../../../../utils/constants"
import PreviewCarousel from "./PreviewCarousel/PreviewCarousel"
import { Area, Point } from "react-easy-crop"
import { toBase64 } from "../../../../../utils/toBase64"
import { FilePreview, FormState } from "../../../../../types/upload.types"

interface IProps {
  formState: FormState
  setFormState: Dispatch<Partial<FormState>>
  filesPreview: FilePreview[]
  setFilesPreview: Dispatch<React.SetStateAction<FilePreview[]>>
}

const FormPreview: React.FC<IProps> = ({
  formState,
  setFormState,
  filesPreview,
  setFilesPreview
}) => {
  const deleteFiles = () => {
    setFilesPreview([])
  }

  const [aspect, setAspect] = useState<number | undefined>(1 / 1)
  const [zoom, setZoom] = useState(1)

  const CropComplete = (file: FilePreview) =>
    useCallback(async (croppedArea: Area, croppedAreaPixels: Area) => {
      setFilesPreview((current) =>
        current?.map((obj: FilePreview) => {
          if (obj.id === file.id) {
            return { ...obj, croppedAreaPixels: croppedAreaPixels }
          }
          return obj
        })
      )
    }, [])

  const CropChange = (file: FilePreview) =>
    useCallback(async (location: Point) => {
      setFilesPreview((current) =>
        current?.map((obj: FilePreview) => {
          if (obj.id === file.id) {
            return { ...obj, crop: location }
          }
          return obj
        })
      )
    }, [])

  function handleToggleAspectClick(aspectRatio: string) {
    const as = aspectRatio.split("/")

    if (filesPreview) {
      setAspect(Number(as[0]) / Number(as[1]))
    }
  }

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ error: "" })
    if (e.target.files!?.length > 5) {
      setFormState({ error: "More than 5 file selected" })
      return
    }

    let count = 0
    for (const iterator of e.target.files!) {
      if (iterator.type.match(videoTypes)) {
        count = count + 1
        if (iterator.size > 25000000 || count > 1) {
          setFormState({ error: "Select only 1 video up to 25MB" })
          return
        }
      }
    }

    //preview files for crop
    if (e.target.files) {
      const files: FilePreview[] = []
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].type.match(imageTypes)) {
          const url: string = URL.createObjectURL(e.target.files[i])
          const base64 = await toBase64(e.target.files[i])
          files.push({
            url: url,
            type: "image",
            id: i,
            crop: { x: 0, y: 0 },
            base64: base64 as string
          })
        } else if (e.target.files[i].type.match(videoTypes)) {
          const url: string = URL.createObjectURL(e.target.files[i])
          const base64 = await toBase64(e.target.files[i])
          files.push({
            url: url,
            type: "video",
            id: i,
            crop: { x: 0, y: 0 },
            base64: base64 as string
          })
        }
      }
      setFilesPreview(files)
    }
  }

  return (
    <>
      {filesPreview.length < 1 ? (
        <label className="flex flex-col items-center justify-center w-full py-2 space-y-4 duration-300 bg-gray-100 border-4 border-gray-400 border-dashed outline-none cursor-pointer dark:border-neutral-700 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-800/70 rounded-2xl md:py-6">
          <UploadSVG />
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-center text-gray-500 dark:text-gray-400 md:text-base md:gap-4">
            <span>Jpg, Png ,Webp, Mp4</span>
            <span>Max 5 file</span>
            <span>1 video per post</span>
            <span>Less than 25 MB</span>
          </div>
          <input
            type="file"
            multiple
            onChange={(e) => handleFiles(e)}
            className="hidden"
          />
          {formState.error.length > 0 ? (
            <span className="pt-1">{formState.error}</span>
          ) : (
            ""
          )}
        </label>
      ) : (
        <>
          <PreviewCarousel
            zoom={zoom}
            aspect={aspect}
            setZoom={setZoom}
            onCropComplete={CropComplete}
            onCropChange={CropChange}
            filesPreview={filesPreview}
          />

          <div className="flex flex-col items-center justify-center w-full m-2 mt-4 space-y-2">
            <select
              onChange={(e) => handleToggleAspectClick(e.target.value)}
              name=""
              id=""
              className="px-2 py-1 bg-gray-100 outline-none dark:bg-neutral-800 rounded-2xl"
            >
              <option value="1/1">1/1</option>
              <option value="4/5">4/5</option>
              <option value="16/9">16/9</option>
            </select>
            <button
              type="button"
              onClick={deleteFiles}
              className="text-2xl text-red-500"
            >
              <MdDeleteForever />
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default FormPreview
