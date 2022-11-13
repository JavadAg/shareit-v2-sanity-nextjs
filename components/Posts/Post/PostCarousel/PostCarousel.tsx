import React, { useState, useEffect, useCallback } from "react"
import { PrevButton, NextButton } from "./PostCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { fill } from "lodash"

const imageTypes = /image\/(png|jpg|jpeg|webp)/i
const videoTypes = /video\/(mp4|webm)/i

const PostCarousel = ({ assets }: any) => {
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
    <div className="relative bg-base-100 w-full h-full rounded-xl ">
      <div
        className="overflow-hidden w-full h-full cursor-pointer"
        ref={viewportRef}
      >
        <div className="flex select-none w-full h-full">
          {assets.map((file: any, index: number) => (
            <div
              className="relative object-cover min-w-full h-full flex justify-center overflow-hidden"
              key={index}
            >
              {file.resource_type === "image" ? (
                <Image
                  alt="post_image"
                  width="0"
                  height="0"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                  src={file.url}
                  className="rounded-2xl w-auto h-full max-w-full max-h-full object-contain  block"
                />
              ) : file.resource_type === "video" ? (
                <video src={file.asset.url} />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
    </div>
  )
}

export default PostCarousel
