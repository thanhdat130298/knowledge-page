/**
 * Publish a content folder (manifest + markdown lessons) to Supabase.
 *
 * Folder layout:
 *   content/<series>/
 *     _manifest.json
 *     01-slug.md
 *     02-slug.md
 *
 * Usage:
 *   npm run publish:content -- --dir=content/react-erp-interview
 *   npm run publish:content -- --check-env
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import StarterKit from "@tiptap/starter-kit";
import { Markdown, MarkdownManager } from "@tiptap/markdown";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const i = trimmed.indexOf("=");
      if (i < 0) continue;
      const key = trimmed.slice(0, i).trim();
      let val = trimmed.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

function argValue(flag) {
  const argv = process.argv.slice(2);
  const i = argv.indexOf(flag);
  if (i >= 0 && argv[i + 1]) return argv[i + 1];
  const pref = `${flag}=`;
  const hit = argv.find((a) => a.startsWith(pref));
  return hit ? hit.slice(pref.length) : null;
}

function hasFlag(flag) {
  return process.argv.slice(2).includes(flag);
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function mdToJson(markdown) {
  const manager = new MarkdownManager({
    extensions: [StarterKit, Markdown],
  });
  return manager.parse(markdown);
}

function excerptFromMd(md, fallback) {
  const lines = md
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("```"));
  const text = lines.join(" ").replace(/[*_`[\]]/g, "");
  return (text || fallback).slice(0, 280);
}

async function main() {
  loadEnv();

  if (hasFlag("--check-env")) {
    const url = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const pub = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
    const service = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log(
      JSON.stringify(
        {
          NEXT_PUBLIC_SUPABASE_URL: url ? "ok" : "missing",
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON: pub ? "ok" : "missing",
          SUPABASE_SERVICE_ROLE_KEY: service ? "ok" : "missing",
          ready: url && service,
        },
        null,
        2,
      ),
    );
    process.exit(url && service ? 0 : 1);
  }

  const dirArg = argValue("--dir");
  if (!dirArg) {
    console.error("Usage: npm run publish:content -- --dir=content/<series>");
    process.exit(1);
  }

  const dir = resolve(root, dirArg);
  const manifestPath = join(dir, "_manifest.json");
  if (!existsSync(manifestPath)) {
    console.error(`Missing _manifest.json in ${dir}`);
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error(
      "Missing SUPABASE_SERVICE_ROLE_KEY (or URL).\n" +
        "Thêm 1 dòng vào .env.local rồi chạy lại — không cần mở SQL Editor.\n" +
        "Supabase Dashboard → Project Settings → API → service_role (secret).",
    );
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const {
    category = { name: "React", slug: "react", description: "", icon: "Atom", sort_order: 8 },
    categories: extraCategories = [],
    series,
    articles: articleMeta = [],
  } = manifest;

  if (!series?.slug || !series?.title) {
    console.error("manifest.series.title and series.slug are required");
    process.exit(1);
  }

  const categoryDefs = [
    category,
    ...extraCategories,
  ].filter((c, i, arr) => c?.slug && arr.findIndex((x) => x.slug === c.slug) === i);

  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const lessons = [];
  if (articleMeta.length) {
    for (const meta of articleMeta) {
      const file = meta.file || files.find((f) => f.includes(meta.slug)) || null;
      if (!file || !existsSync(join(dir, file))) {
        throw new Error(`Lesson file not found for ${meta.slug || meta.title}`);
      }
      const md = readFileSync(join(dir, file), "utf8");
      lessons.push({ meta, md, file });
    }
  } else {
    files.forEach((file, idx) => {
      const md = readFileSync(join(dir, file), "utf8");
      const title =
        md.match(/^#\s+(.+)$/m)?.[1]?.trim() || file.replace(/\.md$/, "");
      const slug =
        file.replace(/\.md$/, "").replace(/^\d+-/, "") || `lesson-${idx + 1}`;
      lessons.push({
        meta: {
          title,
          slug: `${series.slug}-${String(idx + 1).padStart(2, "0")}-${slug}`.slice(
            0,
            80,
          ),
          series_order: idx + 1,
          level: "middle",
          category_slug: category.slug,
          file,
        },
        md,
        file,
      });
    });
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const categoryIdBySlug = new Map();
  for (const cat of categoryDefs) {
    const { error: catErr } = await supabase.from("categories").upsert(
      {
        name: cat.name,
        slug: cat.slug,
        description: cat.description || null,
        icon: cat.icon || null,
        sort_order: cat.sort_order ?? 0,
        is_active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (catErr) throw catErr;

    const { data: catRow, error: catGetErr } = await supabase
      .from("categories")
      .select("id, slug")
      .eq("slug", cat.slug)
      .single();
    if (catGetErr) throw catGetErr;
    categoryIdBySlug.set(catRow.slug, catRow.id);
  }

  const defaultCategoryId = categoryIdBySlug.get(category.slug);
  if (!defaultCategoryId) {
    throw new Error(`Default category not found: ${category.slug}`);
  }

  const { data: seriesRow, error: seriesErr } = await supabase
    .from("series")
    .upsert(
      {
        title: series.title,
        slug: series.slug,
        description: series.description || null,
        cover_image_url: series.cover_image_url || null,
        is_published: series.is_published !== false,
        sort_order: series.sort_order ?? 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    )
    .select("id, slug")
    .single();
  if (seriesErr) throw seriesErr;

  let ok = 0;
  for (const lesson of lessons) {
    const { meta, md } = lesson;
    const content = mdToJson(md);
    const excerpt =
      meta.excerpt || excerptFromMd(md, `Bài trong series ${series.title}`);
    const categorySlug = meta.category_slug || category.slug;
    const categoryId = categoryIdBySlug.get(categorySlug) || defaultCategoryId;
    const payload = {
      title: meta.title,
      slug: meta.slug,
      excerpt,
      content,
      category_id: categoryId,
      series_id: seriesRow.id,
      series_order: meta.series_order ?? ok + 1,
      level: meta.level || "middle",
      status: "published",
      is_featured: Boolean(meta.is_featured),
      seo_title: (meta.seo_title || meta.title).slice(0, 70),
      seo_description: (meta.seo_description || excerpt).slice(0, 160),
      reading_time_minutes: meta.reading_time_minutes || readingTime(md),
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("articles")
      .upsert(payload, { onConflict: "slug" });
    if (error) {
      console.error("Failed", meta.slug, error.message);
      throw error;
    }
    ok += 1;
    console.log(`✓ ${ok}/${lessons.length} ${meta.slug}`);
  }

  console.log(
    `\nPublished ${ok} lessons → category=${category.slug} series=/series/${seriesRow.slug}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
