"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatPrice, getWhatsAppLink } from "@/lib/constants"
import { MotionPress, MotionReveal } from "@/components/luxury-motion"
import { ChevronLeft, ShoppingBag, Sparkles } from "lucide-react"
import { ProductZoomGallery } from "@/components/product-zoom-gallery"

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
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navigation />
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:px-8">
          <div className="premium-skeleton aspect-[4/5]" />
          <div className="space-y-5">
            <div className="premium-skeleton h-8 w-40" />
            <div className="premium-skeleton h-16 w-full" />
            <div className="premium-skeleton h-8 w-48" />
            <div className="premium-skeleton h-32 w-full" />
            <div className="premium-skeleton h-12 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-destructive">Product not found</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
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
  const galleryImages = [product.image_url, product.image_url, product.image_url]

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 pb-24 pt-7 sm:px-6 sm:pt-10 lg:px-8 lg:py-14">
        {/* Breadcrumb */}
        <div className="mb-5 flex min-w-0 items-center gap-2 overflow-hidden text-sm text-foreground/60 sm:mb-8">
          <Link href="/collection" className="inline-flex items-center gap-1 hover:text-primary">
            <ChevronLeft className="h-4 w-4" />
            Collection
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Product Image */}
          <MotionReveal className="relative">
            <ProductZoomGallery images={galleryImages} productName={product.name} isSoldOut={isSoldOut} />
          </MotionReveal>

          {/* Product Info */}
          <MotionReveal className="luxury-glass rounded-xl p-5 sm:rounded-2xl sm:p-8 lg:p-10" delay={0.1}>
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.28em]">
                <Sparkles className="h-4 w-4" />
                Signature perfume
              </p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-2xl font-semibold text-primary sm:text-3xl">{formatPrice(product.price)}</span>
                <Badge variant={isSoldOut ? "destructive" : "secondary"} className="border border-primary/20 bg-white/10">
                  {isSoldOut ? "Out of Stock" : `${product.stock_quantity} Available`}
                </Badge>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">About</h2>
                <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{product.description}</p>
              </div>
            )}

            {/* Notes */}
            {product.notes && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Fragrance Notes
                </h2>
                <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{product.notes}</p>
              </div>
            )}

            {/* CTA */}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {!isSoldOut && (
                <MotionPress>
                <Button asChild size="lg" className="min-h-11 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-accent">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Order via WhatsApp
                  </a>
                </Button>
                </MotionPress>
              )}
              <MotionPress>
              <Button asChild variant="outline" size="lg" className="min-h-11 w-full border-primary/25 bg-white/65 hover:bg-secondary/70">
                <Link href="/collection">Back to Collection</Link>
              </Button>
              </MotionPress>
            </div>

            {isSoldOut && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center">
                <p className="text-sm font-medium text-foreground">
                  This product is currently out of stock. Check back soon!
                </p>
              </div>
            )}
          </div>
          </MotionReveal>
        </div>
      </main>

      {!isSoldOut && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
          <Button asChild size="lg" className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-accent">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Order {formatPrice(product.price)}
            </a>
          </Button>
        </div>
      )}

      <Footer />
    </div>
  )
}
