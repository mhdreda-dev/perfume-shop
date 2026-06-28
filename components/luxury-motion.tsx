"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

type MotionProps = {
  children: ReactNode
  className?: string
  delay?: number
  "data-product-card"?: boolean
}

export function MotionReveal({ children, className, delay = 0, "data-product-card": dataProductCard }: MotionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      data-product-card={dataProductCard || undefined}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function MotionFloat({ children, className, delay = 0 }: MotionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      {children}
    </motion.div>
  )
}

export function MotionPress({ children, className }: Omit<MotionProps, "delay">) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(6px)" }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
