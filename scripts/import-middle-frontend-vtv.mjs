/**
 * Split Middle Frontend (VTV) study guide into 22 lessons + manifest.
 *
 * Usage:
 *   node scripts/import-middle-frontend-vtv.mjs
 *   node scripts/import-middle-frontend-vtv.mjs --source="C:/Users/Admin/Desktop/middle-frontend-interview-study-guide.md"
 *
 * Then publish:
 *   npm run publish:content -- --dir=content/middle-frontend-vtv
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import slugifyLib from "slugify";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SERIES_SLUG = "middle-frontend-vtv";
const SERIES_TITLE = "Middle Frontend Interview (VTV)";
const DEFAULT_SOURCE = resolve(
  "C:/Users/Admin/Desktop/middle-frontend-interview-study-guide.md",
);

const SLUG_OVERRIDES = {
  1: "thu-tu-uu-tien",
  2: "javascript",
  3: "typescript",
  4: "react",
  5: "nextjs",
  6: "state-management",
  7: "tanstack-query-swr",
  8: "rest-api",
  9: "html-css-responsive",
  10: "frontend-architecture",
  11: "package-build-tools",
  12: "testing",
  13: "performance-cwv",
  14: "accessibility",
  15: "seo",
  16: "frontend-security",
  17: "git-cicd",
  18: "ownership-code-review",
  19: "docker-graphql-pwa",
  20: "cursor-ai",
  21: "project-experience",
  22: "study-plan-14-days",
};

function argValue(flag) {
  const argv = process.argv.slice(2);
  const i = argv.indexOf(flag);
  if (i >= 0 && argv[i + 1]) return argv[i + 1];
  const pref = `${flag}=`;
  const hit = argv.find((a) => a.startsWith(pref));
  return hit ? hit.slice(pref.length) : null;
}

function slugify(text) {
  return slugifyLib(text, { lower: true, strict: true, locale: "vi", trim: true });
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function splitChapters(md) {
  const lines = md.split(/\r?\n/);
  const chapters = [];
  let current = null;

  for (const line of lines) {
    const m = line.match(/^# (\d+)\.\s+(.+)$/);
    if (m) {
      if (current) chapters.push(current);
      current = {
        n: Number(m[1]),
        title: m[2].trim(),
        lines: [],
      };
      continue;
    }
    if (current) current.lines.push(line);
  }
  if (current) chapters.push(current);

  return chapters.map((c) => ({
    ...c,
    body: c.lines.join("\n").trim(),
  }));
}

function extractQuestions(body) {
  const qs = [];
  for (const line of body.split(/\n/)) {
    const m = line.match(/^##\s+\d+(?:\.\d+)?\s+(.+)$/);
    if (m) qs.push(m[1].replace(/`/g, "").replace(/\?$/, "").trim() + "?");
    else {
      const m2 = line.match(/^##\s+(.+\?)\s*$/);
      if (m2) qs.push(m2[1].replace(/`/g, "").trim());
    }
  }
  // Prefer ## N.N style section titles as learning bullets
  const sectionTitles = [];
  for (const line of body.split(/\n/)) {
    const m = line.match(/^##\s+\d+\.\d+\s+(.+)$/);
    if (m) sectionTitles.push(m[1].replace(/`/g, "").trim());
  }
  return sectionTitles.length > 0 ? sectionTitles : qs;
}

function enhanceMarkdown({ title, body, order, total }) {
  const questions = extractQuestions(body);
  const objectives =
    questions.length > 0
      ? questions
          .slice(0, 12)
          .map((q) => `- Giải thích và đưa ví dụ cho: **${q}**`)
          .join("\n")
      : `- Nắm vững nội dung chính của bài **${title}**\n- Trả lời được câu hỏi phỏng vấn Middle Frontend liên quan`;

  const previewQs = questions.slice(0, 5);
  const checkList =
    previewQs.length > 0
      ? previewQs.map((q, i) => `${i + 1}. ${q}`).join("\n")
      : "1. Tóm tắt 3 ý quan trọng nhất của bài\n2. Nêu 1 ví dụ áp dụng vào dự án thực tế\n3. Chỉ ra 1 lỗi thường gặp khi trả lời phỏng vấn";

  const core = body.replace(/^# .+\n+/, "").trim();

  return `# ${String(order).padStart(2, "0")}. ${title}

> Bài ${order}/${total} trong series **${SERIES_TITLE}**. Ôn theo JD Middle Frontend: JS, TS, React, Next.js, API, testing, performance, a11y, SEO, bảo mật, Cursor.

## Mục tiêu bài học

Sau khi học xong bạn có thể:

${objectives}

## Cách học hiệu quả

1. **Tự trả lời trước** — đọc đề, đóng phần giải thích, nói to hoặc viết 2–3 phút.
2. **Đối chiếu** — so với đáp án mẫu, bổ sung ví dụ từ dự án bạn đã làm.
3. **Phiên bản an toàn** — nếu chưa dùng tool (GraphQL, PWA, Docker…), nói rõ *đã tìm hiểu / bài toán tương đương*, không nhận “thành thạo”.

## Kiến thức cốt lõi

${core}

---

## Tóm tắt nhanh

- Bám stack Middle Frontend: JavaScript, TypeScript, React, Next.js và hệ sinh thái quanh đó.
- Ưu tiên **hiểu cơ chế** và **khi nào dùng**, không chỉ thuộc định nghĩa.
- Luôn có **ví dụ ngắn** và **trade-off** khi trả lời phỏng vấn.

## Tự kiểm tra

${checkList}

## Lỗi thường gặp

- Chỉ học thuộc câu trả lời, không gắn với dự án cụ thể.
- Nhầm các cặp khái niệm gần nhau trong cùng chủ đề.
- Nhận kinh nghiệm sâu với công nghệ chưa dùng thực tế.
- Quên cleanup / dependency / immutability khi nói về React và async.

## Gợi ý luyện thêm

Viết 1 đoạn trả lời phỏng vấn 60–90 giây cho câu khó nhất trong bài, rồi thu âm hoặc nói lại cho mượt.
`;
}

function excerptFromMd(md) {
  const lines = md
    .split(/\n/)
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !l.startsWith("#") &&
        !l.startsWith(">") &&
        !l.startsWith("```") &&
        !l.startsWith("- ") &&
        !/^\d+\./.test(l),
    );
  const text = lines.join(" ").replace(/[*_`[\]]/g, "");
  return text.slice(0, 280);
}

function main() {
  const source = resolve(argValue("--source") || DEFAULT_SOURCE);
  if (!existsSync(source)) {
    console.error(`Source not found: ${source}`);
    process.exit(1);
  }

  const md = readFileSync(source, "utf8");
  const chapters = splitChapters(md);
  if (chapters.length !== 22) {
    console.warn(`Expected 22 chapters, got ${chapters.length}`);
  }

  const outDir = join(root, "content", SERIES_SLUG);
  mkdirSync(outDir, { recursive: true });

  const total = chapters.length;
  const articles = [];

  for (const ch of chapters) {
    const order = ch.n;
    const slugSuffix =
      SLUG_OVERRIDES[order] || slugify(ch.title).slice(0, 48) || `part-${order}`;
    const file = `${String(order).padStart(2, "0")}-${slugSuffix}.md`;
    const enhanced = enhanceMarkdown({
      title: ch.title,
      body: ch.body,
      order,
      total,
    });
    writeFileSync(join(outDir, file), enhanced, "utf8");

    const articleSlug = `${SERIES_SLUG}-${String(order).padStart(2, "0")}-${slugSuffix}`.slice(
      0,
      80,
    );
    const excerpt = excerptFromMd(enhanced);
    const title = `${String(order).padStart(2, "0")}. ${ch.title}`;

    articles.push({
      title,
      slug: articleSlug,
      excerpt,
      series_order: order,
      reading_time_minutes: readingTime(enhanced),
      seo_title: title.slice(0, 70),
      seo_description: excerpt.slice(0, 160),
      file,
      level: "middle",
      is_featured: order <= 5,
    });

    console.log(`✓ ${file} (${articles[articles.length - 1].reading_time_minutes} min)`);
  }

  const manifest = {
    category: {
      name: "React",
      slug: "react",
      description: "Component model & reconciliation.",
      icon: "Atom",
      sort_order: 8,
    },
    series: {
      title: SERIES_TITLE,
      slug: SERIES_SLUG,
      description:
        "Lộ trình ôn phỏng vấn Middle Frontend (VTV): JavaScript, TypeScript, React, Next.js, state, API, testing, performance, a11y, SEO, bảo mật, Cursor và kế hoạch 14 ngày.",
      sort_order: 2,
      is_published: true,
    },
    articles,
  };

  writeFileSync(
    join(outDir, "_manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `\nWrote ${articles.length} lessons → content/${SERIES_SLUG}/\nNext: npm run publish:content -- --dir=content/${SERIES_SLUG}`,
  );
}

main();
