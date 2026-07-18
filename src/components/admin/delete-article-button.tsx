"use client";

import { deleteArticle } from "@/lib/actions/articles";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteArticleButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Xóa vĩnh viễn bài này trên Supabase?")) return;
    setLoading(true);
    try {
      const result = await deleteArticle(id);
      if (!result.ok) {
        alert(result.error);
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="text-danger disabled:opacity-50"
      disabled={loading}
      onClick={onDelete}
    >
      {loading ? "..." : "Xóa"}
    </button>
  );
}
