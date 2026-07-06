-- Add camp support to existing posts table

alter table public.posts
add column if not exists camp_id uuid references public.camps(id) on delete cascade;

alter table public.posts
add column if not exists updated_at timestamptz default now();

-- Copy edited_at into updated_at if it exists
update public.posts
set updated_at = edited_at
where updated_at is null;

-- Index
create index if not exists posts_camp_idx
on public.posts(camp_id);