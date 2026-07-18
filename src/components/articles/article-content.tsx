"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

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
        if (n.type === "text") return <span key={i}>{renderMarks(n.text || "", n.marks)}</span>;
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
    <div className="group relative my-4 overflow-hidden rounded-xl border border-card-border">
      <div className="flex items-center justify-between border-b border-card-border bg-[#0f172a] px-3 py-2 text-xs text-slate-300">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-white/10"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
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

function renderNode(node: JSONContent, index: number): React.ReactNode {
  const type = node.type || "paragraph";
  const children = node.content;

  if (type === "paragraph") {
    return (
      <p key={index}>
        <InlineContent nodes={children} />
      </p>
    );
  }
  if (type === "heading") {
    const level = Number(node.attrs?.level || 2);
    const text =
      children?.map((c) => c.text || "").join("") || `section-${index}`;
    const id =
      String(node.attrs?.id || "") ||
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    if (level === 3) {
      return (
        <h3 key={index} id={id}>
          <InlineContent nodes={children} />
        </h3>
      );
    }
    return (
      <h2 key={index} id={id}>
        <InlineContent nodes={children} />
      </h2>
    );
  }
  if (type === "bulletList") {
    return (
      <ul key={index} className="mb-4 list-disc space-y-1 pl-6">
        {children?.map((c, i) => renderNode(c, i))}
      </ul>
    );
  }
  if (type === "orderedList") {
    return (
      <ol key={index} className="mb-4 list-decimal space-y-1 pl-6">
        {children?.map((c, i) => renderNode(c, i))}
      </ol>
    );
  }
  if (type === "listItem") {
    return (
      <li key={index}>
        {children?.map((c, i) => renderNode(c, i))}
      </li>
    );
  }
  if (type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="my-4 border-l-4 border-accent pl-4 text-muted"
      >
        {children?.map((c, i) => renderNode(c, i))}
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
    return (
      <figure key={index} className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={String(node.attrs?.src || "")}
          alt={String(node.attrs?.alt || "")}
          className="max-w-full rounded-xl border border-card-border"
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
      <div key={index} className="my-4 overflow-x-auto">
        <table>
          <tbody>
            {children?.map((row, ri) => (
              <tr key={ri}>
                {row.content?.map((cell, ci) => {
                  const Tag = cell.type === "tableHeader" ? "th" : "td";
                  return (
                    <Tag key={ci}>
                      {cell.content?.map((c, i) => renderNode(c, i))}
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
        {children?.map((c, i) => renderNode(c, i))}
      </CustomBlock>
    );
  }

  return (
    <div key={index}>{children?.map((c, i) => renderNode(c, i))}</div>
  );
}

export function ArticleContent({ content }: { content: Record<string, unknown> }) {
  const doc = content as JSONContent;
  const nodes = doc.content || [];
  return (
    <div className="prose-article">
      {nodes.map((n, i) => renderNode(n, i))}
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
      {headings.map((h) => (
        <li key={h.id} className={cn(h.level === 3 && "pl-3")}>
          <a
            href={`#${h.id}`}
            className={cn(
              "block rounded-md px-2 py-1 text-muted hover:bg-accent-soft hover:text-foreground",
              active === h.id && "bg-accent-soft text-foreground",
            )}
            onClick={async (e) => {
              if (navigator.clipboard) {
                // allow normal scroll; optional copy on modifier
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
        {open ? <div className="mt-2 rounded-xl border border-card-border bg-card p-3">{list}</div> : null}
      </div>
      <nav
        aria-label="Mục lục"
        className="sticky top-24 hidden max-h-[70vh] overflow-auto rounded-xl border border-card-border bg-card p-4 lg:block"
      >
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Mục lục
        </div>
        {list}
      </nav>
    </>
  );
}
