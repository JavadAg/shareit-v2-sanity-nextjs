import React, { useState } from "react"
import { IoCloudUploadOutline } from "react-icons/io5"

const categories = ["Gaming", "Nature"]

const UploadModal = () => {
  const [videoAsset, setvideoAsset] = useState<any>(false)
  const [loading, setloading] = useState(false)
  const [postFiles, setPostFiles] = useState<string[]>([])

  const previewhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray = Array.from(e.target.files!)
    for (let i = 0; i < fileArray.length; i++) {
      const url: string = URL.createObjectURL(fileArray[i])
      console.log(url)
      setPostFiles((prev) => [...prev, url])
    }
  }

  return (
    <div>
      <label className="btn btn-secondary" htmlFor="upload-modal">
        Upload Post
      </label>
      <input type="checkbox" id="upload-modal" className="modal-toggle" />
      <label htmlFor="upload-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Share with friends!</h3>
          <div className="bg-base-100 rounded-lg flex gap-6 flex-wrap justify-center items-center p-4 pt-6">
            <label className="border-dashed rounded-xl border-4 flex flex-col justify-center items-center outline-none mt-10 p-5 cursor-pointer hover:border-accent hover:bg-base-200">
              {loading ? (
                <p className="text-center text-3xl text-red-400 font-semibold">
                  Uploading...
                </p>
              ) : (
                <div>
                  {!videoAsset ? (
                    <label className="cursor-pointer" htmlFor="upload-file">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col justify-center items-center">
                          <IoCloudUploadOutline className="md:text-6xl" />
                          <span className="">
                            Select video & photo to upload
                          </span>
                        </div>
                        <span className=" text-center mt-10 text-sm leading-10">
                          Jpg, Png ,Webp, Mp4 <br />
                          Max 5 file <br />
                          720x1280 resolution or higher <br />
                          Less than 20 MB
                        </span>
                        <span className="bg-secondary text-center mt-8 rounded  text-md font-medium p-2 w-52 outline-none">
                          Select file
                        </span>
                      </div>
                      <input
                        id="upload-file"
                        type="file"
                        multiple={true}
                        name="upload-file"
                        onChange={(e) => previewhandler(e)}
                        className="w-0 h-0"
                      />
                      <div className="flex justify-center items-center flex-wrap">
                        {postFiles.map((file) => (
                          <img src={file} alt="post_preview" className="w-24" />
                        ))}
                      </div>
                    </label>
                  ) : (
                    <div className=" rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center">
                      <video
                        className="rounded-xl h-[462px] mt-16 bg-black"
                        controls
                        loop
                        /* src={videoAsset?.url} */
                      />
                      <div className=" flex justify-between gap-20">
                        {/*  <p className="text-lg">
                            {videoAsset.originalFilename}
                          </p> */}
                        <button
                          type="button"
                          className=" rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                          /*   onClick={() => setVideoAsset(undefined)} */
                        >
                          {/* <MdDelete /> */}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </label>
          </div>
        </label>
      </label>
    </div>
  )
}

export default UploadModal
