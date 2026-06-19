# Monetization

## Strategy

Astra should use a freemium model with a strong free hook and most deep value behind paid access. Monetization must be ethical, positive, and never fear-based.

## Free Tier

May include:

- Basic daily card.
- Short profile reading.
- Limited weekly prediction preview.
- One AI question trial.
- Palm reading preview.
- Compatibility preview.
- Watermarked share cards.

Purpose:
- Let users feel the product value before paying.
- Encourage daily habit and sharing.

## Plus Tier

May include:

- Full daily cards.
- Full weekly predictions.
- Limited daily AI chat.
- Full palm reading.
- Saved history.
- Share cards without watermark.

Purpose:
- Convert users who want complete daily and weekly value plus basic premium readings.

## Pro Tier

May include:

- Extended AI chat.
- Full compatibility readings.
- Full birth chart interpretation.
- Premium card styles.
- Multiple palm readings.
- Multiple compatibility reports.
- Advanced saved history.
- Deeper personalization.

Purpose:
- Serve highly engaged users who want ongoing AI and deeper personalization.

## One-Time Purchases

May include:

- Full palm reading.
- Full compatibility reading.
- Full birth chart.
- Premium daily card pack.

Purpose:
- Monetize users who do not want a subscription.
- Provide clear value at high-intent moments.

## Feature Gating

Recommended gating:

- Daily card: free preview, Plus full detail, Plus/Pro no watermark.
- Weekly prediction: free preview, Plus full.
- AI chat: one free trial question, Plus limited daily, Pro extended.
- Palm reading: free preview, Plus one full reading or one-time purchase, Pro multiple.
- Compatibility: free preview, Pro full or one-time purchase.
- Birth chart: Pro or one-time purchase.
- Premium card styles: Pro or card pack.

## Paywall Moments

- After onboarding once the user sees profile value.
- When opening full weekly prediction from preview.
- After one AI trial question.
- Before full palm reading result.
- Before full compatibility result.
- When selecting no-watermark share.
- From My Space subscription status.

## Ethical Upsells

- Sell depth, beauty, history, and personalization.
- Do not imply paid content is more certain or more predictive.
- Do not use anxiety, jealousy, fear, or urgency around forbidden topics.
- Use calm language like "Unlock the full reflection" and "Go deeper into your guidance."

## Trial Strategy

Potential trial:

- 3-day or 7-day free trial for Pro.
- Trial should clearly show renewal price and date.
- Trial should be tested for conversion and refund risk.

## RevenueCat Integration Assumptions

- Configure products in App Store Connect and Google Play Console.
- Mirror products in RevenueCat.
- Use entitlements: `plus`, `pro`, and one-time feature entitlements such as `palm_full`, `compatibility_full`, `birth_chart_full`, `premium_card_pack`.
- App checks RevenueCat entitlements before feature unlock.
- Supabase stores entitlement snapshots for app state and support context.

## App Store Subscription Notes

- Show subscription name, duration, price, renewal terms, trial terms if applicable, restore purchases, privacy policy, and terms.
- Use one subscription group for Plus and Pro unless business requirements change.
- Make plan differences clear.
- Avoid misleading savings claims.

## Google Play Subscription Notes

- Configure base plans and offers carefully.
- Keep subscription benefits consistent with in-app paywall copy.
- Support restore/account sync behavior through RevenueCat.
- Ensure terms and cancellation expectations are clear.

## What Should Remain Free

- Basic daily card.
- Basic profile value.
- Safety disclaimers.
- Account settings.
- Restore purchases.
- Notification settings.
- At least one meaningful product sample before paywall pressure.

## What Should Be Premium

- Deeper personalization.
- Full readings.
- Saved history beyond basic samples.
- Extended AI usage.
- No watermark sharing.
- Premium visual styles.
- Multiple reports.
