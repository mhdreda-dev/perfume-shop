"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-20">
        <div className="max-w-md space-y-6 text-center">
          <div>
            <h1 className="mb-2 text-5xl font-bold text-primary sm:text-6xl">404</h1>
            <p className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">Page Not Found</p>
            <p className="text-base text-foreground/70 sm:text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="grid gap-3 sm:flex sm:justify-center">
            <Button asChild size="lg" className="min-h-11 bg-primary hover:bg-primary/90">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-11">
              <Link href="/collection">Browse Collection</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
