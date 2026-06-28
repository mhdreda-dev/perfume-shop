"use client"

import { useEffect, useState } from "react"
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
  const whatsappMessage = `Bonjour, je souhaite commander ${name} à ${formatPrice(price)}.`
  const whatsappLink = getWhatsAppLink(whatsappMessage)
  const reduceMotion = useReducedMotion()
  const productImage = getSafeProductImage(image_url)
  const [canHoverImage, setCanHoverImage] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px) and (hover: hover) and (pointer: fine)")
    const updateHoverState = () => setCanHoverImage(mediaQuery.matches)

    updateHoverState()
    mediaQuery.addEventListener("change", updateHoverState)

    return () => mediaQuery.removeEventListener("change", updateHoverState)
  }, [])

  return (
    <motion.div
      data-product-card
      className="group luxury-glass flex h-full flex-col overflow-hidden rounded-xl transition duration-300 hover:border-primary/45 hover:shadow-primary/10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image Container */}
      <div className="relative h-[18rem] shrink-0 overflow-hidden bg-[linear-gradient(145deg,#fffdf9,#e8dccb)] sm:aspect-[4/5] sm:h-auto sm:max-h-[26rem]">
        <motion.img
          src={productImage}
          alt={`${name} - parfum original Elegance Parfum`}
          className="h-full w-full object-contain object-center transition duration-700 sm:object-cover sm:group-hover:scale-[1.04]"
          onError={(event) => {
            event.currentTarget.src = ELEGANCE_BRAND_IMAGE
          }}
          whileHover={reduceMotion || !canHoverImage ? undefined : { scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-foreground/20 to-transparent sm:h-20" />
        {!isSoldOut && (
          <Badge className="absolute left-3 top-3 inline-flex min-h-7 items-center border border-primary/30 bg-white/88 px-2.5 text-[0.65rem] uppercase tracking-[0.08em] text-primary backdrop-blur-md sm:text-xs sm:normal-case sm:tracking-normal">
            Disponible
          </Badge>
        )}
        <Badge className="absolute right-3 top-3 inline-flex min-h-7 items-center border border-primary/30 bg-white/88 px-2.5 text-[0.65rem] uppercase tracking-[0.08em] text-primary backdrop-blur-md sm:text-xs sm:normal-case sm:tracking-normal">
          {PRODUCT_GENDER_LABELS[gender]}
        </Badge>
        <div className="absolute bottom-3 right-3 hidden rounded-full border border-primary/20 bg-white/82 px-3 py-1 text-xs text-foreground/80 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 sm:block">
          Voir détails
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <Badge variant="destructive" className="px-4 py-2 text-base">
              Rupture
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-h-[15rem] flex-1 flex-col space-y-3 p-4 sm:min-h-0 sm:space-y-4 sm:p-5">
        <div>
          <h3 className="mb-2 line-clamp-2 min-h-[2.6rem] text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {name}
          </h3>
          <p className="text-xl font-semibold text-primary sm:text-2xl">{formatPrice(price)}</p>
        </div>

        {/* Stock Status */}
        {isSoldOut ? (
          <div className="text-sm text-foreground/60">
            <span className="font-medium text-destructive">Indisponible pour le moment</span>
          </div>
        ) : (
          <div className="text-sm text-foreground/62">Commande directe via WhatsApp</div>
        )}

        {/* Actions */}
        <div className="mt-auto grid gap-2 sm:grid-cols-2">
          <Button asChild variant="outline" size="sm" className="min-h-11 bg-white/72 hover:bg-secondary/70">
            <Link href={`/product/${id}`} className="gap-2" aria-label={`Voir les détails de ${name}`}>
              <Eye className="h-4 w-4" />
              Détails
            </Link>
          </Button>
          {!isSoldOut && (
            <Button asChild size="sm" className="min-h-11 bg-primary text-primary-foreground hover:bg-accent" disabled={isSoldOut}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
                aria-label={`Commander ${name} sur WhatsApp`}
              >
                <ShoppingBag className="h-4 w-4" />
                Commander
              </a>
            </Button>
          )}
          {isSoldOut && (
            <Button size="sm" className="min-h-11" disabled>
              Indisponible
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
