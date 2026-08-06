import { ArticleEditor } from "@/components/admin/article-editor";
import { BackNav } from "@/components/ui/back-link";
import { getCategories, getTags } from "@/lib/data/articles";
import { getAdminSeries } from "@/lib/data/series";
import { requireAdmin } from "@/lib/auth/session";

export default async function NewArticlePage() {
  const { isAdmin } = await requireAdmin();
  const [categories, tags, seriesList] = await Promise.all([
    getCategories(),
    getTags(),
    getAdminSeries(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <BackNav href="/admin/articles" label="Quay lại danh sách bài" />
      <h1 className="font-display text-3xl font-semibold">Tạo bài mới</h1>
      {!isAdmin ? (
        <p className="mt-3 rounded-xl border border-warning/40 bg-card p-3 text-sm text-warning">
          Bạn chưa đăng nhập admin. Lưu bài sẽ bị từ chối cho đến khi login bằng
          email trong ADMIN_EMAILS + bảng admin_allowlist trên Supabase.
        </p>
      ) : null}
      <div className="mt-6">
        <ArticleEditor
          categories={categories}
          tags={tags}
          seriesList={seriesList}
          initial={{
            title: "",
            slug: "",
            excerpt: "",
            content: { type: "doc", content: [{ type: "paragraph" }] },
            category_id: categories[0]?.id || "",
            series_id: "",
            series_order: 0,
            level: "all",
            status: "draft",
            is_featured: false,
            seo_title: "",
            seo_description: "",
          }}
        />
      </div>
    </div>
  );
}
