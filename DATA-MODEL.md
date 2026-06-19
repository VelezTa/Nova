# Data Model

This is the proposed Supabase Postgres model for MVP v1. Exact SQL should be created only after documentation approval.

## Common Fields

Most user-owned tables should include:

- `id uuid primary key`
- `user_id uuid references auth.users(id)`
- `created_at timestamptz`
- `updated_at timestamptz`

Use Row Level Security so users can access only their own rows.

## users

Purpose: Public app-level extension of `auth.users`.

Fields:
- `id uuid` - matches `auth.users.id`
- `email text`
- `display_name text`
- `avatar_url text`
- `created_at timestamptz`

Relationships:
- One user has one profile and many readings, chats, purchases, shares, and notifications.

Notes:
- Do not duplicate sensitive auth state that Supabase Auth already owns.

Privacy considerations:
- User-owned; email should not be exposed to other users.

## profiles

Purpose: User app profile.

Fields:
- `id uuid`
- `user_id uuid`
- `name text`
- `gender text nullable`
- `pronouns text nullable`
- `relationship_status text nullable`
- `main_interest text`
- `profile_photo_url text nullable`
- `cosmic_summary text nullable`

Relationships:
- Belongs to user.
- Has one or more birth profiles.

Notes:
- `main_interest` should be constrained to Love, Career, Money, Self-growth, Emotional clarity, Compatibility, Daily guidance.

Privacy considerations:
- Private personal profile data.

## birth_profiles

Purpose: Birth information for astrology personalization.

Fields:
- `id uuid`
- `user_id uuid`
- `profile_id uuid`
- `person_label text`
- `name text`
- `birth_date date`
- `birth_time time nullable`
- `birth_time_accuracy text`
- `approximate_time_range text nullable`
- `birth_city text`
- `birth_country text`
- `latitude numeric nullable`
- `longitude numeric nullable`
- `timezone text nullable`

Relationships:
- Belongs to profile or compatibility person.

Notes:
- Store geocoding fields only after geocoding is implemented.

Privacy considerations:
- Sensitive personal data; keep private.

## daily_cards

Purpose: Saved generated daily cards.

Fields:
- `id uuid`
- `user_id uuid`
- `card_date date`
- `word text`
- `message text`
- `number_of_day integer`
- `color_name text`
- `color_hex text`
- `energy text`
- `advice text`
- `share_image_url text nullable`
- `generation_source text`

Relationships:
- Belongs to user.
- Has many share events.

Notes:
- Unique per user and date.

Privacy considerations:
- May include personalized advice; private by default.

## weekly_predictions

Purpose: Saved generated weekly predictions.

Fields:
- `id uuid`
- `user_id uuid`
- `week_start date`
- `general_energy text`
- `love text`
- `work text`
- `money text`
- `wellness text`
- `advice text`
- `favorable_day text`
- `word_of_week text`
- `color_name text`
- `color_hex text`
- `generation_source text`

Relationships:
- Belongs to user.

Notes:
- Cache weekly to control AI cost.

Privacy considerations:
- Private.

## ai_chats

Purpose: AI chat sessions.

Fields:
- `id uuid`
- `user_id uuid`
- `title text`
- `context_scope text`
- `last_message_at timestamptz`

Relationships:
- Belongs to user.
- Has many AI messages.

Notes:
- Titles should be safe summaries.

Privacy considerations:
- Chat history is sensitive and private.

## ai_messages

Purpose: Individual chat messages.

Fields:
- `id uuid`
- `user_id uuid`
- `chat_id uuid`
- `role text`
- `content text`
- `safety_status text`
- `model text nullable`
- `input_tokens integer nullable`
- `output_tokens integer nullable`

Relationships:
- Belongs to AI chat.

Notes:
- `role` should be user, assistant, or system_summary.

Privacy considerations:
- Avoid storing raw hidden system prompts if not needed.

## palm_readings

Purpose: Symbolic palm reading results.

Fields:
- `id uuid`
- `user_id uuid`
- `status text`
- `summary text`
- `heart_line text`
- `head_line text`
- `life_line text`
- `fate_line text nullable`
- `mounts text nullable`
- `hand_shape text nullable`
- `personality_reflection text`
- `emotional_style text`
- `decision_making_style text`
- `strengths text`
- `growth_areas text`
- `safety_status text`

Relationships:
- Belongs to user.
- Has many palm reading images.

Notes:
- Must never include death, illness, tragedy, accident, or medical claims.

Privacy considerations:
- Sensitive image-derived content; private.

## palm_reading_images

Purpose: Metadata for left and right hand images.

Fields:
- `id uuid`
- `user_id uuid`
- `palm_reading_id uuid`
- `hand_side text`
- `storage_path text`
- `mime_type text`
- `file_size integer`
- `width integer nullable`
- `height integer nullable`

Relationships:
- Belongs to palm reading.

Notes:
- `hand_side` is left or right.

Privacy considerations:
- Private bucket only; use signed URLs.

## compatibility_readings

Purpose: Couple compatibility result.

Fields:
- `id uuid`
- `user_id uuid`
- `overall_percentage integer`
- `emotional_connection text`
- `communication_style text`
- `attraction text`
- `shared_strengths text`
- `growth_opportunities text`
- `beautiful_connection text`
- `care_points text`
- `positive_advice text`
- `safety_status text`

Relationships:
- Belongs to user.
- Has two or more compatibility people.

Notes:
- No claims about betrayal, cheating, danger, doom, soulmate certainty, or required decisions.

Privacy considerations:
- Contains another person's birth data; keep private.

## compatibility_people

Purpose: Person records attached to compatibility readings.

Fields:
- `id uuid`
- `user_id uuid`
- `compatibility_reading_id uuid`
- `person_order integer`
- `name text`
- `birth_date date`
- `birth_time time nullable`
- `birth_time_accuracy text`
- `approximate_time_range text nullable`
- `birth_city text`
- `birth_country text`
- `photo_url text nullable`
- `avatar_key text nullable`

Relationships:
- Belongs to compatibility reading.

Notes:
- Person A uses `person_order = 1`, Person B uses `person_order = 2`.

Privacy considerations:
- Treat as private third-party personal data.

## subscriptions

Purpose: Normalized active subscription state.

Fields:
- `id uuid`
- `user_id uuid`
- `revenuecat_customer_id text`
- `entitlement text`
- `product_id text`
- `platform text`
- `status text`
- `current_period_end timestamptz nullable`

Relationships:
- Belongs to user.

Notes:
- RevenueCat remains source of truth; this table is a cached app view.

Privacy considerations:
- Private billing state; do not store payment card details.

## purchases

Purpose: One-time purchase records.

Fields:
- `id uuid`
- `user_id uuid`
- `revenuecat_customer_id text`
- `product_id text`
- `purchase_type text`
- `platform text`
- `status text`
- `purchased_at timestamptz`

Relationships:
- Belongs to user.

Notes:
- Use for full palm reading, compatibility, birth chart, and premium card packs.

Privacy considerations:
- Private purchase history.

## share_events

Purpose: Track organic growth events.

Fields:
- `id uuid`
- `user_id uuid`
- `source_type text`
- `source_id uuid`
- `destination text`
- `watermarked boolean`
- `shared_at timestamptz`

Relationships:
- Belongs to user and optionally references source content.

Notes:
- Destination examples: native, instagram_story, instagram_post, tiktok, whatsapp, save_image.

Privacy considerations:
- Do not store recipient data.

## notifications

Purpose: Push token, schedule, and notification history.

Fields:
- `id uuid`
- `user_id uuid`
- `type text`
- `title text`
- `body text`
- `scheduled_for timestamptz nullable`
- `sent_at timestamptz nullable`
- `status text`

Relationships:
- Belongs to user.

Notes:
- Notification copy must be positive and non-alarming.

Privacy considerations:
- Avoid sensitive details in notification body.

## user_preferences

Purpose: User settings for privacy, notifications, personalization, and app experience.

Fields:
- `id uuid`
- `user_id uuid`
- `daily_notification_enabled boolean`
- `weekly_notification_enabled boolean`
- `notification_time text nullable`
- `save_chat_history boolean`
- `save_palm_images boolean`
- `share_watermark_preference text`
- `content_personalization_enabled boolean`

Relationships:
- Belongs to user.

Notes:
- Defaults should favor privacy and user control.

Privacy considerations:
- Preferences must be respected by AI context and data retention behavior.
