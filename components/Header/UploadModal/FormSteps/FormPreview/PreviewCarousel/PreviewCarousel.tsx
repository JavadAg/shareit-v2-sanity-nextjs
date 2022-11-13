import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"

import { NextButton, PrevButton } from "./PreviewCarouselButtons"
import Cropper from "react-easy-crop"
import { FilePreview } from "../../../UploadModal"

const PreviewCarousel = ({
  filesPreview,
  zoom,
  setZoom,
  onCropComplete,
  onCropChange,
  aspect
}: any) => {
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    draggable: false
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on("select", onSelect)
  }, [embla, onSelect])

  return (
    <div className="relative w-full h-full rounded-xl flex flex-col justify-center items-center">
      <div className="block bg-gray-800/70 p-2 rounded-2xl absolute top-2 z-50 right-2 text-white">
        {selectedIndex + 1}/{embla?.scrollSnapList().length}
      </div>
      <div
        className="overflow-hidden w-full h-full cursor-pointer"
        ref={viewportRef}
      >
        <div className="flex items-center select-none w-full h-full">
          {filesPreview.map((file: FilePreview) => (
            <>
              {file.type === "image" ? (
                <div
                  key={file.id}
                  className="relative bg-gray-900 flex-col flex items-center justify-center min-w-full h-full object-cover"
                >
                  <div className="w-full h-64 max-h-full flex justify-center items-center relative">
                    <Cropper
                      image={file.url}
                      crop={file.crop!}
                      zoom={zoom}
                      aspect={aspect}
                      onCropChange={onCropChange(file)}
                      onCropComplete={onCropComplete(file)}
                      onZoomChange={setZoom}
                    />
                  </div>
                </div>
              ) : (
                <div
                  key={file.id}
                  className="relative flex justify-center items-center min-w-full"
                >
                  <div className="w-full h-64 max-h-full flex justify-center items-center relative">
                    <Cropper
                      video={file.url}
                      crop={file.crop!}
                      zoom={zoom}
                      aspect={aspect}
                      onCropChange={onCropChange(file)}
                      onCropComplete={onCropComplete(file)}
                      onZoomChange={setZoom}
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  )
}

export default PreviewCarousel
