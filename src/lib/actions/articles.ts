"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { isValidSlug } from "@/lib/slug";
import { readingTimeFromText } from "@/lib/utils";
import { articleMetaSchema } from "@/lib/validations";
import type { ArticleLevel, ArticleStatus } from "@/types";

export type SaveArticleInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: Record<string, unknown>;
  category_id?: string | null;
  level: ArticleLevel;
  status: ArticleStatus;
  is_featured?: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  cover_image_url?: string | null;
  tag_ids?: string[];
};

export type SaveArticleResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

function plainTextFromContent(content: Record<string, unknown>): string {
  const walk = (node: unknown): string => {
    if (!node || typeof node !== "object") return "";
    const n = node as { text?: string; content?: unknown[] };
    const self = n.text || "";
    const kids = (n.content || []).map(walk).join(" ");
    return `${self} ${kids}`.trim();
  };
  return walk(content);
}

export async function saveArticle(
  input: SaveArticleInput,
): Promise<SaveArticleResult> {
  const { isAdmin, user } = await requireAdmin();
  if (!isAdmin || !user) {
    return {
      ok: false,
      error:
        "Chỉ admin mới được tạo/sửa bài. Đăng nhập bằng email trong ADMIN_EMAILS và admin_allowlist.",
    };
  }

  const parsed = articleMetaSchema.safeParse({
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    category_id: input.category_id,
    level: input.level,
    status: input.status,
    is_featured: input.is_featured ?? false,
    seo_title: input.seo_title,
    seo_description: input.seo_description,
    cover_image_url: input.cover_image_url || null,
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
  const plain = plainTextFromContent(input.content);
  const reading_time_minutes = readingTimeFromText(plain);
  const now = new Date().toISOString();

  let published_at: string | null = null;
  if (input.status === "published") {
    if (input.id) {
      const { data: existing } = await supabase
        .from("articles")
        .select("published_at")
        .eq("id", input.id)
        .maybeSingle();
      published_at = existing?.published_at || now;
    } else {
      published_at = now;
    }
  }

  const payload = {
    title: input.title.trim(),
    slug: input.slug.trim(),
    excerpt: input.excerpt?.trim() || null,
    content: input.content,
    category_id: input.category_id || null,
    level: input.level,
    status: input.status,
    is_featured: Boolean(input.is_featured),
    seo_title: input.seo_title?.trim() || null,
    seo_description: input.seo_description?.trim() || null,
    cover_image_url: input.cover_image_url?.trim() || null,
    reading_time_minutes,
    author_id: user.id,
    updated_at: now,
    published_at,
  };

  let articleId = input.id;

  if (articleId) {
    const { error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", articleId);
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug đã tồn tại" };
      }
      return { ok: false, error: error.message };
    }
  } else {
    const { data, error } = await supabase
      .from("articles")
      .insert(payload)
      .select("id")
      .single();
    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug đã tồn tại" };
      }
      return { ok: false, error: error.message };
    }
    articleId = data.id as string;
  }

  const tagIds = input.tag_ids || [];
  await supabase.from("article_tags").delete().eq("article_id", articleId);
  if (tagIds.length) {
    const { error: tagError } = await supabase.from("article_tags").insert(
      tagIds.map((tag_id) => ({ article_id: articleId, tag_id })),
    );
    if (tagError) {
      return { ok: false, error: `Lưu tag thất bại: ${tagError.message}` };
    }
  }

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/articles/${input.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${articleId}`);

  return { ok: true, id: articleId!, slug: input.slug };
}

export async function deleteArticle(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return { ok: false, error: "Chỉ admin mới được xóa bài" };
  }

  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  if (article?.slug) revalidatePath(`/articles/${article.slug}`);

  return { ok: true };
}
