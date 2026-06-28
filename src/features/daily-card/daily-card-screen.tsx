import { StyleSheet, Text, View } from 'react-native';

import { canViewFullDailyCard, getDailyCardEntitlement } from './access';
import type { DailyCard } from './types';
import { useDailyCard } from './use-daily-card';

import {
  AppButton,
  CelestialCard,
  CosmicScreen,
  EmptyStateCard,
  InfoList,
  LoadingStateCard,
  SafeDisclaimerBlock,
  ScreenHeader,
  ShareCardPreview,
} from '@/components';
import { Phase3VisualBackground } from '@/components/phase3-backgrounds';
import { colors, radii, spacing, typography } from '@/theme';

function CardMeta({ card }: { card: DailyCard }) {
  return (
    <InfoList
      items={[
        {
          label: 'Number of the day',
          value: String(card.number_of_day),
          icon: 'ellipse-outline',
        },
        {
          label: 'Color',
          value: `${card.color_name} - ${card.color_hex}`,
          icon: 'color-palette-outline',
        },
      ]}
    />
  );
}

function FullReflection({
  card,
  hasFullAccess,
}: {
  card: DailyCard;
  hasFullAccess: boolean;
}) {
  if (hasFullAccess) {
    return (
      <InfoList
        items={[
          { label: 'Energy', value: card.energy, icon: 'sparkles-outline' },
          { label: 'Advice', value: card.advice, icon: 'leaf-outline' },
        ]}
      />
    );
  }

  return (
    <CelestialCard
      eyebrow="Nova Plus"
      icon="lock-closed-outline"
      title="Unlock the full reflection"
    >
      <Text style={styles.body}>
        {"Go deeper into today's energy and advice with Nova Plus or Pro."}
      </Text>
      <AppButton
        href="/paywall"
        label="View upgrade options"
        style={styles.cardAction}
        variant="secondary"
      />
    </CelestialCard>
  );
}

export function DailyCardContent({ card }: { card: DailyCard }) {
  const entitlement = getDailyCardEntitlement();
  const hasFullAccess = canViewFullDailyCard(entitlement);

  return (
    <>
      <ShareCardPreview
        colorName={card.color_name}
        message={card.message}
        numberOfDay={card.number_of_day}
        title={card.word}
      />

      <CelestialCard
        eyebrow={card.card_date}
        icon="sunny-outline"
        title={card.word}
      >
        <Text style={styles.message}>{card.message}</Text>
        <View style={styles.colorRow}>
          <View
            accessibilityLabel={`${card.color_name} color swatch`}
            style={[styles.colorSwatch, { backgroundColor: card.color_hex }]}
          />
          <Text style={styles.colorText}>{card.color_name}</Text>
        </View>
      </CelestialCard>

      <CardMeta card={card} />
      <FullReflection card={card} hasFullAccess={hasFullAccess} />
      <SafeDisclaimerBlock />
    </>
  );
}

export function DailyCardScreen() {
  const { card, error, reload, status } = useDailyCard();

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="clarity" />}>
      <ScreenHeader
        body="A symbolic card for today's energy."
        eyebrow="Daily guidance"
        icon="sunny-outline"
        title="Daily card"
      />

      {status === 'loading' || status === 'idle' ? (
        <LoadingStateCard
          body="Opening today's saved card or creating one safe reflection."
          icon="moon-outline"
          title="Reading today gently"
        />
      ) : null}

      {status === 'error' ? (
        <EmptyStateCard
          actionLabel="Try again"
          body={error ?? 'Daily Card is not ready yet. Please try again.'}
          icon="alert-circle-outline"
          title="Daily Card is not ready"
        />
      ) : null}

      {status === 'error' ? (
        <AppButton
          label="Retry Daily Card"
          onPress={reload}
          variant="secondary"
        />
      ) : null}

      {status === 'ready' && card ? <DailyCardContent card={card} /> : null}
    </CosmicScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    ...typography.body,
    color: colors.text.secondary,
  },
  cardAction: {
    marginTop: spacing.md,
  },
  colorRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  colorSwatch: {
    borderColor: colors.border.subtleGold,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 28,
    width: 28,
  },
  colorText: {
    ...typography.button,
    color: colors.text.primary,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
