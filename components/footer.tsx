import Link from "next/link"
import { BUSINESS_CONFIG } from "@/lib/constants"
import { Instagram, MessageCircle, Sparkles } from "lucide-react"
import { MotionReveal } from "@/components/luxury-motion"

export function Footer() {
  return (
    <footer className="overflow-x-hidden border-t border-border bg-white/72 py-1.5 text-foreground backdrop-blur-xl sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-1 text-center sm:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-1.5">
              <span className="h-7 max-h-9 w-7 shrink-0 overflow-hidden rounded-full border border-primary/35 bg-white shadow-sm">
                <img src="/elegance-parfum-logo.jpeg" alt="Elegance Parfum logo" className="h-full w-full object-cover" />
              </span>
              <span className="min-w-0 truncate whitespace-nowrap text-[0.8rem] font-semibold leading-none text-foreground">
                {BUSINESS_CONFIG.BRAND_NAME}
              </span>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-1">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center justify-center gap-1 rounded-md bg-primary px-2 text-[0.68rem] font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-3 w-3" />
                WhatsApp
              </a>
              <a
                href={BUSINESS_CONFIG.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 items-center justify-center gap-1 rounded-md border border-primary/20 bg-white/60 px-2 text-[0.68rem] font-semibold text-primary"
              >
                <Instagram className="h-3 w-3" />
                Instagram
              </a>
            </div>
          </div>

          <p className="text-center text-[0.55rem] uppercase leading-none tracking-[0.06em] text-foreground/45">
            &copy; 2026 {BUSINESS_CONFIG.BRAND_NAME}
          </p>
        </div>

        <div className="hidden sm:block">
        <MotionReveal className="mb-8 grid gap-4 border-b border-border pb-8 sm:mb-10 sm:gap-6 sm:pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="inline-flex max-w-full items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.28em]">
              <Sparkles className="h-4 w-4" />
              Boutique de parfums de luxe
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:mt-4 sm:text-5xl">
              Elegance Parfum, des parfums 100% originaux importés d'Espagne.
            </h2>
          </div>
          <p className="max-w-2xl text-sm text-foreground/60 lg:text-right">
            Sélection premium pour homme et femme, conseil personnalisé, prix en DH et commande rapide via WhatsApp.
          </p>
        </MotionReveal>

        <div className="mb-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4 flex min-w-0 items-center gap-3">
              <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-primary/35 bg-white shadow-sm">
                <img src="/elegance-parfum-logo.jpeg" alt="Elegance Parfum logo" className="h-full w-full object-cover" />
              </span>
              <h3 className="min-w-0 text-2xl font-semibold leading-tight text-foreground">{BUSINESS_CONFIG.BRAND_NAME}</h3>
            </div>
            <p className="text-sm text-foreground/70">
              {BUSINESS_CONFIG.TAGLINE} spécialisée dans les parfums originaux importés directement d'Espagne.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:mb-4 sm:tracking-[0.28em]">Explorer</h4>
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
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:mb-4 sm:tracking-[0.28em]">Boutique</h4>
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
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:mb-4 sm:tracking-[0.28em]">Contact</h4>
            <p className="mb-3 text-sm text-foreground/70">Besoin d'un conseil parfum ? Notre boutique vous accompagne.</p>
            <div className="space-y-3 text-sm">
              <p>
                <a 
                  href={`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 max-w-full items-center gap-2 break-all rounded-md border border-primary/15 bg-white/50 px-3 py-2 text-foreground/70 hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp: {BUSINESS_CONFIG.WHATSAPP_DISPLAY}
                </a>
              </p>
              <p>
                <a 
                  href={BUSINESS_CONFIG.INSTAGRAM_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 max-w-full items-center gap-2 break-all rounded-md border border-primary/15 bg-white/50 px-3 py-2 text-foreground/70 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" /> Instagram: @{BUSINESS_CONFIG.INSTAGRAM_HANDLE}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-[0.68rem] uppercase tracking-[0.14em] text-foreground/45 sm:pt-8 sm:text-xs sm:tracking-[0.22em]">
          <p>&copy; 2026 {BUSINESS_CONFIG.BRAND_NAME} - parfums originaux importés d'Espagne. All rights reserved.</p>
        </div>
        </div>
      </div>
    </footer>
  )
}
