"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const productCardIsVisible = Array.from(document.querySelectorAll<HTMLElement>("[data-product-card]")).some(
        (card) => {
          const bounds = card.getBoundingClientRect()
          return bounds.bottom > 0 && bounds.top < window.innerHeight
        },
      )

      setIsVisible(window.scrollY > 640 && !productCardIsVisible)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility)

    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
    }
  }, [])

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-30 grid h-11 w-11 place-items-center rounded-full border border-[#C8A96B]/35 bg-white/92 text-[#8C7140] shadow-xl shadow-[#2A2A2A]/12 backdrop-blur-xl md:hidden"
      aria-label="Retour en haut"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
