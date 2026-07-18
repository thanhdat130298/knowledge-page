import type { Article, ArticleFilters } from "@/types";

export function sortArticles(
  list: Article[],
  sort: ArticleFilters["sort"] = "updated",
) {
  const copy = [...list];
  switch (sort) {
    case "published":
      return copy.sort(
        (a, b) =>
          new Date(b.published_at || 0).getTime() -
          new Date(a.published_at || 0).getTime(),
      );
    case "rating":
      return copy.sort((a, b) => (b.rating_avg || 0) - (a.rating_avg || 0));
    case "comments":
      return copy.sort(
        (a, b) => (b.comment_count || 0) - (a.comment_count || 0),
      );
    case "bookmarks":
      return copy.sort(
        (a, b) => (b.bookmark_count || 0) - (a.bookmark_count || 0),
      );
    case "updated":
    default:
      return copy.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
  }
}

export function matchesQuery(article: Article, q: string) {
  const needle = q.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  const hay = [
    article.title,
    article.excerpt || "",
    article.category?.name || "",
    ...(article.tags?.map((t) => t.name) || []),
  ]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  const titleHit = article.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .includes(needle);
  return { hit: hay.includes(needle) || titleHit, titleHit };
}

export function filterArticles(list: Article[], filters: ArticleFilters) {
  let next = list;
  if (filters.category) {
    next = next.filter((a) => a.category?.slug === filters.category);
  }
  if (filters.tag) {
    next = next.filter((a) => a.tags?.some((t) => t.slug === filters.tag));
  }
  if (filters.level && filters.level !== "all") {
    next = next.filter((a) => a.level === filters.level);
  }
  if (filters.featured) {
    next = next.filter((a) => a.is_featured);
  }
  if (filters.q?.trim()) {
    const scored = next
      .map((a) => {
        const { hit, titleHit } = matchesQuery(a, filters.q!.trim());
        return { a, hit, titleHit };
      })
      .filter((x) => x.hit)
      .sort((x, y) => Number(y.titleHit) - Number(x.titleHit));
    next = scored.map((x) => x.a);
  }
  return sortArticles(next, filters.sort);
}
