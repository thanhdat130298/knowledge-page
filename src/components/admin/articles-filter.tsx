"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import { useState } from "react";

export function AdminArticlesFilter({
  initialQ,
  initialStatus,
}: {
  initialQ: string;
  initialStatus: string;
}) {
  const { isPending, navigate } = usePendingNavigation();
  const [q, setQ] = useState(initialQ);
  const [status, setStatus] = useState(initialStatus);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isPending) return;
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status) params.set("status", status);
    const qs = params.toString();
    navigate(qs ? `/admin/articles?${qs}` : "/admin/articles");
  }

  return (
    <form className="mt-6 flex flex-wrap gap-2" onSubmit={submit}>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search title/slug"
        aria-label="Search articles"
        disabled={isPending}
        className="max-w-xs"
      />
      <select
        value={status}
        onChange={(e) => {
          const value = e.target.value;
          setStatus(value);
          const params = new URLSearchParams();
          if (q.trim()) params.set("q", q.trim());
          if (value) params.set("status", value);
          const qs = params.toString();
          navigate(qs ? `/admin/articles?${qs}` : "/admin/articles");
        }}
        disabled={isPending}
        aria-label="Filter by status"
        className="h-10 rounded-xl border border-card-border bg-card px-3 text-sm disabled:opacity-50"
      >
        <option value="">All status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
      <Button type="submit" variant="secondary" loading={isPending}>
        {isPending ? "Đang lọc..." : "Lọc"}
      </Button>
    </form>
  );
}
