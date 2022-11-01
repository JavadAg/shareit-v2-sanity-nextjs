import React, { useState } from "react"

const categories = ["Gaming", "Nature"]

const UploadModal = () => {
  const [videoAsset, setvideoAsset] = useState<any>(false)
  const [loading, setloading] = useState(false)

  return (
    <div>
      <label className="btn btn-secondary" htmlFor="upload-modal">
        Upload Post
      </label>
      <input type="checkbox" id="upload-modal" className="modal-toggle" />
      <label htmlFor="upload-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          <h3 className="text-lg font-bold">Share with friends!</h3>
        </label>
      </label>
    </div>
  )
}

export default UploadModal
