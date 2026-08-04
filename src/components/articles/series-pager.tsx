import Link from "next/link";
import type { Article } from "@/types";
import { ChevronLeft, ChevronRight, ListOrdered } from "lucide-react";

function shortTitle(title: string, max = 48) {
  const t = title.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/** Dedicated prev/next pager for reading a series in order (1 → N). */
export function SeriesPager({
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
  if (index < 0 || articles.length < 2) return null;
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <nav
      aria-label="Điều hướng series"
      className="my-8 max-w-full overflow-hidden rounded-xl border border-card-border bg-card p-4"
    >
      <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-2 text-sm">
        <Link
          href={`/series/${seriesSlug}`}
          className="inline-flex min-w-0 max-w-full items-center gap-1.5 font-medium text-accent hover:underline"
        >
          <ListOrdered className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{seriesTitle}</span>
        </Link>
        <span className="shrink-0 text-xs text-muted">
          Bài {index + 1} / {articles.length}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/articles/${prev.slug}`}
            className="group flex min-w-0 items-start gap-2 rounded-lg border border-card-border px-3 py-3 hover:bg-accent-soft/40"
            title={prev.title}
          >
            <ChevronLeft
              className="mt-0.5 h-5 w-5 shrink-0 text-muted group-hover:text-accent"
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-xs text-muted">Bài trước</span>
              <span className="mt-0.5 block break-words font-medium leading-snug">
                {shortTitle(prev.title)}
              </span>
            </span>
          </Link>
        ) : (
          <div
            className="hidden rounded-lg border border-dashed border-card-border/60 px-3 py-3 text-sm text-muted sm:block"
            aria-hidden
          >
            Đầu series
          </div>
        )}

        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="group flex min-w-0 items-start gap-2 rounded-lg border border-card-border px-3 py-3 hover:bg-accent-soft/40 sm:flex-row-reverse sm:text-right"
            title={next.title}
          >
            <ChevronRight
              className="mt-0.5 h-5 w-5 shrink-0 text-muted group-hover:text-accent"
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-xs text-muted">Bài tiếp</span>
              <span className="mt-0.5 block break-words font-medium leading-snug">
                {shortTitle(next.title)}
              </span>
            </span>
          </Link>
        ) : (
          <div
            className="rounded-lg border border-dashed border-card-border/60 px-3 py-3 text-sm text-muted sm:text-right"
            aria-hidden
          >
            Hết series
          </div>
        )}
      </div>
    </nav>
  );
}
