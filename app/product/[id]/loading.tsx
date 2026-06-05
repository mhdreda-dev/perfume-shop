import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ProductLoading() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="premium-skeleton mb-6 h-5 w-48 sm:mb-8 sm:w-56" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
          <div>
            <div className="premium-skeleton aspect-[4/5]" />
            <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
              <div className="premium-skeleton aspect-square" />
              <div className="premium-skeleton aspect-square" />
              <div className="premium-skeleton aspect-square" />
            </div>
          </div>

          <div className="luxury-glass rounded-xl p-5 sm:rounded-2xl sm:p-8 lg:p-10">
            <div className="space-y-6 sm:space-y-8">
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

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
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
