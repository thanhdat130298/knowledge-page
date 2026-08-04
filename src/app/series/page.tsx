import { getPublishedSeries } from "@/lib/data/series";
import { BackNav } from "@/components/ui/back-link";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Series",
  description:
    "Các chuỗi bài kiến thức Frontend theo chủ đề — học theo thứ tự từ đầu đến cuối.",
};

export default async function SeriesIndexPage() {
  const series = await getPublishedSeries();

  return (
    <div className="mx-auto w-full max-w-4xl overflow-x-clip px-4 py-8 md:px-6">
      <BackNav href="/" label="Trang chủ" />
      <h1 className="font-display text-3xl font-semibold break-words">Series</h1>
      <p className="mt-1 text-sm text-muted">
        Học theo lộ trình — ví dụ phỏng vấn công ty A với các bài xếp theo thứ tự
        1 → N. Mở series rồi đọc từng bài; mỗi bài có nút bài trước / bài tiếp.
      </p>

      {series.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Chưa có series nào được publish.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {series.map((s) => (
            <li key={s.id} className="min-w-0">
              <Link
                href={`/series/${s.slug}`}
                className="block min-w-0 overflow-hidden rounded-xl border border-card-border bg-card px-4 py-4 transition hover:bg-accent-soft/30"
              >
                <div className="font-medium break-words">{s.title}</div>
                {s.description ? (
                  <p className="mt-1 line-clamp-2 break-words text-sm text-muted">
                    {s.description}
                  </p>
                ) : null}
                <div className="mt-2 text-xs text-muted">
                  {s.article_count ?? 0} bài viết · đọc theo thứ tự
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
