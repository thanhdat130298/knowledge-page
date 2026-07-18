import { articleSelect, mapArticleRow } from "@/lib/data/mappers";
import { filterArticles } from "@/lib/data/filters";
import type {
  Article,
  ArticleFilters,
  Category,
  Comment,
  Tag,
} from "@/types";

const PAGE_SIZE = 9;

async function getSupabase() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

async function fetchPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("status", "published")
      .order("updated_at", { ascending: false });
    if (error) {
      console.error("fetchPublishedArticles", error.message);
      return [];
    }
    return (data || []).map((row) => mapArticleRow(row as never));
  } catch (e) {
    console.error(e);
    return [];
  }
}

type CategoryRow = Category & {
  articles?: { count: number }[] | null;
};

function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    icon: row.icon,
    sort_order: row.sort_order,
    is_active: row.is_active,
    article_count: row.articles?.[0]?.count ?? row.article_count ?? 0,
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("categories")
      .select("*, articles(count)")
      .eq("is_active", true)
      .order("sort_order");
    if (error) {
      console.error("getCategories", error.message);
      return [];
    }
    return (data || []).map((row) => mapCategoryRow(row as CategoryRow));
  } catch {
    return [];
  }
}

export async function getAdminCategories(): Promise<Category[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("categories")
      .select("*, articles(count)")
      .order("sort_order");
    if (error) {
      console.error("getAdminCategories", error.message);
      return [];
    }
    return (data || []).map((row) => mapCategoryRow(row as CategoryRow));
  } catch {
    return [];
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .order("name");
    if (error) {
      console.error("getTags", error.message);
      return [];
    }
    return (data || []) as Tag[];
  } catch {
    return [];
  }
}

export async function getArticles(filters: ArticleFilters = {}): Promise<{
  items: Article[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const page = filters.page || 1;
  const pageSize = filters.pageSize || PAGE_SIZE;
  const list = filterArticles(await fetchPublishedArticles(), filters);
  const total = list.length;
  const start = (page - 1) * pageSize;
  return {
    items: list.slice(start, start + pageSize),
    total,
    page,
    pageSize,
  };
}

export async function getArticleBySlug(
  slug: string,
  opts?: { includeDraft?: boolean },
): Promise<Article | null> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) return null;
    const article = mapArticleRow(data as never);
    if (article.status !== "published" && !opts?.includeDraft) return null;
    return article;
  } catch {
    return null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return mapArticleRow(data as never);
  } catch {
    return null;
  }
}

export async function getRelatedArticles(
  article: Article,
  limit = 4,
): Promise<Article[]> {
  const { items } = await getArticles({ pageSize: 50 });
  return items
    .filter((a) => a.id !== article.id)
    .filter(
      (a) =>
        a.category_id === article.category_id ||
        a.tags?.some((t) => article.tags?.some((at) => at.id === t.id)),
    )
    .slice(0, limit);
}

export async function getFeaturedArticles(limit = 4) {
  const { items } = await getArticles({
    featured: true,
    pageSize: limit,
    sort: "rating",
  });
  return items.slice(0, limit);
}

export async function getTopRated(limit = 4) {
  const { items } = await getArticles({ pageSize: limit, sort: "rating" });
  return items;
}

export async function getMostDiscussed(limit = 4) {
  const { items } = await getArticles({ pageSize: limit, sort: "comments" });
  return items;
}

export async function getLatest(limit = 6) {
  const { items } = await getArticles({ pageSize: limit, sort: "updated" });
  return items;
}

export async function getArticlesByLevel(
  level: Article["level"],
  limit = 4,
) {
  const { items } = await getArticles({ level, pageSize: limit });
  return items;
}

export async function getAllAdminArticles(): Promise<Article[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .order("updated_at", { ascending: false });
    if (error) {
      console.error("getAllAdminArticles", error.message);
      return [];
    }
    return (data || []).map((row) => mapArticleRow(row as never));
  } catch {
    return [];
  }
}

export async function getCommentsForArticle(
  articleId: string,
): Promise<Comment[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("comments")
      .select("*, author:profiles(*)")
      .eq("article_id", articleId)
      .is("parent_id", null)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as Comment[];
  } catch {
    return [];
  }
}

export async function searchSuggestions(q: string, limit = 5) {
  if (!q.trim()) return [];
  const { items } = await getArticles({ q, pageSize: limit });
  return items.map((a) => ({ title: a.title, slug: a.slug }));
}

export async function getPopularTags(limit = 12) {
  const tags = await getTags();
  return tags.slice(0, limit);
}

export async function getAdminStats() {
  try {
    const supabase = await getSupabase();
    const [articles, profiles, comments, feedback] = await Promise.all([
      supabase.from("articles").select("id, status, view_count, slug, title"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("comments").select("id", { count: "exact", head: true }),
      supabase
        .from("article_feedback")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
    ]);

    const rows = articles.data || [];
    return {
      totalArticles: rows.length,
      published: rows.filter((a) => a.status === "published").length,
      drafts: rows.filter((a) => a.status === "draft").length,
      archived: rows.filter((a) => a.status === "archived").length,
      users: profiles.count || 0,
      comments: comments.count || 0,
      pendingFeedback: feedback.count || 0,
      topViewed: [...rows]
        .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        .slice(0, 5)
        .map((a) => ({
          id: a.id as string,
          title: a.title as string,
          slug: a.slug as string,
          view_count: (a.view_count as number) || 0,
        })),
    };
  } catch {
    return {
      totalArticles: 0,
      published: 0,
      drafts: 0,
      archived: 0,
      users: 0,
      comments: 0,
      pendingFeedback: 0,
      topViewed: [] as {
        id: string;
        title: string;
        slug: string;
        view_count: number;
      }[],
    };
  }
}
