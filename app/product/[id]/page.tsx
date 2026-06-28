"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatPrice, getWhatsAppLink } from "@/lib/constants"
import { MotionPress, MotionReveal } from "@/components/luxury-motion"
import { ChevronLeft, MessageCircle, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react"
import { ProductZoomGallery } from "@/components/product-zoom-gallery"
import { PRODUCT_GENDER_LABELS, type ProductGender } from "@/lib/product-gender"

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description: string
  notes: string
  gender: ProductGender
}

const productAssurances = [
  { icon: ShieldCheck, title: "Original vérifié", text: "Sélection importée d'Espagne." },
  { icon: PackageCheck, title: "Préparation premium", text: "Commande confirmée sur WhatsApp." },
  { icon: Truck, title: "Livraison suivie", text: "Accompagnement jusqu'à réception." },
]

export default function ProductDetails() {
  const params = useParams()
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
          <p className="text-destructive" role="alert">Parfum introuvable</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
            <Link href="/collection">Retour à la collection</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const isSoldOut = product.stock_quantity === 0
  const whatsappMessage = `Bonjour, je souhaite commander ${product.name} à ${formatPrice(product.price)}.`
  const whatsappLink = getWhatsAppLink(whatsappMessage)
  const galleryImages = [product.image_url, product.image_url, product.image_url]

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 pb-28 pt-7 sm:px-6 sm:pt-10 lg:px-8 lg:py-14">
        {/* Breadcrumb */}
        <div className="mb-5 flex min-w-0 items-center gap-2 overflow-hidden text-sm text-foreground/60 sm:mb-8">
          <Link href="/collection" className="inline-flex items-center gap-1 hover:text-primary" aria-label="Retour à la collection">
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
                Parfum signature
              </p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{product.name}</h1>
              <p className="max-w-2xl text-sm leading-7 text-foreground/72 sm:text-base">
                Une référence premium à commander directement sur WhatsApp avec conseil personnalisé et confirmation rapide.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-2xl font-semibold text-primary sm:text-3xl">{formatPrice(product.price)}</span>
                <Badge className="border border-primary/20 bg-white/65 text-primary">
                  {PRODUCT_GENDER_LABELS[product.gender]}
                </Badge>
                <Badge variant={isSoldOut ? "destructive" : "secondary"} className="border border-primary/20 bg-white/65">
                  {isSoldOut ? "Rupture" : "Disponible"}
                </Badge>
              </div>
              {!isSoldOut && (
                <div className="grid grid-cols-3 gap-2">
                  {["Authentique", "Prix DH", "Conseil"].map((item) => (
                    <div key={item} className="rounded-lg border border-primary/20 bg-white/62 px-2 py-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-primary sm:text-xs">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Description</h2>
                <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{product.description}</p>
              </div>
            )}

            {/* Notes */}
            {product.notes && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Notes olfactives
                </h2>
                <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{product.notes}</p>
              </div>
            )}

            <div className="grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
              {productAssurances.map((assurance) => {
                const Icon = assurance.icon
                return (
                  <div key={assurance.title} className="rounded-lg border border-primary/20 bg-white/62 p-3">
                    <Icon className="mb-3 h-4 w-4 text-primary" />
                    <h3 className="font-sans text-sm font-semibold">{assurance.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-foreground/66">{assurance.text}</p>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {!isSoldOut && (
                <MotionPress>
                <Button asChild size="lg" className="min-h-11 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-accent">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                    aria-label={`Commander ${product.name} sur WhatsApp`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Commander sur WhatsApp
                  </a>
                </Button>
                </MotionPress>
              )}
              <MotionPress>
              <Button asChild variant="outline" size="lg" className="min-h-11 w-full border-primary/25 bg-white/65 hover:bg-secondary/70">
                <Link href="/collection">Voir la collection</Link>
              </Button>
              </MotionPress>
            </div>

            {isSoldOut && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-center">
                <p className="text-sm font-medium text-foreground">
                  Ce parfum est temporairement indisponible. Consultez la collection pour une alternative proche.
                </p>
              </div>
            )}
          </div>
          </MotionReveal>
        </div>
      </main>

      {!isSoldOut && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
          <Button asChild size="lg" className="min-h-11 w-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/15 hover:bg-[#1fb457]">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
              aria-label={`Commander ${product.name} à ${formatPrice(product.price)} sur WhatsApp`}
            >
              <MessageCircle className="h-4 w-4" />
              Commander {formatPrice(product.price)}
            </a>
          </Button>
        </div>
      )}

      <Footer />
    </div>
  )
}
