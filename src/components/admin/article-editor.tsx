"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { customBlockExtensions } from "@/components/editor/custom-blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { deleteArticle, saveArticle } from "@/lib/actions/articles";
import { generateSlug, isValidSlug } from "@/lib/slug";
import { readingTimeFromText } from "@/lib/utils";
import type { ArticleLevel, ArticleStatus, Category, Tag } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import LinkNext from "next/link";
import { useRouter } from "next/navigation";

const lowlight = createLowlight(common);

type Initial = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>;
  category_id: string;
  level: ArticleLevel;
  status: ArticleStatus;
  is_featured: boolean;
  seo_title: string;
  seo_description: string;
  cover_image_url?: string;
  tag_ids?: string[];
};

export function ArticleEditor({
  initial,
  categories,
  tags,
}: {
  initial: Initial;
  categories: Category[];
  tags: Tag[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [articleId, setArticleId] = useState(initial.id);
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [categoryId, setCategoryId] = useState(initial.category_id);
  const [level, setLevel] = useState<ArticleLevel>(initial.level);
  const [status, setStatus] = useState<ArticleStatus>(initial.status);
  const [featured, setFeatured] = useState(initial.is_featured);
  const [seoTitle, setSeoTitle] = useState(initial.seo_title);
  const [seoDescription, setSeoDescription] = useState(initial.seo_description);
  const [cover, setCover] = useState(initial.cover_image_url || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initial.tag_ids || [],
  );
  const [tagQuery, setTagQuery] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [dirty, setDirty] = useState(false);
  const savingRef = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Bắt đầu viết nội dung bài..." }),
      Youtube.configure({ controls: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
      ...customBlockExtensions,
    ],
    content: initial.content,
    immediatelyRender: false,
    onUpdate: () => setDirty(true),
    editorProps: {
      attributes: {
        class:
          "prose-article min-h-[320px] rounded-xl border border-card-border bg-card px-4 py-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const plainText = editor?.getText() || "";
  // Recalculate when editor updates via dirty/saveState triggers re-render
  void dirty;
  void saveState;

  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = readingTimeFromText(plainText);

  const persist = useCallback(
    async (nextStatus?: ArticleStatus) => {
      if (!editor || savingRef.current) return null;
      if (!title.trim() || title.trim().length < 3) {
        return { ok: false as const, error: "Title tối thiểu 3 ký tự" };
      }
      if (!isValidSlug(slug)) {
        return { ok: false as const, error: "Slug không hợp lệ" };
      }

      savingRef.current = true;
      setSaveState("saving");
      const statusToSave = nextStatus ?? status;

      try {
        const result = await saveArticle({
          id: articleId,
          title,
          slug,
          excerpt,
          content: editor.getJSON() as Record<string, unknown>,
          category_id: categoryId || null,
          level,
          status: statusToSave,
          is_featured: featured,
          seo_title: seoTitle,
          seo_description: seoDescription,
          cover_image_url: cover || null,
          tag_ids: selectedTags,
        });

        if (!result.ok) {
          setSaveState("error");
          return result;
        }

        setArticleId(result.id);
        setStatus(statusToSave);
        setDirty(false);
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 1500);

        if (!articleId) {
          router.replace(`/admin/articles/${result.id}`);
        }
        return result;
      } finally {
        savingRef.current = false;
      }
    },
    [
      articleId,
      categoryId,
      cover,
      editor,
      excerpt,
      featured,
      level,
      router,
      selectedTags,
      seoDescription,
      seoTitle,
      slug,
      status,
      title,
    ],
  );

  const autosave = useCallback(async () => {
    if (!dirty || !title.trim() || title.trim().length < 3) return;
    const result = await persist();
    if (result && !result.ok) {
      toast({ title: result.error, variant: "error" });
    }
  }, [dirty, persist, title, toast]);

  useEffect(() => {
    if (!dirty) return;
    const t = setTimeout(() => {
      void autosave();
    }, 2500);
    return () => clearTimeout(t);
  }, [dirty, title, excerpt, slug, autosave]);

  function setTitleAndSlug(value: string) {
    setTitle(value);
    setDirty(true);
    if (!slugTouched) setSlug(generateSlug(value));
  }

  function insertBlock(type: string) {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type,
        content: [{ type: "paragraph" }],
      })
      .run();
  }

  async function publish(nextStatus: ArticleStatus) {
    const result = await persist(nextStatus);
    if (!result) return;
    if (!result.ok) {
      toast({ title: result.error, variant: "error" });
      return;
    }
    toast({
      title:
        nextStatus === "published"
          ? "Đã lưu & publish lên Supabase"
          : nextStatus === "archived"
            ? "Đã archive trên Supabase"
            : "Đã lưu draft trên Supabase",
      variant: "success",
    });
  }

  async function onDelete() {
    if (!articleId) {
      toast({ title: "Bài chưa được lưu", variant: "error" });
      return;
    }
    if (!confirm("Xóa vĩnh viễn bài này trên Supabase?")) return;
    const result = await deleteArticle(articleId);
    if (!result.ok) {
      toast({ title: result.error, variant: "error" });
      return;
    }
    toast({ title: "Đã xóa bài", variant: "success" });
    router.push("/admin/articles");
    router.refresh();
  }

  const tagSuggestions = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(tagQuery.toLowerCase()) &&
      !selectedTags.includes(t.id),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>
          {saveState === "saving"
            ? "Đang lưu lên Supabase..."
            : saveState === "saved"
              ? "Đã lưu trên Supabase"
              : saveState === "error"
                ? "Lưu thất bại"
                : dirty
                  ? "Có thay đổi chưa lưu"
                  : articleId
                    ? "Đã đồng bộ"
                    : "Chưa lưu"}
        </span>
        <span>
          {wordCount} từ · ~{readingTime} phút đọc
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitleAndSlug(e.target.value)}
            maxLength={200}
          />
          <div className="mt-1 text-xs text-muted">{title.length}/200</div>
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="slug">
            Slug
          </label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
              setDirty(true);
            }}
          />
          {!isValidSlug(slug) && slug ? (
            <p className="mt-1 text-xs text-danger">Slug không hợp lệ</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm" htmlFor="excerpt">
          Excerpt
        </label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => {
            setExcerpt(e.target.value);
            setDirty(true);
          }}
          maxLength={500}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm">Category</label>
          <select
            className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setDirty(true);
            }}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Level</label>
          <select
            className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
            value={level}
            onChange={(e) => setLevel(e.target.value as ArticleLevel)}
          >
            <option value="all">All Levels</option>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Status</label>
          <select
            className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as ArticleStatus)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <label htmlFor="featured" className="text-sm">
          Featured
        </label>
      </div>

      <div>
        <label className="mb-1 block text-sm">Tags</label>
        <Input
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          placeholder="Autocomplete tag..."
        />
        {tagQuery && tagSuggestions.length ? (
          <div className="mt-1 rounded-xl border border-card-border bg-card p-1">
            {tagSuggestions.slice(0, 6).map((t) => (
              <button
                key={t.id}
                type="button"
                className="block w-full rounded-lg px-2 py-1 text-left text-sm hover:bg-accent-soft"
                onClick={() => {
                  setSelectedTags((s) => [...s, t.id]);
                  setTagQuery("");
                }}
              >
                #{t.name}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTags.map((id) => {
            const t = tags.find((x) => x.id === id);
            if (!t) return null;
            return (
              <button
                key={id}
                type="button"
                className="rounded-lg bg-accent-soft px-2 py-1 text-xs"
                onClick={() =>
                  setSelectedTags((s) => s.filter((x) => x !== id))
                }
              >
                #{t.name} ×
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">SEO title</label>
          <Input
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            maxLength={70}
          />
          <div className="text-xs text-muted">{seoTitle.length}/70</div>
        </div>
        <div>
          <label className="mb-1 block text-sm">SEO description</label>
          <Input
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            maxLength={160}
          />
          <div className="text-xs text-muted">{seoDescription.length}/160</div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm">Cover image URL</label>
        <Input
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          placeholder="https://... (hoặc upload qua Storage khi đã cấu hình)"
        />
      </div>

      {editor ? (
        <div>
          <div className="mb-2 flex flex-wrap gap-1">
            <Tool onClick={() => editor.chain().focus().toggleBold().run()}>
              Bold
            </Tool>
            <Tool onClick={() => editor.chain().focus().toggleItalic().run()}>
              Italic
            </Tool>
            <Tool onClick={() => editor.chain().focus().toggleUnderline().run()}>
              Underline
            </Tool>
            <Tool onClick={() => editor.chain().focus().toggleStrike().run()}>
              Strike
            </Tool>
            <Tool
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </Tool>
            <Tool
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              H3
            </Tool>
            <Tool onClick={() => editor.chain().focus().toggleBulletList().run()}>
              Bullet
            </Tool>
            <Tool
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              Numbered
            </Tool>
            <Tool
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              Quote
            </Tool>
            <Tool
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              Code
            </Tool>
            <Tool
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
                  .run()
              }
            >
              Table
            </Tool>
            <Tool onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Divider
            </Tool>
            <Tool
              onClick={() => {
                const url = window.prompt("URL ảnh");
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
            >
              Image
            </Tool>
            <Tool
              onClick={() => {
                const url = window.prompt("YouTube URL");
                if (url) editor.commands.setYoutubeVideo({ src: url });
              }}
            >
              YouTube
            </Tool>
            <Tool onClick={() => editor.chain().focus().undo().run()}>Undo</Tool>
            <Tool onClick={() => editor.chain().focus().redo().run()}>Redo</Tool>
          </div>
          <div className="mb-2 flex flex-wrap gap-1">
            {[
              ["interviewQuestion", "Question"],
              ["shortAnswer", "Short"],
              ["detailedExplanation", "Explain"],
              ["note", "Note"],
              ["warning", "Warning"],
              ["commonMistake", "Mistake"],
              ["followUpQuestion", "Follow-up"],
              ["juniorAnswer", "Junior"],
              ["middleAnswer", "Middle"],
              ["seniorAnswer", "Senior"],
              ["realExperience", "Experience"],
              ["reference", "Reference"],
            ].map(([type, label]) => (
              <Tool key={type} onClick={() => insertBlock(type)}>
                {label}
              </Tool>
            ))}
          </div>
          <EditorContent editor={editor} />
        </div>
      ) : (
        <div className="rounded-xl border border-card-border p-8 text-muted">
          Đang tải editor...
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => publish("draft")} variant="secondary">
          Lưu draft
        </Button>
        <Button onClick={() => publish("published")}>Publish</Button>
        <Button onClick={() => publish("draft")} variant="secondary">
          Unpublish
        </Button>
        <Button onClick={() => publish("archived")} variant="secondary">
          Archive
        </Button>
        {articleId ? (
          <Button onClick={onDelete} variant="danger">
            Xóa
          </Button>
        ) : null}
        {slug ? (
          <LinkNext
            href={`/articles/${slug}`}
            className="inline-flex h-10 items-center rounded-xl border border-card-border px-4 text-sm"
            target="_blank"
          >
            Preview
          </LinkNext>
        ) : null}
      </div>
    </div>
  );
}

function Tool({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-card-border px-2 py-1 text-xs hover:bg-accent-soft"
    >
      {children}
    </button>
  );
}
