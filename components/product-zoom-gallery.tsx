"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ELEGANCE_BRAND_IMAGE, getSafeProductImage } from "@/lib/local-images"

type ProductZoomGalleryProps = {
  images: string[]
  productName: string
  isSoldOut: boolean
}

export function ProductZoomGallery({ images, productName, isSoldOut }: ProductZoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lens, setLens] = useState({ x: 50, y: 50, visible: false })
  const reduceMotion = useReducedMotion()
  const safeImages = images.length > 0 ? images.map((image) => getSafeProductImage(image)) : [ELEGANCE_BRAND_IMAGE]
  const activeImage = safeImages[selectedImage] || ELEGANCE_BRAND_IMAGE

  return (
    <div className="w-full overflow-hidden">
      <div
        className="luxury-glass relative overflow-hidden rounded-xl p-2 sm:rounded-2xl sm:p-3"
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
        <div className="relative aspect-[4/5] max-h-[34rem] overflow-hidden rounded-lg bg-secondary/10 sm:rounded-xl">
          <motion.img
            src={activeImage}
            alt={productName}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = ELEGANCE_BRAND_IMAGE
            }}
            initial={reduceMotion ? false : { scale: 1.02, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground/20 to-transparent" />
          <div className="absolute left-3 top-3 luxury-badge sm:left-4 sm:top-4">Galerie</div>
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
            Survolez pour inspecter
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <Badge variant="destructive" className="px-6 py-3 text-2xl">
                Rupture
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
        {safeImages.map((image, index) => (
          <motion.button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-lg border bg-white/65 p-1 transition hover:border-primary/60 sm:rounded-xl ${
              selectedImage === index ? "border-primary" : "border-border"
            }`}
            aria-label={`Voir l'image produit ${index + 1}`}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            <img
              src={image}
              alt=""
              className="h-full w-full rounded-md object-cover sm:rounded-lg"
              onError={(event) => {
                event.currentTarget.src = ELEGANCE_BRAND_IMAGE
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
