"use client";

import { useAuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TYPES = [
  { value: "incorrect", label: "Nội dung sai" },
  { value: "outdated", label: "Nội dung đã cũ" },
  { value: "hard_to_understand", label: "Giải thích khó hiểu" },
  { value: "missing_content", label: "Thiếu nội dung" },
  { value: "missing_examples", label: "Thiếu ví dụ" },
  { value: "suggestion", label: "Đề xuất bổ sung" },
  { value: "typo", label: "Lỗi chính tả" },
  { value: "other", label: "Vấn đề khác" },
] as const;

export function FeedbackForm({
  articleId,
  isLoggedIn,
}: {
  articleId: string;
  isLoggedIn: boolean;
}) {
  const { openLogin } = useAuthModal();
  const { toast } = useToast();
  const pathname = usePathname();
  const [type, setType] = useState<(typeof TYPES)[number]["value"]>("suggestion");
  const [content, setContent] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [loading, setLoading] = useState(false);

  function captureSelection() {
    const text = window.getSelection()?.toString().trim() || "";
    if (text) setSelectedText(text);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      openLogin(pathname);
      return;
    }
    if (content.trim().length < 5) {
      toast({ title: "Nội dung góp ý quá ngắn", variant: "error" });
      return;
    }
    setLoading(true);
    try {
      // Persist via Server Action / Supabase when wired
      void articleId;
      toast({ title: "Đã gửi góp ý. Cảm ơn bạn!", variant: "success" });
      setContent("");
      setSelectedText("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="feedback-form" className="mt-10 rounded-xl border border-card-border bg-card p-5">
      <h2 className="font-display text-xl font-semibold">Góp ý về nội dung</h2>
      <p className="mt-1 text-sm text-muted">
        Giúp admin cải thiện độ chính xác. Có thể bôi đen đoạn văn rồi nhấn “Lấy đoạn đã chọn”.
      </p>
      <form className="mt-4 space-y-3" onSubmit={submit}>
        <div>
          <label className="mb-1 block text-sm" htmlFor="fb-type">
            Loại góp ý
          </label>
          <select
            id="fb-type"
            className="h-10 w-full rounded-xl border border-card-border bg-background px-3 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm" htmlFor="fb-selected">
              Đoạn được chọn
            </label>
            <button
              type="button"
              className="text-xs text-accent underline"
              onClick={captureSelection}
            >
              Lấy đoạn đã chọn
            </button>
          </div>
          <Textarea
            id="fb-selected"
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            placeholder="Tùy chọn"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="fb-content">
            Nội dung góp ý
          </label>
          <Textarea
            id="fb-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={5}
          />
        </div>
        <Button type="submit" loading={loading}>
          {loading ? "Đang gửi..." : "Gửi góp ý"}
        </Button>
      </form>
    </section>
  );
}
