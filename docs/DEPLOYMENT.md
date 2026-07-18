# Deployment

## Supabase setup

1. Tạo project Supabase (free tier).
2. Chạy SQL trong `supabase/migrations/001_initial_schema.sql`.
3. Auth → Providers: bật Email và Google.
4. Storage: tạo bucket `article-images` (public read nếu serve ảnh public).
5. Copy Project URL + **Publishable key** (hoặc legacy anon key). Service role chỉ cần khi seed/admin script.

6. Chạy thêm `supabase/migrations/002_admin_policies_and_seed.sql` (admin RLS + seed category/tag + email allowlist DB).

## Lưu bài admin

- App ghi vào bảng `articles` / `article_tags` qua Server Actions.
- Email admin phải có trong **cả** `ADMIN_EMAILS` (env) **và** `public.admin_allowlist` (SQL).
- Phải đăng nhập bằng đúng email đó trước khi Publish.

## Google OAuth

1. Google Cloud Console → OAuth client.
2. Authorized redirect URIs: `https://<project-ref>.supabase.co/auth/v1/callback`
3. Thêm Client ID/Secret vào Supabase Auth Google provider.
4. Site URL / redirect allow list bao gồm local và production.

## Environment variables

Xem `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ưu tiên) hoặc `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy)
- `SUPABASE_SERVICE_ROLE_KEY` (server only, tùy chọn — seed/admin scripts)
- `ADMIN_EMAILS`

## Vercel

1. Import repo → Framework Next.js.
2. Gắn env production giống `.env.example`.
3. `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
4. Deploy — không cần Docker / custom server.

## Production callback

- Supabase Auth URL config: Site URL = production URL.
- Redirect URLs: `https://your-domain/auth/callback`

## Admin emails

`ADMIN_EMAILS=you@gmail.com,backup@gmail.com` (lowercase match).

## Troubleshooting

| Vấn đề | Cách xử lý |
|--------|------------|
| Auth redirect fail | Kiểm tra Site URL + callback path |
| Admin không vào được | Email có trong `ADMIN_EMAILS`? |
| Ảnh upload fail | Bucket + RLS storage policies |
| Build thiếu env | Kiểm tra `.env.local` có URL + publishable key |
| Search tiếng Việt | Đảm bảo extension `unaccent` đã enable |
