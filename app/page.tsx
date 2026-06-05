import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MotionFloat, MotionPress, MotionReveal } from "@/components/luxury-motion"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navigation />

      <section className="relative px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionReveal className="space-y-7">
            <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Moroccan perfume boutique
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
                Premium scents with a <span className="gold-text">Moroccan glow</span>
              </h1>
              <p className="max-w-xl text-base text-foreground/70 sm:text-lg">
                A light-luxury curation of perfume rituals, golden warmth, and elegant signature blends made for refined
                daily wear.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <MotionPress>
                <Button asChild size="lg" className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-accent">
                  <Link href="/collection">Explore Collection</Link>
                </Button>
              </MotionPress>
              <MotionPress>
              <Button asChild variant="outline" size="lg" className="border-primary/30 bg-white/65 hover:bg-secondary/70">
                  <Link href="/contact">Contact Boutique</Link>
                </Button>
              </MotionPress>
              </div>
            <div className="grid grid-cols-3 gap-3 pt-4 text-sm text-foreground/70">
              {["Layered oud", "Amber florals", "Gift-ready"].map((item, index) => (
                <MotionFloat key={item} delay={index * 0.08} className="luxury-panel rounded-lg px-3 py-3 text-center">
                  {item}
                </MotionFloat>
              ))}
            </div>
          </MotionReveal>

          <MotionFloat className="relative" delay={0.12}>
            <div className="luxury-glass relative overflow-hidden rounded-2xl p-3">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-secondary/20">
                <img
                  src="/luxury-perfume-bottle-elegant.jpg"
                  alt="Luxury Moroccan perfume bottle"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-primary/20 bg-white/75 p-4 shadow-xl shadow-primary/10 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Signature edit</p>
                <p className="mt-2 text-lg font-medium text-foreground">Velvet amber, saffron, and soft musk.</p>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-primary/25 bg-white/75 px-4 py-3 text-right shadow-xl shadow-primary/10 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-primary">New ritual</p>
                <p className="text-sm text-foreground/80">Evening glass drop</p>
              </div>
            </div>
          </MotionFloat>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-primary">Boutique standards</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Why Choose Mimi</h2>
            </div>
            <p className="max-w-xl text-sm text-foreground/70 sm:text-base">
              Every visual detail is designed around clarity, tactility, and a premium shopping rhythm from first glance
              to order.
            </p>
          </MotionReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: "Premium Quality",
                description: "Finely composed scents presented with polished boutique restraint.",
              },
              {
                title: "Moroccan Warmth",
                description: "A gold, ivory, amber, and oud mood inspired by Moroccan evening rituals.",
              },
              {
                title: "Clear Ordering",
                description: "Focused product cards, readable pricing, and direct WhatsApp CTAs.",
              },
            ].map((feature, i) => (
              <MotionReveal key={i} delay={i * 0.08} className="luxury-glass rounded-xl p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/45">
                <div className="mb-6 h-px w-12 bg-primary" />
                <h3 className="mb-3 text-2xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionReveal className="space-y-5">
            <span className="luxury-badge">Magazine edit</span>
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">A scent wardrobe for golden Moroccan nights.</h2>
            <p className="max-w-xl text-foreground/70">
              Build a ritual around warm amber, luminous florals, and polished musks. Each bottle is presented with the
              quiet confidence of a private perfume salon.
            </p>
            <MotionPress className="inline-block">
              <Button asChild variant="outline" className="border-primary/25 bg-white/65 hover:bg-secondary/70">
                <Link href="/collection">Shop the edit</Link>
              </Button>
            </MotionPress>
          </MotionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["01", "Oud & amber", "Deep, resinous, and tailored for evening wear."],
              ["02", "Floral veil", "Soft petals balanced with champagne-like brightness."],
              ["03", "Musk finish", "A clean lasting trail with intimate projection."],
              ["04", "Gift ritual", "Boutique-ready selection for refined gifting."],
            ].map(([number, title, text], index) => (
              <MotionFloat key={title} delay={index * 0.06} className="luxury-glass rounded-xl p-6">
                <p className="text-sm text-primary">{number}</p>
                <h3 className="mt-8 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm text-foreground/65">{text}</p>
              </MotionFloat>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <MotionReveal className="luxury-glass mx-auto max-w-5xl rounded-2xl px-6 py-10 text-center sm:px-10">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Private selection</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl">Ready to Find Your Signature Scent?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-foreground/70">
            Explore our exclusive collection and discover fragrances that resonate with your essence.
          </p>
          <MotionPress className="inline-block">
          <Button asChild size="lg" className="mt-7 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-accent">
            <Link href="/collection">Browse Collection</Link>
          </Button>
          </MotionPress>
        </MotionReveal>
      </section>

      <Footer />
    </div>
  )
}
