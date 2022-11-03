import React, { useState, useEffect, useCallback } from "react"
import { PrevButton, NextButton } from "./PreviewCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"

const PreviewCarousel = ({ filePreview }: any) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback(
    (index: any) => embla && embla.scrollTo(index),
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
    setScrollSnaps(embla.scrollSnapList())
    embla.on("select", onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <div className="relative bg-base-100 w-96 h-[28rem] rounded-xl ml-auto mr-auto">
      <div
        className="overflow-hidden w-full h-full cursor-pointer"
        ref={viewportRef}
      >
        <div className="flex select-none w-full h-full">
          {filePreview?.imagesURL.map((file: any, index: number) => (
            <div className="relative min-w-full object-cover" key={index}>
              <div className="relative ">
                <img src={file} alt="post_preview" className="absolute block" />
              </div>
            </div>
          ))}
          {filePreview?.videosURL.map((file: any, index: number) => (
            <div className="relative min-w-full object-cover" key={index}>
              <div className="relative ">
                <video controls loop src={file} className="absolute block" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  )
}

export default PreviewCarousel
