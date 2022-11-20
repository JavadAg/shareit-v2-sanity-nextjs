import React from "react"
import { FormState } from "../../../../../types/upload.types"

interface IProps {
  formState: FormState
}

const FormUpload: React.FC<IProps> = ({ formState }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      {formState.error.length > 0 ? (
        <span className="text-red-500 font-bold">
          {formState.error}sfresres
        </span>
      ) : (
        <div className="flex justify-center items-end h-56 w-full">
          <span className="w-20 h-8 rounded-3xl border-8 border-indigo-300 animate-ball"></span>
        </div>
      )}
    </div>
  )
}

export default FormUpload
