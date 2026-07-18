---
name: create-supabase-feature
description: >-
  Adds Supabase-backed features with RLS, generated types, migrations, and safe
  session-based identity. Use when changing schema or data access.
---

# create-supabase-feature

1. Add/update SQL in `supabase/migrations/`.
2. Enable and verify RLS policies.
3. Never trust user id from the client body.
4. Handle errors without leaking secrets.
5. Prefer empty states over fake seed data when queries fail.
6. Document new env vars in `.env.example` and `docs/DEPLOYMENT.md`.
