# Implementation Plan

## Phase 1 - Documentation

Goal: Create the full planning and safety documentation before production starts.

Tasks:
- Research relevant public docs, examples, libraries, and architecture patterns.
- Create required root Markdown documents.
- Define MVP scope, safety rules, data model, AI prompt strategy, monetization, risks, and QA.

Deliverables:
- All Phase 1 Markdown documentation files.
- Research notes with source links.
- Initial decision log.

Acceptance criteria:
- All required files exist.
- No production app code exists.
- Safety rules appear in AI, prompt, feature, and safety docs.
- Compatibility is included in MVP v1.

## Phase 2 - Project Setup

Goal: Create the Expo TypeScript project after docs are approved.

Tasks:
- Scaffold Expo app with TypeScript.
- Configure linting, formatting, path aliases, and base scripts.
- Add Expo Router.
- Add initial environment variable template without secrets.

Deliverables:
- Running Expo app shell.
- iOS and Android local startup instructions.

Acceptance criteria:
- App starts locally.
- TypeScript check passes.
- No production features are implemented yet.

## Phase 3 - Design System And Navigation

Goal: Establish the premium cosmic UI foundation and navigation shell.

Tasks:
- Implement color tokens, typography scale, spacing, card styles, buttons, and icon rules.
- Create navigation routes for onboarding, tabs, feature stacks, paywall, and profile.
- Add non-final placeholder states only where required for navigation.

Deliverables:
- Design token implementation.
- Navigation skeleton.

Acceptance criteria:
- Design matches `DESIGN-SYSTEM.md`.
- Placeholder screens are clearly temporary and not final production screens.
- iOS and Android navigation smoke tests pass.

## Phase 4 - Auth And Onboarding

Goal: Let users create accounts and complete cosmic profile onboarding.

Tasks:
- Configure Supabase Auth.
- Implement onboarding fields and validation.
- Store profile and birth profile data with RLS.

Deliverables:
- Auth flow.
- Onboarding flow.
- Cosmic profile persistence.

Acceptance criteria:
- Users can sign up, sign in, sign out, and complete onboarding.
- Exact and approximate birth time are handled.
- Profile data is private to the authenticated user.

## Phase 5 - Daily Card

Goal: Provide a personalized daily card and save/share foundation.

Tasks:
- Generate or retrieve daily card content.
- Display daily word, message, number, color, energy, and advice.
- Save daily cards to user history.

Deliverables:
- Daily card screen.
- Saved daily cards.

Acceptance criteria:
- Daily card starts with positive language.
- Content is non-deterministic and safe.
- Free and paid behavior follows monetization docs.

## Phase 6 - Weekly Prediction

Goal: Provide safe weekly guidance across categories.

Tasks:
- Generate weekly prediction content.
- Include general energy, love, work, money, wellness, advice, favorable day, word, and color.
- Cache weekly predictions.

Deliverables:
- Weekly prediction screen.
- Weekly prediction records.

Acceptance criteria:
- Weekly prediction begins positively.
- No fear-based or deterministic claims appear.
- Paid gating matches paywall docs.

## Phase 7 - AI Chat

Goal: Build a safe positive cosmic guide.

Tasks:
- Create Supabase Edge Function for AI chat orchestration.
- Include safe context from profile and saved readings.
- Apply system prompt and unsafe request redirection.
- Persist chats and messages.

Deliverables:
- AI chat UI.
- AI function.
- Chat history.

Acceptance criteria:
- No OpenAI secret is exposed to the client.
- Forbidden prompts redirect safely.
- Context use is relevant and privacy-aware.

## Phase 8 - Palm Reading Upload

Goal: Allow safe left and right hand image capture/upload and symbolic reading.

Tasks:
- Implement camera and image picker permissions.
- Upload images to private Supabase Storage.
- Call vision-capable AI through Edge Function.
- Store reading output and image metadata.

Deliverables:
- Palm upload flow.
- Palm result screen.
- Private image storage.

Acceptance criteria:
- Both hands can be uploaded or captured.
- Reading avoids death, illness, tragedy, accidents, and medical claims.
- Images are private and linked to the user.

## Phase 9 - Compatibility

Goal: Build the MVP couple compatibility feature.

Tasks:
- Collect Person A and Person B birth data and optional visuals.
- Generate compatibility percentage and sections.
- Save compatibility result.

Deliverables:
- Compatibility setup flow.
- Compatibility result screen.
- Saved compatibility records.

Acceptance criteria:
- Result includes all requested sections.
- No cheating, betrayal, doom, danger, or required relationship decisions.
- Photos are aesthetic only and never used for deterministic claims.

## Phase 10 - Paywall And RevenueCat

Goal: Enable subscriptions, one-time purchases, and restore purchases.

Tasks:
- Configure RevenueCat products and entitlements.
- Implement paywall trigger points.
- Add restore purchase and subscription management links.

Deliverables:
- Paywall screens.
- Entitlement checks.
- Purchase and restore flows.

Acceptance criteria:
- Plus, Pro, and one-time purchase access matches docs.
- Store compliance copy is visible.
- Restore purchases works on iOS and Android.

## Phase 11 - Sharing

Goal: Make daily and compatibility cards shareable.

Tasks:
- Generate shareable card images.
- Support native share sheet, Instagram-oriented exports, WhatsApp, TikTok-friendly image saving, and save as image.
- Track share events.

Deliverables:
- Share card renderer.
- Native share flow.
- Share event logging.

Acceptance criteria:
- Cards export at target aspect ratios.
- Watermark behavior follows tier rules.
- Sharing works on iOS and Android.

## Phase 12 - Notifications

Goal: Add daily and weekly engagement reminders.

Tasks:
- Request notification permissions.
- Store notification preferences.
- Schedule daily card and weekly prediction reminders.

Deliverables:
- Notification settings.
- Push token storage.
- Reminder scheduling.

Acceptance criteria:
- Users can opt in and opt out.
- Notification copy is positive and not alarming.
- No notification spam.

## Phase 13 - QA And Release Prep

Goal: Prepare MVP for TestFlight, internal Android testing, and store review.

Tasks:
- Run full QA checklist.
- Verify safety prompts and forbidden content tests.
- Verify subscriptions and restore purchases in sandbox.
- Verify privacy, terms, and disclaimers.
- Prepare store metadata assumptions.

Deliverables:
- QA report.
- Release candidate.
- Store readiness checklist.

Acceptance criteria:
- iOS and Android critical flows pass.
- No launch blocker remains.
- Safety policy is enforced in generated and fallback content.
