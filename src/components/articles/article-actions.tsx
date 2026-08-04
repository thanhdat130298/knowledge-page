"use client";

import { useAuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { LearningStatus } from "@/types";
import { Link2, MessageSquareWarning, Share2, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  articleId: string;
  isLoggedIn: boolean;
  initialRating?: number;
  ratingAvg?: number;
  ratingCount?: number;
  initialProgress?: LearningStatus;
};

type Busy = "rating" | "progress" | "share" | "copy" | "feedback" | null;

export function ArticleActions({
  articleId,
  isLoggedIn,
  initialRating = 0,
  ratingAvg = 0,
  ratingCount = 0,
  initialProgress = "not_started",
}: Props) {
  const { openLogin } = useAuthModal();
  const { toast } = useToast();
  const pathname = usePathname();
  const [rating, setRating] = useState(initialRating);
  const [avg, setAvg] = useState(ratingAvg);
  const [count, setCount] = useState(ratingCount);
  const [progress, setProgress] = useState<LearningStatus>(initialProgress);
  const [busy, setBusy] = useState<Busy>(null);

  function requireAuth() {
    openLogin(pathname);
  }

  async function setStars(value: number) {
    if (!isLoggedIn) return requireAuth();
    if (busy) return;
    setBusy("rating");
    try {
      // TODO: Server Action persist rating
      const prev = rating;
      setRating(value);
      if (prev === 0) {
        const nextCount = count + 1;
        setAvg((avg * count + value) / nextCount);
        setCount(nextCount);
      } else {
        setAvg((avg * count - prev + value) / count);
      }
      toast({ title: "Đã cập nhật đánh giá", variant: "success" });
    } finally {
      setBusy(null);
    }
  }

  async function updateProgress(next: LearningStatus) {
    if (!isLoggedIn) return requireAuth();
    if (busy) return;
    setBusy("progress");
    try {
      // TODO: Server Action persist learning progress
      setProgress(next);
      toast({ title: "Đã cập nhật tiến độ học", variant: "success" });
    } finally {
      setBusy(null);
    }
  }

  async function copyLink() {
    if (busy) return;
    setBusy("copy");
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Đã copy link bài viết", variant: "success" });
    } finally {
      setBusy(null);
    }
  }

  async function share() {
    if (busy) return;
    setBusy("share");
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({ title: "Đã copy link bài viết", variant: "success" });
      }
    } finally {
      setBusy(null);
    }
  }

  function quickFeedback(label: string) {
    if (!isLoggedIn) return requireAuth();
    toast({ title: `Đã ghi nhận: ${label}`, variant: "success" });
    document.getElementById("feedback-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="space-y-4 overflow-hidden rounded-xl border border-card-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={share}
          loading={busy === "share"}
          disabled={Boolean(busy) && busy !== "share"}
        >
          <Share2 className="h-4 w-4" />{" "}
          {busy === "share" ? "Đang chia sẻ..." : "Chia sẻ"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyLink}
          loading={busy === "copy"}
          disabled={Boolean(busy) && busy !== "copy"}
        >
          <Link2 className="h-4 w-4" />{" "}
          {busy === "copy" ? "Đang copy..." : "Copy link"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={Boolean(busy)}
          onClick={() => {
            if (!isLoggedIn) return requireAuth();
            document
              .getElementById("feedback-form")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <MessageSquareWarning className="h-4 w-4" /> Góp ý
        </Button>
      </div>

      <div>
        <div className="mb-1 text-sm font-medium">Đánh giá bài viết</div>
        <div className="flex flex-wrap items-center gap-1" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              disabled={Boolean(busy)}
              aria-busy={busy === "rating" || undefined}
              aria-label={`${n} sao`}
              className="rounded p-1 hover:bg-accent-soft disabled:opacity-50"
              onClick={() => setStars(n)}
            >
              <Star
                className={`h-5 w-5 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
              />
            </button>
          ))}
          <span className="ml-1 text-sm text-muted">
            {busy === "rating"
              ? "Đang lưu..."
              : `${avg.toFixed(1)} · ${count} lượt`}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            ["Hữu ích", "useful"],
            ["Khó hiểu", "hard"],
            ["Chưa chính xác", "inaccurate"],
          ].map(([label]) => (
            <button
              key={label}
              type="button"
              disabled={Boolean(busy)}
              className="rounded-lg border border-card-border px-2.5 py-1 text-xs hover:bg-accent-soft disabled:opacity-50"
              onClick={() => quickFeedback(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 text-sm font-medium">Tiến độ học</div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["learning", "Đang học"],
              ["understood", "Đã hiểu"],
              ["review", "Cần ôn lại"],
              ["not_started", "Xóa trạng thái"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              disabled={Boolean(busy)}
              aria-busy={busy === "progress" || undefined}
              className={`rounded-lg border px-2.5 py-1 text-xs disabled:opacity-50 ${
                progress === value
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-card-border hover:bg-accent-soft"
              }`}
              onClick={() => updateProgress(value)}
            >
              {busy === "progress" && progress === value
                ? "Đang lưu..."
                : label}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted">Article: {articleId}</p>
      </div>
    </div>
  );
}
