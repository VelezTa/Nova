# MVP Scope

## MVP v1 Definition

MVP v1 is a polished, safe, monetizable mobile app that lets users create a cosmic profile, receive daily and weekly guidance, ask a safe AI guide questions, complete symbolic palm readings, create compatibility readings, save results, receive reminders, and upgrade through subscriptions or one-time purchases.

## Included v1 Features

- React Native, Expo, TypeScript iOS and Android app.
- Onboarding for name, date of birth, birth time, approximate birth time range, birth city, birth country, main interest, and optional gender, pronouns, relationship status.
- Personalized cosmic profile.
- Home screen with personalized greeting, daily card preview, weekly prediction shortcut, AI chat shortcut, palm reading shortcut, compatibility shortcut, energy categories, My Space shortcut, and soft celestial effects.
- Daily card with word, message, number, color, energy, advice, save, and share.
- Weekly prediction with general energy, love, work, money, wellness, advice, favorable day, word, and color.
- AI chat for approved astrology, reflection, compatibility, palm reading, daily energy, weekly energy, career, money, love, and emotional clarity topics.
- Palm reading upload or capture for left and right hand.
- Compatibility feature for two people, including optional photo or avatar.
- My Space/Profile with saved cards, readings, chat history, preferences, notifications, subscription status, and account settings.
- Free, Plus, Pro, and one-time purchase monetization.
- RevenueCat entitlement model.
- Expo Notifications for daily and weekly reminders.
- Shareable image/card generation and native sharing.

Compatibility is included in MVP v1 and must not be deferred.

## Excluded v1 Features

- Social network feeds.
- Live astrologer marketplace.
- Human chat support.
- Real-time voice AI.
- Video readings.
- Complex ritual engine.
- Streak economy beyond basic reminders.
- Multi-language support unless explicitly approved.
- Apple Watch, widgets, or home-screen widgets.
- Web app.
- Admin dashboard beyond backend provider dashboards.

## Deferred v2 Features

- Advanced birth chart wheel visuals.
- Deeper compatibility reports.
- Rituals and guided reflections.
- Streaks and habit loops.
- Premium card packs.
- Advanced reminders.
- More visual card styles.
- Deeper personalization using saved history.
- More detailed astrology calculations.

## Features Intentionally Not Included

- Fear-based warnings.
- Deterministic future predictions.
- Medical, psychological, legal, financial, emergency, or diagnostic advice.
- "Partner is cheating" or betrayal certainty.
- Pregnancy prediction.
- Claims about curses or dark spiritual threats.
- Photo-based judgments about trust, danger, or private behavior.

## Technical Shortcuts Allowed

- Use generated/scheduled content templates plus AI enrichment as long as safety rules are enforced.
- Use city/country text fields before full geocoding if implementation time is constrained.
- Use daily/weekly caching to control AI cost.
- Use `react-native-view-shot` for MVP share cards before investing in Skia.
- Use simple RevenueCat entitlement checks before complex experimentation.
- Use Supabase Edge Functions for AI orchestration without a separate backend service.

## Technical Shortcuts Not Allowed

- No client-side OpenAI secret.
- No client-side service-role Supabase key.
- No public bucket for private palm images.
- No payment UI that implies active billing before RevenueCat is configured.
- No AI output without safety prompts and server-side validation.
- No deterministic claims in fallback/mock content.
- No production feature build before Phase 1 documentation approval.

## Launch Readiness Definition

MVP v1 is launch-ready when:

- Core flows work on iOS and Android.
- Auth, profile, readings, purchases, sharing, notifications, and saved history are verified.
- Safety test prompts do not produce forbidden claims.
- Palm images are private and deletable.
- Paywall copy includes clear terms, restore purchase, privacy policy, and terms placeholders.
- App Store and Google Play subscription requirements are met.
- QA checklist passes for onboarding, daily card, weekly prediction, AI chat, palm reading, compatibility, paywall, sharing, notifications, profile, accessibility, performance, and error states.
