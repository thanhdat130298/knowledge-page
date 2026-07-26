"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import { useEffect, useState } from "react";

const HISTORY_KEY = "kf-search-history";

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const { isPending, navigate } = usePendingNavigation();
  const [q, setQ] = useState(initialQuery);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      setQ(initialQuery);
    });
  }, [initialQuery]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (raw) setHistory(JSON.parse(raw) as string[]);
      } catch {
        // ignore
      }
    });
  }, []);

  function goSearch(query: string) {
    const trimmed = query.trim();
    if (trimmed) {
      const next = [trimmed, ...history.filter((h) => h !== trimmed)].slice(0, 8);
      setHistory(next);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    }
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isPending) return;
    goSearch(q);
  }

  return (
    <div>
      <form onSubmit={submit} className="flex gap-2" role="search">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nhập từ khóa..."
          aria-label="Từ khóa tìm kiếm"
          disabled={isPending}
        />
        <Button type="submit" loading={isPending}>
          {isPending ? "Đang tìm..." : "Tìm"}
        </Button>
      </form>
      {isPending ? (
        <p className="mt-2 text-xs text-muted" role="status" aria-live="polite">
          Đang tải kết quả tìm kiếm...
        </p>
      ) : null}
      {history.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          <span>Lịch sử:</span>
          {history.map((h) => (
            <button
              key={h}
              type="button"
              disabled={isPending}
              className="rounded-md border border-card-border px-2 py-1 hover:bg-accent-soft disabled:opacity-50"
              onClick={() => {
                setQ(h);
                goSearch(h);
              }}
            >
              {h}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
