"use client";

import { useAuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  articleId: string;
  isLoggedIn: boolean;
  initialBookmarked?: boolean;
  bookmarkCount?: number;
  className?: string;
  /** Compact icon-first control for article header */
  compact?: boolean;
};

export function ArticleBookmarkButton({
  articleId,
  isLoggedIn,
  initialBookmarked = false,
  bookmarkCount = 0,
  className,
  compact = false,
}: Props) {
  const { openLogin } = useAuthModal();
  const { toast } = useToast();
  const pathname = usePathname();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [bookmarks, setBookmarks] = useState(bookmarkCount);
  const [busy, setBusy] = useState(false);

  async function toggleBookmark() {
    if (!isLoggedIn) {
      openLogin(pathname);
      return;
    }
    if (busy) return;
    setBusy(true);
    try {
      // TODO: Server Action persist bookmark — articleId reserved for action
      void articleId;
      setBookmarked((v) => !v);
      setBookmarks((n) => (bookmarked ? Math.max(0, n - 1) : n + 1));
      toast({
        title: bookmarked ? "Đã bỏ bookmark" : "Đã lưu bookmark",
        variant: "success",
      });
    } finally {
      setBusy(false);
    }
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleBookmark}
        disabled={busy}
        aria-pressed={bookmarked}
        aria-busy={busy || undefined}
        aria-label={bookmarked ? "Bỏ bookmark" : "Lưu bookmark"}
        title={bookmarked ? "Bỏ bookmark" : "Lưu bookmark"}
        className={cn(
          "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border px-3 text-sm font-medium transition",
          bookmarked
            ? "border-accent bg-accent-soft text-accent"
            : "border-card-border bg-card text-foreground hover:bg-accent-soft/50",
          "disabled:opacity-50",
          className,
        )}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-4 w-4" aria-hidden />
        ) : (
          <Bookmark className="h-4 w-4" aria-hidden />
        )}
        <span className="tabular-nums">{bookmarks}</span>
      </button>
    );
  }

  return (
    <Button
      variant={bookmarked ? "primary" : "secondary"}
      size="sm"
      onClick={toggleBookmark}
      loading={busy}
      disabled={busy}
      aria-pressed={bookmarked}
      className={className}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {busy ? "Đang lưu..." : `Bookmark (${bookmarks})`}
    </Button>
  );
}
