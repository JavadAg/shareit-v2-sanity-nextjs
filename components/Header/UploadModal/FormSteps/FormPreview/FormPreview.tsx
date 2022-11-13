import React, { Dispatch, useCallback, useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import UploadSVG from "../../../../../assets/UploadSVG"
import { imageTypes, videoTypes } from "../../../../../utils/constants"
import makeid from "../../../../../utils/makeid"
import PreviewCarousel from "./PreviewCarousel/PreviewCarousel"
import { getCroppedImg } from "./canvasUtils"
import { FilePreview } from "../../UploadModal"
import { Point } from "react-easy-crop"
import { toBase64 } from "../../../../../utils/toBase64"

interface FormData {
  files: File[] | undefined
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
  formData,
  setFormData,
  filesPreview,
  setFilesPreview
}) => {
  const deleteFiles = () => {
    setFilesPreview([])
    setFormData({ files: undefined })
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
        <label className="border-dashed space-y-4 border-gray-400 bg-gray-100 hover:bg-gray-200 rounded-2xl border-4 p-5 flex flex-col justify-center items-center outline-none cursor-pointer m-4">
          <UploadSVG />
          <span className="text-center text-sm leading-10">
            Jpg, Png ,Webp, Mp4 <br />
            Max 5 file <br />
            1 video per post <br />
            Less than 25 MB
          </span>
          <div className="w-full max-w-xs">
            <input
              type="file"
              multiple
              onChange={(e) => handleFiles(e)}
              className="w-full max-w-xs"
            />
          </div>
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

          <div className="flex justify-center items-center flex-col space-y-2 m-2 w-full mx-2">
            <select
              onChange={(e) => handleToggleAspectClick(e.target.value)}
              name=""
              id=""
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
