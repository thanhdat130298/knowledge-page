import { getTags } from "@/lib/data/articles";
import { AdminTagsClient } from "@/components/admin/tags-client";
import { BackNav } from "@/components/ui/back-link";

export default async function AdminTagsPage() {
  const tags = await getTags();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <BackNav href="/admin" label="Quay lại dashboard" />
      <h1 className="font-display text-3xl font-semibold">Tags</h1>
      <p className="mt-1 text-sm text-muted">Dữ liệu từ bảng tags (Supabase).</p>
      <AdminTagsClient initial={tags} />
    </div>
  );
}
