import Link from "next/link";
import type { Article } from "@/types";
import { toDirectImageUrl } from "@/lib/media-url";
import { formatDate } from "@/lib/utils";
import { Bookmark, MessageCircle, Star } from "lucide-react";

export function ArticleCard({ article }: { article: Article }) {
  const cover = article.cover_image_url
    ? toDirectImageUrl(article.cover_image_url)
    : null;

  return (
    <article className="surface-card group flex h-full min-w-0 flex-col overflow-hidden transition hover:-translate-y-0.5">
      <Link href={`/articles/${article.slug}`} className="flex min-w-0 flex-1 flex-col">
        {cover ? (
          <div className="aspect-[16/9] overflow-hidden border-b border-card-border bg-accent-soft/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={article.cover_image_alt || article.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            {article.category ? (
              <span className="max-w-full truncate rounded-lg bg-accent-soft px-2 py-1 text-accent">
                #{article.category.name}
              </span>
            ) : null}
            {article.series?.title ? (
              <span className="max-w-full truncate rounded-lg border border-card-border px-2 py-1 text-muted">
                Series: {article.series.title}
              </span>
            ) : null}
            <span className="rounded-lg border border-card-border px-2 py-1 capitalize text-muted">
              {article.level}
            </span>
            {article.is_featured ? (
              <span className="rounded-lg bg-amber-100 px-2 py-1 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                Nổi bật
              </span>
            ) : null}
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug break-words group-hover:text-accent">
            {article.title}
          </h3>
          {article.excerpt ? (
            <p className="mt-2 line-clamp-3 break-words text-sm text-muted">
              {article.excerpt}
            </p>
          ) : null}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs text-muted">
            <span>{article.reading_time_minutes} phút đọc</span>
            <span>{formatDate(article.updated_at)}</span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />{" "}
              {article.rating_avg?.toFixed(1) ?? "—"}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />{" "}
              {article.comment_count ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bookmark className="h-3.5 w-3.5" />{" "}
              {article.bookmark_count ?? 0}
            </span>
          </div>
          {article.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tags.slice(0, 3).map((t) => (
                <span
                  key={t.id}
                  className="max-w-full truncate rounded-md bg-background px-2 py-0.5 text-[11px] text-muted"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
