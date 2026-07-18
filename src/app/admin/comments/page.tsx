import { createClient } from "@/lib/supabase/server";
import { BackNav } from "@/components/ui/back-link";
import { AdminCommentsClient } from "@/components/admin/comments-client";
import type { Comment } from "@/types";

export default async function AdminCommentsPage() {
  let items: Comment[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("comments")
      .select("*, author:profiles(*)")
      .order("created_at", { ascending: false })
      .limit(100);
    items = (data || []) as Comment[];
  } catch {
    items = [];
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <BackNav href="/admin" label="Quay lại dashboard" />
      <h1 className="font-display text-3xl font-semibold">Comment moderation</h1>
      <p className="mt-1 text-sm text-muted">Dữ liệu từ bảng comments (Supabase).</p>
      <AdminCommentsClient initial={items} />
    </div>
  );
}
