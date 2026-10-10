create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- La autora recibe el rol de administradora solo cuando confirma su email real.
create or replace function public.grant_author_role()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if lower(new.email) = 'patriciaabardigital@gmail.com' and new.email_confirmed_at is not null then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_author_confirmed after insert or update of email_confirmed_at on auth.users
for each row execute function public.grant_author_role();

create table public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  fecha date not null default ((now() at time zone 'America/Santiago')::date),
  titulo text not null check (char_length(titulo) between 1 and 200),
  categoria text not null check (categoria in ('Financiero','Cuerpo','Maternidad','Mujer','Mentalidad y Espiritualidad')),
  contenido text not null check (char_length(contenido) between 1 and 20000),
  author_id uuid not null default auth.uid()
);
grant select on public.journal_posts to anon, authenticated;
grant insert, update, delete on public.journal_posts to authenticated;
grant all on public.journal_posts to service_role;
alter table public.journal_posts enable row level security;
create policy "Anyone reads published posts" on public.journal_posts for select to anon, authenticated using (true);
create policy "Author publishes" on public.journal_posts for insert to authenticated with check (public.has_role(auth.uid(), 'admin') and author_id = auth.uid());
create policy "Author edits" on public.journal_posts for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Author deletes" on public.journal_posts for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.journal_scripts (
  post_id uuid primary key references public.journal_posts(id) on delete cascade,
  guion text not null check (char_length(guion) <= 20000)
);
grant select, insert, update, delete on public.journal_scripts to authenticated;
grant all on public.journal_scripts to service_role;
alter table public.journal_scripts enable row level security;
create policy "Author manages scripts" on public.journal_scripts for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

grant select on public.community_messages to authenticated;
create policy "Author reads inbox" on public.community_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));