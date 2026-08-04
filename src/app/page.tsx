import { ArticleCard } from "@/components/articles/article-card";
import {
  getCategories,
  getFeaturedArticles,
  getLatest,
  getMostDiscussed,
  getPopularTags,
  getTopRated,
  getArticlesByLevel,
} from "@/lib/data/articles";
import { getPublishedSeries } from "@/lib/data/series";
import { HomeSearchForm } from "@/components/search/home-search-form";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage() {
  const [
    categories,
    latest,
    featured,
    topRated,
    discussed,
    junior,
    tags,
    series,
  ] = await Promise.all([
    getCategories(),
    getLatest(6),
    getFeaturedArticles(4),
    getTopRated(4),
    getMostDiscussed(4),
    getArticlesByLevel("junior", 4),
    getPopularTags(10),
    getPublishedSeries(),
  ]);

  return (
    <div className="overflow-x-clip">
      <section
        className="relative overflow-hidden border-b border-card-border"
        style={{ background: "var(--hero-glow)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Frontend interview knowledge
          </p>
          <h1 className="font-display animate-fade-up animate-delay-1 mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Knowledge FStack
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-4 max-w-2xl text-base text-muted md:text-lg">
            Học và ôn kiến thức phỏng vấn Frontend theo từng level — từ JavaScript
            cốt lõi đến React, Vue, Next.js và kiến trúc thực tế.
          </p>
          <Suspense
            fallback={
              <div className="mt-8 h-12 max-w-xl animate-pulse rounded-xl bg-card-border/50" />
            }
          >
            <HomeSearchForm />
          </Suspense>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/series"
              className="inline-flex h-12 items-center rounded-xl bg-accent px-5 text-base font-medium text-accent-foreground hover:opacity-90"
            >
              Học theo Series
            </Link>
            <Link
              href="/articles"
              className="inline-flex h-12 items-center rounded-xl border border-card-border bg-card px-5 text-base font-medium hover:bg-accent-soft/40"
            >
              Tất cả bài viết
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6">
        {series.length > 0 ? (
          <section>
            <div className="mb-6 flex min-w-0 items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold">
                  Series ôn tập
                </h2>
                <p className="text-sm text-muted">
                  Chuỗi bài học tuần tự (1→N) — khác với danh mục/hashtag ở dưới.
                </p>
              </div>
              <Link
                href="/series"
                className="shrink-0 text-sm font-medium text-accent hover:underline"
              >
                Xem tất cả
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
              {series.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/series/${s.slug}`}
                    className="surface-card block min-w-0 overflow-hidden p-4 transition hover:-translate-y-0.5"
                  >
                    <div className="font-semibold break-words">{s.title}</div>
                    {s.description ? (
                      <p className="mt-1 line-clamp-2 break-words text-sm text-muted">
                        {s.description}
                      </p>
                    ) : null}
                    <div className="mt-3 text-xs text-muted">
                      {s.article_count ?? 0} bài · đọc theo thứ tự
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold">
                Danh mục kiến thức
              </h2>
              <p className="text-sm text-muted">
                Category dạng chủ đề / hashtag — lọc bài theo lĩnh vực, không
                phải lộ trình tuần tự.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-card-border bg-card px-3.5 py-2 text-sm transition hover:bg-accent-soft/50"
              >
                <span className="font-semibold text-accent">#{c.name}</span>
                <span className="text-xs text-muted">
                  {c.article_count ?? 0}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <ArticleRow title="Mới cập nhật" items={latest} />
        <ArticleRow title="Bài nổi bật" items={featured} />
        <ArticleRow title="Đánh giá cao" items={topRated} />
        <ArticleRow title="Nhiều thảo luận" items={discussed} />
        <ArticleRow title="Theo level Junior" items={junior} />

        <section>
          <h2 className="font-display text-2xl font-semibold">Chủ đề phổ biến</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.id}
                href={`/tags/${t.slug}`}
                className="rounded-xl border border-card-border bg-card px-3 py-1.5 text-sm hover:bg-accent-soft"
              >
                #{t.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="surface-card flex flex-col items-start gap-3 overflow-hidden p-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold break-words">
              Khám phá toàn bộ bài viết
            </h2>
            <p className="text-sm text-muted">
              Lọc theo category, tag, level và sắp xếp theo nhu cầu ôn tập.
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex h-11 shrink-0 items-center rounded-xl bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            Xem danh sách
          </Link>
        </section>
      </div>
    </div>
  );
}

function ArticleRow({
  title,
  items,
}: {
  title: string;
  items: Awaited<ReturnType<typeof getLatest>>;
}) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="font-display mb-4 text-2xl font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
        {items.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
