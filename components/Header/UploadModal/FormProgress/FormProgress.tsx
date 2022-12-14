import React from "react"
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"
import { FilePreview } from "../../../../types/upload.types"
import { formSteps } from "../../../../utils/constants"

interface IProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  filesPreview: FilePreview[]
}

const FormProgress: React.FC<IProps> = ({
  currentStep,
  setCurrentStep,
  filesPreview
}) => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <button
          type="button"
          disabled={currentStep === 0 || currentStep === 2}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="p-1 text-lg bg-gray-100 rounded-full dark:bg-neutral-800 top-4 left-4 disabled:opacity-0 md:text-2xl"
        >
          <HiOutlineArrowSmLeft />
        </button>
        <h3 className="text-lg font-bold">Share with friends!</h3>
        <button
          type="button"
          disabled={
            filesPreview.length < 1 || currentStep === 1 || currentStep === 2
          }
          onClick={() => setCurrentStep(currentStep + 1)}
          className="p-1 text-lg bg-gray-100 rounded-full dark:bg-neutral-800 top-4 right-4 disabled:opacity-0 md:text-2xl"
        >
          <HiOutlineArrowSmRight />
        </button>
      </div>
      <div className="relative flex items-center w-full justify-evenly">
        <div className="absolute flex items-center justify-center w-3/6 h-full">
          <div
            className={`bg-indigo-500 h-2 block left-0 absolute ${
              currentStep === 0 ? "w-0" : currentStep === 1 ? "w-2/4" : "w-full"
            }`}
          ></div>
        </div>
        {formSteps.map((step, index) => (
          <>
            <div
              className={`
          ${
            index === currentStep
              ? "bg-indigo-400"
              : index < currentStep
              ? "bg-indigo-500"
              : "bg-indigo-100 dark:bg-neutral-800"
          } 
           rounded-full h-8 w-8 flex justify-center items-center relative`}
            >
              {index}
            </div>
          </>
        ))}
      </div>
      <span>{formSteps[currentStep]}</span>
    </>
  )
}

export default FormProgress
