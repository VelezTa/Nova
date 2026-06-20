# Design System

## Reference Status

The Phase 3 visual baseline has been reviewed against the attached UI reference screenshot. The screenshot should guide mood and foundation-level styling, not pixel-perfect copying.

Phase 3 should translate the reference into:

- Deep navy, black, and purple cosmic backgrounds.
- Warm gold accents for premium emphasis.
- Soft violet and pink glows used sparingly.
- Rounded celestial cards with subtle borders.
- Clear bottom tab navigation with only the main destinations.
- Static setup-only placeholder screens until later feature phases are approved.

## Brand Personality

Nova should feel mystical, premium, emotional, positive, elegant, feminine, modern, highly visual, shareable, and App Store-ready.

It should not feel dark in a scary way, cheap, fear-based, cluttered, generic, or occult-heavy.

## Visual Mood

- Dark cosmic background.
- Soft gradients in black, navy, deep purple, violet, and soft pink.
- Gold accents.
- Stars, moons, zodiac symbols, constellations, celestial particles.
- Glowing premium cards.
- Rounded but refined surfaces.
- Magical light effects.
- Clean mobile-first navigation.
- Beautiful shareable cards.

## Color Palette

- Background: `#050511`
- Background gradient start: `#050511`
- Background gradient middle: `#120B2F`
- Background gradient end: `#24104F`
- Surface: `#101021`
- Surface elevated: `#17172C`
- Deep purple: `#2B165F`
- Violet: `#7B4DFF`
- Soft violet: `#A78BFA`
- Soft pink: `#D86CFF`
- Gold: `#F6C76A`
- Warm gold: `#D99A3D`
- Text primary: `#F8EFD2`
- Text secondary: `#BEB6D8`
- Text muted: `#81779F`
- Success / positive: `#A7F3D0`
- Border subtle: `rgba(246, 199, 106, 0.22)`
- Card border: `rgba(255, 255, 255, 0.08)`
- Glow purple: `rgba(123, 77, 255, 0.35)`
- Glow gold: `rgba(246, 199, 106, 0.28)`

Avoid red except for technical errors. Do not use aggressive danger styling for product guidance.

## Typography Direction

- Use elegant, readable mobile typography.
- Headings may use a refined serif or display font if legible.
- Body copy should use a highly readable sans-serif.
- Keep card copy brief.
- Avoid dense paragraphs on Home, Daily Card, Paywall, and Share Card surfaces.

## Spacing

- Use generous vertical rhythm.
- Keep Home scannable.
- Avoid overcrowded card stacks.
- Use 16px as a base screen margin.
- Use 8px, 12px, 16px, 24px, and 32px spacing steps.

## Border Radius

- Premium content cards: 20px to 28px.
- Small chips: 999px.
- Buttons: 16px to 20px.
- Modals/paywalls: 28px or full-screen sheets.

## Card Styles

- Elevated dark surfaces with subtle purple or gold glow.
- Fine gold hairline border for premium cards.
- Background particles should be soft and low contrast.
- Cards must not look cluttered.
- Daily share card should feel poster-like and export-ready.

## Button Styles

- Primary: violet-to-gold or violet-to-pink gradient with high contrast text.
- Secondary: translucent surface with gold border.
- Text buttons: gold or text secondary.
- Destructive buttons only for account/data actions and should be calm, not alarming.

## Icon Style

- Use celestial line icons: moons, stars, zodiac symbols, sparkles, cards, chat, palm, heart, profile.
- Prefer consistent stroke width.
- Avoid scary occult icons.
- Use gold or muted violet for active states.

## Celestial Effects

- Small stars and particles.
- Soft radial glows.
- Constellation line accents.
- Lunar shapes.
- Subtle motion in loading states.
- Avoid heavy animation that distracts from reading.

## Navigation Style

- Bottom tabs for Home, Daily, Chat, Palm, and Profile.
- Home should show key shortcuts immediately.
- Compatibility should be reachable from Home and Profile, not a required bottom tab.
- Use full-screen feature flows for onboarding, palm upload, compatibility setup, and paywall.

## Phase 3 Implementation Rules

- Use React Native `StyleSheet` with shared theme tokens for Phase 3.
- Use `expo-linear-gradient` for cosmic backgrounds and premium buttons.
- Use `@expo/vector-icons` for consistent celestial and navigation icons.
- Do not install NativeWind during Phase 3.
- Do not add custom fonts yet; keep typography tokens ready for future font replacement.
- Placeholder screens must clearly say they are setup-only.
- Placeholder copy must stay positive, symbolic, short, and non-deterministic.
- Paywall UI in Phase 3 is only a visual navigation target and must not imply active purchases.

## Empty States

- Warm, short, and action-oriented.
- Example: "Your first reading will appear here after you save it."
- No long explanations.

## Loading States

- Use cosmic shimmer, star pulse, or subtle card glow.
- Copy should be calm: "Reading the symbols..." or "Preparing your guidance..."
- Avoid "predicting your future" or alarming language.

## Paywall Visual Style

- Premium cosmic card or full-screen sheet.
- Strong visual hierarchy.
- Clear Plus and Pro comparison.
- Gold accents for premium.
- Benefits must sell deeper reflection and personalization, not certainty.

## Share Card Templates

Daily card templates:
- Instagram Story: 9:16.
- Instagram Post: 4:5.
- Square fallback: 1:1.
- TikTok/vertical save: 9:16.

Visual requirements:
- Large word of the day.
- Short message.
- Number, color, and energy chips.
- Nova branding light touch.
- Watermark for free tier if enabled.
- No excessive text.

## Accessibility Rules

- Maintain readable contrast against dark backgrounds.
- Support dynamic type where feasible.
- Do not rely only on color for meaning.
- Keep tap targets at least 44px.
- Avoid flashing effects.
- Provide alt labels for meaningful icons.
- Ensure share card text remains legible on smaller devices.
