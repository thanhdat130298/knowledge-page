---
name: create-feature
description: >-
  Adds a Knowledge FStack feature end-to-end with validation, permissions,
  loading/error/empty states, and tests. Use when adding a new product feature.
---

# create-feature

1. Read `knowledge_base.md` and `docs/PRODUCT_KNOWLEDGE.md` for scope.
2. Check the feature is not already implemented.
3. Decide Server vs Client Component boundary.
4. Add Zod validation and server-side permission checks.
5. Add loading, error, empty, success states.
6. Add tests for core logic.
7. Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
