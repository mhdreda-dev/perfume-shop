"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Instagram,
  Mars,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Venus,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { MotionFloat, MotionPress, MotionReveal } from "@/components/luxury-motion"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { BUSINESS_CONFIG, formatPrice, getWhatsAppLink } from "@/lib/constants"
import { ELEGANCE_BRAND_IMAGE, getSafeProductImage } from "@/lib/local-images"
import { PRODUCT_GENDER_LABELS, type ProductGender, withProductGender } from "@/lib/product-gender"

type Product = {
  id: number
  name: string
  price: number
  stock_quantity: number
  image_url: string
  description?: string
  notes?: string
  gender: ProductGender
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

function CollectionProductSection({
  badge,
  title,
  subtitle,
  products,
  loading,
}: {
  badge: string
  title: string
  subtitle: string
  products: Product[]
  loading: boolean
}) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <MotionReveal className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="min-w-0">
            <span className="luxury-badge">{badge}</span>
            <h2 className="mt-4 max-w-2xl text-3xl leading-tight sm:text-5xl">{title}</h2>
          </div>
          <p className="max-w-xl text-[#2A2A2A]/65">{subtitle}</p>
        </MotionReveal>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="premium-skeleton h-[30rem]" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {products.slice(0, 3).map((product, index) => (
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
                  <span className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/78 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8C7140] backdrop-blur-md">
                    {PRODUCT_GENDER_LABELS[product.gender]}
                  </span>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl leading-tight sm:text-2xl">{product.name}</h3>
                    <p className="shrink-0 text-base font-semibold text-[#8C7140] sm:text-lg">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-sm text-[#2A2A2A]/62">
                    {product.notes || product.description || "Parfum original importé d'Espagne."}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-[#2A2A2A] text-white hover:bg-[#C8A96B] hover:text-[#2A2A2A]"
                  >
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
            <p className="text-[#2A2A2A]/65">Aucun parfum dans cette collection pour le moment.</p>
          </MotionReveal>
        )}
      </div>
    </section>
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
        const data = await response.json()
        setProducts(data.map(withProductGender))
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
  const hommeProducts = products.filter((product) => product.gender === "homme")
  const femmeProducts = products.filter((product) => product.gender === "femme")
  const unisexeProducts = products.filter((product) => product.gender === "unisexe")
  const instagramProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF7F2] text-[#2A2A2A]">
      <Navigation />

      <main className="pb-3 md:pb-0">
        <section className="relative px-4 pb-5 pt-3 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8 lg:pb-24 lg:pt-14">
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

          <div className="mx-auto grid max-w-7xl items-center gap-4 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <MotionReveal className="relative z-10">
              <div className="mb-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#C8A96B]/30 bg-white/60 px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#8C7140] shadow-sm backdrop-blur-xl sm:mb-7 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Luxury perfume boutique
              </div>

              <h1 className="max-w-[20rem] text-[2.05rem] font-semibold leading-[0.94] text-balance min-[390px]:text-[2.3rem] sm:max-w-4xl sm:text-7xl lg:text-8xl">
                Découvrez l'Art du Parfum
              </h1>
              <p className="mt-2 max-w-[19rem] text-xs leading-5 text-[#2A2A2A]/70 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
                Parfums originaux importés d'Espagne.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-9 sm:flex sm:flex-row sm:gap-3">
                <MotionPress className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="h-10 w-full bg-[#2A2A2A] px-3 text-xs text-white shadow-xl shadow-[#2A2A2A]/15 hover:bg-[#C8A96B] hover:text-[#2A2A2A] sm:h-12 sm:w-auto sm:px-7 sm:text-sm"
                  >
                    <Link href="/collection">
                      <span className="sm:hidden">Collection</span>
                      <span className="hidden sm:inline">Voir la Collection</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </MotionPress>
                <MotionPress className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-10 w-full border-[#C8A96B]/45 bg-white/70 px-3 text-xs text-[#2A2A2A] shadow-lg shadow-[#C8A96B]/10 hover:bg-[#E8DCCB] sm:h-12 sm:w-auto sm:px-7 sm:text-sm"
                  >
                    <a href={adviceMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="sm:hidden">WhatsApp</span>
                      <span className="hidden sm:inline">Commander Maintenant</span>
                    </a>
                  </Button>
                </MotionPress>
              </div>

              <div className="mt-3 grid max-w-xl grid-cols-3 gap-1.5 sm:mt-10 sm:gap-3">
                {["Original", "Espagne", "Livraison rapide"].map((item, index) => (
                  <MotionFloat
                    key={item}
                    delay={index * 0.06}
                    className="rounded-md border border-[#C8A96B]/24 bg-white/58 px-1.5 py-1.5 text-center text-[0.55rem] font-semibold uppercase tracking-[0.07em] text-[#8C7140] shadow-md shadow-[#C8A96B]/8 backdrop-blur-xl sm:rounded-lg sm:px-3 sm:py-4 sm:text-xs sm:tracking-[0.16em]"
                  >
                    {item}
                  </MotionFloat>
                ))}
              </div>
            </MotionReveal>

            <MotionFloat delay={0.12} className="relative z-10">
              <div className="relative overflow-hidden rounded-lg border border-[#C8A96B]/32 bg-white/62 p-2 shadow-xl shadow-[#C8A96B]/14 backdrop-blur-xl sm:p-3 sm:shadow-2xl sm:shadow-[#C8A96B]/16">
                <div className="relative aspect-square max-h-[18rem] overflow-hidden rounded-md bg-[#E8DCCB] sm:aspect-[4/5] sm:max-h-[34rem]">
                  <ProductImage
                    product={heroProduct}
                    className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.04),rgba(42,42,42,0.18))]" />
                </div>
                <div className="absolute left-3 top-3 rounded-md border border-white/70 bg-white/80 px-2.5 py-1.5 shadow-lg shadow-[#C8A96B]/12 backdrop-blur-xl sm:left-6 sm:top-6 sm:rounded-lg sm:px-4 sm:py-3">
                  <p className="text-[0.58rem] uppercase leading-none tracking-[0.16em] text-[#8C7140] sm:text-xs sm:tracking-[0.22em]">Produit vedette</p>
                  <p className="mt-0.5 font-serif text-base font-semibold sm:mt-1 sm:text-2xl">
                    {heroProduct ? formatPrice(heroProduct.price) : "DH"}
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 rounded-md border border-[#C8A96B]/24 bg-white/82 p-2 shadow-lg shadow-[#C8A96B]/12 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-lg sm:p-4">
                  <p className="text-[0.58rem] uppercase leading-none tracking-[0.16em] text-[#8C7140] sm:text-xs sm:tracking-[0.22em]">Elegance Parfum</p>
                  <p className="mt-1 line-clamp-1 text-xs font-medium sm:mt-2 sm:line-clamp-2 sm:text-lg">
                    {heroProduct?.name || "Sélection premium de parfums originaux importés d'Espagne."}
                  </p>
                </div>
              </div>
            </MotionFloat>
          </div>
        </section>

        <section className="py-2 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden">
            <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon
              return (
                <MotionReveal
                  key={item.title}
                  delay={index * 0.05}
                  className="w-[180px] shrink-0 snap-start rounded-lg border border-[#C8A96B]/22 bg-white/62 p-2.5 shadow-md shadow-[#C8A96B]/8 backdrop-blur-xl min-[390px]:w-[200px] sm:w-auto sm:shrink sm:p-5 sm:shadow-lg"
                >
                  <Icon className="mb-2 h-4 w-4 text-[#C8A96B] sm:mb-6 sm:h-6 sm:w-6" />
                  <h2 className="font-sans text-sm font-semibold leading-tight sm:text-base">{item.title}</h2>
                  <p className="mt-2 hidden text-sm text-[#2A2A2A]/62 sm:block">
                    {item.text}
                  </p>
                </MotionReveal>
              )
            })}
            </div>
          </div>
        </section>

        <CollectionProductSection
          badge="Homme"
          title="Homme Collection"
          subtitle="Parfums masculins importés d'Espagne"
          products={hommeProducts}
          loading={loading}
        />

        <CollectionProductSection
          badge="Femme"
          title="Femme Collection"
          subtitle="Parfums féminins importés d'Espagne"
          products={femmeProducts}
          loading={loading}
        />

        {!loading && unisexeProducts.length > 0 && (
          <CollectionProductSection
            badge="Unisexe"
            title="Collection Unisexe"
            subtitle="Signatures mixtes modernes et raffinées"
            products={unisexeProducts}
            loading={loading}
          />
        )}

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-10 text-center">
              <span className="luxury-badge">Categories</span>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">Trouvez la famille qui vous ressemble.</h2>
            </MotionReveal>
            <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <MotionReveal
                    key={category.title}
                    delay={index * 0.05}
                    className="rounded-lg border border-[#C8A96B]/22 bg-white/62 p-4 text-center shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#C8A96B]/45 sm:p-6"
                  >
                    <div className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-full border border-[#C8A96B]/28 bg-[#F8F4EE] text-[#C8A96B]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl">{category.title}</h3>
                    <p className="mt-3 text-sm text-[#2A2A2A]/62">{category.text}</p>
                  </MotionReveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <MotionReveal className="rounded-lg border border-[#C8A96B]/22 bg-white/60 p-5 shadow-2xl shadow-[#C8A96B]/10 backdrop-blur-xl sm:p-8">
              <span className="luxury-badge">Why Choose Us</span>
              <h2 className="mt-4 text-3xl leading-tight sm:text-5xl">Une boutique premium, claire et fiable.</h2>
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

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="luxury-badge">Instagram</span>
                <h2 className="mt-4 text-3xl leading-tight sm:text-5xl">Nos derniers instants parfum.</h2>
              </div>
              <Button asChild variant="outline" className="min-h-11 w-full border-[#C8A96B]/35 bg-white/70 hover:bg-[#E8DCCB] sm:w-auto">
                <a href={BUSINESS_CONFIG.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  Suivre Instagram
                </a>
              </Button>
            </MotionReveal>
            <div className="grid grid-cols-2 gap-2 min-[390px]:gap-3 md:grid-cols-4">
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
                  <p className="absolute bottom-3 left-3 right-3 line-clamp-2 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:bottom-4 sm:left-4 sm:right-4 sm:text-sm sm:tracking-[0.18em]">
                    {product?.name || "Elegance Parfum"}
                  </p>
                </MotionFloat>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-3 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <MotionReveal className="mx-auto grid max-w-7xl gap-2 rounded-lg border border-[#C8A96B]/28 bg-white/70 p-2.5 shadow-xl shadow-[#C8A96B]/10 backdrop-blur-xl sm:gap-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="luxury-badge">Conseil personnalisé</span>
              <h2 className="mt-1.5 text-xl leading-tight sm:mt-4 sm:text-5xl">Besoin d'un conseil parfum ?</h2>
              <p className="mt-4 hidden max-w-2xl text-[#2A2A2A]/65 sm:block sm:text-base sm:leading-7">
                Parlez-nous de votre style, de votre budget en DH et de l'occasion. Nous vous recommandons le parfum
                original le plus adapté.
              </p>
            </div>
            <MotionPress>
              <Button asChild size="sm" className="h-8 w-full bg-[#25D366] px-3 text-xs text-white shadow-lg shadow-[#25D366]/15 hover:bg-[#1fb457] sm:h-12 sm:w-auto sm:px-7 sm:text-base">
                <a href={adviceMessage} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  WhatsApp
                </a>
              </Button>
            </MotionPress>
          </MotionReveal>
        </section>

        <div className="fixed inset-x-3 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-40 md:hidden">
          <a
            href={adviceMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2 rounded-lg border border-[#C8A96B]/25 bg-[#2A2A2A] px-4 text-sm font-semibold text-white shadow-2xl shadow-[#2A2A2A]/24 backdrop-blur-xl"
          >
            <MessageCircle className="h-4 w-4" />
            Commander Maintenant
          </a>
        </div>
      </main>

      <div className="mb-[calc(4.5rem+env(safe-area-inset-bottom))] md:mb-0">
        <Footer />
      </div>
    </div>
  )
}
