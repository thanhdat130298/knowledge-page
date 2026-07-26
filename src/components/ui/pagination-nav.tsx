"use client";

import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import { cn } from "@/lib/utils";

type Props = {
  pages: number;
  current: number;
  hrefForPage: (page: number) => string;
};

export function PaginationNav({ pages, current, hrefForPage }: Props) {
  const { isPending, navigate } = usePendingNavigation();

  if (pages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            disabled={isPending || p === current}
            aria-current={p === current ? "page" : undefined}
            aria-busy={isPending || undefined}
            onClick={() => navigate(hrefForPage(p))}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm disabled:opacity-50",
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
