"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Comment } from "@/types";
import { useState } from "react";

export function AdminCommentsClient({ initial }: { initial: Comment[] }) {
  const { toast } = useToast();
  const [items, setItems] = useState(initial);

  function updateLocal(id: string, moderation: Comment["moderation"]) {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, moderation } : c)),
    );
    toast({
      title: `UI cập nhật ${moderation} — cần Server Action để ghi Supabase`,
      variant: "default",
    });
  }

  return (
    <ul className="mt-6 space-y-3">
      {items.length === 0 ? (
        <li className="text-sm text-muted">Chưa có comment.</li>
      ) : (
        items.map((c) => (
          <li key={c.id} className="rounded-xl border border-card-border bg-card p-4">
            <div className="text-sm text-muted">
              {c.author?.username || c.user_id} · {c.moderation}
            </div>
            <p className="mt-2 text-sm">{c.content}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateLocal(c.id, "hidden")}
              >
                Ẩn
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateLocal(c.id, "spam")}
              >
                Spam
              </Button>
              <Button size="sm" onClick={() => updateLocal(c.id, "visible")}>
                Khôi phục
              </Button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
