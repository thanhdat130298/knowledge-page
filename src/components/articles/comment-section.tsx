"use client";

import { useAuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";
import type { Comment } from "@/types";
import { ThumbsUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const MAX = 2000;

type Props = {
  articleId: string;
  isLoggedIn: boolean;
  initialComments: Comment[];
};

export function CommentSection({
  articleId,
  isLoggedIn,
  initialComments,
}: Props) {
  const { openLogin } = useAuthModal();
  const { toast } = useToast();
  const pathname = usePathname();
  const [comments, setComments] = useState(initialComments);
  const [sort, setSort] = useState<"newest" | "oldest" | "useful">("newest");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [votingId, setVotingId] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const copy = [...comments];
    if (sort === "oldest") {
      return copy.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    }
    if (sort === "useful") {
      return copy.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
    }
    return copy.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [comments, sort]);

  function requireAuth() {
    openLogin(pathname);
  }

  async function submit() {
    if (!isLoggedIn) return requireAuth();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const newComment: Comment = {
        id: crypto.randomUUID(),
        article_id: articleId,
        user_id: "local",
        parent_id: replyTo,
        content: content.trim(),
        moderation: "visible",
        is_deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: {
          id: "local",
          username: "you",
          display_name: "Bạn",
          bio: null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        vote_count: 0,
        replies: [],
      };
      if (replyTo) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === replyTo
              ? { ...c, replies: [...(c.replies || []), newComment] }
              : c,
          ),
        );
      } else {
        setComments((prev) => [newComment, ...prev]);
      }
      setContent("");
      setReplyTo(null);
      toast({ title: "Đã gửi bình luận", variant: "success" });
    } finally {
      setLoading(false);
    }
  }

  async function vote(id: string) {
    if (!isLoggedIn) return requireAuth();
    if (votingId) return;
    setVotingId(id);
    try {
      // TODO: Server Action persist vote
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              vote_count: (c.vote_count || 0) + (c.user_voted ? -1 : 1),
              user_voted: !c.user_voted,
            };
          }
          return {
            ...c,
            replies: c.replies?.map((r) =>
              r.id === id
                ? {
                    ...r,
                    vote_count: (r.vote_count || 0) + (r.user_voted ? -1 : 1),
                    user_voted: !r.user_voted,
                  }
                : r,
            ),
          };
        }),
      );
    } finally {
      setVotingId(null);
    }
  }

  return (
    <section id="comments" className="mt-10 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-2xl font-semibold">Bình luận</h2>
        <select
          className="h-9 rounded-lg border border-card-border bg-card px-2 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sắp xếp bình luận"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="useful">Hữu ích nhất</option>
        </select>
      </div>

      <div className="rounded-xl border border-card-border bg-card p-4">
        {replyTo ? (
          <p className="mb-2 text-xs text-muted">
            Đang trả lời ·{" "}
            <button
              type="button"
              className="underline"
              onClick={() => setReplyTo(null)}
            >
              Hủy
            </button>
          </p>
        ) : null}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX))}
          placeholder={
            isLoggedIn
              ? "Viết bình luận (hỗ trợ xuống dòng và `inline code`)..."
              : "Đăng nhập để bình luận"
          }
          onFocus={() => {
            if (!isLoggedIn) requireAuth();
          }}
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted">
            {content.length}/{MAX}
          </span>
          <Button
            size="sm"
            onClick={submit}
            loading={loading}
            disabled={!content.trim()}
          >
            {loading ? "Đang gửi..." : "Gửi"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.length === 0 ? (
          <p className="text-sm text-muted">Chưa có bình luận nào.</p>
        ) : (
          sorted.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              votingId={votingId}
              onReply={() => {
                if (!isLoggedIn) return requireAuth();
                setReplyTo(c.id);
              }}
              onVote={() => vote(c.id)}
              onVoteReply={(id) => vote(id)}
            />
          ))
        )}
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  votingId,
  onReply,
  onVote,
  onVoteReply,
}: {
  comment: Comment;
  votingId: string | null;
  onReply: () => void;
  onVote: () => void;
  onVoteReply: (id: string) => void;
}) {
  const body = comment.is_deleted
    ? "Bình luận này đã bị xóa."
    : comment.content;
  const voting = votingId === comment.id;

  return (
    <div className="rounded-xl border border-card-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {(comment.author?.username || "?").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <div className="font-medium">
            {comment.author?.display_name || comment.author?.username}
          </div>
          <div className="text-xs text-muted">{formatDate(comment.created_at)}</div>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{body}</p>
      {!comment.is_deleted ? (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs hover:bg-accent-soft disabled:opacity-50"
            onClick={onVote}
            disabled={Boolean(votingId)}
            aria-busy={voting || undefined}
          >
            <ThumbsUp className="h-3.5 w-3.5" />{" "}
            {voting ? "..." : comment.vote_count || 0}
          </button>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-xs hover:bg-accent-soft disabled:opacity-50"
            onClick={onReply}
            disabled={Boolean(votingId)}
          >
            Reply
          </button>
        </div>
      ) : null}
      {comment.replies?.length ? (
        <div className="mt-3 space-y-3 border-l border-card-border pl-4">
          {comment.replies.map((r) => (
            <div key={r.id}>
              <div className="text-sm font-medium">
                {r.author?.display_name || r.author?.username}
                <span className="ml-2 text-xs font-normal text-muted">
                  trả lời {comment.author?.username}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm">
                {r.is_deleted ? "Bình luận này đã bị xóa." : r.content}
              </p>
              <button
                type="button"
                className="mt-1 inline-flex items-center gap-1 text-xs text-muted hover:text-foreground disabled:opacity-50"
                onClick={() => onVoteReply(r.id)}
                disabled={Boolean(votingId)}
                aria-busy={votingId === r.id || undefined}
              >
                <ThumbsUp className="h-3.5 w-3.5" />{" "}
                {votingId === r.id ? "..." : r.vote_count || 0}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
