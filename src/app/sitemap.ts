import { getLatest } from "@/lib/data/articles";
import { getPublishedSeries } from "@/lib/data/series";
import { absoluteUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, series] = await Promise.all([
    getLatest(100),
    getPublishedSeries(),
  ]);
  const staticRoutes = ["", "/articles", "/series", "/search"].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articleRoutes = articles.map((a) => ({
    url: absoluteUrl(`/articles/${a.slug}`),
    lastModified: new Date(a.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const seriesRoutes = series.map((s) => ({
    url: absoluteUrl(`/series/${s.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...articleRoutes, ...seriesRoutes];
}
