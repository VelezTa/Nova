# Nova

Nova is the working name for a React Native, Expo, and TypeScript mobile app for positive astrology-inspired guidance, palm reading, daily predictions, AI chat, weekly predictions, and couple compatibility.

The product is positioned as a positive daily cosmic guide for self-knowledge, emotional clarity, astrology, palm reading, and relationship compatibility.

## Current Phase

Phase 2: Project setup.

Phase 1 documentation is approved. Phase 2 is limited to the Expo TypeScript app shell, Expo Router, base tooling, local startup instructions, and secret-free environment templates.

Do not build production app features until the relevant later phase is explicitly approved. Phase 2 must not implement authentication, Supabase database logic, AI calls, payments, subscriptions, notifications, palm upload, image analysis, or final production screens.

## Planned Tech Stack

- Mobile: React Native, Expo, TypeScript
- Platforms: iOS and Android
- Navigation: Expo Router, built on React Navigation
- Styling: NativeWind for MVP; Tamagui remains a later alternative
- Backend: Supabase Auth, Postgres, Storage, Edge Functions
- AI: OpenAI text and vision-capable models through Supabase Edge Functions
- Payments: RevenueCat
- Push: Expo Notifications
- Sharing: Expo Sharing, Media Library, FileSystem, and `react-native-view-shot`
- Analytics: PostHog, Amplitude, or Firebase Analytics
- Error tracking: Sentry

## Documentation Index

- `AGENTS.md` - instructions for future agents
- `PRD.md` - product requirements
- `MVP-SCOPE.md` - v1 scope and exclusions
- `USER-FLOWS.md` - step-by-step user journeys
- `PLAN.md` - phased implementation plan
- `ARCHITECTURE-OVERVIEW.md` - system architecture
- `DATA-MODEL.md` - proposed Supabase data model
- `AI-ARCHITECTURE.md` - AI responsibilities, boundaries, data use, and cost controls
- `SAFETY-GUIDELINES.md` - content safety policy
- `DESIGN-SYSTEM.md` - visual system and UI direction
- `MONETIZATION.md` - free, Plus, Pro, and one-time purchase strategy
- `RESEARCH-NOTES.md` - reviewed sources and recommendations
- `DECISION-LOG.md` - decision records
- `FEATURE-SPECIFICATIONS.md` - feature-level requirements and acceptance criteria
- `PAYWALL-SPEC.md` - paywall rules and subscription UX
- `PROMPT-SYSTEM.md` - initial AI prompt strategy
- `TECHNICAL-RISKS.md` - risks and mitigations
- `ROADMAP.md` - v1 through future roadmap
- `QA-CHECKLIST.md` - product, safety, platform, and release QA

## Safety Policy Summary

Nova offers symbolic, astrology-inspired guidance for reflection and entertainment. It does not provide medical, legal, financial, or emergency advice.

All generated content must be positive, reflective, non-deterministic, and emotionally safe. The app must never predict or imply death, illness, betrayal certainty, infidelity certainty, pregnancy outcomes, curses, accidents, violence, diagnosis, dangerous events, or fear-based warnings.

## How To Use This Repo

1. Review the documentation before implementation.
2. Resolve any open question that directly affects the next implementation phase.
3. Treat deferred product, pricing, analytics, branding, visual reference, and astrology-depth questions in `RESEARCH-NOTES.md` as non-blocking for Phase 2 setup unless they affect the app shell.
4. Phase 1 documentation is approved for Phase 2 project setup.
5. Start Phase 2 by creating the Expo TypeScript project only within the setup boundaries in `PLAN.md`.
6. Build one phase at a time using `PLAN.md` and verify using `QA-CHECKLIST.md`.

## Local Development

Install dependencies:

```sh
npm install
```

Start the Expo dev server:

```sh
npm run start
```

Run on a local platform target when available:

```sh
npm run ios
npm run android
npm run web
```

Verify the setup:

```sh
npm run typecheck
npm run lint
```

Environment variables are documented in `.env.example`. Copy it to `.env` only for local placeholder configuration, and do not commit real secrets.

## Important Notes

- "Nova" is a working name and may change.
- The current design direction is based on written visual requirements because the reference image is pending.
- No production app code should exist in this repository during Phase 1.
- Compatibility is included in MVP v1.
- Shareable daily cards are a core growth loop.
