create table if not exists public.weekly_predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  general_energy text not null check (char_length(trim(general_energy)) between 1 and 520),
  love text not null check (char_length(trim(love)) between 1 and 420),
  work text not null check (char_length(trim(work)) between 1 and 420),
  money text not null check (char_length(trim(money)) between 1 and 420),
  wellness text not null check (char_length(trim(wellness)) between 1 and 420),
  favorable_day text not null check (char_length(trim(favorable_day)) between 1 and 40),
  word_of_week text not null check (char_length(trim(word_of_week)) between 1 and 40),
  color_name text not null check (char_length(trim(color_name)) between 1 and 60),
  color_hex text not null check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  advice text not null check (char_length(trim(advice)) between 1 and 520),
  generation_source text not null check (
    generation_source in ('openai')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint weekly_predictions_user_week_key unique (user_id, week_start)
);

alter table public.weekly_predictions enable row level security;

drop policy if exists "Users can select own weekly predictions" on public.weekly_predictions;
create policy "Users can select own weekly predictions"
  on public.weekly_predictions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own weekly predictions" on public.weekly_predictions;
create policy "Users can insert own weekly predictions"
  on public.weekly_predictions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own weekly predictions" on public.weekly_predictions;
create policy "Users can update own weekly predictions"
  on public.weekly_predictions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own weekly predictions" on public.weekly_predictions;
create policy "Users can delete own weekly predictions"
  on public.weekly_predictions
  for delete
  to authenticated
  using (auth.uid() = user_id);
