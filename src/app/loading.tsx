export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-card-border/60" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl border border-card-border bg-card"
          />
        ))}
      </div>
    </div>
  );
}
