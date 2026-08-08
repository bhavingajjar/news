export function FeedSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-line bg-white"
        >
          <div className="aspect-[16/10] animate-pulse bg-mist" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-4/5 animate-pulse rounded bg-mist" />
            <div className="h-4 w-full animate-pulse rounded bg-mist" />
            <div className="h-4 w-3/5 animate-pulse rounded bg-mist" />
            <div className="h-9 w-28 animate-pulse rounded-lg bg-mist" />
          </div>
        </div>
      ))}
    </div>
  )
}
