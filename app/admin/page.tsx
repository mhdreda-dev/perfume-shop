"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Plus, Package, DollarSign, AlertCircle } from "lucide-react"
import { ProductForm } from "@/components/admin/product-form"
import { BUSINESS_CONFIG, formatPrice } from "@/lib/constants"

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-foreground/70 mt-2">Manage your perfume products and inventory</p>
          </div>
          {!showForm && !editingProduct && (
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            {successMessage}
          </div>
        )}

        {/* Statistics Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Total Products</p>
                  <p className="text-3xl font-bold mt-2">{totalProducts}</p>
                </div>
                <Package className="w-12 h-12 text-primary/20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">In Stock</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{inStockProducts}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Sold Out</p>
                  <p className="text-3xl font-bold mt-2 text-red-600">{soldOutProducts}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70">Inventory Value</p>
                  <p className="text-3xl font-bold mt-2 text-primary">{formatPrice(totalValue)}</p>
                </div>
                <DollarSign className="w-12 h-12 text-primary/20" />
              </div>
            </Card>
          </div>
        )}

        {/* Add/Edit Form */}
        {(showForm || editingProduct) && (
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
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
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-foreground/70">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <Card className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <p className="text-foreground/70 mb-4">No products yet. Create your first perfume!</p>
            <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
              Add Product
            </Button>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
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
                    <tr key={product.id} className="border-b border-border hover:bg-secondary/5 transition">
                      <td className="py-4 px-6">
                        <div className="flex gap-3 items-center">
                          <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover"
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
                            product.stock_quantity > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
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
                            className="gap-2"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="gap-2 text-destructive hover:bg-destructive/10"
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
