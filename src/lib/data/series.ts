import type { Article, Series } from "@/types";
import { articleSelect, mapArticleRow } from "@/lib/data/mappers";

async function getSupabase() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

type SeriesRow = Series & {
  articles?: { count: number }[] | null;
};

function mapSeriesRow(row: SeriesRow): Series {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    cover_image_url: row.cover_image_url,
    is_published: row.is_published,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
    article_count: row.articles?.[0]?.count ?? row.article_count ?? 0,
  };
}

export async function getPublishedSeries(): Promise<Series[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("series")
      .select("*, articles(count)")
      .eq("is_published", true)
      .order("sort_order");
    if (error) {
      console.error("getPublishedSeries", error.message);
      return [];
    }
    return (data || []).map((row) => mapSeriesRow(row as SeriesRow));
  } catch {
    return [];
  }
}

export async function getAdminSeries(): Promise<Series[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("series")
      .select("*, articles(count)")
      .order("sort_order");
    if (error) {
      console.error("getAdminSeries", error.message);
      return [];
    }
    return (data || []).map((row) => mapSeriesRow(row as SeriesRow));
  } catch {
    return [];
  }
}

export async function getSeriesBySlug(
  slug: string,
): Promise<(Series & { articles: Article[] }) | null> {
  try {
    const supabase = await getSupabase();
    const { data: series, error } = await supabase
      .from("series")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error || !series) {
      if (error) console.error("getSeriesBySlug", error.message);
      return null;
    }

    const { data: articles, error: articlesError } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("series_id", series.id)
      .eq("status", "published")
      .order("series_order", { ascending: true });

    if (articlesError) {
      console.error("getSeriesBySlug articles", articlesError.message);
    }

    return {
      ...mapSeriesRow(series as SeriesRow),
      articles: (articles || []).map((row) => mapArticleRow(row as never)),
    };
  } catch {
    return null;
  }
}

export async function getSeriesArticles(
  seriesId: string,
): Promise<Article[]> {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("articles")
      .select(articleSelect)
      .eq("series_id", seriesId)
      .eq("status", "published")
      .order("series_order", { ascending: true });
    if (error) {
      console.error("getSeriesArticles", error.message);
      return [];
    }
    return (data || []).map((row) => mapArticleRow(row as never));
  } catch {
    return [];
  }
}
