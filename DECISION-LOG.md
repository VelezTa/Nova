# Decision Log

## Decision 1

- Date: 2026-06-18
- Decision: Use React Native, Expo, and TypeScript instead of Flutter.
- Reason: The requested stack is React Native + Expo + TypeScript and supports iOS and Android with fast iteration.
- Alternatives considered: Flutter, native Swift/Kotlin.
- Status: Approved

## Decision 2

- Date: 2026-06-18
- Decision: Use Supabase as the backend.
- Reason: Supabase covers Auth, Postgres, Storage, Edge Functions, RLS, and server-side secrets in one platform.
- Alternatives considered: Firebase, custom backend, AWS Amplify.
- Status: Approved

## Decision 3

- Date: 2026-06-18
- Decision: Use RevenueCat for payments.
- Reason: RevenueCat simplifies iOS/Android subscriptions, one-time purchases, restore purchases, and entitlement management.
- Alternatives considered: Direct StoreKit and Google Play Billing, Stripe for web-only payments.
- Status: Approved

## Decision 4

- Date: 2026-06-18
- Decision: Use OpenAI for text and vision AI through backend functions.
- Reason: OpenAI supports chat, guided text generation, and vision-capable palm image interpretation while keeping secrets server-side.
- Alternatives considered: Other LLM providers, on-device models, no AI.
- Status: Approved

## Decision 5

- Date: 2026-06-18
- Decision: Include compatibility in MVP v1.
- Reason: Compatibility is a core requested product feature and monetization opportunity.
- Alternatives considered: Defer compatibility to v2.
- Status: Approved

## Decision 6

- Date: 2026-06-18
- Decision: Adopt a safety-first content policy.
- Reason: The product involves sensitive relationship, wellness, and prediction-adjacent topics. Safety rules reduce harm and review risk.
- Alternatives considered: Rely only on generic AI safety filters.
- Status: Approved

## Decision 7

- Date: 2026-06-18
- Decision: Complete documentation before production work.
- Reason: The first phase is explicitly documentation-only and should define product, architecture, safety, monetization, and QA before implementation.
- Alternatives considered: Scaffold app immediately.
- Status: Approved

## Decision 8

- Date: 2026-06-18
- Decision: Use positive-first content tone.
- Reason: Nova should feel uplifting, emotional, and safe, not fear-based or deterministic.
- Alternatives considered: Traditional horoscope warning tone.
- Status: Approved

## Decision 9

- Date: 2026-06-18
- Decision: Treat shareable daily cards as a core growth loop.
- Reason: Beautiful share cards support organic discovery and match the product's visual direction.
- Alternatives considered: Prioritize paid ads only or omit sharing from MVP.
- Status: Approved

## Decision 10

- Date: 2026-06-18
- Decision: Use Expo Router as recommended navigation layer.
- Reason: It fits Expo structure and uses React Navigation under the hood.
- Alternatives considered: Manual React Navigation setup.
- Status: Approved

## Decision 11

- Date: 2026-06-18
- Decision: Use NativeWind as MVP styling default and keep Tamagui as a later alternative.
- Reason: NativeWind supports fast tokenized styling for Expo; Tamagui can be revisited if component-system complexity grows.
- Alternatives considered: Tamagui first, plain StyleSheet only.
- Status: Approved

## Decision 12

- Date: 2026-06-18
- Decision: Use `react-native-view-shot` first for MVP share cards, with Skia as a future premium rendering path.
- Reason: View capture is simpler for MVP and supports Expo; Skia can improve advanced visual card generation later.
- Alternatives considered: Skia first, server-side image generation.
- Status: Approved

## Decision 13

- Date: 2026-06-18
- Decision: Approve Phase 1 documentation and allow Phase 2 project setup to begin.
- Reason: The Phase 1 documents define product scope, safety requirements, architecture direction, monetization assumptions, risks, and QA expectations clearly enough to start the app shell.
- Alternatives considered: Keep Phase 1 open until pricing, analytics, final brand name, visual reference, and astrology calculation details are finalized.
- Status: Approved

Phase 2 is limited to Expo TypeScript scaffolding, linting and formatting setup, Expo Router, base scripts, local startup instructions, and secret-free environment templates. It must not implement production auth, database logic, AI calls, payments, subscriptions, notifications, palm upload, or final production screens.

## Decision 14

- Date: 2026-06-19
- Decision: Start Phase 3 with the visible placeholder brand name "Nova", a full static route map, and focused UI dependencies for gradients and icons.
- Reason: The user approved Phase 3 design system and navigation work after Phase 2 setup. The screenshot reference requires gradients and consistent iconography, while the phase boundary still requires static placeholders only.
- Alternatives considered: Use "Astra" in the visible placeholder UI, create only core routes, install NativeWind now, or avoid all new UI dependencies.
- Status: Approved

Phase 3 is limited to design tokens, reusable base UI components, Expo Router navigation skeleton, setup-only static screens, and documentation alignment. It must not implement authentication, Supabase database logic, AI calls, payments, subscriptions, RevenueCat integration, notifications, palm upload, camera, image picker, image analysis, backend logic, migrations, secrets, or final production screens.

## Decision 15

- Date: 2026-06-27
- Decision: Start Phase 4 Auth And Onboarding using the approved Phase 1 documentation as the source of truth.
- Reason: The user explicitly approved Phase 4 implementation for real Supabase Auth, onboarding, cosmic profile validation, and private profile persistence with RLS after the Phase 3 shell work.
- Alternatives considered: Stop until a separate Phase 3 completion note is recorded, or keep onboarding as static placeholders.
- Status: Approved

Phase 4 is limited to Supabase Auth, sign up, sign in, sign out, session persistence, onboarding, cosmic profile validation, and profile/birth profile persistence with RLS. It must not implement AI calls, payments, subscriptions, RevenueCat integration, notifications, palm upload, camera, image picker, image analysis, analytics, real paywall behavior, or premium features.

## Decision 16

- Date: 2026-06-28
- Decision: Start Phase 5 Daily Card using the approved Phase 1 documentation and current main branch as the source of truth.
- Reason: The user explicitly approved Phase 5 implementation for authenticated, cached, personalized daily cards with saved history, safe AI generation through Supabase Edge Functions, and free/paid preview rules.
- Alternatives considered: Keep the Daily Card as a static placeholder, implement direct client-side AI calls, or bundle RevenueCat purchases into this phase.
- Status: Approved

Phase 5 is limited to the Daily Card screen, daily card persistence, saved daily card history, a safe entitlement abstraction that defaults to Free, and server-side daily card generation through Supabase Edge Functions. It must not implement weekly predictions, AI chat, palm reading, compatibility, notifications, RevenueCat purchases, real billing, or production paywall checkout.
