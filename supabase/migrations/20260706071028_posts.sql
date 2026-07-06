-- =====================================================
-- POSTS
-- =====================================================

create table public.posts (
    id uuid primary key default gen_random_uuid(),

    camp_id uuid not null
        references public.camps(id)
        on delete cascade,

    author_id uuid not null
        references public.profiles(id)
        on delete cascade,

    content text not null,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =====================================================
-- COMMENTS
-- =====================================================

create table public.comments (
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

create table public.post_likes (
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

-- =====================================================
-- INDEXES
-- =====================================================

create index posts_camp_idx
on public.posts(camp_id);

create index comments_post_idx
on public.comments(post_id);

create index likes_post_idx
on public.post_likes(post_id);

-- =====================================================
-- RLS
-- =====================================================

alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;

-- =====================================================
-- POSTS
-- =====================================================

create policy "Read posts"
on public.posts
for select
to authenticated
using (true);

create policy "Create posts"
on public.posts
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Update own posts"
on public.posts
for update
to authenticated
using (auth.uid() = author_id);

create policy "Delete own posts"
on public.posts
for delete
to authenticated
using (auth.uid() = author_id);

-- =====================================================
-- COMMENTS
-- =====================================================

create policy "Read comments"
on public.comments
for select
to authenticated
using (true);

create policy "Create comments"
on public.comments
for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Delete own comments"
on public.comments
for delete
to authenticated
using (auth.uid() = author_id);

-- =====================================================
-- LIKES
-- =====================================================

create policy "Read likes"
on public.post_likes
for select
to authenticated
using (true);

create policy "Create likes"
on public.post_likes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Delete own likes"
on public.post_likes
for delete
to authenticated
using (auth.uid() = user_id);