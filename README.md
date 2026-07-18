# Knowledge FStack

Nền tảng chia sẻ và học kiến thức phỏng vấn Frontend.

## Features

- Đọc bài theo category / tag / level
- Search + filter URL-sync
- TOC, code highlight & copy, custom interview blocks
- Auth Google + email/password (Supabase)
- Rating, bookmark, learning progress, comments
- Feedback nội dung
- Admin CMS (Tiptap), category/tag, moderation
- Light/Dark theme, SEO, responsive

## Tech stack

Next.js App Router · TypeScript · Tailwind CSS · Supabase · Tiptap · Vercel

## Requirements

- Node.js 20+
- npm (Windows)
- Tài khoản Supabase + (tuỳ chọn) Google OAuth để auth thật

## Setup (Windows npm)

```powershell
npm install
copy .env.example .env.local
```

Điền `.env.local` theo [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Nếu chưa có Supabase, public pages sẽ trống — cần cấu hình `.env.local` và chạy migration.

### Supabase

1. Chạy migration `supabase/migrations/001_initial_schema.sql`
2. Bật Email + Google auth
3. Tạo storage bucket `article-images`

### Admin

```env
ADMIN_EMAILS=you@email.com,backup@email.com
```

## Scripts

```powershell
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deploy Vercel

Xem [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project structure

```text
src/app            # routes (public + admin + auth)
src/components     # UI, articles, editor, layout
src/lib            # supabase, auth, data, validations
supabase/migrations
docs/              # product & ops docs
.cursor/rules      # project rules
.cursor/skills     # agent skills
```

## Docs

- [PRODUCT_KNOWLEDGE.md](docs/PRODUCT_KNOWLEDGE.md)
- [ARTICLE_AUTHORING_GUIDE.md](docs/ARTICLE_AUTHORING_GUIDE.md)
- [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- [ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)
- [DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [PHASE_AUDIT.md](docs/PHASE_AUDIT.md)

## Troubleshooting

Xem bảng trong `docs/DEPLOYMENT.md`. Auth/admin/upload cần credentials thật — không commit secrets.
