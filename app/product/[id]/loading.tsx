import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 h-4 bg-muted rounded w-1/4 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="aspect-square bg-muted rounded-lg animate-pulse" />

          {/* Info skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
            </div>

            <div className="flex gap-4">
              <div className="h-12 bg-muted rounded flex-1 animate-pulse" />
              <div className="h-12 bg-muted rounded flex-1 animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
