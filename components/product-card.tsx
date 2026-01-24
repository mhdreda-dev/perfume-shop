"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BUSINESS_CONFIG, formatPrice, getWhatsAppLink } from "@/lib/constants"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image_url: string
  stock_quantity: number
}

export function ProductCard({ id, name, price, image_url, stock_quantity }: ProductCardProps) {
  const isSoldOut = stock_quantity === 0
  const whatsappMessage = `Hi! I'm interested in purchasing ${name} for ${formatPrice(price)}.`
  const whatsappLink = getWhatsAppLink(whatsappMessage)

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary/10 aspect-square">
        <img
          src={image_url || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 mb-2">{name}</h3>
          <p className="text-2xl font-bold text-primary">{formatPrice(price)}</p>
        </div>

        {/* Stock Status */}
        <div className="text-sm text-foreground/70">
          {isSoldOut ? (
            <span className="text-destructive font-medium">Out of Stock</span>
          ) : (
            <span>{stock_quantity} in stock</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link href={`/product/${id}`}>View Details</Link>
          </Button>
          {!isSoldOut && (
            <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90" disabled={isSoldOut}>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            </Button>
          )}
          {isSoldOut && (
            <Button size="sm" disabled className="flex-1">
              Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
