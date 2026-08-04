-- Series (chuỗi bài cùng chủ đề) + gắn bài vào series
-- Run after 002_admin_policies_and_seed.sql

create table if not exists public.series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  cover_image_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles
  add column if not exists series_id uuid references public.series (id) on delete set null;

alter table public.articles
  add column if not exists series_order int not null default 0;

create index if not exists articles_series_id_order_idx
  on public.articles (series_id, series_order);

alter table public.series enable row level security;

drop policy if exists "Public read published series" on public.series;
create policy "Public read published series" on public.series
  for select using (is_published = true);

drop policy if exists "Admins manage series" on public.series;
create policy "Admins manage series" on public.series
  for all using (public.is_admin()) with check (public.is_admin());
