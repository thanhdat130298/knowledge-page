import { getAdminCategories } from "@/lib/data/articles";
import { AdminCategoriesClient } from "@/components/admin/categories-client";
import { BackNav } from "@/components/ui/back-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý danh mục",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <BackNav href="/admin" label="Quay lại dashboard" />
      <h1 className="font-display text-3xl font-semibold">Danh mục kiến thức</h1>
      <p className="mt-1 text-sm text-muted">
        Tạo, sửa, bật/tắt và xóa danh mục trên Supabase.
      </p>
      <AdminCategoriesClient initial={categories} />
    </div>
  );
}
