import { ArticleCard } from "@/components/articles/article-card";
import { getArticles, getCategories } from "@/lib/data/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Danh mục" };
  return {
    title: category.name,
    description: category.description || undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const { items } = await getArticles({ category: slug, pageSize: 24 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">{category.name}</h1>
      <p className="mt-2 text-muted">{category.description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <p className="text-muted">Chưa có bài trong danh mục này.</p>
        ) : (
          items.map((a) => <ArticleCard key={a.id} article={a} />)
        )}
      </div>
    </div>
  );
}
