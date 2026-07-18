import {
  ArticleContent,
  TableOfContents,
} from "@/components/articles/article-content";
import { ArticleActions } from "@/components/articles/article-actions";
import { CommentSection } from "@/components/articles/comment-section";
import { FeedbackForm } from "@/components/articles/feedback-form";
import { ReadingProgress } from "@/components/articles/reading-progress";
import { ArticleCard } from "@/components/articles/article-card";
import {
  getArticleBySlug,
  getCommentsForArticle,
  getRelatedArticles,
} from "@/lib/data/articles";
import { getSessionUser } from "@/lib/auth/session";
import { extractHeadings } from "@/lib/content";
import { absoluteUrl, formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackNav } from "@/components/ui/back-link";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Không tìm thấy" };
  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt || undefined;
  return {
    title,
    description,
    alternates: {
      canonical: article.canonical_url || absoluteUrl(`/articles/${article.slug}`),
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at || undefined,
      modifiedTime: article.updated_at,
      tags: article.tags?.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, comments, user] = await Promise.all([
    getRelatedArticles(article),
    getCommentsForArticle(article.id),
    getSessionUser(),
  ]);
  const headings = extractHeadings(article.content);
  const isLoggedIn = Boolean(user);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name: article.author?.display_name || article.author?.username || "Admin",
    },
    articleSection: article.category?.name,
    keywords: article.tags?.map((t) => t.name).join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bài viết",
        item: absoluteUrl("/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: absoluteUrl(`/articles/${article.slug}`),
      },
    ],
  };

  return (
    <div>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <BackNav href="/articles" label="Quay lại danh sách" />
        <nav className="mb-4 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-foreground">
            Bài viết
          </Link>
          {article.category ? (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/categories/${article.category.slug}`}
                className="hover:text-foreground"
              >
                {article.category.name}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
          <div>
            <header className="mb-6">
              <div className="mb-3 flex flex-wrap gap-2 text-xs">
                {article.category ? (
                  <span className="rounded-lg bg-accent-soft px-2 py-1 text-accent">
                    {article.category.name}
                  </span>
                ) : null}
                <span className="rounded-lg border border-card-border px-2 py-1 capitalize">
                  {article.level}
                </span>
              </div>
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {article.title}
              </h1>
              {article.excerpt ? (
                <p className="mt-3 text-lg text-muted">{article.excerpt}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
                <span>{article.author?.display_name || "Admin"}</span>
                <span>Publish {formatDate(article.published_at)}</span>
                <span>Cập nhật {formatDate(article.updated_at)}</span>
                <span>{article.reading_time_minutes} phút đọc</span>
              </div>
              {article.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((t) => (
                    <Link
                      key={t.id}
                      href={`/tags/${t.slug}`}
                      className="rounded-md bg-card px-2 py-1 text-xs text-muted hover:text-foreground"
                    >
                      #{t.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </header>

            <div className="lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            <ArticleContent content={article.content} />

            <div className="mt-8 lg:hidden">
              <ArticleActions
                articleId={article.id}
                isLoggedIn={isLoggedIn}
                ratingAvg={article.rating_avg}
                ratingCount={article.rating_count}
                bookmarkCount={article.bookmark_count}
              />
            </div>

            <CommentSection
              articleId={article.id}
              isLoggedIn={isLoggedIn}
              initialComments={comments}
            />
            <FeedbackForm articleId={article.id} isLoggedIn={isLoggedIn} />

            {related.length ? (
              <section className="mt-12">
                <h2 className="font-display mb-4 text-2xl font-semibold">
                  Bài viết liên quan
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="hidden space-y-4 lg:block">
            <TableOfContents headings={headings} />
            <ArticleActions
              articleId={article.id}
              isLoggedIn={isLoggedIn}
              ratingAvg={article.rating_avg}
              ratingCount={article.rating_count}
              bookmarkCount={article.bookmark_count}
            />
          </aside>
        </div>
      </article>
    </div>
  );
}
