# Paywall Specification

## Paywall Screens

MVP should include:

- Onboarding value paywall.
- Feature gate paywall.
- AI limit paywall.
- Palm reading result paywall.
- Compatibility result paywall.
- No-watermark share paywall.
- Subscription management entry from My Space.

## Trigger Points

- After onboarding, only after the user sees enough value.
- Opening full weekly prediction from preview.
- Submitting a second AI question after free trial.
- Unlocking full palm reading.
- Unlocking full compatibility reading.
- Selecting premium card style.
- Removing share watermark.

## Pricing Placeholders

Use placeholders until business approval:

- Plus Monthly: TBD.
- Plus Annual: TBD.
- Pro Monthly: TBD.
- Pro Annual: TBD.
- Full Palm Reading: TBD.
- Full Compatibility Reading: TBD.
- Full Birth Chart: TBD.
- Premium Daily Card Pack: TBD.

## Free Limits

- Basic daily card.
- Short profile reading.
- Weekly preview.
- One AI question trial.
- Palm reading preview.
- Compatibility preview.
- Watermarked sharing.

## Plus Limits

- Full daily cards.
- Full weekly predictions.
- Limited daily AI.
- Full palm reading allocation.
- Saved history.
- No watermark on standard share cards.

## Pro Limits

- Extended AI chat.
- Full compatibility readings.
- Full birth chart interpretation.
- Premium card styles.
- Multiple palm readings.
- Multiple compatibility reports.
- Advanced saved history.
- Deeper personalization.

## One-Time Purchase Flows

Palm reading:
1. User uploads both hands.
2. App generates preview.
3. User chooses one-time full unlock or subscription.
4. RevenueCat confirms purchase.
5. App reveals full reading.

Compatibility:
1. User enters both people.
2. App generates preview.
3. User chooses one-time full unlock or Pro.
4. App reveals full reading.

Birth chart:
1. User opens premium birth chart.
2. User chooses one-time full unlock or Pro.
3. App reveals full interpretation.

## Restore Purchases

- Restore purchases must be visible on every paywall.
- Restore flow must refresh RevenueCat customer info.
- If restore succeeds, app updates entitlement state and returns to the gated feature.
- If no purchases are found, use calm neutral copy.

## Subscription Management

- My Space must show current subscription status.
- Include manage subscription link or platform-specific management route.
- Include restore purchases.
- Include support contact placeholder if needed.

## Legal Copy Placeholders

Each paywall must include:

- Subscription renews automatically unless canceled.
- Price and duration placeholders until configured.
- Trial terms if trial is active.
- Restore purchases.
- Privacy Policy link placeholder.
- Terms of Use link placeholder.
- Disclaimer: Astra offers symbolic guidance for reflection and entertainment, not medical, legal, financial, or emergency advice.

## App Store Compliance Notes

- Show full renewal price prominently.
- Show subscription duration.
- Show what is included.
- Provide restore purchases.
- Provide terms and privacy links.
- Do not mislead users with unclear savings or hidden renewal terms.

## Google Play Compliance Notes

- Product benefits must match Play Console configuration.
- Base plan and offer terms must be clear.
- Restore/account sync must work through RevenueCat.
- No misleading trial or discount copy.
