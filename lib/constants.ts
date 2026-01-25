// Business Configuration
export const BUSINESS_CONFIG = {
  // WhatsApp Business Number (Nigeria: +234 -> 234)
  WHATSAPP_NUMBER: "2347030421369",
  WHATSAPP_DISPLAY: "07030421369",
  
  // Brand
  BRAND_NAME: "Mimi",
  TAGLINE: "Scentual Bliss",
  
  // Currency
  CURRENCY_SYMBOL: "₦",
  CURRENCY_CODE: "NGN",
  
  // Contact Information
  CONTACT_EMAIL: "mariamoyin0809@outlook.com",
  LOCATION_ADDRESS: "Opposite Old MTD, Akarigbo Road, Sabo, Sagamu",
  LOCATION_NAME: "Premium Boutique",
  
  // Social Media
  INSTAGRAM_HANDLE: "mimi_scentual_bliss",
  INSTAGRAM_URL: "https://www.instagram.com/mimi_scentual_bliss/profilecard/?igsh=ZmM2dXZjNGw5cnB5",
  TIKTOK_HANDLE: "_mimi_scent",
  TIKTOK_URL: "https://www.tiktok.com/@_mimi_scent?_t=ZM-8xvp0x0iMLA&_r=1",
} as const

export const formatPrice = (price: number): string => {
  return `${BUSINESS_CONFIG.CURRENCY_SYMBOL}${price.toLocaleString("en-NG")}`
}

export const getWhatsAppLink = (message: string): string => {
  return `https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
