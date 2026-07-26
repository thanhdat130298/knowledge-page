"use client";

import { deleteArticle } from "@/lib/actions/articles";
import { Button } from "@/components/ui/button";
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
    <Button
      type="button"
      variant="danger"
      size="sm"
      loading={loading}
      onClick={onDelete}
    >
      {loading ? "Đang xóa..." : "Xóa"}
    </Button>
  );
}
