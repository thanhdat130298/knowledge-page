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
  ] = await Promise.all([
    getCategories(),
    getLatest(6),
    getFeaturedArticles(4),
    getTopRated(4),
    getMostDiscussed(4),
    getArticlesByLevel("junior", 4),
    getPopularTags(10),
  ]);

  return (
    <div>
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
          <Suspense fallback={<div className="mt-8 h-12 max-w-xl animate-pulse rounded-xl bg-card-border/50" />}>
            <HomeSearchForm />
          </Suspense>
          <div className="mt-5">
            <Link
              href="/articles"
              className="inline-flex h-12 items-center rounded-xl border border-card-border bg-card px-5 text-base font-medium hover:bg-accent-soft/40"
            >
              Bắt đầu học
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6">
        <section>
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Danh mục kiến thức
              </h2>
              <p className="text-sm text-muted">
                Chọn chủ đề để bắt đầu lộ trình ôn tập.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className="surface-card p-4 transition hover:-translate-y-0.5"
              >
                <div className="text-sm font-semibold text-accent">{c.name}</div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {c.description}
                </p>
                <div className="mt-3 text-xs text-muted">
                  {c.article_count ?? 0} bài viết
                </div>
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

        <section className="surface-card flex flex-col items-start gap-3 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">
              Khám phá toàn bộ bài viết
            </h2>
            <p className="text-sm text-muted">
              Lọc theo category, tag, level và sắp xếp theo nhu cầu ôn tập.
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-medium text-accent-foreground"
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
