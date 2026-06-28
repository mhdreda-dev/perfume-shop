import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { BUSINESS_CONFIG } from "@/lib/constants"
import { PageTransition } from "@/components/luxury-motion"

export const metadata: Metadata = {
  metadataBase: new URL("https://eleganceparfum.ma"),
  title: `${BUSINESS_CONFIG.BRAND_NAME} | Parfums originaux importés d'Espagne`,
  applicationName: BUSINESS_CONFIG.BRAND_NAME,
  description:
    "Elegance Parfum propose des parfums 100% originaux importés directement d'Espagne pour homme et femme, avec prix en DH, livraison rapide et support WhatsApp.",
  keywords: [
    "Elegance Parfum",
    "parfum original Maroc",
    "parfums Espagne",
    "parfum homme",
    "parfum femme",
    "parfum luxe DH",
    "boutique parfum Maroc",
  ],
  authors: [{ name: BUSINESS_CONFIG.BRAND_NAME }],
  creator: BUSINESS_CONFIG.BRAND_NAME,
  publisher: BUSINESS_CONFIG.BRAND_NAME,
  category: "beauty",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://eleganceparfum.ma",
    siteName: BUSINESS_CONFIG.BRAND_NAME,
    title: `${BUSINESS_CONFIG.BRAND_NAME} | Parfums originaux importés d'Espagne`,
    description:
      "Boutique premium de parfums authentiques importés d'Espagne, pour homme et femme, avec livraison rapide et conseil WhatsApp.",
    images: [
      {
        url: "/luxury-perfume-brand-luxury-aesthetic.jpg",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_CONFIG.BRAND_NAME} - parfums originaux importés d'Espagne`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_CONFIG.BRAND_NAME} | Parfums originaux importés d'Espagne`,
    description:
      "Parfums 100% originaux importés d'Espagne, prix en DH, livraison rapide et support WhatsApp.",
    images: ["/luxury-perfume-brand-luxury-aesthetic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: BUSINESS_CONFIG.BRAND_NAME,
  description:
    "Boutique premium de parfums originaux importés d'Espagne, avec livraison au Maroc et conseil WhatsApp.",
  url: "https://eleganceparfum.ma",
  image: "https://eleganceparfum.ma/luxury-perfume-brand-luxury-aesthetic.jpg",
  email: BUSINESS_CONFIG.CONTACT_EMAIL,
  telephone: BUSINESS_CONFIG.WHATSAPP_DISPLAY,
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
    addressLocality: "Maroc",
  },
  sameAs: [BUSINESS_CONFIG.INSTAGRAM_URL, BUSINESS_CONFIG.TIKTOK_URL],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f7f1e4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://eleganceparfum.ma" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
