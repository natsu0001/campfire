create or replace function public.create_camp(
    p_name text,
    p_description text,
    p_is_private boolean default false
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_camp_id uuid;
begin

    insert into public.camps (
        owner_id,
        name,
        description,
        is_private
    )
    values (
        auth.uid(),
        p_name,
        p_description,
        p_is_private
    )
    returning id into v_camp_id;

    insert into public.camp_members (
        camp_id,
        user_id,
        role
    )
    values (
        v_camp_id,
        auth.uid(),
        'owner'
    );

    return v_camp_id;

end;
$$;

grant execute
on function public.create_camp(text, text, boolean)
to authenticated;