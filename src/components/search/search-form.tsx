"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HISTORY_KEY = "kf-search-history";

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [history, setHistory] = useState<string[]>([]);

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

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      const next = [query, ...history.filter((h) => h !== query)].slice(0, 8);
      setHistory(next);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    }
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <div>
      <form onSubmit={submit} className="flex gap-2" role="search">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nhập từ khóa..."
          aria-label="Từ khóa tìm kiếm"
        />
        <Button type="submit">Tìm</Button>
      </form>
      {history.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          <span>Lịch sử:</span>
          {history.map((h) => (
            <button
              key={h}
              type="button"
              className="rounded-md border border-card-border px-2 py-1 hover:bg-accent-soft"
              onClick={() => {
                setQ(h);
                router.push(`/search?q=${encodeURIComponent(h)}`);
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
