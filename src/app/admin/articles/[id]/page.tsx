import { ArticleEditor } from "@/components/admin/article-editor";
import { BackNav } from "@/components/ui/back-link";
import {
  getArticleById,
  getCategories,
  getTags,
} from "@/lib/data/articles";
import { getAdminSeries } from "@/lib/data/series";
import { requireAdmin } from "@/lib/auth/session";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const { isAdmin } = await requireAdmin();
  const [article, categories, tags, seriesList] = await Promise.all([
    getArticleById(id),
    getCategories(),
    getTags(),
    getAdminSeries(),
  ]);

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <BackNav href="/admin/articles" label="Quay lại danh sách bài" />
      <h1 className="font-display text-3xl font-semibold">Sửa bài</h1>
      {!isAdmin ? (
        <p className="mt-3 rounded-xl border border-warning/40 bg-card p-3 text-sm text-warning">
          Chưa đăng nhập admin — không lưu được thay đổi lên Supabase.
        </p>
      ) : null}
      <div className="mt-6">
        <ArticleEditor
          categories={categories}
          tags={tags}
          seriesList={seriesList}
          initial={{
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || "",
            content: article.content,
            category_id: article.category_id || categories[0]?.id || "",
            series_id: article.series_id || "",
            series_order: article.series_order ?? 0,
            level: article.level,
            status: article.status,
            is_featured: article.is_featured,
            seo_title: article.seo_title || "",
            seo_description: article.seo_description || "",
            cover_image_url: article.cover_image_url || "",
            tag_ids: article.tags?.map((t) => t.id) || [],
          }}
        />
      </div>
    </div>
  );
}
