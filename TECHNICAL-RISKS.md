# Technical Risks

## AI Cost Risks

Risk: Chat, weekly predictions, compatibility, and readings can become expensive.

Mitigation:
- Cache daily and weekly outputs.
- Limit free AI usage.
- Track token usage by feature.
- Use shorter outputs for mobile surfaces.
- Use previews before paid unlock.

## Vision AI Cost Risks

Risk: Palm image analysis is more expensive than text generation.

Mitigation:
- Require both hand images before calling vision.
- Compress images before upload and analysis.
- Generate preview/full result in one call where possible.
- Limit repeated regeneration.

## App Store Review Risks

Risk: Prediction, subscription, and AI claims may be scrutinized.

Mitigation:
- Use entertainment/reflection disclaimer.
- Avoid deterministic claims.
- Present subscription pricing, restore purchases, terms, and privacy clearly.
- Avoid fear-based monetization.

## Google Play Review Risks

Risk: Subscription terms, user-generated content, and sensitive claims may trigger review issues.

Mitigation:
- Match in-app paywall copy to Play Console products.
- Keep safety policy visible.
- Provide report/support path if needed.

## User Safety Risks

Risk: AI could produce scary, deterministic, or paranoid content.

Mitigation:
- Strong system prompts.
- Forbidden topic rules.
- Output safety checks.
- Redirection templates.
- QA with adversarial prompts.

## Payment Integration Risks

Risk: Entitlement mismatch between RevenueCat and app state.

Mitigation:
- Treat RevenueCat customer info as source of truth.
- Store Supabase subscription snapshots only as cache.
- Test restore, upgrade, downgrade, cancellation, and one-time purchase flows.

## Supabase Security Risks

Risk: RLS or storage policy mistakes expose private data.

Mitigation:
- RLS on all user-owned tables.
- Private buckets for palm images.
- Short-lived signed URLs.
- No service-role key in client.
- Security review before release.

## Image Privacy Risks

Risk: Palm and profile images are sensitive.

Mitigation:
- Use private storage.
- Allow deletion policy.
- Do not log raw image payloads.
- Explain photo usage clearly.

## Astrology Calculation Risks

Risk: Birth chart calculations may be inaccurate if time zones, coordinates, or house systems are mishandled.

Mitigation:
- Review library/API licensing and accuracy.
- Store birth time accuracy.
- Acknowledge approximate birth time.
- Avoid overclaiming precision.

## Notification Spam Risks

Risk: Daily reminders could feel intrusive.

Mitigation:
- Ask permission at respectful moment.
- Provide frequency controls.
- Keep copy positive and short.
- Make opt-out easy.

## Content Quality Risks

Risk: AI content may feel generic.

Mitigation:
- Use profile, interest, and saved context.
- Keep prompts feature-specific.
- QA sample outputs.
- Cache and review generated content patterns.

## Scalability Risks

Risk: AI generation, storage, and database reads may become expensive as usage grows.

Mitigation:
- Cache generated readings.
- Use indexes on user/date/status fields.
- Keep large media in Storage, not Postgres.
- Monitor Edge Function latency and errors.
