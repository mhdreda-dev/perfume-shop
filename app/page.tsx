"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  BadgeCheck,
  Gem,
  Gift,
  HeartHandshake,
  Instagram,
  Mars,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Venus,
} from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
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
  { icon: ShieldCheck, title: "100% Original", mobileTitle: "Original", text: "Produits authentiques vérifiés" },
  { icon: BadgeCheck, title: "Importé d'Espagne", mobileTitle: "Espagne", text: "Sélection premium directe" },
  { icon: Truck, title: "Livraison Rapide", mobileTitle: "Livraison", text: "Commande soignée au Maroc" },
  { icon: MessageCircle, title: "Support WhatsApp", mobileTitle: "WhatsApp", text: "Conseil parfum personnalisé" },
]

const heroPerfumeImages = [
  { src: "/1.jpg.avif", width: 1364, height: 1364 },
  { src: "/2.jpg.webp", width: 1850, height: 2000 },
  { src: "/3.jpg.webp", width: 1200, height: 1200 },
  { src: "/4.png.webp", width: 875, height: 876 },
]

const categories = [
  { icon: Mars, title: "Homme", text: "Boisés, aromatiques, intenses" },
  { icon: Venus, title: "Femme", text: "Floraux, ambrés, muscs doux" },
  { icon: Sparkles, title: "Unisexe", text: "Signatures modernes et raffinées" },
  { icon: Gift, title: "Coffrets Cadeaux", text: "Sélections premium prêtes à offrir" },
]

const premiumGuarantees = [
  { icon: ShieldCheck, title: "Authenticité vérifiée", text: "Chaque parfum est sélectionné comme produit original importé d'Espagne." },
  { icon: PackageCheck, title: "Commande soignée", text: "Préparation propre, emballage élégant et confirmation directe sur WhatsApp." },
  { icon: Truck, title: "Livraison suivie", text: "Accompagnement clair jusqu'à la réception de votre commande au Maroc." },
]

const testimonials = [
  {
    name: "Sara M.",
    context: "Cliente collection Femme",
    text: "Le parfum était original, bien emballé, et la recommandation sur WhatsApp était très précise.",
  },
  {
    name: "Yassine B.",
    context: "Commande cadeau",
    text: "Service rapide, prix clair en DH et présentation premium. La personne a adoré le parfum.",
  },
  {
    name: "Nadia R.",
    context: "Conseil personnalisé",
    text: "J'ai décrit mon style et j'ai reçu une proposition adaptée, élégante et facile à commander.",
  },
]

const whyChooseUs = [
  { icon: Gem, title: "Sélection premium", text: "Des signatures homme, femme et unisexes choisies pour leur tenue et leur élégance." },
  { icon: BadgeCheck, title: "Origine claire", text: "Des parfums authentiques importés d'Espagne avec une promesse simple et lisible." },
  { icon: HeartHandshake, title: "Conseil direct", text: "Une conversation WhatsApp pour confirmer le parfum, le budget et l'occasion." },
  { icon: Award, title: "Expérience fiable", text: "Prix en DH, suivi client et commande sans tunnel compliqué." },
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
    <section className="px-4 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
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
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#C8A96B]/22 bg-white/68 shadow-xl shadow-[#C8A96B]/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#C8A96B]/45 hover:shadow-[#C8A96B]/18"
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
                <div className="flex flex-1 flex-col space-y-4 p-5">
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
                    className="mt-auto min-h-11 w-full bg-[#2A2A2A] text-white hover:bg-[#C8A96B] hover:text-[#2A2A2A]"
                  >
                    <a
                      href={productMessage(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Commander ${product.name} sur WhatsApp`}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Commander sur WhatsApp
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
  const [hasMounted, setHasMounted] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -34])
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.035])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -22])
  const mistY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -48])
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -28])

  useEffect(() => {
    setHasMounted(true)

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
  const hommeProducts = products.filter((product) => product.gender === "homme")
  const femmeProducts = products.filter((product) => product.gender === "femme")
  const unisexeProducts = products.filter((product) => product.gender === "unisexe")
  const instagramProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF7F2] text-[#2A2A2A]">
      <Navigation />

      <main className="pb-24 md:pb-0">
        <section
          ref={heroRef}
          className="relative isolate flex min-h-[760px] overflow-hidden px-4 py-5 sm:min-h-[780px] sm:px-6 sm:py-8 lg:min-h-[calc(100svh-12rem)] lg:px-8 lg:py-8 xl:min-h-[720px]"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.98),transparent_16rem),radial-gradient(circle_at_58%_52%,rgba(222,190,121,0.38),transparent_25rem),linear-gradient(135deg,#fffdf8_0%,#fbf2e2_47%,#ead7b8_100%)]"
            style={hasMounted ? { y: particlesY } : undefined}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[14%] -z-10 h-56 w-[86vw] -translate-x-1/2 rounded-full bg-white/48 blur-3xl sm:h-72 lg:h-96"
            style={hasMounted ? { y: mistY } : undefined}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[36%] -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-[#D7B870]/24 blur-3xl sm:h-72 sm:w-72"
            style={hasMounted ? { y: glowY, scale: bottleScale } : undefined}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] top-[18%] h-1.5 w-1.5 rounded-full bg-[#D7B870]/70 shadow-[0_0_18px_rgba(215,184,112,0.62)] sm:left-[18%]"
            style={hasMounted ? { y: particlesY } : undefined}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute right-[12%] top-[30%] h-1 w-1 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.82)] sm:right-[20%]"
            style={hasMounted ? { y: mistY } : undefined}
          />
          {[
            "left-[19%] top-[45%] h-1 w-1 bg-[#C8A96B]/70",
            "right-[18%] top-[58%] h-1.5 w-1.5 bg-white/80",
            "bottom-[21%] left-[16%] h-1 w-1 bg-[#D7B870]/70 sm:left-[25%]",
          ].map((particleClass, index) => (
            <motion.div
              key={particleClass}
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-full shadow-[0_0_16px_rgba(200,169,107,0.58)] ${particleClass}`}
              animate={reduceMotion ? undefined : { y: [0, index % 2 ? -14 : 12, 0], opacity: [0.48, 0.88, 0.48] }}
              transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
              style={hasMounted ? { y: particlesY } : undefined}
            />
          ))}

          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
            <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#D7B870]/42 bg-white/78 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.11em] text-[#8C7140] shadow-sm shadow-[#D7B870]/10 backdrop-blur-xl min-[390px]:px-3.5 min-[390px]:text-[0.62rem] sm:px-4 sm:text-xs sm:tracking-[0.2em]"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>PARFUMS ORIGINAUX IMPORTÉS D’ESPAGNE</span>
              </motion.div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-[21.5rem] text-[2.04rem] font-semibold leading-[0.98] text-[#241D15] text-balance min-[390px]:max-w-[23rem] min-[390px]:text-[2.24rem] min-[430px]:max-w-[25rem] min-[430px]:text-[2.42rem] sm:mt-5 sm:max-w-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                L’art du parfum, signé Elegance.
              </motion.h1>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 max-w-[22rem] text-[0.88rem] leading-6 text-[#4B4034]/80 min-[430px]:max-w-[24rem] sm:mt-4 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg lg:leading-8"
              >
                Une sélection premium de parfums pour homme et femme, avec conseil WhatsApp et livraison au Maroc.
              </motion.p>
            </div>

            <motion.div
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto -mt-1 h-[226px] w-full max-w-[22rem] min-[390px]:h-[238px] min-[430px]:h-[252px] min-[430px]:max-w-[24rem] sm:-mt-5 sm:h-[330px] sm:max-w-[36rem] lg:-mt-6 lg:h-[370px] lg:max-w-[46rem]"
              style={hasMounted ? { y: bottleY, scale: bottleScale } : undefined}
            >
              <motion.div
                initial={false}
                className="absolute left-1/2 top-[53%] h-36 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7B870]/34 blur-3xl sm:h-48 lg:h-56"
                animate={reduceMotion ? undefined : { opacity: [0.34, 0.58, 0.34], scale: [0.96, 1.08, 0.96] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={hasMounted ? { y: glowY } : undefined}
              />
              <motion.div
                initial={false}
                className="absolute left-[23%] top-[14%] h-24 w-24 rounded-full bg-white/56 blur-2xl sm:h-40 sm:w-40"
                style={hasMounted ? { y: mistY } : undefined}
              />
              <motion.div
                initial={false}
                className="absolute right-[19%] top-[20%] h-20 w-20 rounded-full bg-[#F4DEAE]/52 blur-2xl sm:h-36 sm:w-36"
                style={hasMounted ? { y: particlesY } : undefined}
              />

              <div className="absolute inset-x-12 bottom-0 h-14 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(143,108,52,0.22),rgba(255,255,255,0)_68%)] blur-sm sm:inset-x-40 sm:h-20 lg:inset-x-56" />

              {heroPerfumeImages.map((image, imageIndex) => {
                const slotPaths = [
                  "translate3d(-50%, -52%, 0) scale(1)",
                  "translate3d(-122%, -42%, 0) scale(0.58)",
                  "translate3d(20%, -45%, 0) scale(0.62)",
                  "translate3d(-50%, 24%, 0) scale(0.48)",
                  "translate3d(-50%, -52%, 0) scale(1)",
                ]
                const slotOpacity = [1, 0.78, 0.86, 0.7, 1]
                const slotZIndex = [24, 12, 16, 8, 24]
                const cardPaths = Array.from({ length: 5 }, (_, step) => slotPaths[(step + imageIndex) % 4])
                const cardOpacity = Array.from({ length: 5 }, (_, step) => slotOpacity[(step + imageIndex) % 4])
                const cardZIndex = Array.from({ length: 5 }, (_, step) => slotZIndex[(step + imageIndex) % 4])

                return (
                <motion.div
                  key={image.src}
                  initial={false}
                  className="absolute left-1/2 top-[48%]"
                  style={hasMounted ? { y: [particlesY, mistY, glowY, bottleY][imageIndex] } : undefined}
                >
                  <motion.div
                    animate={
                      reduceMotion
                        ? { opacity: cardOpacity[0], transform: cardPaths[0], zIndex: cardZIndex[0] }
                        : { opacity: cardOpacity, transform: cardPaths, zIndex: cardZIndex }
                    }
                    transition={{
                      duration: 20,
                      times: [0, 0.25, 0.5, 0.75, 1],
                      repeat: reduceMotion ? 0 : Infinity,
                      ease: [0.45, 0, 0.18, 1],
                    }}
                    className="h-[214px] w-[140px] min-[390px]:h-[226px] min-[390px]:w-[148px] min-[430px]:h-[238px] min-[430px]:w-[156px] sm:h-[284px] sm:w-[184px] lg:h-[326px] lg:w-[210px]"
                  >
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              y: [0, imageIndex % 2 ? -8 : 9, 0],
                              x: [0, imageIndex % 2 ? 5 : -5, 0],
                              rotate: [-1.2, 1.4, -1.2],
                              scale: [1, 1.03, 1],
                            }
                      }
                      transition={{
                        duration: 5.6 + imageIndex * 0.35,
                        repeat: reduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative h-full w-full overflow-hidden rounded-[3rem_3rem_2rem_2rem] border border-white/75 bg-white/58 p-2 shadow-[0_30px_88px_rgba(137,102,47,0.3),inset_18px_0_30px_rgba(255,255,255,0.68)] backdrop-blur-xl sm:rounded-[4.25rem_4.25rem_2.75rem_2.75rem] sm:p-3"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.78),rgba(255,248,236,0.18)_42%,rgba(211,174,102,0.14)_70%,rgba(255,255,255,0.54))]" />
                      <Image
                        src={image.src}
                        alt=""
                        width={image.width}
                        height={image.height}
                        priority={imageIndex === 0}
                        sizes="(max-width: 640px) 164px, (max-width: 1024px) 236px, 282px"
                        className="relative h-full w-full rounded-[2.35rem_2.35rem_1.65rem_1.65rem] object-contain object-center sm:rounded-[3.5rem_3.5rem_2.2rem_2.2rem]"
                      />
                      <div className="absolute left-[18%] top-[16%] h-[62%] w-5 rounded-full bg-white/56 blur-sm sm:w-7" />
                      <div className="absolute inset-x-5 bottom-3 h-10 rounded-[50%] bg-white/22 blur-md" />
                      <div className="absolute bottom-3 left-1/2 h-px w-[72%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.74),transparent)]" />
                    </motion.div>
                  </motion.div>
                </motion.div>
                )
              })}

              <div className="absolute left-[18%] top-[24%] h-[48%] w-px rotate-12 bg-white/52 shadow-[0_0_22px_rgba(255,255,255,0.88)]" />
              <div className="absolute right-[20%] top-[18%] h-[54%] w-px -rotate-12 bg-white/48 shadow-[0_0_20px_rgba(255,255,255,0.82)]" />
              <div className="absolute bottom-[18%] left-1/2 h-px w-[68%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)]" />
            </motion.div>

            <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="-mt-3 grid w-full max-w-[22rem] gap-2 min-[430px]:max-w-[24rem] sm:-mt-5 sm:flex sm:w-auto sm:max-w-none sm:flex-row sm:gap-3 lg:-mt-7"
              >
                <MotionPress className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="min-h-11 w-full rounded-full bg-[#B89455] px-5 text-sm font-semibold text-white shadow-xl shadow-[#B89455]/22 hover:bg-[#A27D3D] sm:min-h-12 sm:w-auto sm:px-7"
                  >
                    <a
                      href={adviceMessage}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Commander sur WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Commander sur WhatsApp
                    </a>
                  </Button>
                </MotionPress>
                <MotionPress className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="min-h-11 w-full rounded-full border-[#D7B870]/45 bg-white/76 px-5 text-sm font-semibold text-[#4B4034] shadow-sm shadow-[#D7B870]/10 hover:bg-[#F3E7D4] sm:min-h-12 sm:w-auto sm:px-7"
                  >
                    <Link href="/collection" aria-label="Voir la collection de parfums">
                      <ShoppingBag className="h-4 w-4" />
                      Voir la collection
                    </Link>
                  </Button>
                </MotionPress>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.58, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 grid w-full max-w-[22rem] grid-cols-3 gap-2 min-[430px]:max-w-[24rem] sm:mt-4 sm:max-w-xl"
              >
                {trustItems.slice(0, 3).map((item) => (
                  <div
                    key={item.mobileTitle}
                    className="rounded-full border border-[#D7B870]/28 bg-white/68 px-2.5 py-2 text-center font-sans text-[0.68rem] font-semibold leading-tight text-[#4B4034] shadow-sm shadow-[#D7B870]/8 backdrop-blur-xl min-[390px]:text-[0.72rem] sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    {item.mobileTitle}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="luxury-badge">Garanties premium</span>
                <h2 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
                  Une commande simple, sûre et élégante.
                </h2>
              </div>
              <p className="max-w-xl text-[#2A2A2A]/65">
                Les garanties essentielles sont visibles avant l'achat pour réduire l'hésitation et clarifier la promesse.
              </p>
            </MotionReveal>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {premiumGuarantees.map((guarantee, index) => {
                const Icon = guarantee.icon
                return (
                  <MotionReveal
                    key={guarantee.title}
                    delay={index * 0.06}
                    className="flex h-full min-w-0 flex-col rounded-lg border border-[#C8A96B]/22 bg-white/68 p-3 shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl md:p-5"
                  >
                    <div className="mb-3 grid h-9 w-9 place-items-center rounded-full border border-[#C8A96B]/28 bg-[#F8F4EE] text-[#C8A96B] md:mb-5 md:h-12 md:w-12">
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className="font-sans text-[0.8rem] font-semibold leading-tight md:text-lg">{guarantee.title}</h3>
                    <p className="mt-2 break-words hyphens-auto text-xs! leading-[1.45]! text-[#2A2A2A]/68 md:mt-3 md:text-sm! md:leading-7!">
                      {guarantee.text}
                    </p>
                  </MotionReveal>
                )
              })}
            </div>
          </div>
        </section>

        <CollectionProductSection
          badge="Homme"
          title="Collection Homme"
          subtitle="Parfums masculins importés d'Espagne"
          products={hommeProducts}
          loading={loading}
        />

        <CollectionProductSection
          badge="Femme"
          title="Collection Femme"
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
              <span className="luxury-badge">Catégories</span>
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
              <span className="luxury-badge">Pourquoi nous choisir</span>
              <h2 className="mt-4 text-3xl leading-tight sm:text-5xl">Une boutique premium, claire et fiable.</h2>
              <p className="mt-5 text-[#2A2A2A]/65">
                Nous privilégions des références authentiques, une communication directe et une expérience de commande simple.
              </p>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="grid gap-4">
                {whyChooseUs.map((item, index) => {
                  const Icon = item.icon
                  return (
                  <div key={item.title} className="flex gap-4 rounded-lg border border-[#C8A96B]/22 bg-white/60 p-4 shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#C8A96B]/18 text-[#8C7140]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#2A2A2A]/70">{item.text}</p>
                    </div>
                  </div>
                  )
                })}
              </div>
            </MotionReveal>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionReveal className="mb-8 text-center">
              <span className="luxury-badge">Avis clients</span>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-tight sm:text-5xl">
                Des achats guidés avec soin.
              </h2>
            </MotionReveal>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <MotionReveal
                  key={testimonial.name}
                  delay={index * 0.06}
                  className="rounded-lg border border-[#C8A96B]/22 bg-white/68 p-5 shadow-lg shadow-[#C8A96B]/8 backdrop-blur-xl"
                >
                  <div className="mb-5 flex gap-1 text-[#C8A96B]" aria-label="Avis cinq étoiles">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-[#2A2A2A]/72">"{testimonial.text}"</p>
                  <div className="mt-5 border-t border-[#C8A96B]/18 pt-4">
                    <div className="font-sans text-sm font-semibold">{testimonial.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[#8C7140]">{testimonial.context}</div>
                  </div>
                </MotionReveal>
              ))}
            </div>
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

      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C8A96B]/24 bg-[#FAF7F2]/92 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl shadow-[#2A2A2A]/10 backdrop-blur-xl md:hidden">
        <Button asChild size="lg" className="min-h-11 w-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/15 hover:bg-[#1fb457]">
          <a href={adviceMessage} target="_blank" rel="noopener noreferrer" aria-label="Commander ou demander conseil sur WhatsApp">
            <MessageCircle className="h-4 w-4" />
            Commander sur WhatsApp
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  )
}
