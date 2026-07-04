-- =====================================================
-- CAMPS
-- =====================================================

create table public.camps (
  id uuid primary key default gen_random_uuid(),

  owner_id uuid not null
    references public.profiles(id)
    on delete cascade,

  name text not null,
  description text,

  is_private boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- CAMP MEMBERS
-- =====================================================

create table public.camp_members (
  id uuid primary key default gen_random_uuid(),

  camp_id uuid not null
    references public.camps(id)
    on delete cascade,

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  role text not null
    check (role in ('owner','admin','member'))
    default 'member',

  joined_at timestamptz not null default now(),

  unique(camp_id, user_id)
);

-- =====================================================
-- INDEXES
-- =====================================================

create index camps_owner_idx
on public.camps(owner_id);

create index camp_members_camp_idx
on public.camp_members(camp_id);

create index camp_members_user_idx
on public.camp_members(user_id);

-- =====================================================
-- RLS
-- =====================================================

alter table public.camps enable row level security;
alter table public.camp_members enable row level security;

-- =====================================================
-- CAMPS POLICIES
-- =====================================================

create policy "Authenticated users can view camps"
on public.camps
for select
to authenticated
using (true);

create policy "Users can create camps"
on public.camps
for insert
to authenticated
with check (auth.uid() = owner_id);

create policy "Owners can update camps"
on public.camps
for update
to authenticated
using (auth.uid() = owner_id);

create policy "Owners can delete camps"
on public.camps
for delete
to authenticated
using (auth.uid() = owner_id);

-- =====================================================
-- MEMBERS POLICIES
-- =====================================================

create policy "Members are viewable"
on public.camp_members
for select
to authenticated
using (true);

create policy "Users can join camps"
on public.camp_members
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can leave camps"
on public.camp_members
for delete
to authenticated
using (auth.uid() = user_id);