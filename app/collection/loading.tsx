import { ProductGridSkeleton } from "@/components/skeletons"

export default function CollectionLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="h-10 bg-muted rounded w-1/3 mb-2 animate-pulse" />
        <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
      </div>
      <ProductGridSkeleton count={6} />
    </div>
  )
}
