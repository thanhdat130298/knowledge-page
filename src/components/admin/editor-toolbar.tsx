"use client";

import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { cn } from "@/lib/utils";
import { toDirectImageUrl } from "@/lib/media-url";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Table,
  Minus,
  ImageIcon,
  Video,
  Undo2,
  Redo2,
  Link2,
  Pilcrow,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
  editor: Editor;
  onInsertBlock: (type: string) => void;
  /** Extra sticky offset under site header + action bar (px) — unused when nested in sticky stack */
  sticky?: boolean;
};

const INTERVIEW_BLOCKS: { type: string; label: string }[] = [
  { type: "interviewQuestion", label: "Câu hỏi phỏng vấn" },
  { type: "shortAnswer", label: "Trả lời ngắn" },
  { type: "detailedExplanation", label: "Giải thích chi tiết" },
  { type: "note", label: "Ghi chú" },
  { type: "warning", label: "Cảnh báo" },
  { type: "commonMistake", label: "Sai thường gặp" },
  { type: "followUpQuestion", label: "Follow-up" },
  { type: "juniorAnswer", label: "Junior answer" },
  { type: "middleAnswer", label: "Middle answer" },
  { type: "seniorAnswer", label: "Senior answer" },
  { type: "realExperience", label: "Kinh nghiệm thực tế" },
  { type: "reference", label: "Tham khảo" },
];

function useEditorTick(editor: Editor) {
  const [, setTick] = useState(0);
  useEffect(() => {
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setTick((n) => n + 1);
      });
    };
    // Do NOT listen to "transaction" — BubbleMenu/re-render can loop forever.
    editor.on("selectionUpdate", refresh);
    editor.on("update", refresh);
    return () => {
      cancelAnimationFrame(frame);
      editor.off("selectionUpdate", refresh);
      editor.off("update", refresh);
    };
  }, [editor]);
}

function activeContext(editor: Editor): string[] {
  const parts: string[] = [];
  if (editor.isActive("heading", { level: 2 })) parts.push("Tiêu đề H2");
  else if (editor.isActive("heading", { level: 3 })) parts.push("Tiêu đề H3");
  else if (editor.isActive("codeBlock")) parts.push("Code block");
  else if (editor.isActive("blockquote")) parts.push("Trích dẫn");
  else if (editor.isActive("bulletList")) parts.push("Bullet list");
  else if (editor.isActive("orderedList")) parts.push("Numbered list");
  else if (editor.isActive("table")) parts.push("Bảng");
  else parts.push("Đoạn văn");

  for (const block of INTERVIEW_BLOCKS) {
    if (editor.isActive(block.type)) {
      parts[0] = block.label;
      break;
    }
  }

  if (editor.isActive("bold")) parts.push("Đậm");
  if (editor.isActive("italic")) parts.push("Nghiêng");
  if (editor.isActive("underline")) parts.push("Gạch dưới");
  if (editor.isActive("strike")) parts.push("Gạch ngang");
  if (editor.isActive("link")) parts.push("Link");
  if (editor.isActive("code")) parts.push("Inline code");
  return parts;
}

export function EditorToolbar({ editor, onInsertBlock, sticky = true }: Props) {
  useEditorTick(editor);
  const context = activeContext(editor);
  const [blocksOpen, setBlocksOpen] = useState(false);

  useEffect(() => {
    if (!blocksOpen) return;
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-interview-blocks]")) return;
      setBlocksOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [blocksOpen]);

  function setLink() {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL liên kết", prev || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <>
      <div
        className={cn(
          "z-20 space-y-2 border-b border-card-border bg-card/95 px-2 py-2",
          sticky && "sticky top-0",
        )}
      >
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="status"
          aria-live="polite"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Đang chọn
          </span>
          {context.map((label) => (
            <span
              key={label}
              className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <Group label="Lịch sử">
            <ToolBtn
              label="Hoàn tác"
              shortcut={`${modKey()}+Z`}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo2 className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Làm lại"
              shortcut={
                isApplePlatform() ? "⌘+⇧+Z" : "Ctrl+Y / Ctrl+Shift+Z"
              }
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo2 className="h-4 w-4" />
            </ToolBtn>
          </Group>

          <Divider />

          <Group label="Kiểu đoạn">
            <ToolBtn
              label="Đoạn văn"
              tip="Bỏ heading / list về đoạn thường"
              active={
                editor.isActive("paragraph") &&
                !editor.isActive("heading") &&
                !editor.isActive("bulletList") &&
                !editor.isActive("orderedList")
              }
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              <Pilcrow className="h-4 w-4" />
              <span className="hidden text-[10px] font-semibold sm:inline">P</span>
            </ToolBtn>
            <ToolBtn
              label="Heading 2"
              markdown="## Tiêu đề"
              tip="Gõ ## rồi Space ở đầu dòng (input rule)"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="h-4 w-4" />
              <span className="text-[10px] font-semibold">H2</span>
            </ToolBtn>
            <ToolBtn
              label="Heading 3"
              markdown="### Tiêu đề"
              tip="Gõ ### rồi Space ở đầu dòng"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 className="h-4 w-4" />
              <span className="text-[10px] font-semibold">H3</span>
            </ToolBtn>
          </Group>

          <Divider />

          <Group label="Chữ">
            <ToolBtn
              label="In đậm"
              shortcut={`${modKey()}+B`}
              markdown="**chữ đậm**"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="In nghiêng"
              shortcut={`${modKey()}+I`}
              markdown="*chữ nghiêng*"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Gạch dưới"
              shortcut={`${modKey()}+U`}
              tip="Không có markdown chuẩn — dùng nút hoặc phím tắt"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Gạch ngang"
              markdown="~~chữ gạch~~"
              tip="Gõ ~~ ở hai đầu đoạn chữ"
              active={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Liên kết"
              markdown="[text](https://...)"
              tip="Bôi đen chữ rồi bấm nút / prompt URL"
              active={editor.isActive("link")}
              onClick={setLink}
            >
              <Link2 className="h-4 w-4" />
            </ToolBtn>
          </Group>

          <Divider />

          <Group label="Danh sách">
            <ToolBtn
              label="Bullet list"
              markdown="- mục"
              tip="Gõ - hoặc * rồi Space ở đầu dòng"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Numbered list"
              markdown="1. mục"
              tip="Gõ 1. rồi Space ở đầu dòng"
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Trích dẫn"
              markdown="> trích dẫn"
              tip="Gõ > rồi Space ở đầu dòng"
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Code block"
              markdown="```js"
              tip="Gõ ``` rồi Enter ở đầu dòng. Tab Markdown: bọc bằng hàng ``` "
              active={editor.isActive("codeBlock")}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Code2 className="h-4 w-4" />
            </ToolBtn>
          </Group>

          <Divider />

          <Group label="Chèn">
            <ToolBtn
              label="Bảng"
              tip="Chèn bảng 2×2 có header"
              active={editor.isActive("table")}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
                  .run()
              }
            >
              <Table className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Đường kẻ ngang"
              markdown="---"
              tip="Gõ --- rồi Enter ở đầu dòng"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="Ảnh"
              markdown="![alt](https://.../.jpg)"
              tip="Cần URL ảnh trực tiếp (.jpg/.png), không dùng link Drive /view"
              onClick={() => {
                const raw = window.prompt(
                  "URL ảnh trực tiếp (.jpg/.png). Không dùng link Google Drive /view",
                );
                if (!raw) return;
                const url = toDirectImageUrl(raw);
                editor.chain().focus().setImage({ src: url }).run();
              }}
            >
              <ImageIcon className="h-4 w-4" />
            </ToolBtn>
            <ToolBtn
              label="YouTube"
              tip="Dán URL YouTube (watch / youtu.be / embed)"
              onClick={() => {
                const url = window.prompt("YouTube URL");
                if (url) editor.commands.setYoutubeVideo({ src: url });
              }}
            >
              <Video className="h-4 w-4" />
            </ToolBtn>
          </Group>

          <Divider />

          <div className="group/tool relative" data-interview-blocks>
            <button
              type="button"
              aria-expanded={blocksOpen}
              aria-haspopup="listbox"
              aria-label="Chèn block phỏng vấn"
              onClick={() => setBlocksOpen((v) => !v)}
              className={cn(
                "inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-medium",
                blocksOpen ||
                  INTERVIEW_BLOCKS.some((b) => editor.isActive(b.type))
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-card-border bg-background hover:bg-accent-soft/50",
              )}
            >
              Block phỏng vấn
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
            {!blocksOpen ? (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-0 top-full z-[60] mt-2 w-56 rounded-lg border border-card-border bg-card px-2.5 py-2 text-left text-xs shadow-lg invisible opacity-0 transition group-hover/tool:visible group-hover/tool:opacity-100"
              >
                <span className="block font-semibold text-foreground">
                  Block phỏng vấn
                </span>
                <span className="mt-0.5 block text-muted">
                  Chèn khối câu hỏi / đáp án / ghi chú — không có markdown tắt,
                  dùng menu này.
                </span>
              </span>
            ) : null}
            {blocksOpen ? (
              <div
                role="listbox"
                className="absolute left-0 top-full z-40 mt-1 max-h-64 w-56 overflow-auto rounded-xl border border-card-border bg-card p-1 shadow-lg"
              >
                {INTERVIEW_BLOCKS.map((b) => (
                  <button
                    key={b.type}
                    type="button"
                    role="option"
                    aria-selected={editor.isActive(b.type)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm hover:bg-accent-soft",
                      editor.isActive(b.type) && "bg-accent-soft font-medium text-accent",
                    )}
                    onClick={() => {
                      onInsertBlock(b.type);
                      setBlocksOpen(false);
                    }}
                  >
                    {b.label}
                    {editor.isActive(b.type) ? (
                      <span className="text-[10px] uppercase">Active</span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <BubbleMenu
        editor={editor}
        options={{ placement: "top" }}
        className="z-50 flex items-center gap-0.5 rounded-xl border border-card-border bg-card p-1 shadow-lg"
      >
        <ToolBtn
          label="In đậm"
          shortcut={`${modKey()}+B`}
          markdown="**chữ đậm**"
          tooltipSide="top"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          label="In nghiêng"
          shortcut={`${modKey()}+I`}
          markdown="*chữ nghiêng*"
          tooltipSide="top"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          label="Gạch dưới"
          shortcut={`${modKey()}+U`}
          tooltipSide="top"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          label="Gạch ngang"
          markdown="~~chữ gạch~~"
          tooltipSide="top"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          label="Liên kết"
          markdown="[text](https://...)"
          tooltipSide="top"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <Link2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          label="Heading 2"
          markdown="## Tiêu đề"
          tooltipSide="top"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          label="Heading 3"
          markdown="### Tiêu đề"
          tooltipSide="top"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </ToolBtn>
      </BubbleMenu>
    </>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-lg bg-background/70 p-0.5"
      role="group"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      className="mx-0.5 hidden h-7 w-px bg-card-border sm:block"
      aria-hidden
    />
  );
}

function isApplePlatform() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function modKey() {
  return isApplePlatform() ? "⌘" : "Ctrl";
}

function ToolBtn({
  children,
  label,
  shortcut,
  markdown,
  tip,
  onClick,
  active = false,
  disabled = false,
  tooltipSide = "bottom",
}: {
  children: ReactNode;
  label: string;
  shortcut?: string;
  markdown?: string;
  tip?: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltipSide?: "top" | "bottom";
}) {
  const aria = [label, shortcut, markdown ? `Markdown ${markdown}` : ""]
    .filter(Boolean)
    .join(". ");

  return (
    <span className="group/tool relative inline-flex">
      <button
        type="button"
        aria-label={aria}
        aria-pressed={active}
        disabled={disabled}
        onMouseDown={(e) => {
          // Keep editor selection when clicking toolbar
          e.preventDefault();
        }}
        onClick={onClick}
        className={cn(
          "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center gap-0.5 rounded-md px-1.5 text-sm transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35",
          active
            ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-accent"
            : "text-foreground/85 hover:bg-accent-soft",
        )}
      >
        {children}
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-[60] w-max max-w-[16rem] -translate-x-1/2 rounded-lg border border-card-border bg-card px-2.5 py-2 text-left text-xs shadow-lg",
          "invisible opacity-0 transition group-hover/tool:visible group-hover/tool:opacity-100 group-focus-within/tool:visible group-focus-within/tool:opacity-100",
          tooltipSide === "bottom"
            ? "top-full mt-2"
            : "bottom-full mb-2",
        )}
      >
        <span className="block font-semibold text-foreground">{label}</span>
        {tip ? (
          <span className="mt-0.5 block text-muted">{tip}</span>
        ) : null}
        {shortcut ? (
          <span className="mt-1.5 flex items-center gap-1.5 text-muted">
            <span className="shrink-0">Phím tắt</span>
            <kbd className="rounded border border-card-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground">
              {shortcut}
            </kbd>
          </span>
        ) : null}
        {markdown ? (
          <span className="mt-1 flex items-start gap-1.5 text-muted">
            <span className="shrink-0 pt-0.5">Markdown</span>
            <code className="rounded border border-card-border bg-background px-1.5 py-0.5 font-mono text-[10px] break-all text-foreground">
              {markdown}
            </code>
          </span>
        ) : null}
      </span>
    </span>
  );
}
