import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth/session";
import { ArticleCard } from "@/components/articles/article-card";
import { mapArticleRow } from "@/lib/data/mappers";
import type { Article, Series } from "@/types";

export const metadata: Metadata = {
  title: "Bookmark",
  robots: { index: false, follow: false },
};

type SeriesGroup = {
  series: Series;
  articles: Article[];
};

function splitBookmarks(articles: Article[]): {
  seriesGroups: SeriesGroup[];
  standalone: Article[];
} {
  const bySeries = new Map<string, SeriesGroup>();
  const standalone: Article[] = [];

  for (const article of articles) {
    const series = article.series;
    if (article.series_id && series?.slug) {
      const existing = bySeries.get(series.id);
      if (existing) {
        existing.articles.push(article);
      } else {
        bySeries.set(series.id, { series, articles: [article] });
      }
    } else {
      standalone.push(article);
    }
  }

  const seriesGroups = [...bySeries.values()].sort((a, b) =>
    a.series.title.localeCompare(b.series.title, "vi"),
  );

  for (const group of seriesGroups) {
    group.articles.sort(
      (a, b) => (a.series_order ?? 0) - (b.series_order ?? 0),
    );
  }

  return { seriesGroups, standalone };
}

export default async function BookmarksPage() {
  const user = await getSessionUser();
  let articles: Article[] = [];

  if (user) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("bookmarks")
        .select(
          `
          article:articles(
            *,
            category:categories(*),
            series:series(*),
            author:profiles(*),
            article_tags(tag:tags(*))
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      articles = (data || [])
        .map((row) => {
          const article = (row as { article?: unknown }).article;
          return article ? mapArticleRow(article as never) : null;
        })
        .filter((a): a is Article => Boolean(a));
    } catch {
      articles = [];
    }
  }

  const { seriesGroups, standalone } = splitBookmarks(articles);

  return (
    <div className="mx-auto w-full max-w-6xl overflow-x-clip px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold break-words">
        Bookmark
      </h1>
      <p className="mt-1 text-muted">
        Series đã lưu và bài viết lẻ — tách riêng để dễ tiếp tục học.
      </p>

      {!user ? (
        <div className="mt-8 rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
          Đăng nhập để xem bookmark.
        </div>
      ) : articles.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
          Chưa có bookmark.{" "}
          <Link href="/articles" className="text-accent underline">
            Khám phá bài viết
          </Link>{" "}
          hoặc{" "}
          <Link href="/series" className="text-accent underline">
            học theo Series
          </Link>
          .
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          <section>
            <div className="mb-4 flex min-w-0 items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold">
                  Series đã lưu
                </h2>
                <p className="text-sm text-muted">
                  Chuỗi bài học tuần tự — mở series để đọc tiếp theo thứ tự.
                </p>
              </div>
              <span className="shrink-0 text-sm text-muted">
                {seriesGroups.length} series
              </span>
            </div>

            {seriesGroups.length === 0 ? (
              <p className="rounded-xl border border-dashed border-card-border p-6 text-sm text-muted">
                Chưa bookmark bài nào thuộc series.{" "}
                <Link href="/series" className="text-accent underline">
                  Xem danh sách series
                </Link>
              </p>
            ) : (
              <ul className="space-y-6">
                {seriesGroups.map(({ series, articles: items }) => (
                  <li
                    key={series.id}
                    className="min-w-0 overflow-hidden rounded-xl border border-card-border bg-card p-4"
                  >
                    <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/series/${series.slug}`}
                          className="font-display text-lg font-semibold break-words text-accent hover:underline"
                        >
                          {series.title}
                        </Link>
                        {series.description ? (
                          <p className="mt-1 line-clamp-2 break-words text-sm text-muted">
                            {series.description}
                          </p>
                        ) : null}
                        <p className="mt-1 text-xs text-muted">
                          {items.length} bài đã bookmark trong series này
                        </p>
                      </div>
                      <Link
                        href={`/series/${series.slug}`}
                        className="shrink-0 rounded-lg border border-card-border px-3 py-1.5 text-sm hover:bg-accent-soft/40"
                      >
                        Mở series
                      </Link>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
                      {items.map((a) => (
                        <ArticleCard key={a.id} article={a} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="mb-4 flex min-w-0 items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold">
                  Bài viết lẻ
                </h2>
                <p className="text-sm text-muted">
                  Post không thuộc series — bookmark theo từng bài.
                </p>
              </div>
              <span className="shrink-0 text-sm text-muted">
                {standalone.length} bài
              </span>
            </div>

            {standalone.length === 0 ? (
              <p className="rounded-xl border border-dashed border-card-border p-6 text-sm text-muted">
                Chưa có bài lẻ nào được bookmark.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                {standalone.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
