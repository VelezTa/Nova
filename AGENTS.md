# AGENTS.md

## Project Overview

Nova is the working name for a cross-platform mobile app for positive astrology-inspired guidance, palm reading, daily and weekly predictions, AI conversations, and couple compatibility.

The product is for entertainment, reflection, personal wellness, symbolic guidance, emotional clarity, and daily inspiration. It must never present predictions as guaranteed facts.

## Current Phase

Phase 1 is documentation only.

Future agents must not build production app features until the documentation is reviewed and explicitly approved. Do not scaffold the Expo app, create final screens, implement authentication, database logic, AI calls, image upload, payments, subscriptions, notifications, or native integrations during Phase 1.

## Agent Rules

- Think before coding. State assumptions when they affect implementation.
- Keep changes surgical. Touch only files required by the current request.
- Prefer simple, practical documentation and implementation plans over speculative architecture.
- Do not hardcode branding deeply. "Nova" is the working name and may change.
- Treat user safety rules as product requirements, not copy suggestions.
- If a request conflicts with the safety policy, preserve safety and explain the conflict.

## Repository Rules

- Root documentation files are the source of truth until production starts.
- Do not create app runtime files during Phase 1.
- Do not add dependencies during Phase 1.
- Do not add secrets, API keys, credentials, private prompts with keys, or sample tokens.
- Do not create migrations before the data model is approved.
- Do not copy code from public repositories into this repo.

## Required Safety Requirements

Nova must never mention, predict, imply, suggest, or generate content related to death, betrayal certainty, infidelity certainty, illness, medical outcomes, accidents, violence, pregnancy predictions, curses, dark spiritual threats, evil eye claims as certainty, someone doing something against the user, legal advice as certainty, financial advice as certainty, psychological diagnosis, medical diagnosis, dangerous predictions, fear-based warnings, or catastrophic predictions.

The app must never scare the user, create paranoia, or imply that harmful events are guaranteed.

All AI and generated copy must use symbolic, reflective, positive, emotionally safe language.

## AI Content Rules

Allowed phrasing:

- "This may suggest..."
- "This could reflect..."
- "Your energy may be moving toward..."
- "A helpful way to see this is..."
- "Symbolically, this points to..."
- "You may benefit from..."
- "This can be interpreted as..."
- "This may be a good moment to reflect on..."
- "A gentle way to approach this is..."

Forbidden phrasing:

- "This will happen."
- "You are destined to..."
- "Someone will betray you."
- "You are cursed."
- "You will lose..."
- "Your partner is hiding something."
- "Your relationship is doomed."
- "You must leave them."
- "You must stay with them."
- "Something bad is coming."
- "This person is dangerous."
- "They are cheating on you."

Unsafe requests must redirect gently:

> I cannot confirm or predict something like that. What I can do is help you reflect on the emotional energy of the situation and offer a grounded, positive perspective.

## File Organization Expectations

Until the app is implemented, keep planning documents at the repository root:

- Product and scope: `PRD.md`, `MVP-SCOPE.md`, `ROADMAP.md`
- Work planning: `PLAN.md`, `DECISION-LOG.md`, `TECHNICAL-RISKS.md`
- Product behavior: `FEATURE-SPECIFICATIONS.md`, `USER-FLOWS.md`, `QA-CHECKLIST.md`
- System design: `ARCHITECTURE-OVERVIEW.md`, `DATA-MODEL.md`, `AI-ARCHITECTURE.md`
- Safety and AI prompts: `SAFETY-GUIDELINES.md`, `PROMPT-SYSTEM.md`
- Business and design: `MONETIZATION.md`, `PAYWALL-SPEC.md`, `DESIGN-SYSTEM.md`
- Research and onboarding: `RESEARCH-NOTES.md`, `README.md`

## How To Update Documents

- Update the smallest relevant document.
- Keep wording specific to Nova.
- Add acceptance criteria when changing feature behavior.
- Add safety language to every AI-related feature change.
- Keep pricing as placeholders until business approval.
- Mark unresolved decisions as open questions instead of guessing.

## How To Update The Decision Log

Every meaningful product, technical, safety, or monetization decision must be added to `DECISION-LOG.md` using this format:

- Date:
- Decision:
- Reason:
- Alternatives considered:
- Status:

Use "Proposed" until the user approves the documentation. Use "Approved" only after explicit approval.

## How To Handle Prompts

- Keep prompts in `PROMPT-SYSTEM.md`.
- Do not place API keys or provider secrets in prompts.
- Prompts must include forbidden topics, non-deterministic language, positive tone, and safe redirect behavior.
- Prompts must instruct models not to provide medical, legal, financial, or emergency advice.
- Prompt changes must be reflected in `AI-ARCHITECTURE.md` and `SAFETY-GUIDELINES.md` when behavior changes.

## How To Avoid Unsafe Predictions

- Frame all readings as symbolic interpretation.
- Use "may", "could", "suggests", "reflects", and "invites reflection".
- Never imply certainty about another person's private behavior.
- Never turn palm lines, astrology placements, compatibility scores, or AI chat into danger warnings.
- Redirect forbidden topics to emotional reflection and grounded self-care.

## Future Agent Workflow

1. Read `README.md`, `AGENTS.md`, `PRD.md`, `MVP-SCOPE.md`, and `SAFETY-GUIDELINES.md`.
2. Check `DECISION-LOG.md` for approved decisions and open questions.
3. Confirm the current phase before making changes.
4. If still in Phase 1, edit documentation only.
5. If production has been approved later, implement one phase at a time and verify against `PLAN.md` and `QA-CHECKLIST.md`.
