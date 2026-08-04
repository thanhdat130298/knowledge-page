import { getAdminSeries } from "@/lib/data/series";
import { AdminSeriesClient } from "@/components/admin/series-client";
import { BackNav } from "@/components/ui/back-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý series",
  robots: { index: false, follow: false },
};

export default async function AdminSeriesPage() {
  const series = await getAdminSeries();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <BackNav href="/admin" label="Quay lại dashboard" />
      <h1 className="font-display text-3xl font-semibold">Series</h1>
      <p className="mt-1 text-sm text-muted">
        Nhóm các bài cùng chủ đề. Gắn bài vào series trong editor bài viết.
      </p>
      <AdminSeriesClient initial={series} />
    </div>
  );
}
