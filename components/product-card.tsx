"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getWhatsAppLink } from "@/lib/constants"
import { ELEGANCE_BRAND_IMAGE, getSafeProductImage } from "@/lib/local-images"
import { PRODUCT_GENDER_LABELS, type ProductGender } from "@/lib/product-gender"
import { motion, useReducedMotion } from "framer-motion"
import { Eye, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image_url: string
  stock_quantity: number
  gender: ProductGender
}

export function ProductCard({ id, name, price, image_url, stock_quantity, gender }: ProductCardProps) {
  const isSoldOut = stock_quantity === 0
  const whatsappMessage = `Hi! I'm interested in purchasing ${name} for ${formatPrice(price)}.`
  const whatsappLink = getWhatsAppLink(whatsappMessage)
  const reduceMotion = useReducedMotion()
  const productImage = getSafeProductImage(image_url)

  return (
    <motion.div
      className="group luxury-glass overflow-hidden rounded-xl transition duration-300 hover:border-primary/45 hover:shadow-primary/10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] max-h-[26rem] overflow-hidden bg-secondary/10">
        <motion.img
          src={productImage}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          onError={(event) => {
            event.currentTarget.src = ELEGANCE_BRAND_IMAGE
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-foreground/25 to-transparent" />
        {!isSoldOut && (
          <Badge className="absolute left-3 top-3 border border-primary/30 bg-white/75 text-primary backdrop-blur-md">
            In Stock
          </Badge>
        )}
        <Badge className="absolute right-3 top-3 border border-primary/30 bg-white/75 text-primary backdrop-blur-md">
          {PRODUCT_GENDER_LABELS[gender]}
        </Badge>
        <div className="absolute bottom-3 right-3 rounded-full border border-primary/20 bg-white/75 px-3 py-1 text-xs text-foreground/80 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
          Quick view
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <Badge variant="destructive" className="px-4 py-2 text-base">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
        <div>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground sm:text-xl">{name}</h3>
          <p className="text-xl font-semibold text-primary sm:text-2xl">{formatPrice(price)}</p>
        </div>

        {/* Stock Status */}
        {isSoldOut ? (
          <div className="text-sm text-foreground/60">
            <span className="text-destructive font-medium">Out of Stock</span>
          </div>
        ) : (
          <div aria-hidden="true" className="min-h-5" />
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm" className="min-h-10 bg-white/65 hover:bg-secondary/70">
            <Link href={`/product/${id}`} className="gap-2">
              <Eye className="h-4 w-4" />
              Details
            </Link>
          </Button>
          {!isSoldOut && (
            <Button asChild size="sm" className="min-h-10 bg-primary text-primary-foreground hover:bg-accent" disabled={isSoldOut}>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Order
              </a>
            </Button>
          )}
          {isSoldOut && (
            <Button size="sm" disabled>
              Unavailable
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
