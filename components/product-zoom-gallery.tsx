"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { getEleganceImage } from "@/lib/local-images"

type ProductZoomGalleryProps = {
  images: string[]
  productName: string
  isSoldOut: boolean
}

export function ProductZoomGallery({ images, productName, isSoldOut }: ProductZoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lens, setLens] = useState({ x: 50, y: 50, visible: false })
  const reduceMotion = useReducedMotion()
  const safeImages = images.length > 0 ? images.map(() => getEleganceImage()) : [getEleganceImage()]
  const activeImage = safeImages[selectedImage] || getEleganceImage()

  return (
    <div>
      <div
        className="luxury-glass relative overflow-hidden rounded-2xl p-3"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          setLens({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
            visible: true,
          })
        }}
        onMouseLeave={() => setLens((current) => ({ ...current, visible: false }))}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary/10">
          <motion.img
            src={activeImage}
            alt={productName}
            className="h-full w-full object-cover"
            initial={reduceMotion ? false : { scale: 1.02, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground/20 to-transparent" />
          <div className="absolute left-4 top-4 luxury-badge">Gallery</div>
          <div
            className={`pointer-events-none absolute hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 shadow-2xl shadow-primary/20 ring-1 ring-primary/20 backdrop-blur-sm transition-opacity duration-200 lg:block ${
              lens.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${lens.x}%`,
              top: `${lens.y}%`,
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${lens.x}% ${lens.y}%`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "230%",
            }}
          />
          <div className="absolute bottom-4 right-4 hidden rounded-full border border-primary/20 bg-white/75 px-3 py-1 text-xs text-foreground/75 backdrop-blur-md lg:block">
            Hover to inspect
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <Badge variant="destructive" className="px-6 py-3 text-2xl">
                Sold Out
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {safeImages.map((image, index) => (
          <motion.button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-xl border bg-white/65 p-1 transition hover:border-primary/60 ${
              selectedImage === index ? "border-primary" : "border-border"
            }`}
            aria-label={`View product image ${index + 1}`}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            <img src={image} alt="" className="h-full w-full rounded-lg object-cover" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
