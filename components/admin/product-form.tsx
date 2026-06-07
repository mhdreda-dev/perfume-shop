"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BUSINESS_CONFIG, formatPrice } from "@/lib/constants"
import { ELEGANCE_BRAND_IMAGE, getSafeProductImage } from "@/lib/local-images"
import { PRODUCT_GENDER_LABELS, PRODUCT_GENDERS, type ProductGender } from "@/lib/product-gender"

interface ProductFormProps {
  initialData?: {
    id?: number
    name: string
    price: number
    stock_quantity: number
    image_url: string
    description: string
    notes: string
    gender?: ProductGender | null
  }
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      price: 0,
      stock_quantity: 0,
      image_url: "",
      description: "",
      notes: "",
      gender: "unisexe" as ProductGender,
    },
  )
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock_quantity" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setFormData((prev) => ({ ...prev, image_url: result }))
    }
    reader.readAsDataURL(file)
  }

  const handleGenderChange = (gender: ProductGender) => {
    setFormData((prev) => ({ ...prev, gender }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.price || formData.stock_quantity < 0) {
      setError("Please fill in all required fields")
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-x-hidden">
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name *</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            disabled={isLoading}
            className="min-h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Price ({BUSINESS_CONFIG.CURRENCY_SYMBOL}) *
          </label>
          <div className="space-y-1">
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="1"
              min="0"
              required
              disabled={isLoading}
              className="min-h-11"
            />
            {formData.price > 0 && (
              <p className="text-xs text-foreground/60">
                Preview: {formatPrice(formData.price)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Quantity *</label>
          <div className="space-y-1">
            <Input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
              disabled={isLoading}
              className="min-h-11"
            />
            {formData.price > 0 && formData.stock_quantity > 0 && (
              <p className="text-xs text-foreground/60">
                Inventory Value: {formatPrice(formData.price * formData.stock_quantity)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Genre</label>
          <Select
            value={formData.gender || "unisexe"}
            onValueChange={(value) => handleGenderChange(value as ProductGender)}
            disabled={isLoading}
          >
            <SelectTrigger className="min-h-11 w-full bg-white/65">
              <SelectValue placeholder="Choisir un genre" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_GENDERS.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {PRODUCT_GENDER_LABELS[gender]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image URL</label>
          <div className="flex flex-col gap-2">
            <Input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
              className="min-h-11"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className="max-w-full text-sm"
            />
            {formData.image_url && (
              <img
                src={getSafeProductImage(formData.image_url)}
                alt="preview"
                className="h-24 w-24 rounded object-cover"
                onError={(event) => {
                  event.currentTarget.src = ELEGANCE_BRAND_IMAGE
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Fragrance Notes</label>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter fragrance notes (e.g., Top: Bergamot, Heart: Rose, Base: Sandalwood)"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData?.id ? "Update Product" : "Add Product"}
      </Button>
    </form>
  )
}
