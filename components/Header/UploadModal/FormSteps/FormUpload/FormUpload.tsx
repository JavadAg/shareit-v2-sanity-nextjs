import { fromPairs } from "lodash"
import React from "react"
import { formSteps } from "../../../../../utils/constants"

const FormUpload = ({
  formState,
  setFormState,
  formData,
  setFormData,
  filePreview,
  setFilePreview
}: any) => {
  return (
    <div>
      {formState.error ? (
        <span>{formState.error}</span>
      ) : (
        <span>Uploading...</span>
      )}
    </div>
  )
}

export default FormUpload
