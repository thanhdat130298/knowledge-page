import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Đăng ký",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold">Đăng ký</h1>
      <p className="mt-2 text-muted">
        Mở modal Đăng nhập trên header và chuyển sang tab Đăng ký để tạo tài
        khoản bằng email/password hoặc Google.
      </p>
      <Link href="/" className="mt-6 inline-block text-accent underline">
        Về trang chủ
      </Link>
    </div>
  );
}
