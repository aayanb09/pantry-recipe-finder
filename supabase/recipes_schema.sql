create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.recipes (
  id text primary key,
  title text not null,
  ingredients text[] not null default '{}',
  category text not null,
  health_goals text[] not null default '{}',
  has_spanish boolean not null default false,
  drive_file_id text,
  spanish_drive_file_id text,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

grant select on public.recipes to anon;
grant select, insert, update, delete on public.recipes to authenticated;
grant select on public.admin_users to authenticated;
grant all on public.recipes, public.admin_users to service_role;

alter table public.admin_users enable row level security;
alter table public.recipes enable row level security;

drop policy if exists "Admins can read their own membership" on public.admin_users;

drop policy if exists "Public can read recipes" on public.recipes;
drop policy if exists "Authenticated admins can insert recipes" on public.recipes;
drop policy if exists "Authenticated admins can update recipes" on public.recipes;
drop policy if exists "Authenticated admins can delete recipes" on public.recipes;

create policy "Admins can read their own membership"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

create policy "Public can read recipes"
on public.recipes
for select
to anon, authenticated
using (true);

create policy "Authenticated admins can insert recipes"
on public.recipes
for insert
to authenticated
with check (public.is_admin());

create policy "Authenticated admins can update recipes"
on public.recipes
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Authenticated admins can delete recipes"
on public.recipes
for delete
to authenticated
using (public.is_admin());
