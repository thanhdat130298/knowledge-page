-- Admin allowlist + write policies + seed categories/tags
-- Run after 001_initial_schema.sql

create table if not exists public.admin_allowlist (
  email text primary key
);

-- Put your admin emails here (must match Auth user email)
insert into public.admin_allowlist (email) values
  ('nguyenthanhdat1302@gmail.com'),
  ('thanhdat1302@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- Articles: admin full access
drop policy if exists "Admins select all articles" on public.articles;
create policy "Admins select all articles" on public.articles
  for select using (public.is_admin());

drop policy if exists "Admins insert articles" on public.articles;
create policy "Admins insert articles" on public.articles
  for insert with check (public.is_admin() and auth.uid() = author_id);

drop policy if exists "Admins update articles" on public.articles;
create policy "Admins update articles" on public.articles
  for update using (public.is_admin());

drop policy if exists "Admins delete articles" on public.articles;
create policy "Admins delete articles" on public.articles
  for delete using (public.is_admin());

-- Categories / tags admin write + read inactive for admin
drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage tags" on public.tags;
create policy "Admins manage tags" on public.tags
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage article_tags" on public.article_tags;
create policy "Admins manage article_tags" on public.article_tags
  for all using (public.is_admin()) with check (public.is_admin());

-- Seed default categories (idempotent by slug)
insert into public.categories (name, slug, description, icon, sort_order, is_active)
values
  ('JavaScript', 'javascript', 'Ngôn ngữ cốt lõi của Frontend.', 'Code2', 1, true),
  ('TypeScript', 'typescript', 'Type system cho JS hiện đại.', 'FileType', 2, true),
  ('HTML', 'html', 'Cấu trúc tài liệu web.', 'FileCode', 3, true),
  ('CSS', 'css', 'Layout, visual, responsive.', 'Palette', 4, true),
  ('Browser', 'browser', 'Event loop, rendering, storage.', 'Globe', 5, true),
  ('Vue', 'vue', 'Vue ecosystem & patterns.', 'Component', 6, true),
  ('Nuxt', 'nuxt', 'Vue meta-framework.', 'Layers', 7, true),
  ('React', 'react', 'Component model & reconciliation.', 'Atom', 8, true),
  ('Next.js', 'nextjs', 'React meta-framework & rendering.', 'Triangle', 9, true),
  ('Web Performance', 'web-performance', 'Core Web Vitals & tối ưu.', 'Gauge', 10, true),
  ('Accessibility', 'accessibility', 'A11y cho sản phẩm thật.', 'Accessibility', 11, true),
  ('Testing', 'testing', 'Unit, integration, e2e.', 'TestTube', 12, true),
  ('Frontend Architecture', 'frontend-architecture', 'Cấu trúc app & state.', 'Network', 13, true),
  ('Git & Workflow', 'git-workflow', 'Git, PR, collaboration.', 'GitBranch', 14, true),
  ('Behavioral Interview', 'behavioral-interview', 'Soft skills & storytelling.', 'MessagesSquare', 15, true)
on conflict (slug) do nothing;

insert into public.tags (name, slug)
values
  ('closure', 'closure'),
  ('async', 'async'),
  ('event-loop', 'event-loop'),
  ('hooks', 'hooks'),
  ('ssr', 'ssr'),
  ('scope', 'scope'),
  ('promise', 'promise'),
  ('computed', 'computed'),
  ('reconciliation', 'reconciliation'),
  ('types', 'types'),
  ('interview', 'interview'),
  ('junior', 'junior'),
  ('middle', 'middle'),
  ('senior', 'senior'),
  ('performance', 'performance')
on conflict (slug) do nothing;
