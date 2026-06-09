"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { MotionPress, MotionReveal } from "@/components/luxury-motion"
import { type ProductGender, withProductGender } from "@/lib/product-gender"
import { Gem, SlidersHorizontal, Sparkles } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description: string
  gender: ProductGender
}

type CollectionFilter = "all" | ProductGender

const categoryFilters: { value: CollectionFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "unisexe", label: "Unisexe" },
]

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<CollectionFilter>("all")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data.map(withProductGender))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.gender === filter)

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />

      <main className="w-full flex-1 overflow-x-hidden px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="mx-auto mb-7 max-w-7xl sm:mb-10">
          <MotionReveal className="luxury-glass overflow-hidden rounded-xl p-5 sm:rounded-2xl sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.28em]">
              <Sparkles className="h-4 w-4" />
              Perfume collection
            </p>
            <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl">Collection</h1>
                <p className="mt-3 max-w-2xl text-sm text-foreground/70 sm:mt-4 sm:text-base">
                  Découvrez nos parfums originaux importés d'Espagne, classés par signatures homme et femme.
                </p>
              </div>
              <div className="w-fit rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-primary sm:rounded-xl sm:px-4 sm:py-3">
                {filteredProducts.length} parfums
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Filters */}
        <MotionReveal className="mx-auto mb-7 max-w-7xl overflow-x-auto pb-2 sm:mb-8 [scrollbar-width:thin]">
          <div className="inline-flex min-w-max items-center gap-2 rounded-full border border-primary/20 bg-white/65 p-1.5 shadow-lg shadow-primary/10 backdrop-blur-xl sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground/70 sm:inline-flex">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Filtrer
            </div>
            {categoryFilters.map((option) => (
              <MotionPress key={option.value}>
                <Button
                  variant={filter === option.value ? "default" : "ghost"}
                  onClick={() => setFilter(option.value)}
                  size="sm"
                  className={
                    filter === option.value
                      ? "min-h-10 rounded-full bg-primary px-5 text-primary-foreground shadow-md shadow-primary/15 hover:bg-accent"
                      : "min-h-10 rounded-full px-5 text-foreground/72 hover:bg-secondary/70 hover:text-foreground"
                  }
                >
                  {option.label}
                </Button>
              </MotionPress>
            ))}
          </div>
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
          <MotionReveal className="mx-auto max-w-lg py-10 text-center sm:py-16">
            <div className="luxury-glass rounded-xl p-6 sm:rounded-2xl sm:p-8">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <Gem className="h-6 w-6" />
              </div>
              <h2 className="mb-3 text-2xl font-semibold sm:text-3xl">Aucun parfum dans cette sélection</h2>
              <p className="mb-5 text-foreground/70">Essayez toute la collection ou choisissez une autre catégorie.</p>
              <Button variant="outline" onClick={() => setFilter("all")} className="border-primary/25 bg-white/65 hover:bg-secondary/70">
                Voir tous les parfums
              </Button>
            </div>
          </MotionReveal>
        )}
      </main>

      <Footer />
    </div>
  )
}
