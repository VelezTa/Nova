# Research Notes

Research was used to inform documentation, architecture, and recommendations only. No code was copied from public repositories.

## Repositories Reviewed

### Expo Examples

Link: https://github.com/expo/examples

Useful because:
- Shows current Expo example patterns.
- Includes examples for camera, OpenAI, router, Sentry, Skia, and other integrations.
- Good reference for future implementation structure.

Limitations:
- Examples are general-purpose and should not define Nova product architecture by themselves.

### Supabase Expo User Management

Link: https://github.com/supabase/supabase/tree/master/examples/user-management/expo-user-management

Useful because:
- Demonstrates React Native/Expo auth patterns with Supabase.
- Reinforces use of Supabase client, AsyncStorage, and mobile session handling.

Limitations:
- User-management example is not an Nova architecture.
- Requires safety, RLS, storage, and AI patterns specific to this app.

### RevenueCat React Native Purchases

Link: https://github.com/RevenueCat/react-native-purchases

Useful because:
- Official SDK source and examples for React Native purchases.
- Supports iOS and Android subscription and purchase flows.

Limitations:
- Product and entitlement strategy still needs Nova-specific design.

### react-native-view-shot

Link: https://github.com/gre/react-native-view-shot

Useful because:
- Captures React Native views as images.
- Good MVP candidate for daily cards and compatibility share cards.
- Supports Expo installation.

Limitations:
- Pixel-perfect results may vary by platform.
- Complex visual rendering may need Skia later.

## Libraries Reviewed

### Expo Router

Link: https://docs.expo.dev/router/introduction/

Pros:
- Fits Expo apps.
- File-based routing.
- Built on React Navigation.

Cons:
- Requires route conventions to be established early.

Recommendation:
- Use Expo Router for MVP.

### Expo Camera

Link: https://docs.expo.dev/versions/latest/sdk/camera/

Pros:
- Official Expo camera access.
- Required for palm capture.

Cons:
- Needs clear permission copy and platform QA.

Recommendation:
- Use for palm photo capture.

### Expo Image Picker

Link: https://docs.expo.dev/versions/latest/sdk/imagepicker/

Pros:
- Supports selecting images and taking photos.
- Official Expo module.

Cons:
- Platform permission behavior must be tested.

Recommendation:
- Use for palm upload and optional profile/couple visuals.

### Expo Sharing

Link: https://docs.expo.dev/versions/latest/sdk/sharing/

Pros:
- Native share sheet support.
- Simple MVP sharing path.

Cons:
- Direct Instagram/TikTok flows may still rely on OS share behavior and saved media.

Recommendation:
- Use native sharing plus save-to-image support.

### Expo Notifications

Link: https://docs.expo.dev/versions/latest/sdk/notifications/

Pros:
- Official Expo push notification support.
- Fits daily and weekly reminders.

Cons:
- Needs careful permission timing and platform setup.

Recommendation:
- Use for MVP reminders.

### Supabase Auth, Storage, Edge Functions, RLS

Links:
- https://supabase.com/docs/guides/auth/quickstarts/react-native
- https://supabase.com/docs/guides/storage
- https://supabase.com/docs/guides/functions
- https://supabase.com/docs/guides/database/postgres/row-level-security

Pros:
- One backend platform for auth, database, storage, and functions.
- Edge Functions are appropriate for OpenAI calls and secrets.
- RLS supports user-owned privacy.

Cons:
- RLS and storage policies must be designed carefully.
- Edge Function cold starts and AI cost need monitoring.

Recommendation:
- Use Supabase for MVP backend.

### RevenueCat

Links:
- https://www.revenuecat.com/docs/getting-started/installation/reactnative
- https://www.revenuecat.com/docs/getting-started/entitlements

Pros:
- Cross-platform entitlement management.
- Handles subscriptions and one-time purchases.
- Simplifies restore purchases.

Cons:
- Store products still need App Store Connect and Google Play setup.

Recommendation:
- Use RevenueCat for all paid access.

### OpenAI Text And Vision

Links:
- https://developers.openai.com/api/docs/guides/text
- https://developers.openai.com/api/docs/guides/images-vision
- https://developers.openai.com/api/docs/guides/safety-best-practices
- https://developers.openai.com/api/docs/guides/prompt-engineering

Pros:
- Supports chat, structured text generation, and vision analysis.
- Fits AI guide and palm reading needs.

Cons:
- Requires strong safety prompts, server-side controls, cost monitoring, and refusal handling.

Recommendation:
- Use OpenAI through Supabase Edge Functions only.

### Astrology Calculation Candidates

Links:
- astronomia: https://github.com/commenthol/astronomia
- Swiss Ephemeris: https://www.astro.com/swisseph/swephinfo_e.htm
- Astronomy Engine: https://github.com/cosinekitty/astronomy

Pros:
- `astronomia` and Astronomy Engine are useful astronomy calculation references.
- Swiss Ephemeris is a serious astrology/ephemeris option.

Cons:
- Astrology-specific house systems, birth chart rendering, licensing, and mobile compatibility need deeper review.
- APIs may be faster for MVP but add vendor dependency and privacy review.

Recommendation:
- Keep astrology calculation library/API selection as an implementation decision before Phase 6 or birth chart work.

## Tools Reviewed

### App Store Subscriptions

Link: https://developer.apple.com/app-store/subscriptions/

Useful because:
- Defines subscription presentation, grouping, restore, terms, and price clarity requirements.

### Google Play Billing Subscriptions

Link: https://developer.android.com/google/play/billing/subscriptions

Useful because:
- Defines Android subscription configuration expectations.

## Recommended Packages

Future implementation candidates:

- `expo`
- `expo-router`
- `typescript`
- `nativewind`
- `@supabase/supabase-js`
- `@react-native-async-storage/async-storage`
- `react-native-url-polyfill`
- `expo-camera`
- `expo-image-picker`
- `expo-file-system`
- `expo-sharing`
- `expo-media-library`
- `expo-notifications`
- `react-native-view-shot`
- `react-native-purchases`
- `sentry-expo` or current Sentry Expo package
- Analytics SDK selected after product decision

## Rejected Packages

None permanently rejected in Phase 1.

Do not adopt:
- Any library with unclear licensing for astrology calculations.
- Any AI client pattern that exposes OpenAI keys in the mobile app.
- Any payment implementation that bypasses App Store or Google Play rules for digital content.

## Useful Implementation Patterns

- Backend-for-frontend Edge Functions for AI calls.
- RLS on every user-owned table.
- Private buckets for palm images.
- Cached daily and weekly readings.
- RevenueCat entitlements as source of access truth.
- Preview-to-paywall flows for palm and compatibility.
- View capture for shareable cards.
- Safety prompts plus output validation.

## Open Questions

### Deferred, Not Blocking Phase 2 Setup

- Which analytics provider should be selected: PostHog, Amplitude, or Firebase Analytics?
- Which astrology calculation approach should be used for birth chart depth: library, API, or hybrid?
- Should Plus include one full palm reading per billing period or unlimited basic palm readings?
- What final price points should be used for Plus, Pro, and one-time purchases?
- What is the final brand name if Nova changes?

### Blocks Later Design Or Product Phases

- The reference image must still be reviewed and incorporated into `DESIGN-SYSTEM.md` before final visual design implementation.
