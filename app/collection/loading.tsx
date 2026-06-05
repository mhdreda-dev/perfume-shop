import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function CollectionLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="luxury-glass mb-10 rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="premium-skeleton mb-5 h-5 w-48" />
          <div className="premium-skeleton mb-4 h-14 w-full max-w-lg" />
          <div className="premium-skeleton h-6 w-full max-w-2xl" />
        </div>
        <div className="mb-8 flex gap-3">
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
