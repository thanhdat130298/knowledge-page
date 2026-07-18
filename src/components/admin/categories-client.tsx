"use client";

import {
  deleteCategory,
  saveCategory,
  type SaveCategoryInput,
} from "@/lib/actions/categories";
import { generateSlug } from "@/lib/slug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import type { Category } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emptyForm = (): SaveCategoryInput => ({
  name: "",
  slug: "",
  description: "",
  icon: "",
  sort_order: 0,
  is_active: true,
});

export function AdminCategoriesClient({ initial }: { initial: Category[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<SaveCategoryInput | null>(null);
  const [saving, setSaving] = useState(false);

  function syncItems(next: Category[]) {
    setItems(next);
    router.refresh();
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setEditForm({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      icon: category.icon || "",
      sort_order: category.sort_order,
      is_active: category.is_active,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function handleCreate() {
    if (!createForm.name.trim()) return;
    setSaving(true);
    try {
      const slug = createForm.slug.trim() || generateSlug(createForm.name);
      const result = await saveCategory({ ...createForm, slug });
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã tạo danh mục", variant: "success" });
      setCreateForm(emptyForm());
      syncItems([
        ...items,
        {
          id: result.id,
          name: createForm.name.trim(),
          slug: result.slug,
          description: createForm.description?.trim() || null,
          icon: createForm.icon?.trim() || null,
          sort_order: createForm.sort_order,
          is_active: createForm.is_active,
          article_count: 0,
        },
      ]);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate() {
    if (!editForm?.id) return;
    setSaving(true);
    try {
      const result = await saveCategory(editForm);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã cập nhật danh mục", variant: "success" });
      syncItems(
        items.map((c) =>
          c.id === editForm.id
            ? {
                ...c,
                name: editForm.name.trim(),
                slug: result.slug,
                description: editForm.description?.trim() || null,
                icon: editForm.icon?.trim() || null,
                sort_order: editForm.sort_order,
                is_active: editForm.is_active,
              }
            : c,
        ),
      );
      cancelEdit();
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(category: Category) {
    setSaving(true);
    try {
      const result = await saveCategory({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        sort_order: category.sort_order,
        is_active: !category.is_active,
      });
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      syncItems(
        items.map((c) =>
          c.id === category.id ? { ...c, is_active: !c.is_active } : c,
        ),
      );
      toast({
        title: category.is_active ? "Đã tắt danh mục" : "Đã bật danh mục",
        variant: "success",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: Category) {
    if (
      !confirm(
        `Xóa vĩnh viễn danh mục "${category.name}"? Hành động không thể hoàn tác.`,
      )
    ) {
      return;
    }
    setSaving(true);
    try {
      const result = await deleteCategory(category.id);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã xóa danh mục", variant: "success" });
      syncItems(items.filter((c) => c.id !== category.id));
      if (editingId === category.id) cancelEdit();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <section className="mt-6 rounded-xl border border-card-border bg-card p-4">
        <h2 className="text-sm font-semibold">Tạo danh mục mới</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Input
            value={createForm.name}
            onChange={(e) => {
              const name = e.target.value;
              setCreateForm((f) => ({
                ...f,
                name,
                slug: f.slug || generateSlug(name),
              }));
            }}
            placeholder="Tên danh mục"
            aria-label="Tên danh mục"
          />
          <Input
            value={createForm.slug}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, slug: e.target.value }))
            }
            placeholder="slug-danh-muc"
            aria-label="Slug"
          />
          <Input
            value={createForm.icon || ""}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, icon: e.target.value }))
            }
            placeholder="Icon (Lucide, ví dụ Code2)"
            aria-label="Icon"
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
        </div>
        <Textarea
          className="mt-3"
          value={createForm.description || ""}
          onChange={(e) =>
            setCreateForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Mô tả ngắn"
          aria-label="Mô tả"
        />
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={createForm.is_active}
            onChange={(e) =>
              setCreateForm((f) => ({ ...f, is_active: e.target.checked }))
            }
          />
          Hiển thị công khai (active)
        </label>
        <Button className="mt-4" disabled={saving} onClick={handleCreate}>
          {saving ? "Đang lưu..." : "Thêm danh mục"}
        </Button>
      </section>

      <ul className="mt-6 space-y-3">
        {items.length === 0 ? (
          <li className="text-sm text-muted">
            Chưa có danh mục. Tạo mới hoặc chạy migration 002 để seed.
          </li>
        ) : (
          items.map((c) => (
            <li
              key={c.id}
              className="rounded-xl border border-card-border bg-card px-4 py-3"
            >
              {editingId === c.id && editForm ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f ? { ...f, name: e.target.value } : f,
                        )
                      }
                      aria-label="Sửa tên"
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
                      value={editForm.icon || ""}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f ? { ...f, icon: e.target.value } : f,
                        )
                      }
                      aria-label="Sửa icon"
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
                      checked={editForm.is_active}
                      onChange={(e) =>
                        setEditForm((f) =>
                          f ? { ...f, is_active: e.target.checked } : f,
                        )
                      }
                    />
                    Active
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button disabled={saving} onClick={handleUpdate}>
                      Lưu
                    </Button>
                    <Button variant="secondary" onClick={cancelEdit}>
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted">
                      {c.slug} · thứ tự {c.sort_order}
                      {c.icon ? ` · icon ${c.icon}` : ""}
                    </div>
                    {c.description ? (
                      <p className="mt-1 text-sm text-muted">{c.description}</p>
                    ) : null}
                    <div className="mt-1 text-xs text-muted">
                      {c.article_count ?? 0} bài viết
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                    <span
                      className={
                        c.is_active
                          ? "inline-flex h-9 items-center justify-center rounded-xl border border-success/30 bg-success/10 px-3 text-sm font-medium text-success"
                          : "inline-flex h-9 items-center justify-center rounded-xl border border-card-border bg-muted/10 px-3 text-sm font-medium text-muted"
                      }
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        disabled={saving}
                        onClick={() => startEdit(c)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="secondary"
                        disabled={saving}
                        onClick={() => handleToggle(c)}
                      >
                        {c.is_active ? "Tắt" : "Bật"}
                      </Button>
                      <Button
                        variant="danger"
                        disabled={saving}
                        onClick={() => handleDelete(c)}
                      >
                        Xóa
                      </Button>
                    </div>
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
