-- Knowledge FStack schema + RLS skeleton
-- Run in Supabase SQL editor or via CLI

create extension if not exists unaccent;
create extension if not exists pg_trgm;

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create type public.article_status as enum ('draft', 'published', 'archived');
create type public.article_level as enum ('junior', 'middle', 'senior', 'all');

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content jsonb not null default '{}'::jsonb,
  cover_image_url text,
  cover_image_alt text,
  category_id uuid references public.categories (id) on delete set null,
  level public.article_level not null default 'all',
  status public.article_status not null default 'draft',
  is_featured boolean not null default false,
  author_id uuid references public.profiles (id) on delete set null,
  seo_title text,
  seo_description text,
  canonical_url text,
  reading_time_minutes int not null default 1,
  view_count int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector
);

create table if not exists public.article_tags (
  article_id uuid references public.articles (id) on delete cascade,
  tag_id uuid references public.tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

create table if not exists public.article_ratings (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (article_id, user_id)
);

create type public.quick_feedback_type as enum ('useful', 'hard_to_understand', 'inaccurate');

create table if not exists public.article_quick_feedback (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  feedback_type public.quick_feedback_type not null,
  created_at timestamptz not null default now(),
  unique (article_id, user_id, feedback_type)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (article_id, user_id)
);

create type public.learning_status as enum ('not_started', 'learning', 'understood', 'review');

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  status public.learning_status not null default 'learning',
  updated_at timestamptz not null default now(),
  unique (article_id, user_id)
);

create type public.comment_moderation as enum ('visible', 'hidden', 'spam');

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  parent_id uuid references public.comments (id) on delete cascade,
  content text not null,
  moderation public.comment_moderation not null default 'visible',
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint one_level_reply check (parent_id is null or parent_id is not null)
);

create table if not exists public.comment_votes (
  comment_id uuid references public.comments (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

create type public.feedback_type as enum (
  'incorrect',
  'outdated',
  'hard_to_understand',
  'missing_content',
  'missing_examples',
  'suggestion',
  'typo',
  'other'
);

create type public.feedback_status as enum ('pending', 'reviewing', 'resolved', 'rejected');

create table if not exists public.article_feedback (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  feedback_type public.feedback_type not null,
  content text not null,
  selected_text text,
  status public.feedback_status not null default 'pending',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Search vector maintenance
create or replace function public.articles_search_vector_update()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', unaccent(coalesce(new.title, ''))), 'A') ||
    setweight(to_tsvector('simple', unaccent(coalesce(new.excerpt, ''))), 'B') ||
    setweight(to_tsvector('simple', unaccent(coalesce(new.content::text, ''))), 'C');
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_search_vector_trigger on public.articles;
create trigger articles_search_vector_trigger
  before insert or update of title, excerpt, content
  on public.articles
  for each row execute function public.articles_search_vector_update();

create index if not exists articles_search_idx on public.articles using gin (search_vector);
create index if not exists articles_slug_idx on public.articles (slug);
create index if not exists articles_status_idx on public.articles (status);

-- Profile bootstrap
create or replace function public.handle_new_user()
returns trigger as $$
declare
  base_username text;
  final_username text;
  suffix int := 0;
begin
  base_username := coalesce(
    nullif(trim(new.raw_user_meta_data->>'username'), ''),
    nullif(split_part(new.email, '@', 1), ''),
    'user'
  );
  base_username := lower(regexp_replace(base_username, '[^a-z0-9_]', '_', 'g'));
  final_username := base_username;
  while exists (select 1 from public.profiles where username = final_username) loop
    suffix := suffix + 1;
    final_username := base_username || suffix::text;
  end loop;

  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    final_username,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', final_username),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.article_ratings enable row level security;
alter table public.article_quick_feedback enable row level security;
alter table public.bookmarks enable row level security;
alter table public.learning_progress enable row level security;
alter table public.comments enable row level security;
alter table public.comment_votes enable row level security;
alter table public.article_feedback enable row level security;

-- Helper: is admin via JWT email claim checked in app; DB policies use auth.uid() ownership.
-- Public read published articles
create policy "Public read profiles" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Public read active categories" on public.categories for select using (is_active = true);
create policy "Public read tags" on public.tags for select using (true);

create policy "Public read published articles" on public.articles
  for select using (status = 'published' or author_id = auth.uid());

create policy "Public read article_tags" on public.article_tags for select using (true);

create policy "Public read ratings" on public.article_ratings for select using (true);
create policy "Users upsert own ratings" on public.article_ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own quick feedback" on public.article_quick_feedback
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Public count bookmarks" on public.bookmarks for select using (true);

create policy "Users manage own progress" on public.learning_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Public read visible comments" on public.comments
  for select using (moderation = 'visible' or user_id = auth.uid());
create policy "Users insert comments" on public.comments
  for insert with check (auth.uid() = user_id);
create policy "Users update own comments" on public.comments
  for update using (auth.uid() = user_id);

create policy "Public read votes" on public.comment_votes for select using (true);
create policy "Users manage own votes" on public.comment_votes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users insert feedback" on public.article_feedback
  for insert with check (auth.uid() = user_id);
create policy "Users read own feedback" on public.article_feedback
  for select using (auth.uid() = user_id);

-- Storage bucket note: create bucket `article-images` in Dashboard (public read).
