export const ELEGANCE_BRAND_IMAGE = "/elegance-parfum-logo.jpeg"

export function getSafeProductImage(imageUrl?: string | null) {
  const value = imageUrl?.trim()

  if (!value) {
    return ELEGANCE_BRAND_IMAGE
  }

  if (value.startsWith("/products/") || value.startsWith("data:image/")) {
    return value
  }

  return ELEGANCE_BRAND_IMAGE
}
