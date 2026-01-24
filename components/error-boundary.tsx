"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-destructive mb-2">Oops!</h1>
          <p className="text-foreground/70 text-lg">Something went wrong</p>
        </div>

        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-left">
          <p className="text-sm text-destructive font-mono">{error.message}</p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={() => reset()} size="lg" className="bg-primary hover:bg-primary/90">
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
