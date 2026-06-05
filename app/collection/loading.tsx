import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function CollectionLoading() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navigation />
      <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="luxury-glass mb-7 rounded-xl p-5 sm:mb-10 sm:rounded-2xl sm:p-8 lg:p-10">
          <div className="premium-skeleton mb-5 h-5 w-48" />
          <div className="premium-skeleton mb-4 h-14 w-full max-w-lg" />
          <div className="premium-skeleton h-6 w-full max-w-2xl" />
        </div>
        <div className="mb-7 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
          <div className="premium-skeleton h-10 w-24 rounded-full" />
          <div className="premium-skeleton h-10 w-28 rounded-full" />
          <div className="premium-skeleton h-10 w-28 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="premium-skeleton h-[28rem]" />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
