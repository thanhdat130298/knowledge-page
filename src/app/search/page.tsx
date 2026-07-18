import { ArticleCard } from "@/components/articles/article-card";
import { getArticles, searchSuggestions } from "@/lib/data/articles";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SearchForm } from "@/components/search/search-form";

export const metadata: Metadata = {
  title: "Tìm kiếm",
  description: "Tìm bài viết kiến thức phỏng vấn Frontend.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const page = Number(typeof sp.page === "string" ? sp.page : "1") || 1;
  const result = q
    ? await getArticles({ q, page, sort: "updated" })
    : { items: [], total: 0, page: 1, pageSize: 9 };
  const suggestions = q ? await searchSuggestions(q, 5) : [];
  const totalPages = Math.max(1, Math.ceil(result.total / (result.pageSize || 9)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">Tìm kiếm</h1>
      <p className="mt-1 text-muted">
        Ưu tiên khớp tiêu đề · không phân biệt hoa thường · hỗ trợ tiếng Việt
      </p>
      <div className="mt-6">
        <Suspense fallback={null}>
          <SearchForm initialQuery={q} />
        </Suspense>
      </div>

      {q && suggestions.length ? (
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="text-muted">Gợi ý:</span>
          {suggestions.map((s) => (
            <Link
              key={s.slug}
              href={`/articles/${s.slug}`}
              className="rounded-lg border border-card-border px-2 py-1 hover:bg-accent-soft"
            >
              {s.title}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-8">
        {!q ? (
          <p className="text-muted">Nhập từ khóa để bắt đầu tìm kiếm.</p>
        ) : result.items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
            Không có kết quả cho “{q}”.
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted">{result.total} kết quả</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.items.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
            {totalPages > 1 ? (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/search?q=${encodeURIComponent(q)}&page=${p}`}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm ${
                      p === page
                        ? "border-accent bg-accent-soft"
                        : "border-card-border"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
