import type { Article, Category, Profile, Tag } from "@/types";

type TagJoin = { tag: Tag | null };
type ArticleRow = Article & {
  category?: Category | null;
  author?: Profile | null;
  article_tags?: TagJoin[] | null;
};

export function mapArticleRow(row: ArticleRow): Article {
  const tags =
    row.article_tags
      ?.map((j) => j.tag)
      .filter((t): t is Tag => Boolean(t)) ??
    row.tags ??
    [];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: (row.content || { type: "doc", content: [] }) as Record<
      string,
      unknown
    >,
    cover_image_url: row.cover_image_url,
    cover_image_alt: row.cover_image_alt,
    category_id: row.category_id,
    level: row.level,
    status: row.status,
    is_featured: row.is_featured,
    author_id: row.author_id,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    canonical_url: row.canonical_url,
    reading_time_minutes: row.reading_time_minutes,
    view_count: row.view_count,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    category: row.category ?? null,
    author: row.author ?? null,
    tags,
    rating_avg: row.rating_avg ?? 0,
    rating_count: row.rating_count ?? 0,
    comment_count: row.comment_count ?? 0,
    bookmark_count: row.bookmark_count ?? 0,
  };
}

export const articleSelect = `
  *,
  category:categories(*),
  author:profiles(*),
  article_tags(tag:tags(*))
`;
