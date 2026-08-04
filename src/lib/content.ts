type JSONContent = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  text?: string;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Ensure TOC / heading anchors stay unique when titles collide. */
export function uniqueHeadingId(
  base: string,
  used: Map<string, number>,
): string {
  const root = base || "section";
  const count = used.get(root) ?? 0;
  used.set(root, count + 1);
  return count === 0 ? root : `${root}-${count}`;
}

export function plainTextFromNodes(nodes?: JSONContent[]): string {
  if (!nodes?.length) return "";
  return nodes
    .map((n) => {
      if (n.type === "text") return n.text || "";
      if (n.type === "hardBreak") return " ";
      return plainTextFromNodes(n.content);
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/** Google search URL for a heading — helps when article text alone is unclear. */
export function googleSearchUrl(query: string): string {
  const q = query.trim();
  if (!q) return "https://www.google.com/";
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export function headingIdFromNode(
  node: JSONContent,
  used: Map<string, number>,
  fallbackIndex = 0,
): string {
  const text =
    plainTextFromNodes(node.content) || `section-${fallbackIndex}`;
  const fromAttrs = String(node.attrs?.id || "").trim();
  const base = fromAttrs || slugifyHeading(text);
  return uniqueHeadingId(base, used);
}

export function extractHeadings(content: Record<string, unknown>) {
  const doc = content as JSONContent;
  const headings: { id: string; text: string; level: number }[] = [];
  const used = new Map<string, number>();
  let index = 0;

  for (const node of doc.content || []) {
    if (node.type !== "heading") continue;
    const level = Number(node.attrs?.level || 2);
    const text = plainTextFromNodes(node.content);
    const id = headingIdFromNode(node, used, index);
    headings.push({ id, text, level });
    index += 1;
  }
  return headings;
}
