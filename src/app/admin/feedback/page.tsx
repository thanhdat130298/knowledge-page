import { createClient } from "@/lib/supabase/server";
import { BackNav } from "@/components/ui/back-link";
import { AdminFeedbackClient } from "@/components/admin/feedback-client";

export default async function AdminFeedbackPage() {
  let items: {
    id: string;
    article: string;
    user: string;
    type: string;
    content: string;
    status: "pending" | "reviewing" | "resolved" | "rejected";
    notes: string;
  }[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("article_feedback")
      .select("*, article:articles(title), user:profiles(username)")
      .order("created_at", { ascending: false })
      .limit(100);

    items = (data || []).map((row) => {
      const r = row as {
        id: string;
        feedback_type: string;
        content: string;
        status: "pending" | "reviewing" | "resolved" | "rejected";
        admin_notes: string | null;
        article?: { title?: string } | null;
        user?: { username?: string } | null;
      };
      return {
        id: r.id,
        article: r.article?.title || "—",
        user: r.user?.username || "—",
        type: r.feedback_type,
        content: r.content,
        status: r.status,
        notes: r.admin_notes || "",
      };
    });
  } catch {
    items = [];
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <BackNav href="/admin" label="Quay lại dashboard" />
      <h1 className="font-display text-3xl font-semibold">Feedback inbox</h1>
      <p className="mt-1 text-sm text-muted">
        Dữ liệu từ bảng article_feedback (Supabase).
      </p>
      <AdminFeedbackClient initial={items} />
    </div>
  );
}
