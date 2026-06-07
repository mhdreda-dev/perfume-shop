export type ProductGender = "homme" | "femme" | "unisexe"

export type GenderedProduct<T extends { name: string; gender?: string | null }> = T & {
  gender: ProductGender
}

export const PRODUCT_GENDERS: ProductGender[] = ["homme", "femme", "unisexe"]

export const PRODUCT_GENDER_LABELS: Record<ProductGender, string> = {
  homme: "Homme",
  femme: "Femme",
  unisexe: "Unisexe",
}

const hommeKeywords = [
  "libre homme",
  "jean paul gaultier le beau",
  "le beau",
  "stronger with you",
  "acqua di gio",
  "terre d'hermes",
  "terre d hermes",
  "sauvage",
  "bleu de chanel",
  "eros",
  "invictus",
  "one million",
  "bad boy",
  "pour homme",
  "homme",
  "uomo",
]

const femmeKeywords = [
  "good girl",
  "my way",
  "l'interdit rouge",
  "interdit rouge",
  "black opium",
  "libre femme",
  "libre",
  "la vie est belle",
  "lady million",
  "scandal",
  "alien",
  "j'adore",
  "jadore",
  "olympea",
  "fame",
]

function normalizeProductName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’`]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getProductGender(product: { name: string }): ProductGender {
  const name = normalizeProductName(product.name)

  if (hommeKeywords.some((keyword) => name.includes(keyword))) {
    return "homme"
  }

  if (femmeKeywords.some((keyword) => name.includes(keyword))) {
    return "femme"
  }

  return "femme"
}

export function normalizeProductGender(value?: string | null): ProductGender | null {
  return PRODUCT_GENDERS.includes(value as ProductGender) ? (value as ProductGender) : null
}

export function resolveProductGender(product: { name: string; gender?: string | null }): ProductGender {
  return normalizeProductGender(product.gender) || getProductGender(product)
}

export function withProductGender<T extends { name: string; gender?: string | null }>(product: T): GenderedProduct<T> {
  return {
    ...product,
    gender: resolveProductGender(product),
  }
}
