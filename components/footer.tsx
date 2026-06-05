import Link from "next/link"
import { BUSINESS_CONFIG } from "@/lib/constants"
import { Instagram, MessageCircle, Music2, Sparkles } from "lucide-react"
import { MotionReveal } from "@/components/luxury-motion"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/70 py-14 text-foreground backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal className="mb-12 grid gap-6 border-b border-border pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-4 w-4" />
              Private fragrance house
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Scentual Bliss, curated with quiet Moroccan luxury.
            </h2>
          </div>
          <p className="text-sm text-foreground/60 lg:text-right">
            Boutique perfume ordering, personal guidance, and refined gift-ready selections.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold gold-text">{BUSINESS_CONFIG.BRAND_NAME}</h3>
            <p className="text-sm text-foreground/70">{BUSINESS_CONFIG.TAGLINE} - luxury Moroccan-inspired fragrances for refined daily rituals.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Explore</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:text-primary">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Maison</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/collection" className="hover:text-primary">
                  Signature Scents
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Boutique Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Concierge</h4>
            <p className="mb-3 text-sm text-foreground/70">Follow us for boutique edits, drops, and private fragrance guidance.</p>
            <div className="space-y-3 text-sm">
              <p>
                <a 
                  href={`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp: {BUSINESS_CONFIG.WHATSAPP_DISPLAY}
                </a>
              </p>
              <p>
                <a 
                  href={BUSINESS_CONFIG.INSTAGRAM_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" /> Instagram: @{BUSINESS_CONFIG.INSTAGRAM_HANDLE}
                </a>
              </p>
              <p>
                <a 
                  href={BUSINESS_CONFIG.TIKTOK_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary"
                >
                  <Music2 className="h-4 w-4" /> TikTok: @{BUSINESS_CONFIG.TIKTOK_HANDLE}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-xs uppercase tracking-[0.22em] text-foreground/40">
          <p>&copy; 2026 {BUSINESS_CONFIG.BRAND_NAME} - {BUSINESS_CONFIG.TAGLINE}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
