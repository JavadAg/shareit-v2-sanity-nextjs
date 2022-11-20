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
      <div className="flex justify-between items-center w-full">
        <button
          type="button"
          disabled={currentStep === 0 || currentStep === 2}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="bg-gray-100 rounded-full top-4 left-4 text-lg p-1 disabled:opacity-0 md:text-2xl"
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
          className=" bg-gray-100 rounded-full top-4 right-4 text-lg p-1 disabled:opacity-0 md:text-2xl"
        >
          <HiOutlineArrowSmRight />
        </button>
      </div>
      <div className="flex relative justify-evenly items-center w-full">
        <div className="w-3/6 h-full absolute flex justify-center items-center">
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
              : "bg-indigo-100"
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
