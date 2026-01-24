"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatPrice, getWhatsAppLink, BUSINESS_CONFIG } from "@/lib/constants"

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description: string
  notes: string
}

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) throw new Error("Product not found")
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">Loading...</div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-destructive">Product not found</p>
          <Button asChild>
            <Link href="/collection">Back to Collection</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const isSoldOut = product.stock_quantity === 0
  const whatsappMessage = `Hi! I'm interested in purchasing ${product.name} for ${formatPrice(product.price)}.`
  const whatsappLink = getWhatsAppLink(whatsappMessage)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-foreground/70">
          <Link href="/collection" className="hover:text-foreground">
            Collection
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-secondary/10 rounded-lg overflow-hidden relative">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isSoldOut && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Badge variant="destructive" className="text-2xl px-6 py-3">
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                <Badge variant={isSoldOut ? "destructive" : "secondary"}>
                  {isSoldOut ? "Out of Stock" : `${product.stock_quantity} Available`}
                </Badge>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-sm font-semibold text-foreground/70 mb-2 uppercase tracking-wide">About</h2>
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Notes */}
            {product.notes && (
              <div>
                <h2 className="text-sm font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                  Fragrance Notes
                </h2>
                <p className="text-foreground/80 leading-relaxed">{product.notes}</p>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              {!isSoldOut && (
                <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Order via WhatsApp
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="flex-1 bg-transparent">
                <Link href="/collection">Back to Collection</Link>
              </Button>
            </div>

            {isSoldOut && (
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
                <p className="text-sm font-medium text-foreground">
                  This product is currently out of stock. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
