import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { BUSINESS_CONFIG } from "@/lib/constants"
import { PageTransition } from "@/components/luxury-motion"

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.BRAND_NAME} – ${BUSINESS_CONFIG.TAGLINE} | Luxury Perfume`,
  description:
    "Discover the essence of luxury with Mimi – Scentual Bliss. Curated fragrances for the sophisticated woman. Premium perfumes in Nigeria.",
  keywords: [
    "luxury perfume",
    "fragrance",
    "Nigeria perfume",
    "women's perfume",
    "premium scents",
    "Sagamu",
  ],
  authors: [{ name: BUSINESS_CONFIG.BRAND_NAME }],
  creator: BUSINESS_CONFIG.BRAND_NAME,
  publisher: BUSINESS_CONFIG.BRAND_NAME,
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://mimi-scentual.com",
    siteName: `${BUSINESS_CONFIG.BRAND_NAME} – ${BUSINESS_CONFIG.TAGLINE}`,
    title: `${BUSINESS_CONFIG.BRAND_NAME} – ${BUSINESS_CONFIG.TAGLINE}`,
    description:
      "Discover the essence of luxury with Mimi – Scentual Bliss. Curated fragrances for the sophisticated woman.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_CONFIG.BRAND_NAME} – ${BUSINESS_CONFIG.TAGLINE}`,
    description:
      "Discover the essence of luxury with Mimi – Scentual Bliss. Curated fragrances for the sophisticated woman.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mimi-scentual.com" />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
