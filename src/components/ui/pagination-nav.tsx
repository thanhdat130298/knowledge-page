"use client";

import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import { cn } from "@/lib/utils";

type Props = {
  pages: number;
  current: number;
  /** Path without query, e.g. `/articles` or `/search` */
  pathname: string;
  /** Serializable query params (excluding `page`, which is set per button) */
  query?: Record<string, string>;
};

export function PaginationNav({
  pages,
  current,
  pathname,
  query = {},
}: Props) {
  const { isPending, navigate } = usePendingNavigation();

  if (pages <= 1) return null;

  function hrefForPage(page: number) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div className="mt-8 flex max-w-full flex-col items-center gap-2 overflow-x-auto">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            disabled={isPending || p === current}
            aria-current={p === current ? "page" : undefined}
            aria-busy={isPending || undefined}
            onClick={() => navigate(hrefForPage(p))}
            className={cn(
              "inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border px-2 text-sm disabled:opacity-50",
              p === current
                ? "border-accent bg-accent-soft text-accent"
                : "border-card-border hover:bg-accent-soft",
            )}
          >
            {p}
          </button>
        ))}
      </div>
      {isPending ? (
        <p className="text-xs text-muted" role="status" aria-live="polite">
          Đang tải trang...
        </p>
      ) : null}
    </div>
  );
}
