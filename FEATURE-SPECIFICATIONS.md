# Feature Specifications

## Onboarding

Purpose: Collect required personalization data and introduce Astra as a safe symbolic guidance app.

User story: As a new user, I want to enter my birth and interest details so Astra can personalize my experience.

Inputs:
- Name.
- Date of birth.
- Birth time or approximate time range.
- Birth city.
- Birth country.
- Main interest.
- Optional gender, pronouns, relationship status.

Outputs:
- Completed onboarding state.
- Profile record.
- Birth profile record.
- Short cosmic profile summary.

UI requirements:
- Simple, magical, elegant, premium, and easy to complete.
- One clear task per step.
- Use soft celestial visuals.
- Include symbolic guidance disclaimer.

Data requirements:
- Store profile and birth profile privately.
- Track birth time accuracy.

AI requirements:
- Optional profile summary must be positive and non-deterministic.

Safety requirements:
- Do not describe destiny, guaranteed outcomes, or fixed personality limitations.

Acceptance criteria:
- User can complete onboarding with required fields.
- Unknown exact birth time path works.
- Main interest values match the approved list.
- Profile is created without unsafe claims.

## Cosmic Profile

Purpose: Represent the user's personalization foundation.

User story: As a user, I want a profile that reflects my cosmic starting point without making hard predictions.

Inputs:
- Onboarding profile fields.
- Birth profile.
- Main interest.

Outputs:
- Cosmic profile summary.
- Personalization context for future features.

UI requirements:
- Display name, birth details, main interest, and short summary.
- Make editing possible later through My Space.

Data requirements:
- `profiles` and `birth_profiles`.

AI requirements:
- Generate only reflective strengths and themes.

Safety requirements:
- No fate, diagnosis, or guaranteed future claims.

Acceptance criteria:
- Profile appears after onboarding.
- Summary uses symbolic language.
- Birth time approximation is visible when relevant.

## Home

Purpose: Give users a beautiful daily hub for core actions.

User story: As a returning user, I want to quickly access today's guidance and major features.

Inputs:
- Profile.
- Daily card state.
- Weekly prediction state.
- Subscription status.
- Saved reading availability.

Outputs:
- Personalized greeting.
- Daily card preview.
- Shortcuts to weekly prediction, AI chat, palm reading, compatibility, and My Space.
- Energy categories: Love, Money, Work, Wellness.

UI requirements:
- Heavily inspired by the written cosmic reference.
- Dark cosmic background, glowing cards, gold accents, soft stars and particles.
- Avoid clutter and excessive text.

Data requirements:
- Pull lightweight summary data only.

AI requirements:
- None directly unless generating missing daily card through approved backend flow.

Safety requirements:
- No alarming teaser copy.

Acceptance criteria:
- Home presents all MVP shortcuts.
- Copy is positive and concise.
- Free users can see value before paywall.

## Daily Card

Purpose: Provide a daily positive guidance card and core share loop.

User story: As a user, I want a beautiful daily card that gives me a positive theme and is worth sharing.

Inputs:
- User profile.
- Birth profile.
- Main interest.
- Current date.

Outputs:
- Word of the day.
- Short positive message.
- Number of the day.
- Color of the day.
- Energy of the day.
- Personalized advice.
- Share image.

UI requirements:
- Visual-first.
- Beautiful enough for Instagram Stories and posts.
- Minimal text.
- Save and share actions visible.

Data requirements:
- `daily_cards`.
- `share_events` when shared.

AI requirements:
- Generate or enrich daily content through backend only.
- Cache per user per day.

Safety requirements:
- No deterministic outcomes.
- No fear-based language.
- No financial or wellness certainty.

Acceptance criteria:
- Daily card includes all required fields.
- Shareable image can be generated.
- Free/paid watermark rules are enforceable.

## Weekly Prediction

Purpose: Offer a positive weekly reflection across life categories.

User story: As a user, I want a weekly reading that helps me reflect on love, work, money, and wellness.

Inputs:
- Profile.
- Birth profile.
- Main interest.
- Week start date.

Outputs:
- General energy.
- Love.
- Work.
- Money.
- Wellness.
- Advice of the week.
- Favorable day.
- Word of the week.
- Color of the week.

UI requirements:
- Calm premium reading layout.
- Category cards for scanability.
- Preview state for free users.

Data requirements:
- `weekly_predictions`.

AI requirements:
- Generate through backend only.
- Cache per user per week.

Safety requirements:
- Must begin positively.
- No fear-based or deterministic predictions.
- Money is not financial advice.
- Wellness is not medical advice.

Acceptance criteria:
- All sections render.
- Unsafe content tests pass.
- Paywall preview/full state works.

## AI Chat

Purpose: Provide a positive cosmic guide for reflective questions.

User story: As a user, I want to ask questions about love, career, money, emotional clarity, astrology, compatibility, and readings safely.

Inputs:
- User message.
- Profile context.
- Birth profile.
- Saved readings when relevant.
- Daily, weekly, compatibility, and palm contexts when relevant.

Outputs:
- Assistant message.
- Safe redirect when needed.
- Saved chat history if enabled.

UI requirements:
- Warm chat interface.
- Suggested prompts for allowed topics.
- Clear loading state.
- Paywall when free limit is reached.

Data requirements:
- `ai_chats`.
- `ai_messages`.
- `user_preferences`.

AI requirements:
- Use global system prompt.
- Apply unsafe request redirection.
- Use context sparingly and transparently.

Safety requirements:
- No death, betrayal certainty, infidelity certainty, illness, pregnancy prediction, diagnosis, legal/financial certainty, curses, danger claims, or paranoia.

Acceptance criteria:
- Allowed prompts get helpful responses.
- Forbidden prompts redirect safely.
- No client-side OpenAI key exists.

## Palm Reading

Purpose: Provide symbolic palm reading from left and right hand photos.

User story: As a user, I want to upload both palms and receive a positive symbolic reading.

Inputs:
- Left hand image.
- Right hand image.
- User profile context.

Outputs:
- Heart line interpretation.
- Head line interpretation.
- Life line as energy rhythm only.
- Fate line if visible.
- Mounts if visible.
- Hand shape if visible.
- Personality reflection.
- Emotional style.
- Decision-making style.
- Strengths.
- Growth areas.

UI requirements:
- Clear photo instructions.
- Capture/upload for one hand at a time.
- Progress and retry states.
- Preview and full result states if gated.

Data requirements:
- `palm_readings`.
- `palm_reading_images`.
- Private Storage paths.

AI requirements:
- Vision-capable model through backend only.
- Ask for better image if quality is insufficient.

Safety requirements:
- Never associate palm lines with death, illness, tragedy, betrayal, accidents, dangerous events, medical claims, or lifespan.

Acceptance criteria:
- Both hand images are required.
- Private storage is used.
- Reading passes palm safety checks.

## Compatibility

Purpose: Provide safe reflective couple compatibility.

User story: As a user, I want to compare two people's profiles and receive positive relationship insight.

Inputs:
- Person A name, date of birth, birth time or range, city, country, optional photo/avatar.
- Person B name, date of birth, birth time or range, city, country, optional photo/avatar.

Outputs:
- Overall compatibility percentage.
- Emotional connection.
- Communication style.
- Attraction.
- Shared strengths.
- Growth opportunities.
- What makes the connection beautiful.
- What they should care for.
- Positive advice.

UI requirements:
- Two-person setup flow.
- Premium result card.
- Save and share actions.
- Preview/full paywall pattern.

Data requirements:
- `compatibility_readings`.
- `compatibility_people`.

AI requirements:
- Generate through backend only.
- Photos can personalize visuals but not claims.

Safety requirements:
- Never say they will betray, are cheating, relationship will fail, person is dangerous, soulmate certainty, must leave, or must stay.

Acceptance criteria:
- Compatibility is included in MVP.
- All required sections render.
- Forbidden relationship claims are absent.

## My Space

Purpose: Give users control over profile, saved content, settings, and subscription.

User story: As a user, I want one place to review saved readings and manage my account.

Inputs:
- User profile.
- Saved daily cards.
- Saved palm readings.
- Saved compatibility readings.
- Chat history.
- Preferences.
- Subscription state.

Outputs:
- Profile area.
- Saved history lists.
- Settings and account controls.

UI requirements:
- Calm premium profile area.
- Clear sections.
- Avoid clutter.

Data requirements:
- Profile, readings, chats, preferences, subscriptions, purchases.

AI requirements:
- None directly.

Safety requirements:
- Avoid exposing sensitive reading details in notifications or previews without user action.

Acceptance criteria:
- User can access saved content.
- Subscription status is visible.
- Preferences are editable.

## Sharing

Purpose: Turn daily and relationship content into organic growth assets.

User story: As a user, I want to share beautiful cosmic cards on social platforms.

Inputs:
- Daily card or compatible shareable content.
- Entitlement state.
- Selected destination.

Outputs:
- Exported image.
- Native share action.
- Saved image.
- Share event.

UI requirements:
- Support Instagram Story, Instagram Post, TikTok-friendly vertical, WhatsApp/native share, and save image.
- Make share action obvious.

Data requirements:
- `share_events`.
- Optional generated image URL.

AI requirements:
- None after content is generated.

Safety requirements:
- Share cards must not include unsafe predictions or private sensitive details.

Acceptance criteria:
- Card image exports at target ratios.
- Watermark rules work.
- Share events are recorded.

## Notifications

Purpose: Support retention with positive reminders.

User story: As a user, I want gentle reminders for my daily card and weekly guidance.

Inputs:
- Notification permission.
- Preferred time.
- Daily/weekly toggles.
- Push token.

Outputs:
- Scheduled reminders.
- Notification history.

UI requirements:
- Ask permission after value is shown.
- Settings available in My Space.

Data requirements:
- `notifications`.
- `user_preferences`.

AI requirements:
- None for MVP notification copy unless future dynamic copy is approved.

Safety requirements:
- No alarming, urgent, or fear-based notification copy.

Acceptance criteria:
- Users can enable and disable reminders.
- Notification copy is positive.
- Preferences persist.

## Paywall

Purpose: Convert users ethically to Plus, Pro, or one-time purchases.

User story: As a user, I want to understand what I get before paying and restore purchases if needed.

Inputs:
- Feature gate.
- RevenueCat offerings.
- Current entitlement state.

Outputs:
- Plus and Pro options.
- One-time purchase option where relevant.
- Restore purchase action.
- Updated entitlement state.

UI requirements:
- Premium visual style.
- Clear pricing placeholders until configured.
- Clear plan benefits.
- Legal copy placeholders.

Data requirements:
- `subscriptions`.
- `purchases`.

AI requirements:
- None directly.

Safety requirements:
- Do not use fear to sell.
- Do not imply paid tiers provide guaranteed predictions.

Acceptance criteria:
- Paywall trigger points match docs.
- Restore purchases is visible.
- Store compliance copy is present.
