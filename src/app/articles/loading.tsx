export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="h-8 w-40 animate-pulse rounded-lg bg-card-border/60" />
      <div className="mt-2 h-4 w-64 animate-pulse rounded bg-card-border/40" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="hidden h-80 animate-pulse rounded-xl border border-card-border bg-card lg:block" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-card-border bg-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
