---
name: create-admin-feature
description: >-
  Implements admin-only Knowledge FStack features with server-side ADMIN_EMAILS
  checks and safe destructive confirmations. Use when building /admin routes.
---

# create-admin-feature

1. Verify admin via `ADMIN_EMAILS` on the server for every mutation.
2. Never hard-code admin emails in source.
3. Never expose service role key to the client.
4. Require confirmation for destructive actions.
5. Prefer audit-friendly status transitions (who/when/notes when applicable).
6. Keep admin pages `noindex`.
