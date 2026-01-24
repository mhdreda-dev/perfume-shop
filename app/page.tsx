import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-background to-secondary/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Discover Your
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Scentual Bliss
                </span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Immerse yourself in the world of luxurious fragrances. Each scent tells a story of elegance, sensuality,
                and timeless sophistication.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/collection">Explore Collection</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Perfume bottle showcase"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Mimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "Crafted with the finest ingredients from around the world.",
              },
              {
                title: "Luxurious Experience",
                description: "Each fragrance is designed to evoke emotion and elegance.",
              },
              {
                title: "Exclusive Blends",
                description: "Curated scents that define sophistication and femininity.",
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Signature Scent?</h2>
          <p className="text-lg text-foreground/70">
            Explore our exclusive collection and discover fragrances that resonate with your essence.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/collection">Browse Collection</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
