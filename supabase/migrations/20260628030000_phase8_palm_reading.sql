insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'palm-images',
  'palm-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.palm_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (
    status in ('pending', 'generating', 'completed', 'failed', 'needs_better_images')
  ),
  summary text check (summary is null or char_length(trim(summary)) between 1 and 900),
  image_quality_note text check (
    image_quality_note is null
    or char_length(trim(image_quality_note)) between 1 and 600
  ),
  heart_line text check (heart_line is null or char_length(trim(heart_line)) between 1 and 800),
  head_line text check (head_line is null or char_length(trim(head_line)) between 1 and 800),
  life_line text check (life_line is null or char_length(trim(life_line)) between 1 and 800),
  fate_line text check (fate_line is null or char_length(trim(fate_line)) between 1 and 800),
  mounts text check (mounts is null or char_length(trim(mounts)) between 1 and 800),
  hand_shape text check (hand_shape is null or char_length(trim(hand_shape)) between 1 and 800),
  personality_reflection text check (
    personality_reflection is null
    or char_length(trim(personality_reflection)) between 1 and 800
  ),
  emotional_style text check (
    emotional_style is null
    or char_length(trim(emotional_style)) between 1 and 800
  ),
  decision_making_style text check (
    decision_making_style is null
    or char_length(trim(decision_making_style)) between 1 and 800
  ),
  strengths text check (strengths is null or char_length(trim(strengths)) between 1 and 800),
  growth_areas text check (growth_areas is null or char_length(trim(growth_areas)) between 1 and 800),
  safety_status text not null default 'pending' check (
    safety_status in ('pending', 'safe', 'redirected')
  ),
  generation_source text check (
    generation_source is null
    or generation_source in ('openai', 'safety_redirect')
  ),
  model text,
  input_tokens integer check (input_tokens is null or input_tokens >= 0),
  output_tokens integer check (output_tokens is null or output_tokens >= 0),
  error_message text check (
    error_message is null
    or char_length(trim(error_message)) between 1 and 600
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.palm_reading_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  palm_reading_id uuid not null references public.palm_readings(id) on delete cascade,
  hand_side text not null check (hand_side in ('left', 'right')),
  storage_path text not null check (char_length(trim(storage_path)) between 1 and 500),
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  file_size integer not null check (file_size > 0 and file_size <= 10485760),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (palm_reading_id, hand_side),
  unique (storage_path)
);

create index if not exists palm_readings_user_created_idx
  on public.palm_readings (user_id, created_at desc);

create index if not exists palm_reading_images_reading_idx
  on public.palm_reading_images (palm_reading_id, hand_side);

alter table public.palm_readings enable row level security;
alter table public.palm_reading_images enable row level security;

drop policy if exists "Users can select own palm readings" on public.palm_readings;
create policy "Users can select own palm readings"
  on public.palm_readings
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own palm readings" on public.palm_readings;
create policy "Users can insert own palm readings"
  on public.palm_readings
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own palm readings" on public.palm_readings;
create policy "Users can update own palm readings"
  on public.palm_readings
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own palm readings" on public.palm_readings;
create policy "Users can delete own palm readings"
  on public.palm_readings
  for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can select own palm reading images" on public.palm_reading_images;
create policy "Users can select own palm reading images"
  on public.palm_reading_images
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own palm reading images" on public.palm_reading_images;
create policy "Users can insert own palm reading images"
  on public.palm_reading_images
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.palm_readings
      where palm_readings.id = palm_reading_images.palm_reading_id
        and palm_readings.user_id = auth.uid()
    )
  );

drop policy if exists "Users can update own palm reading images" on public.palm_reading_images;
create policy "Users can update own palm reading images"
  on public.palm_reading_images
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.palm_readings
      where palm_readings.id = palm_reading_images.palm_reading_id
        and palm_readings.user_id = auth.uid()
    )
  );

drop policy if exists "Users can delete own palm reading images" on public.palm_reading_images;
create policy "Users can delete own palm reading images"
  on public.palm_reading_images
  for delete
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can select own palm image objects" on storage.objects;
create policy "Users can select own palm image objects"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'palm-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can insert own palm image objects" on storage.objects;
create policy "Users can insert own palm image objects"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'palm-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and exists (
      select 1
      from public.palm_readings
      where palm_readings.id::text = (storage.foldername(name))[2]
        and palm_readings.user_id = auth.uid()
    )
  );

drop policy if exists "Users can update own palm image objects" on storage.objects;
create policy "Users can update own palm image objects"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'palm-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'palm-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete own palm image objects" on storage.objects;
create policy "Users can delete own palm image objects"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'palm-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
