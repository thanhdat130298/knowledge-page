"use client";

import {
  deleteSeries,
  saveSeries,
  type SaveSeriesInput,
} from "@/lib/actions/series";
import { generateSlug } from "@/lib/slug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import type { Series } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emptyForm = (): SaveSeriesInput => ({
  title: "",
  slug: "",
  description: "",
  cover_image_url: "",
  is_published: false,
  sort_order: 0,
});

export function AdminSeriesClient({ initial }: { initial: Series[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<SaveSeriesInput | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  function syncItems(next: Series[]) {
    setItems(next);
    router.refresh();
  }

  function startEdit(series: Series) {
    setEditingId(series.id);
    setEditForm({
      id: series.id,
      title: series.title,
      slug: series.slug,
      description: series.description || "",
      cover_image_url: series.cover_image_url || "",
      is_published: series.is_published,
      sort_order: series.sort_order,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function handleCreate() {
    if (!createForm.title.trim()) return;
    setSaving(true);
    setBusyKey("create");
    try {
      const slug = createForm.slug.trim() || generateSlug(createForm.title);
      const result = await saveSeries({ ...createForm, slug });
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã tạo series", variant: "success" });
      setCreateForm(emptyForm());
      syncItems([
        ...items,
        {
          id: result.id,
          title: createForm.title.trim(),
          slug: result.slug,
          description: createForm.description?.trim() || null,
          cover_image_url: createForm.cover_image_url?.trim() || null,
          is_published: createForm.is_published,
          sort_order: createForm.sort_order,
          article_count: 0,
        },
      ]);
    } finally {
      setSaving(false);
      setBusyKey(null);
    }
  }

  async function handleUpdate() {
    if (!editForm?.id) return;
    setSaving(true);
    setBusyKey("update");
    try {
      const result = await saveSeries(editForm);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã cập nhật series", variant: "success" });
      syncItems(
        items.map((s) =>
          s.id === editForm.id
            ? {
                ...s,
                title: editForm.title.trim(),
                slug: result.slug,
                description: editForm.description?.trim() || null,
                cover_image_url: editForm.cover_image_url?.trim() || null,
                is_published: editForm.is_published,
                sort_order: editForm.sort_order,
              }
            : s,
        ),
      );
      cancelEdit();
    } finally {
      setSaving(false);
      setBusyKey(null);
    }
  }

  async function handleDelete(series: Series) {
    if (
      !confirm(
        `Xóa series "${series.title}"? Các bài sẽ được gỡ khỏi series (không xóa bài).`,
      )
    ) {
      return;
    }
    setSaving(true);
    setBusyKey(`delete:${series.id}`);
    try {
      const result = await deleteSeries(series.id);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã xóa series", variant: "success" });
      syncItems(items.filter((s) => s.id !== series.id));
      if (editingId === series.id) cancelEdit();
    } finally {
      setSaving(false);
      setBusyKey(null);
    }
  }

  return (
    <>
      <section className="mt-6 rounded-xl border border-card-border bg-card p-4">
        <h2 className="text-sm font-semibold">Tạo series mới</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Input
            value={createForm.title}
            onChange={(e) => {
              const title = e.target.value;
              setCreateForm((f) => ({
                ...f,
                title,
                slug: f.slug || generateSlug(title),
              }));
            }}
            placeholder="Tiêu đề series"
            aria-label="Tiêu đề series"
          />
          <Input
            value={createForm.slug}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, slug: e.target.value }))
            }
            placeholder="slug-series"
            aria-label="Slug"
          />
          <Input
            type="number"
            min={0}
            value={createForm.sort_order}
            onChange={(e) =>
              setCreateForm((f) => ({
                ...f,
                sort_order: Number(e.target.value) || 0,
              }))
            }
            placeholder="Thứ tự"
            aria-label="Thứ tự"
          />
          <Input
            value={createForm.cover_image_url || ""}
            onChange={(e) =>
              setCreateForm((f) => ({
                ...f,
                cover_image_url: e.target.value,
              }))
            }
            placeholder="Cover image URL (tuỳ chọn)"
            aria-label="Cover image"
          />
        </div>
        <Textarea
          className="mt-3"
          value={createForm.description || ""}
          onChange={(e) =>
            setCreateForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Mô tả series"
          aria-label="Mô tả"
        />
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={createForm.is_published}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, is_published: e.target.checked }))
            }
          />
          Publish series (hiển thị công khai)
        </label>
        <Button
          className="mt-4"
          loading={busyKey === "create"}
          disabled={saving}
          onClick={handleCreate}
        >
          {busyKey === "create" ? "Đang lưu..." : "Thêm series"}
        </Button>
      </section>

      <ul className="mt-6 space-y-3">
        {items.length === 0 ? (
          <li className="text-sm text-muted">
            Chưa có series. Tạo mới rồi gắn bài trong editor bài viết.
          </li>
        ) : (
          items.map((s) => (
            <li
              key={s.id}
              className="rounded-xl border border-card-border bg-card px-4 py-3"
            >
              {editingId === s.id && editForm ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f ? { ...f, title: e.target.value } : f,
                        )
                      }
                      aria-label="Sửa tiêu đề"
                    />
                    <Input
                      value={editForm.slug}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f ? { ...f, slug: e.target.value } : f,
                        )
                      }
                      aria-label="Sửa slug"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={editForm.sort_order}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f
                            ? {
                                ...f,
                                sort_order: Number(e.target.value) || 0,
                              }
                            : f,
                        )
                      }
                      aria-label="Sửa thứ tự"
                    />
                    <Input
                      value={editForm.cover_image_url || ""}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f
                            ? { ...f, cover_image_url: e.target.value }
                            : f,
                        )
                      }
                      aria-label="Sửa cover"
                    />
                  </div>
                  <Textarea
                    value={editForm.description || ""}
                    onChange={(e) =>
                      setEditForm((f) =>
                        f ? { ...f, description: e.target.value } : f,
                      )
                    }
                    aria-label="Sửa mô tả"
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editForm.is_published}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f ? { ...f, is_published: e.target.checked } : f,
                        )
                      }
                    />
                    Published
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      loading={busyKey === "update"}
                      disabled={saving}
                      onClick={handleUpdate}
                    >
                      {busyKey === "update" ? "Đang lưu..." : "Lưu"}
                    </Button>
                    <Button
                      variant="secondary"
                      disabled={saving}
                      onClick={cancelEdit}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-muted">
                      {s.slug} · thứ tự {s.sort_order}
                    </div>
                    {s.description ? (
                      <p className="mt-1 text-sm text-muted">{s.description}</p>
                    ) : null}
                    <div className="mt-1 text-xs text-muted">
                      {s.article_count ?? 0} bài ·{" "}
                      {s.is_published ? "Published" : "Draft"}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {s.is_published ? (
                      <Link
                        href={`/series/${s.slug}`}
                        className="inline-flex h-10 items-center rounded-xl border border-card-border px-4 text-sm hover:bg-accent-soft/40"
                        target="_blank"
                      >
                        Xem
                      </Link>
                    ) : null}
                    <Button
                      variant="secondary"
                      disabled={saving}
                      onClick={() => startEdit(s)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      loading={busyKey === `delete:${s.id}`}
                      disabled={saving}
                      onClick={() => handleDelete(s)}
                    >
                      {busyKey === `delete:${s.id}` ? "Đang xóa..." : "Xóa"}
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
}
