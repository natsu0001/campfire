-- Friends table was created previously.
-- Schema was aligned manually.

alter table public.friends
enable row level security;

create policy "View own friendships"
on public.friends
for select
to authenticated
using (
    auth.uid() = sender_id
    OR auth.uid() = receiver_id
);

create policy "Send friend request"
on public.friends
for insert
to authenticated
with check (
    auth.uid() = sender_id
);

create policy "Update received request"
on public.friends
for update
to authenticated
using (
    auth.uid() = receiver_id
);