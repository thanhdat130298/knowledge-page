"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Comment } from "@/types";
import { useState } from "react";

export function AdminCommentsClient({ initial }: { initial: Comment[] }) {
  const { toast } = useToast();
  const [items, setItems] = useState(initial);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  async function updateLocal(id: string, moderation: Comment["moderation"]) {
    if (busyKey) return;
    setBusyKey(`${id}:${moderation}`);
    try {
      // TODO: Server Action persist moderation
      setItems((prev) =>
        prev.map((c) => (c.id === id ? { ...c, moderation } : c)),
      );
      toast({
        title: `UI cập nhật ${moderation} — cần Server Action để ghi Supabase`,
        variant: "default",
      });
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <ul className="mt-6 space-y-3">
      {items.length === 0 ? (
        <li className="text-sm text-muted">Chưa có comment.</li>
      ) : (
        items.map((c) => {
          const rowBusy = busyKey?.startsWith(`${c.id}:`) ?? false;
          return (
            <li
              key={c.id}
              className="rounded-xl border border-card-border bg-card p-4"
            >
              <div className="text-sm text-muted">
                {c.author?.username || c.user_id} · {c.moderation}
              </div>
              <p className="mt-2 text-sm">{c.content}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  loading={busyKey === `${c.id}:hidden`}
                  disabled={rowBusy && busyKey !== `${c.id}:hidden`}
                  onClick={() => updateLocal(c.id, "hidden")}
                >
                  {busyKey === `${c.id}:hidden` ? "Đang ẩn..." : "Ẩn"}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  loading={busyKey === `${c.id}:spam`}
                  disabled={rowBusy && busyKey !== `${c.id}:spam`}
                  onClick={() => updateLocal(c.id, "spam")}
                >
                  {busyKey === `${c.id}:spam` ? "Đang xử lý..." : "Spam"}
                </Button>
                <Button
                  size="sm"
                  loading={busyKey === `${c.id}:visible`}
                  disabled={rowBusy && busyKey !== `${c.id}:visible`}
                  onClick={() => updateLocal(c.id, "visible")}
                >
                  {busyKey === `${c.id}:visible`
                    ? "Đang khôi phục..."
                    : "Khôi phục"}
                </Button>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
}
