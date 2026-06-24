# Nova onboarding background learnings

## What worked

- Treat the provided reference as a composition target, not just a mood board.
- Keep every text label, input, card, chip, radio, and CTA as real React Native UI.
- Use background-only assets for each onboarding screen instead of one shared image with overlays.
- Generate or prepare a clean multi-panel background sheet with no phone frame, no UI, no text, no buttons, no cards, and no status bar.
- Slice that sheet into one asset per screen so each route has a distinct composition:
  - `name`: crescent moon, dark star sky, lower valley and river.
  - `birthDate`: large cropped purple planet on the right.
  - `birthTime`: strong zodiac wheel on the right.
  - `birthPlace`: coastline, ocean, horizon, and muted celestial elements.
  - `interest`: constellation lines, particles, purple clouds, and cohesive lower landscape.
- Keep overlay/scrim logic light. Heavy overlays made the background feel lower quality and less like the reference.
- Verify in iOS Simulator through `serve-sim`, because the same screen can read differently inside the device frame than in raw asset previews.

## What did not work

- Reusing one cosmic landscape and moving/scaling it per screen was not close enough.
- Trying to crop the full screenshot directly created ghost text, cards, CTA remnants, status bar artifacts, and vertical seams.
- Adding SVG accents over one shared bitmap still felt like the same screen with decorations.
- Over-focusing on text and CTA polish missed the user's actual priority: the background composition.

## Rules for future passes

- Start with background composition first, then check UI readability.
- Never use the full screenshot as UI.
- Never bake real UI elements into background assets.
- If using a reference image, generate or reconstruct clean background-only panels rather than masking screenshot UI after the fact.
- Save simulator screenshots for every affected onboarding route before calling the pass complete.
- Keep Phase 3 visual-only unless the user explicitly opens production work.
