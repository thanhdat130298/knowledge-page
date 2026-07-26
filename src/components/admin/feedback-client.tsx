"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { useState } from "react";

type Item = {
  id: string;
  article: string;
  user: string;
  type: string;
  content: string;
  status: "pending" | "reviewing" | "resolved" | "rejected";
  notes: string;
};

export function AdminFeedbackClient({ initial }: { initial: Item[] }) {
  const { toast } = useToast();
  const [items, setItems] = useState(initial);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const filtered = items.filter((i) => {
    if (status && i.status !== status) return false;
    if (
      q &&
      !`${i.article} ${i.content}`.toLowerCase().includes(q.toLowerCase())
    )
      return false;
    return true;
  });

  async function updateStatus(id: string, next: Item["status"]) {
    if (busyKey) return;
    setBusyKey(`${id}:${next}`);
    try {
      // TODO: Server Action persist feedback status
      setItems((prev) =>
        prev.map((x) => (x.id === id ? { ...x, status: next } : x)),
      );
      toast({
        title: `UI → ${next} (cần Server Action để persist)`,
        variant: "default",
      });
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2">
        <input
          className="h-10 rounded-xl border border-card-border bg-card px-3 text-sm"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="h-10 rounded-xl border border-card-border bg-card px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="reviewing">Reviewing</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <ul className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <li className="text-sm text-muted">Chưa có feedback.</li>
        ) : (
          filtered.map((item) => {
            const rowBusy = busyKey?.startsWith(`${item.id}:`) ?? false;
            return (
              <li
                key={item.id}
                className="rounded-xl border border-card-border bg-card p-4"
              >
                <div className="text-sm text-muted">
                  {item.article} · {item.user} · {item.type} · {item.status}
                </div>
                <p className="mt-2 text-sm">{item.content}</p>
                <Textarea
                  className="mt-3"
                  value={item.notes}
                  disabled={rowBusy}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) =>
                        x.id === item.id ? { ...x, notes: e.target.value } : x,
                      ),
                    )
                  }
                  placeholder="Ghi chú nội bộ"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    ["pending", "reviewing", "resolved", "rejected"] as const
                  ).map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={item.status === s ? "primary" : "secondary"}
                      loading={busyKey === `${item.id}:${s}`}
                      disabled={rowBusy && busyKey !== `${item.id}:${s}`}
                      onClick={() => updateStatus(item.id, s)}
                    >
                      {busyKey === `${item.id}:${s}` ? "Đang lưu..." : s}
                    </Button>
                  ))}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}
