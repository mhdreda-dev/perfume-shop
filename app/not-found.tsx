"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center space-y-6 max-w-md">
          <div>
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <p className="text-4xl font-bold text-foreground mb-2">Page Not Found</p>
            <p className="text-foreground/70 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/collection">Browse Collection</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
