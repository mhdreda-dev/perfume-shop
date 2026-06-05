import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="premium-skeleton mb-8 h-5 w-56" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="premium-skeleton aspect-[4/5]" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="premium-skeleton aspect-square" />
              <div className="premium-skeleton aspect-square" />
              <div className="premium-skeleton aspect-square" />
            </div>
          </div>

          <div className="luxury-glass rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="space-y-8">
            <div className="space-y-4">
              <div className="premium-skeleton h-5 w-48" />
              <div className="premium-skeleton h-16 w-full" />
              <div className="premium-skeleton h-9 w-44" />
            </div>

            <div className="space-y-3">
              <div className="premium-skeleton h-4 w-full" />
              <div className="premium-skeleton h-4 w-full" />
              <div className="premium-skeleton h-4 w-2/3" />
            </div>

            <div className="flex gap-4">
              <div className="premium-skeleton h-12 flex-1" />
              <div className="premium-skeleton h-12 flex-1" />
            </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
