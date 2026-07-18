"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ArticleLevel, ArticleSort } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
};

export function ArticleFilters({ categories, tags }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [tag, setTag] = useState(params.get("tag") || "");
  const [level, setLevel] = useState(params.get("level") || "");
  const [sort, setSort] = useState(params.get("sort") || "updated");

  function apply(overrides?: Record<string, string>) {
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
    router.push(`${pathname}?${next.toString()}`);
    setOpen(false);
  }

  const form = (
    <div className="space-y-3">
      <Input
        placeholder="Tìm trong danh sách..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search filter"
      />
      <select
        className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
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
        className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
        value={level}
        onChange={(e) => setLevel(e.target.value as ArticleLevel | "")}
        aria-label="Level"
      >
        <option value="">All Levels</option>
        <option value="junior">Junior</option>
        <option value="middle">Middle</option>
        <option value="senior">Senior</option>
      </select>
      <select
        className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
        value={sort}
        onChange={(e) => setSort(e.target.value as ArticleSort)}
        aria-label="Sort"
      >
        <option value="updated">Mới cập nhật</option>
        <option value="published">Mới xuất bản</option>
        <option value="rating">Đánh giá cao</option>
        <option value="comments">Nhiều comment</option>
        <option value="bookmarks">Nhiều bookmark</option>
      </select>
      <Button className="w-full" onClick={() => apply()}>
        Áp dụng
      </Button>
    </div>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <Button variant="secondary" className="w-full" onClick={() => setOpen((v) => !v)}>
          Bộ lọc {open ? "▴" : "▾"}
        </Button>
        {open ? <div className="mt-3 rounded-xl border border-card-border bg-card p-4">{form}</div> : null}
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
