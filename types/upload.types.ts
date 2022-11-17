import { Area, Point } from "react-easy-crop"

export interface FilePreview {
  url?: string
  id?: number
  type?: string
  crop?: Point
  croppedAreaPixels?: Area
  base64: string
}

export interface FormData {
  caption: string
  category: string
  tags: string[]
}

export interface FormState {
  error: string
  loading: boolean
  isUploading: boolean
}
