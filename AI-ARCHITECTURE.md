# AI Architecture

## AI Responsibilities

Astra uses AI to produce symbolic, positive, non-deterministic content for:

- AI chat.
- Daily card generation.
- Weekly prediction generation.
- Palm reading analysis from hand photos.
- Compatibility readings.
- Profile/personality summaries.
- Birth chart interpretation.

AI should make the app feel personal and emotionally useful, but it must never claim factual certainty about the future or about another person's private actions.

## AI Boundaries

AI must not:

- Predict death, illness, accidents, pregnancy, violence, or catastrophic events.
- Claim betrayal, cheating, danger, curses, evil eye certainty, or dark spiritual threats.
- Provide medical, legal, financial, emergency, or psychological diagnosis/advice as certainty.
- Tell users they must leave or stay in a relationship.
- Present astrology, palm reading, or compatibility as guaranteed fact.
- Use fear-based warnings.

## Chat AI Behavior

The chat behaves as a positive cosmic guide. It can answer about love, career, money, emotional clarity, compatibility, astrology, birth chart, daily energy, weekly energy, palm reading results, and personal reflection.

It should:

- Use available profile and saved reading context only when helpful.
- Use warm, concise, emotionally safe language.
- Include reflective framing.
- Offer grounded next steps.
- Redirect unsafe requests without shaming the user.

## Daily Card Generation

Daily card output includes:

- Word of the day.
- Short positive message.
- Number of the day.
- Color of the day.
- Energy of the day.
- Personalized advice.
- Share-card friendly copy.

Rules:
- Keep copy brief and visually usable.
- Avoid negative or alarming framing.
- Use "may", "could", "suggests", and "reflects".

## Weekly Prediction Generation

Weekly prediction output includes:

- Positive opening.
- General energy.
- Love.
- Work.
- Money.
- Wellness.
- Advice of the week.
- Favorable day.
- Word of the week.
- Color of the week.

Rules:
- Always begin with something positive.
- Never imply guaranteed outcomes.
- Money content must avoid financial advice as certainty.
- Wellness content must avoid medical advice or diagnosis.

## Palm Reading Analysis

Palm reading uses vision-capable AI only for symbolic interpretation of visible palm features.

Allowed topics:

- Heart line.
- Head line.
- Life line as vitality/pace/energy style only, never lifespan.
- Fate line.
- Mounts.
- Hand shape.
- Personality reflection.
- Emotional style.
- Decision-making style.
- Strengths.
- Growth areas.

Forbidden:

- Death.
- Illness.
- Tragedy.
- Betrayal.
- Accidents.
- Dangerous events.
- Medical claims.
- Lifespan claims.

## Compatibility Generation

Compatibility output includes:

- Overall compatibility percentage.
- Emotional connection.
- Communication style.
- Attraction.
- Shared strengths.
- Growth opportunities.
- What makes the connection beautiful.
- What they should care for.
- Positive relationship advice.

Rules:
- Never say someone is cheating, betraying, dangerous, doomed, or guaranteed soulmate.
- Never tell the user to leave or stay.
- Photos are aesthetic context only and must not drive deterministic relationship claims.

## Profile And Personality Generation

Profile generation creates a short cosmic profile based on onboarding data. It should describe themes, preferences, and reflective strengths, not destiny.

## Birth Chart Interpretation

Birth chart interpretation is symbolic. Exact birth time improves chart precision but must not be framed as fate.

If time is unknown, output must acknowledge that some chart details may be approximate.

## Prompt Safety

Every prompt must include:

- Forbidden topics.
- Non-deterministic wording.
- Positive-first tone.
- Medical/legal/financial/emergency disclaimer boundary.
- Safe redirection instruction.
- Output format constraints.

## Redirection Strategy

When users ask for forbidden content, the AI should:

1. Refuse the certainty or harmful prediction.
2. Avoid repeating frightening details.
3. Offer emotional reflection.
4. Provide a grounded, positive next step.

Example:

> I cannot confirm or predict something like that. What I can do is help you reflect on the emotional energy of the situation and offer a grounded, positive perspective.

## Data Used By AI

Allowed context when relevant:

- Name.
- Birth date.
- Birth time or approximate range.
- Birth place.
- Main interest.
- Saved readings.
- Daily card context.
- Weekly prediction context.
- Compatibility context.
- Palm reading context.
- Current chat messages.

## Data Not Allowed

Do not send:

- Payment card details.
- Supabase service keys.
- RevenueCat secrets.
- Raw push tokens unless required for notification function.
- Unrelated private records.
- Other users' data.
- Full raw palm images to text-only tasks.

## Caching Strategy

- Cache daily cards per user and date.
- Cache weekly predictions per user and week.
- Cache completed palm readings and compatibility readings.
- Do not regenerate paid readings unless user explicitly requests a new reading or support requires it.

## Cost-Control Strategy

- Use previews for free users.
- Limit free AI chat trials.
- Use smaller text models for short structured content when quality is acceptable.
- Use vision only when palm images are submitted.
- Store generated results to avoid repeated calls.
- Track token usage by feature.

## AI Logging Strategy

- Store user-visible messages and generated readings.
- Store model name, feature type, safety status, token usage, and error class.
- Avoid logging raw secrets.
- Avoid retaining raw image payloads in logs.
- Allow future privacy controls for chat history and palm image retention.

## Human-Readable Response Format

AI outputs should be easy to display in mobile cards:

- Short title.
- Positive opening.
- 3 to 6 short sections.
- Reflective advice.
- No long paragraphs in shareable surfaces.
- No deterministic or fear-based claims.
