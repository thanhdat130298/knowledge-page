import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trang cá nhân",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <div className="surface-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-xl font-semibold text-accent">
            U
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold">Người dùng</h1>
            <p className="text-sm text-muted">
              Đăng nhập để xem username, bio và thống kê thật.
            </p>
          </div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-background p-3">
            <dt className="text-xs text-muted">Comment</dt>
            <dd className="text-xl font-semibold">0</dd>
          </div>
          <div className="rounded-xl bg-background p-3">
            <dt className="text-xs text-muted">Bookmark</dt>
            <dd className="text-xl font-semibold">0</dd>
          </div>
          <div className="rounded-xl bg-background p-3">
            <dt className="text-xs text-muted">Đã hiểu</dt>
            <dd className="text-xl font-semibold">0</dd>
          </div>
        </dl>
        <Link
          href="/profile/settings"
          className="mt-6 inline-flex h-10 items-center rounded-xl border border-card-border px-4 text-sm hover:bg-accent-soft"
        >
          Cài đặt hồ sơ
        </Link>
      </div>
    </div>
  );
}
