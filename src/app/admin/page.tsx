import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminStats } from "@/lib/data/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const { isAdmin } = await requireAdmin();
  const stats = await getAdminStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted">
            Số liệu lấy từ Supabase. Admin kiểm tra qua ADMIN_EMAILS +
            admin_allowlist.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-10 items-center rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground"
        >
          Tạo bài mới
        </Link>
      </div>

      {!isAdmin ? (
        <div className="mt-4 rounded-xl border border-warning/40 bg-card p-3 text-sm text-warning">
          Bạn chưa đăng nhập admin — một số thống kê/RLS có thể bị hạn chế.
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Tổng bài" value={stats.totalArticles} />
        <Stat label="Published" value={stats.published} />
        <Stat label="Draft" value={stats.drafts} />
        <Stat label="Archived" value={stats.archived} />
        <Stat label="Users" value={stats.users} />
        <Stat label="Comments" value={stats.comments} />
        <Stat label="Pending feedback" value={stats.pendingFeedback} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Quick href="/admin/articles" title="Quản lý bài" desc="Search, filter, publish" />
        <Quick href="/admin/articles?status=draft" title="Xem draft" desc="Tiếp tục soạn thảo" />
        <Quick href="/admin/feedback" title="Feedback" desc="Pending góp ý" />
        <Quick href="/admin/comments" title="Comments" desc="Moderation" />
        <Quick href="/admin/categories" title="Categories" desc="CRUD danh mục" />
        <Quick href="/admin/tags" title="Tags" desc="CRUD & merge tag" />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Xem nhiều nhất</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {stats.topViewed.length === 0 ? (
            <li className="text-muted">Chưa có bài viết.</li>
          ) : (
            stats.topViewed.map((a) => (
              <li
                key={a.id}
                className="flex justify-between gap-3 border-b border-card-border py-2"
              >
                <Link href={`/articles/${a.slug}`} className="hover:text-accent">
                  {a.title}
                </Link>
                <span className="text-muted">{a.view_count} views</span>
              </li>
            ))
          )}
        </ul>
      </section>
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

function Quick({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-card-border bg-card p-4 transition hover:bg-accent-soft/40"
    >
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted">{desc}</div>
    </Link>
  );
}
