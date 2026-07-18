"use client";

import { Input } from "@/components/ui/input";
import type { Tag } from "@/types";
import { useMemo, useState } from "react";

export function AdminTagsClient({ initial }: { initial: Tag[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      initial.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())),
    [initial, q],
  );

  return (
    <>
      <Input
        className="mt-6"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tag"
      />
      <ul className="mt-4 space-y-2">
        {filtered.length === 0 ? (
          <li className="text-sm text-muted">Không có tag.</li>
        ) : (
          filtered.map((t) => (
            <li
              key={t.id}
              className="rounded-xl border border-card-border bg-card px-4 py-2 text-sm"
            >
              #{t.name}
            </li>
          ))
        )}
      </ul>
    </>
  );
}
