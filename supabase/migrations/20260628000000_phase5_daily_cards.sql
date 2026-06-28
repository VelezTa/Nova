create table if not exists public.daily_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_date date not null,
  word text not null check (char_length(trim(word)) between 1 and 40),
  message text not null check (char_length(trim(message)) between 1 and 420),
  number_of_day integer not null check (number_of_day between 1 and 99),
  color_name text not null check (char_length(trim(color_name)) between 1 and 60),
  color_hex text not null check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  energy text not null check (char_length(trim(energy)) between 1 and 240),
  advice text not null check (char_length(trim(advice)) between 1 and 420),
  share_image_url text,
  generation_source text not null check (
    generation_source in ('openai')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint daily_cards_user_date_key unique (user_id, card_date)
);

alter table public.daily_cards enable row level security;

drop policy if exists "Users can select own daily cards" on public.daily_cards;
create policy "Users can select own daily cards"
  on public.daily_cards
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own daily cards" on public.daily_cards;
create policy "Users can insert own daily cards"
  on public.daily_cards
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own daily cards" on public.daily_cards;
create policy "Users can update own daily cards"
  on public.daily_cards
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own daily cards" on public.daily_cards;
create policy "Users can delete own daily cards"
  on public.daily_cards
  for delete
  to authenticated
  using (auth.uid() = user_id);
