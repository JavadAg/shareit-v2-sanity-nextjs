import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"

const PreviewCarousel = ({ filePreview }: any) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on("select", onSelect)
  }, [embla, onSelect])

  return (
    <div className="relative w-full h-64 rounded-xl flex flex-col justify-center items-center">
      <div className="block bg-gray-800/70 p-2 rounded-2xl absolute top-2 z-50 right-2 text-white">
        {selectedIndex + 1}/{embla?.scrollSnapList().length}
      </div>
      <div
        className="overflow-hidden w-full h-full cursor-pointer"
        ref={viewportRef}
      >
        <div className="flex items-center select-none w-full h-full">
          {filePreview?.imagesURL.map((file: any, index: number) => (
            <div
              className="relative bg-gray-900 flex items-center justify-center min-w-full h-full object-cover"
              key={index}
            >
              <img
                src={file}
                alt="post_preview"
                className="absolute block object-cover"
              />
            </div>
          ))}
          {filePreview?.videosURL.map((file: any, index: number) => (
            <div
              className="relative flex justify-center items-center min-w-full"
              key={index}
            >
              <video controls loop src={file} className="absolute block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreviewCarousel
