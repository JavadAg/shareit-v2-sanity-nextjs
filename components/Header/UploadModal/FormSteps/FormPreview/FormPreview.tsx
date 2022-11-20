import React, { Dispatch, useCallback, useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import UploadSVG from "../../../../../assets/UploadSVG"
import { imageTypes, videoTypes } from "../../../../../utils/constants"
import PreviewCarousel from "./PreviewCarousel/PreviewCarousel"
import { Point } from "react-easy-crop"
import { toBase64 } from "../../../../../utils/toBase64"
import { FilePreview } from "../../../../../types/upload.types"

interface FormData {
  caption: string
  category: string
  tags: string[]
}

interface FormState {
  error: string
  loading: boolean
  isUploading: boolean
}

interface IProps {
  formState: FormState
  setFormState: Dispatch<Partial<FormState>>
  formData: FormData
  setFormData: Dispatch<Partial<FormData>>
  filesPreview: FilePreview[]
  setFilesPreview: Dispatch<React.SetStateAction<FilePreview[]>>
}

const FormPreview: React.FC<IProps> = ({
  formState,
  setFormState,
  setFormData,
  filesPreview,
  setFilesPreview
}) => {
  const deleteFiles = () => {
    setFilesPreview([])
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [aspect, setAspect] = useState<number | undefined>(1 / 1)
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (file: any) =>
    useCallback(async (croppedArea: any, croppedAreaPixels: any) => {
      setFilesPreview((current) =>
        current?.map((obj: FilePreview) => {
          if (obj.id === file.id) {
            return { ...obj, croppedAreaPixels: croppedAreaPixels }
          }
          return obj
        })
      )
    }, [])

  const onCropChange = (file: FilePreview) =>
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

  function handleToggleAspectClick(aspectRatio: any) {
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
        <label className="border-dashed space-y-4 border-gray-400 bg-gray-100 hover:bg-gray-200 rounded-2xl border-4 flex flex-col justify-center items-center outline-none cursor-pointer w-full py-2 md:py-6">
          <UploadSVG />
          <div className="text-center text-sm flex justify-center items-center flex-col text-gray-500 md:text-base gap-4 md:gap-4">
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
            onCropComplete={onCropComplete}
            onCropChange={onCropChange}
            filesPreview={filesPreview}
          />

          <div className="flex justify-center items-center flex-col space-y-2 m-2 w-full mt-4">
            <select
              onChange={(e) => handleToggleAspectClick(e.target.value)}
              name=""
              id=""
              className="bg-gray-100 rounded-2xl p-2"
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
