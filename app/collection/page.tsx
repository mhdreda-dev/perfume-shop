"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Discover our curated selection of luxurious fragrances, each carefully crafted to celebrate your unique
            essence and elegance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {(["all", "available", "sold-out"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} size="sm">
              {f === "all" ? "All Products" : f === "available" ? "Available" : "Sold Out"}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-12">Loading our beautiful collection...</div>}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-destructive">
            <p>Unable to load products. Please try again later.</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70 mb-4">No products found in this category.</p>
            <Button variant="outline" onClick={() => setFilter("all")}>
              View All Products
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
