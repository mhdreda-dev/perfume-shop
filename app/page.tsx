"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Heart,
  Instagram,
  Mars,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Venus,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { MotionFloat, MotionPress, MotionReveal } from "@/components/luxury-motion"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { BUSINESS_CONFIG, formatPrice, getWhatsAppLink } from "@/lib/constants"
import { ELEGANCE_BRAND_IMAGE, getSafeProductImage } from "@/lib/local-images"

type Product = {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description?: string
  notes?: string
}

const trustItems = [
  { icon: ShieldCheck, title: "100% Original", text: "Produits authentiques vérifiés" },
  { icon: BadgeCheck, title: "Importé d'Espagne", text: "Sélection premium directe" },
  { icon: Truck, title: "Livraison Rapide", text: "Commande soignée au Maroc" },
  { icon: MessageCircle, title: "Support WhatsApp", text: "Conseil parfum personnalisé" },
]

const categories = [
  { icon: Mars, title: "Homme", text: "Boisés, aromatiques, intenses" },
  { icon: Venus, title: "Femme", text: "Floraux, ambrés, muscs doux" },
  { icon: Sparkles, title: "Unisexe", text: "Signatures modernes et raffinées" },
  { icon: Gift, title: "Coffrets Cadeaux", text: "Sélections premium prêtes à offrir" },
]

const whyChooseUs = [
  "Parfums authentiques importés directement d'Espagne.",
  "Prix compétitifs en DH pour une expérience premium accessible.",
  "Livraison rapide avec emballage soigné et suivi client.",
  "Satisfaction client au coeur de chaque recommandation.",
]

function productMessage(product: Product) {
  return getWhatsAppLink(
    `Bonjour ${BUSINESS_CONFIG.BRAND_NAME}, je souhaite commander ${product.name} à ${formatPrice(product.price)}.`,
  )
}

function ProductImage({ product, className }: { product?: Product; className?: string }) {
  const image = getSafeProductImage(product?.image_url)

  return (
    <img
      src={image}
      alt={product ? `${product.name} Elegance Parfum` : "Elegance Parfum"}
      className={className}
      onError={(event) => {
        event.currentTarget.src = ELEGANCE_BRAND_IMAGE
      }}
    />
  )
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Unable to load products")
        setProducts(await response.json())
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const adviceMessage = getWhatsAppLink(
    `Bonjour ${BUSINESS_CONFIG.BRAND_NAME}, j'ai besoin d'un conseil pour choisir un parfum original importé d'Espagne.`,
  )
  const heroProduct = products[0]
  const featuredProducts = products.slice(0, 3)
  const bestSellers = products.slice(0, 6)
  const instagramProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF7F2] text-[#2A2A2A]">
      <Navigation />

      <main>
        <section className="relative px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
              "left-[8%] top-[14%]",
              "left-[42%] top-[8%]",
              "right-[12%] top-[20%]",
              "left-[18%] bottom-[22%]",
              "right-[34%] bottom-[14%]",
            ].map((position, index) => (
              <span
                key={position}
                className={`absolute ${position} h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8A96B]/45 shadow-[0_0_28px_rgba(200,169,107,0.45)]`}
                style={{ animationDelay: `${index * 0.35}s` }}
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <MotionReveal className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C8A96B]/30 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8C7140] shadow-sm backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                Luxury perfume boutique
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.92] text-balance sm:text-7xl lg:text-8xl">
                Découvrez l'Art du Parfum
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#2A2A2A]/70 sm:text-lg">
                Parfums 100% originaux importés directement d'Espagne.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MotionPress>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 bg-[#2A2A2A] px-7 text-white shadow-xl shadow-[#2A2A2A]/15 hover:bg-[#C8A96B] hover:text-[#2A2A2A]"
                  >
                    <Link href="/collection">
                      Voir la Collection
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MotionPress>
                <MotionPress>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 border-[#C8A96B]/45 bg-white/70 px-7 text-[#2A2A2A] shadow-lg shadow-[#C8A96B]/10 hover:bg-[#E8DCCB]"
                  >
                    <a href={adviceMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Commander Maintenant
                    </a>
                  </Button>
                </MotionPress>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {["Original", "Espagne", "Livraison rapide"].map((item, index) => (
                  <MotionFloat
                    key={item}
                    delay={index * 0.06}
                    className="rounded-lg border border-[#C8A96B]/24 bg-white/58 px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#8C7140] shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl"
                  >
                    {item}
                  </MotionFloat>
                ))}
              </div>
            </MotionReveal>

            <MotionFloat delay={0.12} className="relative z-10">
              <div className="relative overflow-hidden rounded-lg border border-[#C8A96B]/28 bg-white/55 p-3 shadow-2xl shadow-[#C8A96B]/16 backdrop-blur-xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#E8DCCB]">
                  <ProductImage
                    product={heroProduct}
                    className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.04),rgba(42,42,42,0.18))]" />
                </div>
                <div className="absolute left-6 top-6 rounded-lg border border-white/70 bg-white/78 px-4 py-3 shadow-xl shadow-[#C8A96B]/12 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8C7140]">Produit vedette</p>
                  <p className="mt-1 font-serif text-2xl font-semibold">
                    {heroProduct ? formatPrice(heroProduct.price) : "DH"}
                  </p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-[#C8A96B]/24 bg-white/80 p-4 shadow-xl shadow-[#C8A96B]/12 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8C7140]">Elegance Parfum</p>
                  <p className="mt-2 text-lg font-medium">
                    {heroProduct?.name || "Sélection premium de parfums originaux importés d'Espagne."}
                  </p>
                </div>
              </div>
            </MotionFloat>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon
              return (
                <MotionReveal
                  key={item.title}
                  delay={index * 0.05}
                  className="rounded-lg border border-[#C8A96B]/22 bg-white/62 p-5 shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl"
                >
                  <Icon className="mb-6 h-6 w-6 text-[#C8A96B]" />
                  <h2 className="font-sans text-base font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-[#2A2A2A]/62">{item.text}</p>
                </MotionReveal>
              )
            })}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="luxury-badge">Featured Perfumes</span>
                <h2 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Parfums originaux, sélectionnés avec exigence.</h2>
              </div>
              <p className="max-w-xl text-[#2A2A2A]/65">
                Des fragrances importées d'Espagne pour hommes et femmes qui recherchent une signature premium,
                authentique et durable.
              </p>
            </MotionReveal>

            {loading ? (
              <div className="grid gap-5 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="premium-skeleton h-[30rem]" />
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3">
                {featuredProducts.map((product, index) => (
                  <MotionReveal
                    key={product.id}
                    delay={index * 0.08}
                    className="group overflow-hidden rounded-lg border border-[#C8A96B]/22 bg-white/62 shadow-xl shadow-[#C8A96B]/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#C8A96B]/45 hover:shadow-[#C8A96B]/18"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DCCB]">
                      <ProductImage
                        product={product}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                      />
                      <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/78 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8C7140] backdrop-blur-md">
                        {product.stock_quantity > 0 ? "Disponible" : "Rupture"}
                      </span>
                    </div>
                    <div className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl leading-tight">{product.name}</h3>
                        <p className="shrink-0 text-lg font-semibold text-[#8C7140]">{formatPrice(product.price)}</p>
                      </div>
                      <p className="line-clamp-2 text-sm text-[#2A2A2A]/62">{product.notes || product.description || "Parfum original importé d'Espagne."}</p>
                      <Button asChild className="w-full bg-[#2A2A2A] text-white hover:bg-[#C8A96B] hover:text-[#2A2A2A]">
                        <a href={productMessage(product)} target="_blank" rel="noopener noreferrer">
                          <ShoppingBag className="h-4 w-4" />
                          Ajouter au panier
                        </a>
                      </Button>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            ) : (
              <MotionReveal className="rounded-lg border border-[#C8A96B]/22 bg-white/62 p-8 text-center shadow-lg shadow-[#C8A96B]/8">
                <p className="text-[#2A2A2A]/65">Aucun produit disponible pour le moment.</p>
              </MotionReveal>
            )}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="luxury-badge">Best Sellers</span>
                <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Les favoris de la boutique.</h2>
              </div>
              <p className="max-w-md text-sm text-[#2A2A2A]/62">
                Les premiers parfums de la collection, affichés depuis les données réelles de la boutique.
              </p>
            </MotionReveal>

            {bestSellers.length > 0 ? (
              <div className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
                {bestSellers.map((product, index) => (
                  <MotionFloat
                    key={product.id}
                    delay={index * 0.04}
                    className="min-w-[17rem] snap-start overflow-hidden rounded-lg border border-[#C8A96B]/22 bg-white/64 shadow-lg shadow-[#C8A96B]/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 md:min-w-[20rem]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#E8DCCB]">
                      <ProductImage product={product} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.08),rgba(42,42,42,0.22))]" />
                    </div>
                    <div className="p-5">
                      <div className="mb-8 flex items-center justify-between">
                        <div className="flex gap-1 text-[#C8A96B]">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star key={starIndex} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <Heart className="h-5 w-5 text-[#C8A96B]" />
                      </div>
                      <h3 className="text-2xl">{product.name}</h3>
                      <p className="mt-3 line-clamp-2 text-sm text-[#2A2A2A]/62">{product.notes || product.description || "Parfum original importé d'Espagne."}</p>
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <p className="text-xl font-semibold text-[#8C7140]">{formatPrice(product.price)}</p>
                        <Button asChild size="sm" variant="outline" className="border-[#C8A96B]/35 bg-white/70 hover:bg-[#E8DCCB]">
                          <a href={productMessage(product)} target="_blank" rel="noopener noreferrer">Ajouter</a>
                        </Button>
                      </div>
                    </div>
                  </MotionFloat>
                ))}
              </div>
            ) : (
              <MotionReveal className="rounded-lg border border-[#C8A96B]/22 bg-white/62 p-8 text-center shadow-lg shadow-[#C8A96B]/8">
                <p className="text-[#2A2A2A]/65">Les best sellers apparaîtront ici dès que des produits seront ajoutés.</p>
              </MotionReveal>
            )}
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-10 text-center">
              <span className="luxury-badge">Categories</span>
              <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">Trouvez la famille qui vous ressemble.</h2>
            </MotionReveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <MotionReveal
                    key={category.title}
                    delay={index * 0.05}
                    className="rounded-lg border border-[#C8A96B]/22 bg-white/62 p-6 text-center shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#C8A96B]/45"
                  >
                    <div className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-full border border-[#C8A96B]/28 bg-[#F8F4EE] text-[#C8A96B]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl">{category.title}</h3>
                    <p className="mt-3 text-sm text-[#2A2A2A]/62">{category.text}</p>
                  </MotionReveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <MotionReveal className="rounded-lg border border-[#C8A96B]/22 bg-white/60 p-8 shadow-2xl shadow-[#C8A96B]/10 backdrop-blur-xl">
              <span className="luxury-badge">Why Choose Us</span>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Une boutique premium, claire et fiable.</h2>
              <p className="mt-5 text-[#2A2A2A]/65">
                Nous privilégions des références authentiques, une communication directe et une expérience de commande simple.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="grid gap-4">
                {whyChooseUs.map((text, index) => (
                  <div key={text} className="flex gap-4 rounded-lg border border-[#C8A96B]/22 bg-white/60 p-4 shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C8A96B]/18 text-sm font-semibold text-[#8C7140]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[#2A2A2A]/70">{text}</p>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="luxury-badge">Instagram</span>
                <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Nos derniers instants parfum.</h2>
              </div>
              <Button asChild variant="outline" className="border-[#C8A96B]/35 bg-white/70 hover:bg-[#E8DCCB]">
                <a href={BUSINESS_CONFIG.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  Suivre Instagram
                </a>
              </Button>
            </MotionReveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {(instagramProducts.length > 0 ? instagramProducts : [undefined, undefined, undefined, undefined]).map((product, index) => (
                <MotionFloat
                  key={product?.id || index}
                  delay={index * 0.05}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-[#C8A96B]/22 bg-[#E8DCCB] shadow-lg shadow-[#C8A96B]/8"
                >
                  <ProductImage
                    product={product}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.06),rgba(42,42,42,0.28))]" />
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                    {product?.name || "Elegance Parfum"}
                  </p>
                </MotionFloat>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <MotionReveal className="mx-auto grid max-w-7xl gap-6 rounded-lg border border-[#C8A96B]/28 bg-white/70 p-6 shadow-2xl shadow-[#C8A96B]/12 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="luxury-badge">Conseil personnalisé</span>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Besoin d'un conseil parfum ?</h2>
              <p className="mt-4 max-w-2xl text-[#2A2A2A]/65">
                Parlez-nous de votre style, de votre budget en DH et de l'occasion. Nous vous recommandons le parfum
                original le plus adapté.
              </p>
            </div>
            <MotionPress>
              <Button asChild size="lg" className="h-12 bg-[#25D366] px-7 text-white shadow-xl shadow-[#25D366]/20 hover:bg-[#1fb457]">
                <a href={adviceMessage} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </MotionPress>
          </MotionReveal>
        </section>

        <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
          <a
            href={adviceMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[#C8A96B]/25 bg-[#2A2A2A] px-4 text-sm font-semibold text-white shadow-2xl shadow-[#2A2A2A]/24 backdrop-blur-xl"
          >
            <MessageCircle className="h-4 w-4" />
            Commander Maintenant
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
