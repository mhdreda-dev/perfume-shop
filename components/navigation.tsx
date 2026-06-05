"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, ShoppingBag, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { BUSINESS_CONFIG } from "@/lib/constants"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = pathname.startsWith("/admin")

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/collection", label: "Collection" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/72 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="h-10 w-10 overflow-hidden rounded-full border border-primary/35 bg-white shadow-sm">
              <img src="/elegance-parfum-logo.jpeg" alt="Elegance Parfum logo" className="h-full w-full object-cover" />
            </span>
            <span className="text-xl font-semibold text-foreground sm:text-2xl">
              {BUSINESS_CONFIG.BRAND_NAME}
            </span>
            <span className="hidden text-xs uppercase tracking-[0.22em] text-muted-foreground lg:inline">Import original Espagne</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!isAdmin &&
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && <span className="absolute -bottom-2 left-0 h-px w-full bg-primary" />}
                </Link>
              ))}
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary/30 bg-white/65 hover:bg-secondary/70">
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/65 text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            whileTap={{ scale: 0.92 }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden pb-4"
            initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.24 }}
          >
            <div className="luxury-glass space-y-2 rounded-2xl p-3">
            {!isAdmin &&
              links.map((link) => (
                <motion.div key={link.href} whileTap={{ scale: 0.98 }}>
                  <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-lg px-3 py-3 text-sm hover:bg-secondary/70 ${
                    pathname === link.href ? "bg-primary/10 text-primary" : "text-foreground/75"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
                </motion.div>
              ))}
            {!isAdmin && (
              <Link
                href="/collection"
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm font-medium text-primary-foreground hover:bg-accent"
              >
                <ShoppingBag className="h-4 w-4" />
                Commander
              </Link>
            )}
            {isAdmin && (
              <button onClick={handleLogout} className="w-full rounded-lg px-3 py-3 text-left text-sm hover:bg-secondary/70">
                Logout
              </button>
            )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
