export type ProductGender = "homme" | "femme"

export type GenderedProduct<T extends { name: string }> = T & {
  gender: ProductGender
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

export function withProductGender<T extends { name: string }>(product: T): GenderedProduct<T> {
  return {
    ...product,
    gender: getProductGender(product),
  }
}
