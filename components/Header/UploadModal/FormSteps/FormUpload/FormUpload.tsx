import React from "react"
import { FormState } from "../../../../../types/upload.types"

interface IProps {
  formState: FormState
}

const FormUpload: React.FC<IProps> = ({ formState }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {formState.error.length > 0 ? (
        <span className="font-bold text-red-500">{formState.error}</span>
      ) : (
        <div className="flex items-end justify-center w-full h-56">
          <span className="w-20 h-8 border-8 border-indigo-300 rounded-3xl animate-ball"></span>
        </div>
      )}
    </div>
  )
}

export default FormUpload
