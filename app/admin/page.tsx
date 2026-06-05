"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Plus, Package, DollarSign, AlertCircle } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"
import { formatPrice } from "@/lib/constants"
import { getEleganceImage } from "@/lib/local-images"

interface Product {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description: string
  notes: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (response.ok) {
          setIsAuthenticated(true)
          fetchProducts()
        } else {
          router.push("/admin/login")
        }
      } catch {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (formData: any) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchProducts()
        setShowForm(false)
        setSuccessMessage("Product added successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to add product")
      }
    } catch (error) {
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateProduct = async (formData: any) => {
    if (!editingProduct) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchProducts()
        setEditingProduct(null)
        setShowForm(false)
        setSuccessMessage("Product updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to update product")
      }
    } catch (error) {
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
        setSuccessMessage("Product deleted successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.stock_quantity > 0).length
  const soldOutProducts = products.filter((p) => p.stock_quantity === 0).length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="luxury-glass mb-8 flex flex-col justify-between gap-5 rounded-2xl p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Boutique control room</p>
            <h1 className="mt-3 text-4xl font-semibold">Admin Dashboard</h1>
            <p className="mt-2 text-foreground/70">Manage your perfume products and inventory</p>
          </div>
          {!showForm && !editingProduct && (
            <Button onClick={() => setShowForm(true)} className="gap-2 bg-primary text-primary-foreground hover:bg-accent">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-700/20 bg-emerald-50 p-4 text-emerald-800">
            <div className="w-2 h-2 rounded-full bg-emerald-700" />
            {successMessage}
          </div>
        )}

        {/* Statistics Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="luxury-glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Total Products</p>
                  <p className="text-3xl font-bold mt-2">{totalProducts}</p>
                </div>
                <Package className="w-12 h-12 text-primary/20" />
              </div>
            </Card>

            <Card className="luxury-glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">In Stock</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-700">{inStockProducts}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-6 w-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="luxury-glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Sold Out</p>
                  <p className="mt-2 text-3xl font-bold text-red-700">{soldOutProducts}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </Card>

            <Card className="luxury-glass p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Inventory Value</p>
                  <p className="mt-2 text-3xl font-bold text-primary">{formatPrice(totalValue)}</p>
                </div>
                <DollarSign className="w-12 h-12 text-primary/20" />
              </div>
            </Card>
          </div>
        )}

        {/* Add/Edit Form */}
        {(showForm || editingProduct) && (
          <Card className="luxury-glass mb-8 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                className="border-primary/25 bg-white/65 hover:bg-secondary/70"
              >
                Cancel
              </Button>
            </div>
            <ProductForm
              initialData={editingProduct || undefined}
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              isLoading={isSubmitting}
            />
          </Card>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="premium-skeleton h-32" />
              ))}
            </div>
            <div className="premium-skeleton h-80" />
          </div>
        ) : products.length === 0 ? (
          <Card className="luxury-glass p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <p className="text-foreground/70 mb-4">No products yet. Create your first perfume!</p>
            <Button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground hover:bg-accent">
              Add Product
            </Button>
          </Card>
        ) : (
          <Card className="luxury-glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-white/65">
                    <th className="text-left py-4 px-6 font-semibold">Product</th>
                    <th className="text-left py-4 px-6 font-semibold">Price</th>
                    <th className="text-left py-4 px-6 font-semibold">Stock</th>
                    <th className="text-left py-4 px-6 font-semibold">Inventory Value</th>
                    <th className="text-left py-4 px-6 font-semibold">Status</th>
                    <th className="text-right py-4 px-6 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border transition hover:bg-white/65">
                      <td className="py-4 px-6">
                        <div className="flex gap-3 items-center">
                          <img
                            src={getEleganceImage()}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg border border-border object-cover"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-foreground/60">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium">{formatPrice(product.price)}</td>
                      <td className="py-4 px-6">
                        <span
                          className={
                            product.stock_quantity > 0 ? "font-medium text-emerald-700" : "font-medium text-red-700"
                          }
                        >
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="py-4 px-6">{formatPrice(product.price * product.stock_quantity)}</td>
                      <td className="py-4 px-6">
                        <Badge variant={product.stock_quantity > 0 ? "secondary" : "destructive"}>
                          {product.stock_quantity > 0 ? "In Stock" : "Sold Out"}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                            className="gap-2 border-primary/25 bg-white/65 hover:bg-secondary/70"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="gap-2 border-destructive/25 bg-white/65 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
