# Architecture Overview

## Frontend Architecture

- React Native with Expo and TypeScript.
- Expo Router for file-based routing and stack/tab organization.
- NativeWind as MVP styling layer for fast tokenized implementation.
- React Query or similar client cache can be considered for server data.
- Zustand or lightweight context can be considered for local UI state.
- Expo modules for camera, image picking, sharing, file handling, notifications, and media library.

Recommended future folder shape after Phase 2:

- `app/` - Expo Router routes.
- `src/components/` - reusable UI components.
- `src/features/` - feature modules such as onboarding, daily card, AI chat, palm reading, compatibility, paywall.
- `src/lib/` - Supabase, RevenueCat, analytics, and safe utilities.
- `src/theme/` - design tokens.
- `src/types/` - shared TypeScript types.

## Backend Architecture

- Supabase Auth for user identity.
- Supabase Postgres for user profile, readings, chats, purchases, preferences, and share events.
- Supabase Row Level Security on user-owned tables.
- Supabase Edge Functions for AI orchestration, RevenueCat webhooks if needed, share-card server generation if needed later, and future background tasks.

## AI Architecture Summary

- Client never calls OpenAI directly.
- Client sends user intent and allowed context to Supabase Edge Functions.
- Edge Functions apply system prompts, safety policies, cost controls, and logging.
- AI outputs are symbolic, reflective, positive, non-deterministic, and never fear-based.
- Vision AI is used only for symbolic palm reading based on visible features.

## Storage Architecture

- Private Supabase Storage buckets for palm images and optional profile/couple images.
- Generated share cards may be stored temporarily or saved locally depending on product choice.
- Public storage is allowed only for explicitly public assets, never private user uploads.
- Signed URLs should be short-lived for private media access.

## Payment Architecture

- RevenueCat handles product configuration, subscriptions, one-time purchases, restore purchases, and cross-platform entitlements.
- App checks RevenueCat entitlements before unlocking Plus, Pro, and one-time purchase content.
- Supabase stores normalized subscription and purchase snapshots for app logic and support context.

## Notification Architecture

- Expo Notifications for push token registration and local/scheduled notification behavior.
- Supabase stores push tokens, preferences, and notification history.
- Notification copy must be positive and non-alarming.
- Users can opt out from My Space.

## Data Flow

1. User authenticates with Supabase Auth.
2. App stores profile and birth profile in Supabase Postgres.
3. Feature request sends user action to Supabase Edge Function if AI is needed.
4. Edge Function loads allowed context, applies prompt and safety policy, calls OpenAI, and returns structured response.
5. App stores reading or message records with user ownership.
6. RevenueCat entitlements determine feature access.
7. Share and notification events are tracked for analytics and product improvement.

## Security Overview

- Use Supabase publishable key on client only.
- Never expose service-role keys or OpenAI keys in the app.
- Enforce RLS on user-owned tables.
- Store secrets in Supabase function secrets.
- Validate user ownership before reading or writing private data.
- Treat palm images and chat history as sensitive user data.
- Avoid logging raw images or excessive private prompt context.

## Environment Variables

Future implementation should define placeholders such as:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`
- `EXPO_PUBLIC_POSTHOG_KEY` or selected analytics key
- `SENTRY_DSN`
- Server-only `OPENAI_API_KEY` in Supabase Edge Function secrets
- Server-only RevenueCat webhook secret if used

## Deployment Assumptions

- Mobile app builds use EAS Build.
- Supabase manages hosted Auth, Postgres, Storage, and Edge Functions.
- Edge Functions are deployed through Supabase CLI after implementation.
- Store releases target TestFlight and Google Play internal testing before production.

## App Release Assumptions

- App Store and Google Play subscription setup is required before real billing.
- Privacy policy and terms are required before release.
- Paywall must include clear subscription duration, price, renewal terms, restore purchases, and links.
- Safety disclaimer must be visible in onboarding, AI surfaces, and store metadata where appropriate.
