type JSONContent = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  text?: string;
};

export function extractHeadings(content: Record<string, unknown>) {
  const doc = content as JSONContent;
  const headings: { id: string; text: string; level: number }[] = [];
  for (const node of doc.content || []) {
    if (node.type !== "heading") continue;
    const level = Number(node.attrs?.level || 2);
    const text = node.content?.map((c) => c.text || "").join("") || "";
    const id =
      String(node.attrs?.id || "") ||
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}
