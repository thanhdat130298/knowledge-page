import Link from "next/link";
import type { Article } from "@/types";

export function SeriesNav({
  seriesTitle,
  seriesSlug,
  articles,
  currentId,
}: {
  seriesTitle: string;
  seriesSlug: string;
  articles: Article[];
  currentId: string;
}) {
  const index = articles.findIndex((a) => a.id === currentId);
  if (index < 0) return null;
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <aside className="max-w-full overflow-hidden rounded-xl border border-card-border bg-card p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">
        Series
      </div>
      <Link
        href={`/series/${seriesSlug}`}
        className="mt-1 block break-words font-medium text-accent hover:underline"
      >
        {seriesTitle}
      </Link>
      <p className="mt-1 text-xs text-muted">
        Bài {index + 1} / {articles.length}
      </p>

      <ol className="mt-3 max-h-56 space-y-1.5 overflow-y-auto text-sm">
        {articles.map((a, i) => (
          <li key={a.id} className="min-w-0">
            <Link
              href={`/articles/${a.slug}`}
              className={
                a.id === currentId
                  ? "block break-words font-medium text-foreground"
                  : "block break-words text-muted hover:text-accent"
              }
              aria-current={a.id === currentId ? "page" : undefined}
            >
              {i + 1}. {a.title}
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/articles/${prev.slug}`}
            className="min-w-0 rounded-lg border border-card-border px-3 py-1.5 hover:bg-accent-soft/40"
            title={prev.title}
          >
            <span className="block truncate">← {prev.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="min-w-0 rounded-lg border border-card-border px-3 py-1.5 hover:bg-accent-soft/40 sm:text-right"
            title={next.title}
          >
            <span className="block truncate">{next.title} →</span>
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
