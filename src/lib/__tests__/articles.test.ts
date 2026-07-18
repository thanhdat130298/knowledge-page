import { describe, expect, it } from "vitest";
import { filterArticles } from "@/lib/data/filters";
import type { Article } from "@/types";

const sample: Article[] = [
  {
    id: "1",
    title: "Closure là gì?",
    slug: "closure-la-gi",
    excerpt: "Lexical scope",
    content: {},
    cover_image_url: null,
    cover_image_alt: null,
    category_id: null,
    level: "junior",
    status: "published",
    is_featured: false,
    author_id: null,
    seo_title: null,
    seo_description: null,
    canonical_url: null,
    reading_time_minutes: 5,
    view_count: 0,
    published_at: "2026-01-02T00:00:00.000Z",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z",
    rating_avg: 4.8,
    rating_count: 10,
    comment_count: 2,
    bookmark_count: 3,
  },
  {
    id: "2",
    title: "React reconciliation",
    slug: "react-reconciliation",
    excerpt: "Diffing",
    content: {},
    cover_image_url: null,
    cover_image_alt: null,
    category_id: null,
    level: "senior",
    status: "published",
    is_featured: true,
    author_id: null,
    seo_title: null,
    seo_description: null,
    canonical_url: null,
    reading_time_minutes: 8,
    view_count: 0,
    published_at: "2026-01-03T00:00:00.000Z",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-03T00:00:00.000Z",
    rating_avg: 4.2,
    rating_count: 5,
    comment_count: 1,
    bookmark_count: 1,
  },
];

describe("article filters", () => {
  it("filters by level and sorts by rating", () => {
    const items = filterArticles(sample, {
      level: "junior",
      sort: "rating",
      pageSize: 20,
    });
    expect(items.every((a) => a.level === "junior")).toBe(true);
    expect(items).toHaveLength(1);
  });

  it("searches by title priority", () => {
    const items = filterArticles(sample, { q: "closure" });
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]?.title.toLowerCase()).toContain("closure");
  });
});
