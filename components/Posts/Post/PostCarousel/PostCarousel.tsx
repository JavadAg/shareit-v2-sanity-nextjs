import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"

const PostCarousel = ({ assets }: any) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const scrollTo = useCallback(
    (index: any) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla, setSelectedIndex])

  const onScroll = useCallback(() => {
    if (!embla) return
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [embla, setScrollProgress])

  useEffect(() => {
    if (!embla) return
    onSelect()
    onScroll()
    embla.on("select", onSelect)
    embla.on("scroll", onScroll)
  }, [embla, onSelect])

  return (
    <div className="relative bg-base-100 w-full h-full rounded-xl ">
      {embla?.scrollSnapList().length! > 1 && (
        <div className=" bg-gray-800/70 justify-center items-center flex w-8 h-8 text-center rounded-full absolute top-2 z-50 right-2 text-gray-200 text-sm">
          {selectedIndex + 1}/{embla?.scrollSnapList().length}
        </div>
      )}

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
      {embla?.scrollSnapList().length! > 1 && (
        <div className="relative bg-white mt-2 max-w-full w-full h-1 overflow-hidden rounded-3xl ml-auto mr-auto">
          <div
            className="absolute bg-gradient-to-r from-indigo-400 to-pink-300 w-full top-0 bottom-0 -left-full"
            style={{ transform: `translateX(${scrollProgress}%)` }}
          />
        </div>
      )}
    </div>
  )
}

export default PostCarousel
