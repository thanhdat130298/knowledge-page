import { getLatest } from "@/lib/data/articles";
import { absoluteUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getLatest(100);
  const staticRoutes = ["", "/articles", "/search"].map((path) => ({
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

  return [...staticRoutes, ...articleRoutes];
}
