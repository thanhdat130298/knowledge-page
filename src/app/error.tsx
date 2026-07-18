"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-semibold">Đã xảy ra lỗi</h1>
        <p className="mt-2 text-sm opacity-70">{error.message}</p>
        <button
          type="button"
          className="mt-6 rounded-xl bg-teal-700 px-4 py-2 text-white"
          onClick={reset}
        >
          Thử lại
        </button>
      </body>
    </html>
  );
}
