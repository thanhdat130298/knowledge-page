import { ArticleCard } from "@/components/articles/article-card";
import { getArticles, getTags } from "@/lib/data/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);
  return { title: tag ? `#${tag.name}` : "Tag" };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) notFound();
  const { items } = await getArticles({ tag: slug, pageSize: 24 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">#{tag.name}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <p className="text-muted">Chưa có bài với tag này.</p>
        ) : (
          items.map((a) => <ArticleCard key={a.id} article={a} />)
        )}
      </div>
    </div>
  );
}
