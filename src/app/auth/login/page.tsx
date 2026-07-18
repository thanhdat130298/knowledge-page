import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Đăng nhập",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold">Đăng nhập</h1>
      <p className="mt-2 text-muted">
        Dùng nút Đăng nhập trên header để mở modal và không mất ngữ cảnh trang
        đang đọc. Hoặc tiếp tục tại đây sau khi cấu hình Supabase.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-xl bg-accent px-4 text-sm font-medium text-accent-foreground"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
