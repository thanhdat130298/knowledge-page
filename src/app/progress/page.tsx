import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Tiến độ học",
  robots: { index: false, follow: false },
};

type ProgressRow = {
  status: "learning" | "understood" | "review";
  article: { id: string; title: string; slug: string } | null;
};

export default async function ProgressPage() {
  const user = await getSessionUser();
  let learning: ProgressRow[] = [];
  let understood: ProgressRow[] = [];
  let review: ProgressRow[] = [];

  if (user) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("learning_progress")
        .select("status, article:articles(id, title, slug)")
        .eq("user_id", user.id);

      const rows = ((data || []) as unknown as ProgressRow[]);
      learning = rows.filter((r) => r.status === "learning" && r.article);
      understood = rows.filter((r) => r.status === "understood" && r.article);
      review = rows.filter((r) => r.status === "review" && r.article);
    } catch {
      // empty
    }
  }

  const total = learning.length + understood.length + review.length;
  const pct = total
    ? Math.round((understood.length / total) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">Tiến độ học</h1>
      <p className="mt-1 text-muted">
        Theo dõi trạng thái: đang học · đã hiểu · cần ôn lại.
      </p>

      {!user ? (
        <div className="mt-8 rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
          Đăng nhập để lưu và xem tiến độ học.
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <Stat label="Đã lưu progress" value={total} />
            <Stat label="Đang học" value={learning.length} />
            <Stat label="Đã hiểu" value={understood.length} />
            <Stat label="Cần ôn lại" value={review.length} />
          </div>

          <div className="mt-6 rounded-xl border border-card-border bg-card p-4">
            <div className="mb-2 flex justify-between text-sm">
              <span>Tiến độ đã hiểu</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-accent-soft">
              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <Section title="Đang học" items={learning} />
          <Section title="Đã hiểu" items={understood} />
          <Section title="Cần ôn lại" items={review} />
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: ProgressRow[] }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Trống</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((row) =>
            row.article ? (
              <li key={row.article.id}>
                <Link
                  href={`/articles/${row.article.slug}`}
                  className="text-accent hover:underline"
                >
                  {row.article.title}
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </section>
  );
}
