-- ==========================================================
-- Campfire Initial Schema
-- ==========================================================

create extension if not exists "pgcrypto";

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    username text not null,
    display_name text not null,

    avatar_url text,
    bio text,

    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create unique index profiles_username_unique
on public.profiles(lower(username));

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function update_updated_at_column();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

insert into public.profiles(
    id,
    username,
    display_name
)
values(
    new.id,
    split_part(new.email,'@',1),
    split_part(new.email,'@',1)
);

return new;

end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

create table public.friend_requests (
    id uuid primary key default gen_random_uuid(),

    sender_id uuid not null references public.profiles(id) on delete cascade,

    receiver_id uuid not null references public.profiles(id) on delete cascade,

    status text not null default 'pending'
        check (status in ('pending','accepted','rejected')),

    created_at timestamptz default now() not null,

    constraint no_self_friend_request
        check (sender_id <> receiver_id)
);

create unique index friend_request_unique
on public.friend_requests(sender_id, receiver_id);

create index friend_request_receiver_idx
on public.friend_requests(receiver_id);

create table public.friends (
    id uuid primary key default gen_random_uuid(),

    user_one uuid not null references public.profiles(id) on delete cascade,

    user_two uuid not null references public.profiles(id) on delete cascade,

    created_at timestamptz default now() not null,

    constraint no_self_friend
        check (user_one <> user_two)
);

create unique index friends_unique
on public.friends(
    least(user_one,user_two),
    greatest(user_one,user_two)
);


create table public.conversations (
    id uuid primary key default gen_random_uuid(),

    type text not null default 'direct'
        check(type in ('direct','group')),

    created_at timestamptz default now() not null
);


create table public.conversation_members (

    conversation_id uuid not null
        references public.conversations(id)
        on delete cascade,

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    joined_at timestamptz default now() not null,

    primary key(conversation_id,user_id)
);

create index conversation_member_user_idx
on public.conversation_members(user_id);


create table public.messages (

    id uuid primary key default gen_random_uuid(),

    conversation_id uuid not null
        references public.conversations(id)
        on delete cascade,

    sender_id uuid not null
        references public.profiles(id)
        on delete cascade,

    content text,

    media_url text,

    edited_at timestamptz,

    created_at timestamptz default now() not null,

    constraint message_has_content
        check (
            content is not null
            or media_url is not null
        )
);

create index messages_conversation_idx
on public.messages(conversation_id);

create index messages_sender_idx
on public.messages(sender_id);


create table public.posts (

    id uuid primary key default gen_random_uuid(),

    author_id uuid not null
        references public.profiles(id)
        on delete cascade,

    content text,

    media_url text,

    edited_at timestamptz,

    created_at timestamptz default now() not null,

    constraint post_has_content
        check (
            content is not null
            or media_url is not null
        )
);

create index posts_author_idx
on public.posts(author_id);

create table public.threads (

    id uuid primary key default gen_random_uuid(),

    post_id uuid not null
        references public.posts(id)
        on delete cascade,

    author_id uuid not null
        references public.profiles(id)
        on delete cascade,

    content text not null,

    edited_at timestamptz,

    created_at timestamptz default now() not null
);

create index threads_post_idx
on public.threads(post_id);

create index threads_author_idx
on public.threads(author_id);

alter table public.profiles enable row level security;
alter table public.friend_requests enable row level security;
alter table public.friends enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.posts enable row level security;
alter table public.threads enable row level security;

create policy "Profiles are viewable by everyone"
on public.profiles
for select
using (true);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can view their own friend requests"
on public.friend_requests
for select
using (
    auth.uid() = sender_id
    or auth.uid() = receiver_id
);

create policy "Users can create friend requests"
on public.friend_requests
for insert
with check (
    auth.uid() = sender_id
);

create policy "Users can update received friend requests"
on public.friend_requests
for update
using (
    auth.uid() = receiver_id
);


create policy "Users can view their friendships"
on public.friends
for select
using (
    auth.uid() = user_one
    or auth.uid() = user_two
);

create policy "Authenticated users can create friendships"
on public.friends
for insert
with check (auth.role() = 'authenticated');


create policy "Authenticated users can create conversations"
on public.conversations
for insert
with check (auth.role() = 'authenticated');

create policy "Authenticated users can view conversations"
on public.conversations
for select
using (auth.role() = 'authenticated');



create policy "Users can view memberships"
on public.conversation_members
for select
using (
    auth.uid() = user_id
);

create policy "Authenticated users can add members"
on public.conversation_members
for insert
with check (
    auth.role() = 'authenticated'
);



create policy "Authenticated users can send messages"
on public.messages
for insert
with check (
    auth.uid() = sender_id
);

create policy "Authenticated users can view messages"
on public.messages
for select
using (
    auth.role() = 'authenticated'
);

create policy "Users can edit their own messages"
on public.messages
for update
using (
    auth.uid() = sender_id
);



create policy "Authenticated users can create posts"
on public.posts
for insert
with check (
    auth.uid() = author_id
);

create policy "Authenticated users can view posts"
on public.posts
for select
using (
    auth.role() = 'authenticated'
);

create policy "Users can edit their own posts"
on public.posts
for update
using (
    auth.uid() = author_id
);



create policy "Authenticated users can create threads"
on public.threads
for insert
with check (
    auth.uid() = author_id
);

create policy "Authenticated users can view threads"
on public.threads
for select
using (
    auth.role() = 'authenticated'
);

create policy "Users can edit their own threads"
on public.threads
for update
using (
    auth.uid() = author_id
);