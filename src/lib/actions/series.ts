"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { isValidSlug } from "@/lib/slug";
import { seriesSchema } from "@/lib/validations";

export type SaveSeriesInput = {
  id?: string;
  title: string;
  slug: string;
  description?: string | null;
  cover_image_url?: string | null;
  is_published: boolean;
  sort_order: number;
};

export type SaveSeriesResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

export async function saveSeries(
  input: SaveSeriesInput,
): Promise<SaveSeriesResult> {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return { ok: false, error: "Chỉ admin mới được quản lý series" };
  }

  const parsed = seriesSchema.safeParse({
    title: input.title,
    slug: input.slug,
    description: input.description,
    cover_image_url: input.cover_image_url || null,
    is_published: input.is_published,
    sort_order: input.sort_order,
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
    title: input.title.trim(),
    slug: input.slug.trim(),
    description: input.description?.trim() || null,
    cover_image_url: input.cover_image_url?.trim() || null,
    is_published: input.is_published,
    sort_order: input.sort_order,
    updated_at: now,
  };

  let seriesId = input.id;
  let slug = input.slug;

  if (seriesId) {
    const { data: existing } = await supabase
      .from("series")
      .select("slug")
      .eq("id", seriesId)
      .maybeSingle();

    const { error } = await supabase
      .from("series")
      .update(payload)
      .eq("id", seriesId);
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug đã tồn tại" };
      }
      return { ok: false, error: error.message };
    }

    if (existing?.slug && existing.slug !== slug) {
      revalidatePath(`/series/${existing.slug}`);
    }
  } else {
    const { data, error } = await supabase
      .from("series")
      .insert(payload)
      .select("id, slug")
      .single();
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug đã tồn tại" };
      }
      return { ok: false, error: error.message };
    }
    seriesId = data.id as string;
    slug = data.slug as string;
  }

  revalidatePath("/");
  revalidatePath("/series");
  revalidatePath(`/series/${slug}`);
  revalidatePath("/admin/series");

  return { ok: true, id: seriesId!, slug };
}

export async function deleteSeries(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return { ok: false, error: "Chỉ admin mới được xóa series" };
  }

  const supabase = await createClient();

  const { data: series } = await supabase
    .from("series")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  // Detach articles first (series_id ON DELETE SET NULL also works, but explicit is clearer)
  await supabase
    .from("articles")
    .update({ series_id: null, series_order: 0 })
    .eq("series_id", id);

  const { error } = await supabase.from("series").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/series");
  revalidatePath("/admin/series");
  if (series?.slug) revalidatePath(`/series/${series.slug}`);

  return { ok: true };
}
