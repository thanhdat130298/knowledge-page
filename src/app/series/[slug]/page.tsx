import { getSeriesBySlug } from "@/lib/data/series";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { BackNav } from "@/components/ui/back-link";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) return { title: "Không tìm thấy series" };
  return {
    title: series.title,
    description: series.description || undefined,
    alternates: { canonical: absoluteUrl(`/series/${series.slug}`) },
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  const first = series.articles[0];

  return (
    <div className="mx-auto w-full max-w-3xl overflow-x-clip px-4 py-8 md:px-6">
      <BackNav href="/series" label="Tất cả series" />
      <h1 className="font-display text-3xl font-semibold break-words">
        {series.title}
      </h1>
      {series.description ? (
        <p className="mt-2 break-words text-muted">{series.description}</p>
      ) : null}

      {series.articles.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          Series này chưa có bài published.
        </p>
      ) : (
        <>
          {first ? (
            <div className="mt-6">
              <Link
                href={`/articles/${first.slug}`}
                className="inline-flex rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Bắt đầu từ bài 1
              </Link>
            </div>
          ) : null}

          <ol className="mt-8 space-y-3">
            {series.articles.map((a, index) => (
              <li key={a.id} className="min-w-0">
                <Link
                  href={`/articles/${a.slug}`}
                  className="flex min-w-0 gap-4 overflow-hidden rounded-xl border border-card-border bg-card px-4 py-3 transition hover:bg-accent-soft/30"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-sm font-semibold text-accent">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium break-words">{a.title}</div>
                    <div className="mt-1 text-xs text-muted">
                      {a.reading_time_minutes} phút
                      {a.published_at
                        ? ` · ${formatDate(a.published_at)}`
                        : ""}
                    </div>
                    {a.excerpt ? (
                      <p className="mt-1 line-clamp-2 break-words text-sm text-muted">
                        {a.excerpt}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
