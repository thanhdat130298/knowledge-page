"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePendingNavigation } from "@/lib/hooks/use-pending-navigation";
import type { ArticleLevel, ArticleSort } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
};

export function ArticleFilters({ categories, tags }: Props) {
  const pathname = usePathname();
  const params = useSearchParams();
  const { isPending, navigate } = usePendingNavigation();
  const [open, setOpen] = useState(false);

  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [tag, setTag] = useState(params.get("tag") || "");
  const [level, setLevel] = useState(params.get("level") || "");
  const [sort, setSort] = useState(params.get("sort") || "updated");

  useEffect(() => {
    queueMicrotask(() => {
      setQ(params.get("q") || "");
      setCategory(params.get("category") || "");
      setTag(params.get("tag") || "");
      setLevel(params.get("level") || "");
      setSort(params.get("sort") || "updated");
    });
  }, [params]);

  function apply(overrides?: Record<string, string>) {
    if (isPending) return;
    const next = new URLSearchParams();
    const values = {
      q,
      category,
      tag,
      level,
      sort,
      ...overrides,
    };
    Object.entries(values).forEach(([k, v]) => {
      if (v) next.set(k, v);
    });
    next.delete("page");
    const qs = next.toString();
    navigate(qs ? `${pathname}?${qs}` : pathname);
    // Keep mobile filter open while pending so the busy state stays visible
  }

  const selectClass =
    "h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm disabled:opacity-50";

  const form = (
    <div className="space-y-3">
      <Input
        placeholder="Tìm trong danh sách..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search filter"
        disabled={isPending}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            apply();
          }
        }}
      />
      <select
        className={selectClass}
        value={category}
        disabled={isPending}
        onChange={(e) => {
          const value = e.target.value;
          setCategory(value);
          apply({ category: value });
        }}
        aria-label="Category"
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={tag}
        disabled={isPending}
        onChange={(e) => {
          const value = e.target.value;
          setTag(value);
          apply({ tag: value });
        }}
        aria-label="Tag"
      >
        <option value="">Tất cả tag</option>
        {tags.map((t) => (
          <option key={t.slug} value={t.slug}>
            #{t.name}
          </option>
        ))}
      </select>
      <select
        className={selectClass}
        value={level}
        disabled={isPending}
        onChange={(e) => {
          const value = e.target.value as ArticleLevel | "";
          setLevel(value);
          apply({ level: value });
        }}
        aria-label="Level"
      >
        <option value="">All Levels</option>
        <option value="junior">Junior</option>
        <option value="middle">Middle</option>
        <option value="senior">Senior</option>
      </select>
      <select
        className={selectClass}
        value={sort}
        disabled={isPending}
        onChange={(e) => {
          const value = e.target.value as ArticleSort;
          setSort(value);
          apply({ sort: value });
        }}
        aria-label="Sort"
      >
        <option value="updated">Mới cập nhật</option>
        <option value="published">Mới xuất bản</option>
        <option value="rating">Đánh giá cao</option>
        <option value="comments">Nhiều comment</option>
        <option value="bookmarks">Nhiều bookmark</option>
      </select>
      <Button className="w-full" loading={isPending} onClick={() => apply()}>
        {isPending ? "Đang lọc..." : "Áp dụng"}
      </Button>
      {isPending ? (
        <p className="text-xs text-accent" role="status" aria-live="polite">
          Đang áp dụng bộ lọc...
        </p>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <Button
          variant="secondary"
          className="w-full"
          disabled={isPending}
          onClick={() => setOpen((v) => !v)}
        >
          Bộ lọc {open ? "▴" : "▾"}
        </Button>
        {open ? (
          <div className="mt-3 rounded-xl border border-card-border bg-card p-4">
            {form}
          </div>
        ) : null}
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-card-border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            Bộ lọc
          </h2>
          {form}
        </div>
      </aside>
    </>
  );
}
