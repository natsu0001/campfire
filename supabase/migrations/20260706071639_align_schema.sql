-- =====================================================
-- POSTS
-- =====================================================

alter table public.posts
add column if not exists camp_id uuid
references public.camps(id)
on delete cascade;

alter table public.posts
add column if not exists updated_at timestamptz
default now();

create index if not exists posts_camp_idx
on public.posts(camp_id);

create index if not exists posts_author_idx
on public.posts(author_id);
-- =====================================================
-- COMMENTS
-- =====================================================

create table if not exists public.comments (

    id uuid primary key default gen_random_uuid(),

    post_id uuid not null
        references public.posts(id)
        on delete cascade,

    author_id uuid not null
        references public.profiles(id)
        on delete cascade,

    content text not null,

    created_at timestamptz not null default now()

);

-- =====================================================
-- POST LIKES
-- =====================================================

create table if not exists public.post_likes (

    id uuid primary key default gen_random_uuid(),

    post_id uuid not null
        references public.posts(id)
        on delete cascade,

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    created_at timestamptz default now(),

    unique(post_id, user_id)

);

create index if not exists comments_post_idx
on public.comments(post_id);

create index if not exists comments_author_idx
on public.comments(author_id);

create index if not exists likes_post_idx
on public.post_likes(post_id);

create index if not exists likes_user_idx
on public.post_likes(user_id);

alter table public.comments enable row level security;
alter table public.post_likes enable row level security;

create policy "Read comments"
on public.comments
for select
to authenticated
using (true);

create policy "Insert comments"
on public.comments
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Delete own comments"
on public.comments
for delete
to authenticated
using (auth.uid() = author_id);

create policy "Read likes"
on public.post_likes
for select
to authenticated
using (true);

create policy "Insert likes"
on public.post_likes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Delete likes"
on public.post_likes
for delete
to authenticated
using (auth.uid() = user_id);