
// Business Configuration
export const BUSINESS_CONFIG = {
  // WhatsApp Business Number
  WHATSAPP_NUMBER: "212690126763",
  WHATSAPP_DISPLAY: "+212 690-126763",
  
  // Brand
  BRAND_NAME: "Elegance Parfum",
  TAGLINE: "Boutique de parfums de luxe",
  
  // Currency
  CURRENCY_SYMBOL: "DH",
  CURRENCY_CODE: "MAD",
  
  // Contact Information
  CONTACT_EMAIL: "contact@eleganceparfum.ma",
  LOCATION_ADDRESS: "Parfums originaux importés d'Espagne, Maroc",
  LOCATION_NAME: "Boutique premium",
  
  // Social Media
  INSTAGRAM_HANDLE: "eleganceparfum__2",
  INSTAGRAM_URL: "https://www.instagram.com/eleganceparfum__2",
  TIKTOK_HANDLE: "eleganceparfum",
  TIKTOK_URL: "https://www.tiktok.com/@eleganceparfum",
} as const

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("fr-MA")} ${BUSINESS_CONFIG.CURRENCY_SYMBOL}`
}

export const getWhatsAppLink = (message: string): string => {
  return `https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
