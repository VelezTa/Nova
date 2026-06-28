create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  gender text check (gender is null or char_length(trim(gender)) <= 40),
  pronouns text check (pronouns is null or char_length(trim(pronouns)) <= 40),
  relationship_status text check (
    relationship_status is null
    or char_length(trim(relationship_status)) <= 60
  ),
  main_interest text not null check (
    main_interest in (
      'Love',
      'Career',
      'Money',
      'Self-growth',
      'Emotional clarity',
      'Compatibility',
      'Daily guidance'
    )
  ),
  profile_photo_url text,
  cosmic_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_user_id_key unique (user_id)
);

create table if not exists public.birth_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  person_label text not null default 'self',
  name text not null check (char_length(trim(name)) between 1 and 80),
  birth_date date not null check (birth_date <= current_date),
  birth_time time,
  birth_time_accuracy text not null check (
    birth_time_accuracy in ('exact', 'approximate')
  ),
  approximate_time_range text,
  birth_city text not null check (
    char_length(trim(birth_city)) between 1 and 120
  ),
  birth_country text not null check (
    char_length(trim(birth_country)) between 1 and 120
  ),
  latitude numeric,
  longitude numeric,
  timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint birth_profiles_profile_person_key unique (profile_id, person_label),
  constraint birth_profiles_time_accuracy_check check (
    (
      birth_time_accuracy = 'exact'
      and birth_time is not null
      and approximate_time_range is null
    )
    or (
      birth_time_accuracy = 'approximate'
      and birth_time is null
      and approximate_time_range is not null
      and char_length(trim(approximate_time_range)) <= 40
    )
  )
);

alter table public.profiles enable row level security;
alter table public.birth_profiles enable row level security;

drop policy if exists "Users can select own profiles" on public.profiles;
create policy "Users can select own profiles"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own profiles" on public.profiles;
create policy "Users can insert own profiles"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own profiles" on public.profiles;
create policy "Users can update own profiles"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own profiles" on public.profiles;
create policy "Users can delete own profiles"
  on public.profiles
  for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can select own birth profiles" on public.birth_profiles;
create policy "Users can select own birth profiles"
  on public.birth_profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own birth profiles" on public.birth_profiles;
create policy "Users can insert own birth profiles"
  on public.birth_profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own birth profiles" on public.birth_profiles;
create policy "Users can update own birth profiles"
  on public.birth_profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own birth profiles" on public.birth_profiles;
create policy "Users can delete own birth profiles"
  on public.birth_profiles
  for delete
  to authenticated
  using (auth.uid() = user_id);
