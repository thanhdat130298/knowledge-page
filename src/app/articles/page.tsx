import { ArticleCard } from "@/components/articles/article-card";
import { ArticleFilters } from "@/components/articles/article-filters";
import {
  getArticles,
  getCategories,
  getTags,
} from "@/lib/data/articles";
import { PaginationNav } from "@/components/ui/pagination-nav";
import type { ArticleLevel, ArticleSort } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Danh sách bài viết",
  description: "Tìm và lọc bài kiến thức phỏng vấn Frontend.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const tag = typeof sp.tag === "string" ? sp.tag : undefined;
  const level = (typeof sp.level === "string" ? sp.level : undefined) as
    | ArticleLevel
    | undefined;
  const sort = (typeof sp.sort === "string" ? sp.sort : "updated") as ArticleSort;
  const page = Number(typeof sp.page === "string" ? sp.page : "1") || 1;

  const [categories, tags, result] = await Promise.all([
    getCategories(),
    getTags(),
    getArticles({ q, category, tag, level, sort, page }),
  ]);

  const totalPages = Math.max(1, Math.ceil(result.total / result.pageSize));

  function hrefForPage(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    if (level) params.set("level", level);
    if (sort) params.set("sort", sort);
    params.set("page", String(p));
    return `/articles?${params.toString()}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">Bài viết</h1>
      <p className="mt-1 text-muted">
        {result.total} kết quả · trang {result.page}/{totalPages}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <Suspense fallback={null}>
          <ArticleFilters
            categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
            tags={tags.map((t) => ({ name: t.name, slug: t.slug }))}
          />
        </Suspense>

        <div>
          {result.items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
              Không tìm thấy bài viết phù hợp.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {result.items.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}

          <PaginationNav
            pages={totalPages}
            current={page}
            hrefForPage={hrefForPage}
          />
        </div>
      </div>
    </div>
  );
}
