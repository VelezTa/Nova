# Decision Log

## Decision 1

- Date: 2026-06-18
- Decision: Use React Native, Expo, and TypeScript instead of Flutter.
- Reason: The requested stack is React Native + Expo + TypeScript and supports iOS and Android with fast iteration.
- Alternatives considered: Flutter, native Swift/Kotlin.
- Status: Proposed

## Decision 2

- Date: 2026-06-18
- Decision: Use Supabase as the backend.
- Reason: Supabase covers Auth, Postgres, Storage, Edge Functions, RLS, and server-side secrets in one platform.
- Alternatives considered: Firebase, custom backend, AWS Amplify.
- Status: Proposed

## Decision 3

- Date: 2026-06-18
- Decision: Use RevenueCat for payments.
- Reason: RevenueCat simplifies iOS/Android subscriptions, one-time purchases, restore purchases, and entitlement management.
- Alternatives considered: Direct StoreKit and Google Play Billing, Stripe for web-only payments.
- Status: Proposed

## Decision 4

- Date: 2026-06-18
- Decision: Use OpenAI for text and vision AI through backend functions.
- Reason: OpenAI supports chat, guided text generation, and vision-capable palm image interpretation while keeping secrets server-side.
- Alternatives considered: Other LLM providers, on-device models, no AI.
- Status: Proposed

## Decision 5

- Date: 2026-06-18
- Decision: Include compatibility in MVP v1.
- Reason: Compatibility is a core requested product feature and monetization opportunity.
- Alternatives considered: Defer compatibility to v2.
- Status: Proposed

## Decision 6

- Date: 2026-06-18
- Decision: Adopt a safety-first content policy.
- Reason: The product involves sensitive relationship, wellness, and prediction-adjacent topics. Safety rules reduce harm and review risk.
- Alternatives considered: Rely only on generic AI safety filters.
- Status: Proposed

## Decision 7

- Date: 2026-06-18
- Decision: Complete documentation before production work.
- Reason: The first phase is explicitly documentation-only and should define product, architecture, safety, monetization, and QA before implementation.
- Alternatives considered: Scaffold app immediately.
- Status: Proposed

## Decision 8

- Date: 2026-06-18
- Decision: Use positive-first content tone.
- Reason: Astra should feel uplifting, emotional, and safe, not fear-based or deterministic.
- Alternatives considered: Traditional horoscope warning tone.
- Status: Proposed

## Decision 9

- Date: 2026-06-18
- Decision: Treat shareable daily cards as a core growth loop.
- Reason: Beautiful share cards support organic discovery and match the product's visual direction.
- Alternatives considered: Prioritize paid ads only or omit sharing from MVP.
- Status: Proposed

## Decision 10

- Date: 2026-06-18
- Decision: Use Expo Router as recommended navigation layer.
- Reason: It fits Expo structure and uses React Navigation under the hood.
- Alternatives considered: Manual React Navigation setup.
- Status: Proposed

## Decision 11

- Date: 2026-06-18
- Decision: Use NativeWind as MVP styling default and keep Tamagui as a later alternative.
- Reason: NativeWind supports fast tokenized styling for Expo; Tamagui can be revisited if component-system complexity grows.
- Alternatives considered: Tamagui first, plain StyleSheet only.
- Status: Proposed

## Decision 12

- Date: 2026-06-18
- Decision: Use `react-native-view-shot` first for MVP share cards, with Skia as a future premium rendering path.
- Reason: View capture is simpler for MVP and supports Expo; Skia can improve advanced visual card generation later.
- Alternatives considered: Skia first, server-side image generation.
- Status: Proposed
