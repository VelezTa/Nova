# User Flows

## First App Open

1. User opens Astra.
2. App shows a polished cosmic welcome with brief value proposition.
3. User sees soft disclaimer that guidance is symbolic and for reflection.
4. User starts onboarding.
5. If user is returning and authenticated later, app routes to Home.

## Onboarding

1. User enters name.
2. User enters date of birth.
3. User enters birth time or selects "I do not know exact time".
4. If exact time is unknown, user selects approximate range.
5. User enters birth city and country.
6. User selects main interest: Love, Career, Money, Self-growth, Emotional clarity, Compatibility, or Daily guidance.
7. User optionally enters gender, pronouns, and relationship status.
8. User reviews profile summary.
9. App creates cosmic profile.

## Creating Cosmic Profile

1. App validates required fields.
2. App stores base profile and birth profile.
3. App creates a short, positive profile summary.
4. App avoids deterministic destiny claims.
5. App routes user to Home.

## Daily Card

1. User opens Home.
2. Daily card preview is visible.
3. User opens full daily card.
4. App shows word of the day, short message, number, color, energy, and advice.
5. User can save or share card.
6. If user is free and full detail is gated, app shows preview and contextual paywall.

## Sharing Daily Card

1. User taps share or save.
2. App renders the card as an image.
3. User selects Instagram Stories, Instagram Post, TikTok, WhatsApp, native share sheet, or save image.
4. Free users may see a watermark.
5. Paid users can share without watermark if entitlement allows.
6. App records a share event.

## Weekly Prediction

1. User taps weekly prediction from Home.
2. App shows a positive opening.
3. App shows general energy, love, work, money, wellness, advice, favorable day, word, and color.
4. Free users may see a preview.
5. Paid users see the full prediction.

## AI Chat

1. User opens AI chat.
2. App starts with a positive cosmic guide greeting.
3. User asks about an allowed topic.
4. App sends profile and relevant reading context through the backend.
5. AI responds with symbolic, reflective, safe language.
6. If user asks for forbidden content, AI redirects safely.
7. Chat and messages are saved if allowed by user settings and tier.

## Palm Reading Upload

1. User opens palm reading.
2. App explains photo requirements: clear lighting, open palm, no blur, full palm, avoid shadows, one hand at a time.
3. User captures or uploads left hand.
4. User captures or uploads right hand.
5. App confirms both images.
6. User submits for symbolic reading.
7. If gated, app shows preview or paywall before full result.

## Palm Reading Results

1. App shows a positive opening.
2. Reading covers visible features such as heart line, head line, life line, fate line, mounts, hand shape, personality reflection, emotional style, decision-making style, strengths, and growth areas.
3. Reading avoids medical claims and forbidden predictions.
4. User saves, shares if supported, or asks AI follow-up questions.

## Compatibility Setup

1. User opens Compatibility.
2. User enters Person A name, date of birth, birth time or approximate range, birth city, birth country, and optional photo/avatar.
3. User enters Person B with the same fields.
4. App validates required data.
5. User submits compatibility request.
6. If gated, app shows preview or paywall.

## Compatibility Results

1. App shows overall compatibility percentage.
2. App shows emotional connection, communication style, attraction, shared strengths, growth opportunities, what makes the connection beautiful, what they should care for, and positive advice.
3. App avoids claims about cheating, betrayal, danger, relationship failure, soulmate certainty, or required relationship decisions.
4. User saves or shares the result.

## Paywall

1. User reaches a gated feature, limit, or premium style.
2. App presents Plus and Pro options.
3. App clearly shows pricing placeholders, renewal terms, trial information if configured, restore purchases, terms, and privacy links.
4. User purchases, restores, dismisses, or chooses a one-time purchase.
5. App refreshes entitlements and unlocks access.

## Subscription Upgrade

1. User opens paywall from profile or feature gate.
2. User compares Free, Plus, and Pro.
3. User selects plan.
4. RevenueCat handles purchase.
5. App stores entitlement state and subscription status.

## My Space / Profile

1. User opens My Space.
2. App shows avatar/photo, name, birth information, saved daily cards, saved palm readings, saved compatibility readings, chat history, preferences, notification settings, subscription status, and account settings.
3. User edits allowed fields.
4. App saves changes with privacy-safe validation.

## Notifications

1. User sees notification permission prompt at a respectful moment.
2. User chooses daily card reminders and weekly prediction reminders.
3. App stores preferences and push token.
4. User can disable reminders from My Space.
5. Notifications use positive, non-alarming copy.

## Returning User Flow

1. User opens app.
2. App validates session.
3. App routes to Home.
4. Home shows current daily card, weekly shortcut, AI chat, palm reading, compatibility, and My Space.
5. App avoids forcing a paywall before users see value unless they choose a gated action.
