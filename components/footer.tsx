import Link from "next/link"
import { BUSINESS_CONFIG } from "@/lib/constants"
import { Instagram, MessageCircle, Sparkles } from "lucide-react"
import { MotionReveal } from "@/components/luxury-motion"

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/70 py-14 text-foreground backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal className="mb-12 grid gap-6 border-b border-border pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-4 w-4" />
              Boutique de parfums de luxe
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Elegance Parfum, des parfums 100% originaux importés d'Espagne.
            </h2>
          </div>
          <p className="text-sm text-foreground/60 lg:text-right">
            Sélection premium pour homme et femme, conseil personnalisé, prix en DH et commande rapide via WhatsApp.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-12 w-12 overflow-hidden rounded-full border border-primary/35 bg-white shadow-sm">
                <img src="/elegance-parfum-logo.jpeg" alt="Elegance Parfum logo" className="h-full w-full object-cover" />
              </span>
              <h3 className="text-2xl font-semibold text-foreground">{BUSINESS_CONFIG.BRAND_NAME}</h3>
            </div>
            <p className="text-sm text-foreground/70">
              {BUSINESS_CONFIG.TAGLINE} spécialisée dans les parfums originaux importés directement d'Espagne.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Explorer</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary">
                  Accueil
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
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Boutique</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/collection" className="hover:text-primary">
                  Parfums homme
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:text-primary">
                  Parfums femme
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Support boutique
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Contact</h4>
            <p className="mb-3 text-sm text-foreground/70">Besoin d'un conseil parfum ? Notre boutique vous accompagne.</p>
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
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-xs uppercase tracking-[0.22em] text-foreground/40">
          <p>&copy; 2026 {BUSINESS_CONFIG.BRAND_NAME} - parfums originaux importés d'Espagne. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
