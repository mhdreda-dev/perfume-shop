"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { MotionPress, MotionReveal } from "@/components/luxury-motion"
import { Gem, SlidersHorizontal, Sparkles } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description: string
}

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "available" | "sold-out">("all")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (filter === "available") return product.stock_quantity > 0
    if (filter === "sold-out") return product.stock_quantity === 0
    return true
  })
  const featuredProducts = products.filter((product) => product.stock_quantity > 0).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-7xl">
          <MotionReveal className="luxury-glass overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-4 w-4" />
              Perfume collection
            </p>
            <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h1 className="text-4xl font-semibold md:text-6xl">Our Collection</h1>
                <p className="mt-4 max-w-2xl text-foreground/70">
            Discover our curated selection of luxurious fragrances, each carefully crafted to celebrate your unique
            essence and elegance.
          </p>
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary">
                {filteredProducts.length} scents shown
              </div>
            </div>
          </MotionReveal>
        </div>

        {!loading && !error && featuredProducts.length > 0 && (
          <MotionReveal className="mx-auto mb-10 max-w-7xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Featured edit</p>
                <h2 className="mt-2 text-3xl font-semibold">Boutique highlights</h2>
              </div>
              <Gem className="hidden h-8 w-8 text-primary/70 sm:block" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={`featured-${product.id}`} {...product} />
              ))}
            </div>
          </MotionReveal>
        )}

        {/* Filters */}
        <MotionReveal className="mx-auto mb-8 flex max-w-7xl flex-wrap items-center gap-3">
          <div className="luxury-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/70">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            Filter
          </div>
          {(["all", "available", "sold-out"] as const).map((f) => (
            <MotionPress key={f}>
            <Button
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              size="sm"
              className={
                filter === f
                  ? "bg-primary text-primary-foreground hover:bg-accent"
                  : "border-primary/25 bg-white/65 hover:bg-secondary/70"
              }
            >
              {f === "all" ? "All Products" : f === "available" ? "Available" : "Sold Out"}
            </Button>
            </MotionPress>
          ))}
        </MotionReveal>

        {/* Loading State */}
        {loading && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="premium-skeleton h-[28rem]" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center text-destructive">
            <p>Unable to load products. Please try again later.</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <MotionReveal className="mx-auto max-w-lg py-16 text-center">
            <div className="luxury-glass rounded-2xl p-8">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Gem className="h-6 w-6" />
              </div>
              <h2 className="mb-3 text-3xl font-semibold">No scent in this edit</h2>
              <p className="mb-5 text-foreground/70">Try the full collection or switch to available bottles.</p>
              <Button variant="outline" onClick={() => setFilter("all")} className="border-primary/25 bg-white/65 hover:bg-secondary/70">
                View All Products
              </Button>
            </div>
          </MotionReveal>
        )}
      </main>

      <Footer />
    </div>
  )
}
