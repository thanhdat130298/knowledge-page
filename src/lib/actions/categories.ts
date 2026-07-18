"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { isValidSlug } from "@/lib/slug";
import { categorySchema } from "@/lib/validations";

export type SaveCategoryInput = {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  sort_order: number;
  is_active: boolean;
};

export type SaveCategoryResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

export async function saveCategory(
  input: SaveCategoryInput,
): Promise<SaveCategoryResult> {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return { ok: false, error: "Chỉ admin mới được quản lý danh mục" };
  }

  const parsed = categorySchema.safeParse({
    name: input.name,
    slug: input.slug,
    description: input.description,
    icon: input.icon,
    sort_order: input.sort_order,
    is_active: input.is_active,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ",
    };
  }

  if (!isValidSlug(input.slug)) {
    return { ok: false, error: "Slug không hợp lệ" };
  }

  const supabase = await createClient();
  const now = new Date().toISOString();
  const payload = {
    name: input.name.trim(),
    slug: input.slug.trim(),
    description: input.description?.trim() || null,
    icon: input.icon?.trim() || null,
    sort_order: input.sort_order,
    is_active: input.is_active,
    updated_at: now,
  };

  let categoryId = input.id;
  let slug = input.slug;

  if (categoryId) {
    const { data: existing } = await supabase
      .from("categories")
      .select("slug")
      .eq("id", categoryId)
      .maybeSingle();

    const { error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", categoryId);
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug đã tồn tại" };
      }
      return { ok: false, error: error.message };
    }

    if (existing?.slug && existing.slug !== slug) {
      revalidatePath(`/categories/${existing.slug}`);
    }
  } else {
    const { data, error } = await supabase
      .from("categories")
      .insert(payload)
      .select("id, slug")
      .single();
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug đã tồn tại" };
      }
      return { ok: false, error: error.message };
    }
    categoryId = data.id as string;
    slug = data.slug as string;
  }

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/categories/${slug}`);
  revalidatePath("/admin/categories");

  return { ok: true, id: categoryId!, slug };
}

export async function deleteCategory(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return { ok: false, error: "Chỉ admin mới được xóa danh mục" };
  }

  const supabase = await createClient();

  const { count, error: countError } = await supabase
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (countError) {
    return { ok: false, error: countError.message };
  }

  if ((count ?? 0) > 0) {
    return {
      ok: false,
      error: `Không thể xóa: còn ${count} bài thuộc danh mục này. Chuyển bài sang danh mục khác trước.`,
    };
  }

  const { data: category } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/categories");
  if (category?.slug) revalidatePath(`/categories/${category.slug}`);

  return { ok: true };
}
