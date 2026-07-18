import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/profile", "/bookmarks", "/progress", "/auth"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
