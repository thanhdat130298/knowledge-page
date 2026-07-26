import Link from "next/link";
import { getAllAdminArticles } from "@/lib/data/articles";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { BackNav } from "@/components/ui/back-link";
import { DeleteArticleButton } from "@/components/admin/delete-article-button";
import { AdminArticlesShell } from "@/components/admin/admin-articles-shell";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Quản lý bài viết",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : "";
  const q = typeof sp.q === "string" ? sp.q.toLowerCase() : "";
  let articles = await getAllAdminArticles();
  if (status) articles = articles.filter((a) => a.status === status);
  if (q) {
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q),
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <BackNav href="/admin" label="Quay lại dashboard" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">
            Quản lý bài viết
          </h1>
          <p className="text-sm text-muted">
            Dữ liệu từ bảng articles trên Supabase
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-10 items-center rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground"
        >
          Tạo bài mới
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="mt-6 h-40 animate-pulse rounded-xl bg-card-border/40" />
        }
      >
        <AdminArticlesShell initialQ={q} initialStatus={status}>
          <div className="overflow-x-auto rounded-xl border border-card-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-card">
                <tr className="border-b border-card-border">
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Level</th>
                  <th className="px-3 py-2">Updated</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-muted">
                      Chưa có bài trên Supabase.{" "}
                      <Link
                        href="/admin/articles/new"
                        className="text-accent underline"
                      >
                        Tạo bài đầu tiên
                      </Link>
                    </td>
                  </tr>
                ) : (
                  articles.map((a) => (
                    <tr key={a.id} className="border-b border-card-border">
                      <td className="px-3 py-2">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-muted">{a.slug}</div>
                      </td>
                      <td className="px-3 py-2 capitalize">{a.status}</td>
                      <td className="px-3 py-2 capitalize">{a.level}</td>
                      <td className="px-3 py-2">{formatDate(a.updated_at)}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/articles/${a.id}`}
                            className="text-accent"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/articles/${a.slug}`}
                            className="text-muted"
                          >
                            Preview
                          </Link>
                          <DeleteArticleButton id={a.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AdminArticlesShell>
      </Suspense>
    </div>
  );
}
