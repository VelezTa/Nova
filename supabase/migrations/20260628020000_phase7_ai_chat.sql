create table if not exists public.ai_chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Nova chat' check (char_length(trim(title)) between 1 and 80),
  context_scope text not null default 'profile_birth_chat' check (char_length(trim(context_scope)) between 1 and 80),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  chat_id uuid not null references public.ai_chats(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null check (char_length(trim(content)) between 1 and 2000),
  safety_status text not null check (
    safety_status in ('safe', 'redirected')
  ),
  generation_source text not null check (
    generation_source in ('user', 'openai', 'safety_redirect')
  ),
  model text,
  input_tokens integer check (input_tokens is null or input_tokens >= 0),
  output_tokens integer check (output_tokens is null or output_tokens >= 0),
  created_at timestamptz not null default now()
);

create index if not exists ai_chats_user_last_message_idx
  on public.ai_chats (user_id, last_message_at desc);

create index if not exists ai_messages_chat_created_idx
  on public.ai_messages (chat_id, created_at asc);

alter table public.ai_chats enable row level security;
alter table public.ai_messages enable row level security;

drop policy if exists "Users can select own ai chats" on public.ai_chats;
create policy "Users can select own ai chats"
  on public.ai_chats
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own ai chats" on public.ai_chats;
create policy "Users can insert own ai chats"
  on public.ai_chats
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own ai chats" on public.ai_chats;
create policy "Users can update own ai chats"
  on public.ai_chats
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own ai chats" on public.ai_chats;
create policy "Users can delete own ai chats"
  on public.ai_chats
  for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can select own ai messages" on public.ai_messages;
create policy "Users can select own ai messages"
  on public.ai_messages
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own ai messages" on public.ai_messages;
create policy "Users can insert own ai messages"
  on public.ai_messages
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.ai_chats
      where ai_chats.id = ai_messages.chat_id
        and ai_chats.user_id = auth.uid()
    )
  );

drop policy if exists "Users can update own ai messages" on public.ai_messages;
create policy "Users can update own ai messages"
  on public.ai_messages
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.ai_chats
      where ai_chats.id = ai_messages.chat_id
        and ai_chats.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete own ai messages" on public.ai_messages;
create policy "Users can delete own ai messages"
  on public.ai_messages
  for delete
  to authenticated
  using (auth.uid() = user_id);
