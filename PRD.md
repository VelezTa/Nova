# Product Requirements Document

## Product Summary

Astra is a positive astrology-inspired mobile app for daily guidance, self-knowledge, palm reading, AI conversations, weekly predictions, and couple compatibility. It blends symbolic astrology, premium visual design, emotionally safe AI, and shareable daily content.

The app is for entertainment, reflection, personal wellness, symbolic guidance, emotional clarity, and daily inspiration. It must never present predictions as guaranteed facts.

## Target Audience

- People interested in astrology, self-reflection, emotional clarity, relationships, and daily inspiration.
- Mobile-first users who enjoy visually polished, shareable wellness apps.
- Users who want mystical experiences without dark, fear-based, or occult-heavy messaging.
- Users comfortable with subscriptions for premium personalized guidance.

## Problem

Many astrology and prediction apps feel generic, cluttered, fear-based, or low-quality. AI-powered reading apps can also overclaim, scare users, or imply dangerous certainty about sensitive topics.

Users need a polished, positive, safe app that gives emotionally useful symbolic guidance while making clear that the content is not factual prediction or professional advice.

## Solution

Astra provides a premium mobile experience with:

- A personalized cosmic profile.
- A daily card users want to save and share.
- Weekly predictions framed as positive reflection.
- A safe AI cosmic guide.
- Symbolic palm readings from photos.
- Couple compatibility that supports reflection without paranoia.
- A paid model that unlocks deeper readings, history, premium cards, and AI access.

## Core Value Proposition

Astra helps users start each day with beautiful, positive, symbolic guidance that feels personal, emotionally safe, and worth sharing.

## Main Use Cases

- Complete a magical onboarding flow and create a cosmic profile.
- Check a daily card for positive guidance.
- Share a beautiful daily card to social platforms.
- Read a weekly prediction for love, work, money, wellness, and advice.
- Ask the AI cosmic guide reflective questions.
- Upload both hands for a symbolic palm reading.
- Create a compatibility reading for two people.
- Save readings and manage profile, preferences, notifications, and subscription.

## MVP Feature List

- Onboarding and cosmic profile.
- Home screen with daily, weekly, chat, palm, compatibility, energy categories, and My Space shortcuts.
- Daily card with shareable design.
- Weekly prediction.
- AI chat.
- Palm reading with left and right hand photo capture or upload.
- Compatibility readings for two people.
- My Space/Profile.
- Free, Plus, Pro, and one-time purchase paywalls.
- Notifications for daily and weekly engagement.
- Native sharing and image saving.

## Non-Goals

- No deterministic predictions.
- No medical, legal, financial, emergency, or psychological advice.
- No dark, scary, or fear-based content.
- No final production implementation in Phase 1.
- No complex social network in MVP.
- No live human astrologer marketplace in MVP.
- No guaranteed compatibility claims.
- No photo-based claims about relationship truth or private behavior.

## User Personas

### Daily Reflector

Checks the app each morning for a quick emotional reset, daily word, color, and advice.

### Relationship Seeker

Uses compatibility and AI chat to reflect on relationship dynamics in a positive, non-paranoid way.

### Visual Sharer

Values beautiful cards and wants to share cosmic content on Instagram Stories, TikTok, WhatsApp, and native share.

### Premium Explorer

Pays for deeper AI chat, full palm reading, full compatibility, birth chart interpretation, and saved history.

## Success Metrics

- Onboarding completion rate.
- Daily active users.
- Daily card open rate.
- Daily card share rate.
- Weekly prediction views.
- AI chat trial to subscription conversion.
- Palm reading preview to purchase conversion.
- Compatibility preview to purchase conversion.
- Subscription trial start rate.
- Plus and Pro conversion.
- Retention after day 1, day 7, and day 30.
- Safety incident rate and unsafe output report rate.

## Safety Requirements

- Content must be positive, symbolic, reflective, and non-deterministic.
- The app must never scare users or create paranoia.
- AI must redirect forbidden requests safely.
- Palm readings must not associate lines with death, illness, tragedy, accidents, or dangerous events.
- Compatibility must never assert cheating, betrayal, danger, doom, soulmate certainty, or required relationship decisions.

## Monetization Overview

Use a freemium model:

- Free: basic daily card, short profile reading, limited weekly preview, one AI question trial, palm preview, compatibility preview.
- Plus: full daily cards, weekly predictions, limited daily AI, full palm reading, saved history, no watermark on share cards.
- Pro: extended AI, full compatibility, birth chart interpretation, premium card styles, multiple palm readings, multiple compatibility reports, deeper history.
- One-time purchases: full palm reading, full compatibility reading, full birth chart, premium daily card pack.

Use RevenueCat for cross-platform subscriptions, purchases, entitlements, and restore purchases.

## Platform Requirements

- iOS support.
- Android support.
- React Native with Expo.
- TypeScript.
- App Store and Google Play subscription compliance.

## Launch Assumptions

- The app launches as a mobile-first iOS and Android product.
- The first launch uses the working name Astra.
- AI is served through backend functions, not directly from the client.
- Supabase stores user profile, readings, chat history, subscriptions, purchases, share events, notifications, and preferences.
- Visual direction is based on the written cosmic reference until the actual image is reviewed.
