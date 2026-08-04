"use client";

import { useEffect, useMemo, useState } from "react";
import {
  googleSearchUrl,
  headingIdFromNode,
  plainTextFromNodes,
} from "@/lib/content";
import { toDirectImageUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import { Check, Copy, Search } from "lucide-react";

type JSONContent = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
};

function renderMarks(text: string, marks?: JSONContent["marks"]) {
  let node: React.ReactNode = text;
  if (!marks) return node;
  for (const mark of marks) {
    if (mark.type === "bold") node = <strong>{node}</strong>;
    if (mark.type === "italic") node = <em>{node}</em>;
    if (mark.type === "underline") node = <u>{node}</u>;
    if (mark.type === "strike") node = <s>{node}</s>;
    if (mark.type === "code") node = <code>{node}</code>;
    if (mark.type === "link") {
      const href = String(mark.attrs?.href || "#");
      node = (
        <a href={href} className="text-accent underline" rel="noopener noreferrer">
          {node}
        </a>
      );
    }
  }
  return node;
}

function InlineContent({ nodes }: { nodes?: JSONContent[] }) {
  if (!nodes) return null;
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type === "hardBreak") return <br key={i} />;
        if (n.type === "text")
          return <span key={i}>{renderMarks(n.text || "", n.marks)}</span>;
        return null;
      })}
    </>
  );
}

function CodeBlockView({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="group relative my-4 max-w-full overflow-hidden rounded-xl border border-card-border">
      <div className="flex items-center justify-between border-b border-card-border bg-[#0f172a] px-3 py-2 text-xs text-slate-300">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-white/10"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Đã copy" : "Copy"}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto rounded-none border-0 bg-[#0f172a] p-4 text-sm text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CustomBlock({
  type,
  label,
  children,
}: {
  type: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="custom-block" data-type={type}>
      {label ? (
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </div>
      ) : null}
      {children}
    </aside>
  );
}

function HeadingWithGoogleSearch({
  level,
  id,
  text,
  children,
}: {
  level: number;
  id: string;
  text: string;
  children: React.ReactNode;
}) {
  const Tag = level === 3 ? "h3" : "h2";
  const href = googleSearchUrl(text);

  return (
    <div
      className={cn(
        "heading-with-search group/heading",
        level === 3 ? "heading-with-search--h3" : "heading-with-search--h2",
      )}
    >
      <Tag id={id} className="min-w-0 flex-1">
        {children}
      </Tag>
      {text ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="heading-google-search shrink-0"
          aria-label={`Tìm trên Google: ${text}`}
          title="Tìm trên Google khi nội dung chưa rõ"
        >
          <Search className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Google</span>
        </a>
      ) : null}
    </div>
  );
}

function renderNode(
  node: JSONContent,
  index: number,
  headingIds: Map<string, number>,
): React.ReactNode {
  const type = node.type || "paragraph";
  const children = node.content;
  const renderChild = (c: JSONContent, i: number) =>
    renderNode(c, i, headingIds);

  if (type === "paragraph") {
    return (
      <p key={index}>
        <InlineContent nodes={children} />
      </p>
    );
  }
  if (type === "heading") {
    const level = Number(node.attrs?.level || 2);
    const id = headingIdFromNode(node, headingIds, index);
    const text = plainTextFromNodes(children);
    return (
      <HeadingWithGoogleSearch
        key={`${id}-${index}`}
        level={level}
        id={id}
        text={text}
      >
        <InlineContent nodes={children} />
      </HeadingWithGoogleSearch>
    );
  }
  if (type === "bulletList") {
    return (
      <ul key={index} className="mb-4 list-disc space-y-1 pl-6">
        {children?.map(renderChild)}
      </ul>
    );
  }
  if (type === "orderedList") {
    return (
      <ol key={index} className="mb-4 list-decimal space-y-1 pl-6">
        {children?.map(renderChild)}
      </ol>
    );
  }
  if (type === "listItem") {
    return <li key={index}>{children?.map(renderChild)}</li>;
  }
  if (type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="my-4 border-l-4 border-accent pl-4 text-muted"
      >
        {children?.map(renderChild)}
      </blockquote>
    );
  }
  if (type === "codeBlock") {
    const code = children?.map((c) => c.text || "").join("") || "";
    return (
      <CodeBlockView
        key={index}
        code={code}
        language={String(node.attrs?.language || "javascript")}
      />
    );
  }
  if (type === "horizontalRule") {
    return <hr key={index} className="my-8 border-card-border" />;
  }
  if (type === "image") {
    const raw = String(node.attrs?.src || "").trim();
    const src = raw ? toDirectImageUrl(raw) : "";
    if (!src) return null;
    return (
      <figure key={index} className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={String(node.attrs?.alt || "")}
          className="h-auto max-w-full rounded-xl border border-card-border"
          loading="lazy"
        />
        {node.attrs?.caption ? (
          <figcaption className="mt-2 text-center text-sm text-muted">
            {String(node.attrs.caption)}
          </figcaption>
        ) : null}
      </figure>
    );
  }
  if (type === "youtube") {
    const src = String(node.attrs?.src || "");
    return (
      <div key={index} className="my-6 aspect-video overflow-hidden rounded-xl">
        <iframe
          className="h-full w-full"
          src={src}
          title="YouTube embed"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }
  if (type === "table") {
    return (
      <div key={index} className="table-scroll my-4">
        <table>
          <tbody>
            {children?.map((row, ri) => (
              <tr key={ri}>
                {row.content?.map((cell, ci) => {
                  const Tag = cell.type === "tableHeader" ? "th" : "td";
                  return (
                    <Tag key={ci}>
                      {cell.content?.map((c, i) => renderChild(c, i))}
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const customTypes = [
    "interviewQuestion",
    "shortAnswer",
    "detailedExplanation",
    "note",
    "warning",
    "commonMistake",
    "followUpQuestion",
    "juniorAnswer",
    "middleAnswer",
    "seniorAnswer",
    "realExperience",
    "reference",
  ];
  if (customTypes.includes(type)) {
    return (
      <CustomBlock
        key={index}
        type={type}
        label={String(node.attrs?.label || type)}
      >
        {children?.map(renderChild)}
      </CustomBlock>
    );
  }

  return <div key={index}>{children?.map(renderChild)}</div>;
}

export function ArticleContent({
  content,
}: {
  content: Record<string, unknown>;
}) {
  const doc = content as JSONContent;
  const nodes = doc.content || [];
  const headingIds = new Map<string, number>();
  return (
    <div className="prose-article">
      {nodes.map((n, i) => renderNode(n, i, headingIds))}
    </div>
  );
}

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const [active, setActive] = useState(headings[0]?.id || "");
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  if (!headings.length) return null;

  const list = (
    <ul className="space-y-1 text-sm">
      {headings.map((h, i) => (
        <li key={`${h.id}-${i}`} className={cn(h.level === 3 && "pl-3")}>
          <a
            href={`#${h.id}`}
            className={cn(
              "block rounded-md px-2 py-1 text-muted hover:bg-accent-soft hover:text-foreground",
              active === h.id && "bg-accent-soft text-foreground",
            )}
            onClick={async (e) => {
              if (navigator.clipboard) {
                if (e.altKey) {
                  e.preventDefault();
                  await navigator.clipboard.writeText(
                    `${window.location.origin}${window.location.pathname}#${h.id}`,
                  );
                }
              }
            }}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          className="w-full rounded-xl border border-card-border bg-card px-3 py-2 text-left text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          Mục lục {open ? "▴" : "▾"}
        </button>
        {open ? (
          <div className="mt-2 rounded-xl border border-card-border bg-card p-3">
            {list}
          </div>
        ) : null}
      </div>
      <nav
        aria-label="Mục lục"
        className="scrollbar-thin sticky top-24 hidden max-h-[70vh] overflow-auto rounded-xl border border-card-border bg-card p-4 lg:block"
      >
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Mục lục
        </div>
        {list}
      </nav>
    </>
  );
}
