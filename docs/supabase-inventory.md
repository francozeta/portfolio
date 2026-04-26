# Supabase Inventory

Generated on 2026-04-26 while migrating the portfolio away from runtime Supabase reads.

## Current State

- Project URL host: `ahmytayvpbqnwimemzqh.supabase.co`
- `public.projects` is readable with the anon key and contains 1 row: `mubi-clone`.
- `public.project_media` is readable with the anon key, contains 0 rows, and Supabase reports `RLS Disabled in Public`.
- Storage bucket `project-images` exists and contains the MUBI screenshot objects.
- Storage bucket `portfolio` exists and contains profile, logo, hero, and music artwork assets.
- The app no longer needs Supabase at runtime after this migration. The exported data is stored in `docs/supabase-backup.json`.

## Local Asset Copies

These Supabase-hosted assets were copied into `public/` so the public site can render without Supabase:

- `/images/hero.png`
- `/images/profile-photo.jpg`
- `/images/fz-logo.svg`
- `/music/slowdive-album.jpg`
- `/music/devotion-album.jpg`
- `/music/dynamo-album.jpg`
- `/projects/mubi-clone.png`

## Non-Destructive RLS Fixes If Supabase Is Kept

If the Supabase project remains active, enable RLS on `project_media` even if the table is empty.

```sql
alter table public.project_media enable row level security;

create policy "project_media_select_public"
on public.project_media
for select
using (true);

create policy "project_media_write_authenticated"
on public.project_media
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
```

If you keep the old CMS, also verify `storage.objects` policies for `project-images`; authenticated users should be able to upload/update/delete, while public users should only read from public buckets.

## Recovery Notes

The minimum table schema expected by the legacy CMS was:

```sql
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  excerpt text,
  content jsonb default '[]'::jsonb,
  image_url text,
  status text default 'in_progress' check (status in ('in_progress', 'completed')),
  featured boolean default false,
  technologies jsonb default '[]'::jsonb,
  repo_url text,
  deploy_url text,
  reading_time integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```
