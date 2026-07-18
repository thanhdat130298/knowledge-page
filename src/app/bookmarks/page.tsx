import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth/session";
import { ArticleCard } from "@/components/articles/article-card";
import { mapArticleRow } from "@/lib/data/mappers";
import type { Article } from "@/types";

export const metadata: Metadata = {
  title: "Bookmark",
  robots: { index: false, follow: false },
};

export default async function BookmarksPage() {
  const user = await getSessionUser();
  let articles: Article[] = [];

  if (user) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("bookmarks")
        .select(
          `
          article:articles(
            *,
            category:categories(*),
            author:profiles(*),
            article_tags(tag:tags(*))
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      articles = (data || [])
        .map((row) => {
          const article = (row as { article?: unknown }).article;
          return article ? mapArticleRow(article as never) : null;
        })
        .filter((a): a is Article => Boolean(a));
    } catch {
      articles = [];
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <h1 className="font-display text-3xl font-semibold">Bookmark</h1>
      <p className="mt-1 text-muted">Danh sách bài đã lưu trên tài khoản của bạn.</p>
      {!user ? (
        <div className="mt-8 rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
          Đăng nhập để xem bookmark.
        </div>
      ) : articles.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-card-border p-10 text-center text-muted">
          Chưa có bookmark.{" "}
          <Link href="/articles" className="text-accent underline">
            Khám phá bài viết
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
