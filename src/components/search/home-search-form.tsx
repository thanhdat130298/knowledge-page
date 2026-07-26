"use client";

import { Button } from "@/components/ui/button";
import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export function HomeSearchForm() {
  const { isPending, navigate } = usePendingNavigation();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isPending) return;
    const query = q.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form
      onSubmit={submit}
      className="animate-fade-up animate-delay-3 mt-8 flex max-w-xl gap-2"
      role="search"
    >
      <label className="sr-only" htmlFor="home-search">
        Tìm kiếm
      </label>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          id="home-search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={isPending}
          placeholder="Event loop, closure, SSR..."
          className="h-12 w-full rounded-xl border border-card-border bg-card pl-10 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
        />
      </div>
      <Button type="submit" size="lg" loading={isPending}>
        {isPending ? "Đang tìm..." : "Tìm"}
      </Button>
    </form>
  );
}
