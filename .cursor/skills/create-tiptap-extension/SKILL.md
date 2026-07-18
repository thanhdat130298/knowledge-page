---
name: create-tiptap-extension
description: >-
  Creates Tiptap custom nodes/extensions that stay in sync between admin editor
  and public renderer. Use when adding interview content blocks.
---

# create-tiptap-extension

1. Add extension in `src/components/editor/` and register in ArticleEditor.
2. Render the same `data-type` in public `ArticleContent`.
3. Content must round-trip JSON save/load.
4. Support light/dark via CSS variables.
5. No raw script injection; sanitize URLs.
6. Free extensions only — no paid Tiptap packages.
7. Add a render/extract test when logic is non-trivial.
