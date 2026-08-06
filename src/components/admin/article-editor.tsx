"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Markdown } from "@tiptap/markdown";
import { common, createLowlight } from "lowlight";
import { customBlockExtensions } from "@/components/editor/custom-blocks";
import { EditorToolbar } from "@/components/admin/editor-toolbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { deleteArticle, saveArticle } from "@/lib/actions/articles";
import { generateSlug, isValidSlug } from "@/lib/slug";
import { toDirectImageUrl, mediaUrlHint } from "@/lib/media-url";
import { cn, readingTimeFromText } from "@/lib/utils";
import type {
  ArticleLevel,
  ArticleStatus,
  Category,
  Series,
  Tag,
} from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import LinkNext from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

const lowlight = createLowlight(common);

type EditorMode = "visual" | "markdown";

type Initial = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>;
  category_id: string;
  series_id?: string | null;
  series_order?: number;
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
  seriesList = [],
}: {
  initial: Initial;
  categories: Category[];
  tags: Tag[];
  seriesList?: Series[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [articleId, setArticleId] = useState(initial.id);
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [categoryId, setCategoryId] = useState(initial.category_id);
  const [seriesId, setSeriesId] = useState(initial.series_id || "");
  const [seriesOrder, setSeriesOrder] = useState(initial.series_order ?? 0);
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
  const [deleting, setDeleting] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "draft" | "published" | "archived" | null
  >(null);
  const [dirty, setDirty] = useState(false);
  const [mode, setMode] = useState<EditorMode>("visual");
  const [markdown, setMarkdown] = useState("");
  const savingRef = useRef(false);
  const busy = saveState === "saving" || deleting;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        // StarterKit v3 already includes link + underline — configure here, don't add twice
        link: { openOnClick: false },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class:
            "editor-image max-w-full h-auto rounded-xl border border-card-border",
        },
      }),
      Placeholder.configure({ placeholder: "Bắt đầu viết nội dung bài..." }),
      Youtube.configure({ controls: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
      Markdown,
      ...customBlockExtensions,
    ],
    content: initial.content,
    immediatelyRender: false,
    onUpdate: () => setDirty(true),
    editorProps: {
      attributes: {
        class:
          "prose-article min-h-[min(70vh,720px)] rounded-none border-0 bg-card px-4 py-4 focus:outline-none",
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

  function switchMode(next: EditorMode) {
    if (!editor || next === mode) return;
    if (next === "markdown") {
      setMarkdown(editor.getMarkdown());
      setMode("markdown");
      return;
    }
    editor.commands.setContent(markdown, { contentType: "markdown" });
    setMode("visual");
    setDirty(true);
  }

  const plainText =
    mode === "markdown"
      ? markdown
      : editor?.getText() || "";

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

      if (mode === "markdown") {
        editor.commands.setContent(markdown, { contentType: "markdown" });
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
          series_id: seriesId || null,
          series_order: seriesOrder,
          level,
          status: statusToSave,
          is_featured: featured,
          seo_title: seoTitle,
          seo_description: seoDescription,
          cover_image_url: cover ? toDirectImageUrl(cover) : null,
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
      markdown,
      mode,
      router,
      selectedTags,
      seoDescription,
      seoTitle,
      seriesId,
      seriesOrder,
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
    setPendingAction(
      nextStatus === "published"
        ? "published"
        : nextStatus === "archived"
          ? "archived"
          : "draft",
    );
    try {
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
    } finally {
      setPendingAction(null);
    }
  }

  async function onDelete() {
    if (!articleId) {
      toast({ title: "Bài chưa được lưu", variant: "error" });
      return;
    }
    if (!confirm("Xóa vĩnh viễn bài này trên Supabase?")) return;
    setDeleting(true);
    try {
      const result = await deleteArticle(articleId);
      if (!result.ok) {
        toast({ title: result.error, variant: "error" });
        return;
      }
      toast({ title: "Đã xóa bài", variant: "success" });
      router.push("/admin/articles");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  const tagSuggestions = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(tagQuery.toLowerCase()) &&
      !selectedTags.includes(t.id),
  );

  return (
    <div className="space-y-6">
      <div className="sticky top-14 z-30 -mx-4 border-b border-card-border bg-background/95 shadow-sm backdrop-blur md:top-16 md:-mx-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 md:px-6">
          <div className="min-w-0 text-sm text-muted">
            <span className="font-medium text-foreground">
              {saveState === "saving"
                ? "Đang lưu..."
                : saveState === "saved"
                  ? "Đã lưu"
                  : saveState === "error"
                    ? "Lưu thất bại"
                    : dirty
                      ? "Chưa lưu"
                      : articleId
                        ? "Đã đồng bộ"
                        : "Bài mới"}
            </span>
            <span className="mx-2 text-card-border" aria-hidden>
              ·
            </span>
            <span>
              {wordCount} từ · ~{readingTime} phút
            </span>
            <span className="mx-2 text-card-border" aria-hidden>
              ·
            </span>
            <span className="capitalize">{status}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => publish("draft")}
              variant="secondary"
              loading={pendingAction === "draft"}
              disabled={busy}
            >
              {pendingAction === "draft" ? "Đang lưu..." : "Lưu draft"}
            </Button>
            <Button
              size="sm"
              onClick={() => publish("published")}
              loading={pendingAction === "published"}
              disabled={busy}
            >
              {pendingAction === "published" ? "Đang publish..." : "Publish"}
            </Button>
            <Button
              size="sm"
              onClick={() => publish("draft")}
              variant="secondary"
              disabled={busy || status === "draft"}
            >
              Unpublish
            </Button>
            <Button
              size="sm"
              onClick={() => publish("archived")}
              variant="secondary"
              loading={pendingAction === "archived"}
              disabled={busy}
            >
              {pendingAction === "archived" ? "..." : "Archive"}
            </Button>
            {articleId ? (
              <Button
                size="sm"
                onClick={onDelete}
                variant="danger"
                loading={deleting}
                disabled={busy}
              >
                {deleting ? "..." : "Xóa"}
              </Button>
            ) : null}
            {slug ? (
              <LinkNext
                href={`/articles/${slug}`}
                className="inline-flex h-8 items-center gap-1 rounded-xl border border-card-border px-3 text-sm hover:bg-accent-soft/40"
                target="_blank"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                Preview
              </LinkNext>
            ) : null}
          </div>
        </div>

        {editor ? (
          <div className="border-t border-card-border bg-card/95">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-2 md:px-6">
              <div
                className="inline-flex rounded-xl border border-card-border p-0.5"
                role="tablist"
                aria-label="Chế độ soạn thảo"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "visual"}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm",
                    mode === "visual"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:bg-accent-soft/50",
                  )}
                  onClick={() => switchMode("visual")}
                >
                  Visual
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "markdown"}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm",
                    mode === "markdown"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:bg-accent-soft/50",
                  )}
                  onClick={() => switchMode("markdown")}
                >
                  Markdown
                </button>
              </div>
              <p className="text-xs text-muted">
                Toolbar luôn dính khi cuộn · chọn chữ để xem format đang active
              </p>
            </div>
            {mode === "visual" ? (
              <div className="mx-auto max-w-5xl px-2 md:px-4">
                <EditorToolbar
                  editor={editor}
                  onInsertBlock={insertBlock}
                  sticky={false}
                />
              </div>
            ) : null}
          </div>
        ) : null}
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

      <details className="rounded-xl border border-card-border bg-card open:pb-4">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-2">
            <span>Thêm metadata (excerpt, SEO, series, cover…)</span>
            <span className="text-xs font-normal text-muted">
              Bấm để mở / thu gọn
            </span>
          </span>
        </summary>
        <div className="space-y-4 border-t border-card-border px-4 pt-4">
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

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Series</label>
          <select
            className="h-10 w-full rounded-xl border border-card-border bg-card px-3 text-sm"
            value={seriesId}
            onChange={(e) => {
              setSeriesId(e.target.value);
              setDirty(true);
            }}
          >
            <option value="">Không thuộc series</option>
            {seriesList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
                {s.is_published ? "" : " (draft)"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Thứ tự trong series</label>
          <Input
            type="number"
            min={0}
            value={seriesOrder}
            disabled={!seriesId}
            onChange={(e) => {
              setSeriesOrder(Number(e.target.value) || 0);
              setDirty(true);
            }}
          />
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
        <label className="mb-1 block text-sm" htmlFor="cover-url">
          Cover image URL
        </label>
        <Input
          id="cover-url"
          value={cover}
          onChange={(e) => {
            setCover(e.target.value);
            setDirty(true);
          }}
          onBlur={() => {
            const next = toDirectImageUrl(cover);
            if (next !== cover) {
              setCover(next);
              setDirty(true);
            }
          }}
          placeholder="https://.../.jpg hoặc .png (không dùng link /view của Drive)"
        />
        {mediaUrlHint(cover) ? (
          <p className="mt-2 text-xs text-warning">{mediaUrlHint(cover)}</p>
        ) : null}
        {cover.trim() ? (
          <div className="mt-3 overflow-hidden rounded-xl border border-card-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={toDirectImageUrl(cover)}
              alt="Cover preview"
              className="max-h-56 w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const hint = e.currentTarget.nextElementSibling;
                if (hint instanceof HTMLElement) hint.hidden = false;
              }}
              onLoad={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "block";
                const hint = e.currentTarget.nextElementSibling;
                if (hint instanceof HTMLElement) hint.hidden = true;
              }}
            />
            <p
              hidden
              className="border-t border-danger/30 bg-danger/5 px-3 py-2 text-xs text-danger"
            >
              Không tải được ảnh. Link Drive dạng /view không dùng được cho
              &lt;img&gt;. Hãy dùng URL trực tiếp kết thúc bằng .jpg/.png/.webp,
              hoặc upload lên Supabase Storage.
            </p>
            <p className="border-t border-card-border px-3 py-2 text-xs text-muted">
              URL đang dùng để hiển thị: {toDirectImageUrl(cover)}
            </p>
          </div>
        ) : (
          <p className="mt-1 text-xs text-muted">
            Dán URL ảnh công khai (file ảnh thật). Không dán link trang Google
            Drive /view.
          </p>
        )}
      </div>
        </div>
      </details>

      {editor ? (
        <div className="rounded-xl border border-card-border bg-card">
          {mode === "visual" ? (
            <EditorContent editor={editor} />
          ) : (
            <Textarea
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
                setDirty(true);
              }}
              className="min-h-[420px] rounded-xl border-0 font-mono text-sm focus-visible:ring-0"
              placeholder={
                "# Tiêu đề\n\nViết nội dung Markdown...\n\n```js\nconsole.log('hi')\n```"
              }
              aria-label="Nội dung Markdown"
            />
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-card-border p-8 text-muted">
          Đang tải editor...
        </div>
      )}
    </div>
  );
}
