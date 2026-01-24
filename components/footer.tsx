import Link from "next/link"
import { BUSINESS_CONFIG } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{BUSINESS_CONFIG.BRAND_NAME}</h3>
            <p className="text-sm opacity-80">{BUSINESS_CONFIG.TAGLINE} – Luxury fragrances for the modern woman.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/" className="hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:opacity-100">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/about" className="hover:opacity-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:opacity-100">
                  Testimonials
                </Link>
              </li>
              <li>
                <a href="/contact" className="hover:opacity-100">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <p className="text-sm opacity-80 mb-3">Follow us on social media for exclusive offers and new fragrances.</p>
            <div className="space-y-2 text-sm">
              <p className="opacity-80">
                <a 
                  href={`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-100 hover:underline"
                >
                  📱 WhatsApp: {BUSINESS_CONFIG.WHATSAPP_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-70">
          <p>&copy; 2026 {BUSINESS_CONFIG.BRAND_NAME} – {BUSINESS_CONFIG.TAGLINE}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
