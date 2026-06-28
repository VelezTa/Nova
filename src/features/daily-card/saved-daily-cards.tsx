import { StyleSheet, Text, View } from 'react-native';

import { canViewFullDailyCard, getDailyCardEntitlement } from './access';
import type { DailyCard } from './types';
import { useDailyCardHistory } from './use-daily-card';

import {
  AppButton,
  CelestialCard,
  EmptyStateCard,
  InfoList,
  LoadingStateCard,
  SafeDisclaimerBlock,
  ScreenHeader,
} from '@/components';
import { CosmicScreen } from '@/components/phase3-ui';
import { Phase3VisualBackground } from '@/components/phase3-backgrounds';
import { colors, spacing, typography } from '@/theme';

function formatCardDate(value: string) {
  const [year, month, day] = value.split('-');
  return `${month}/${day}/${year}`;
}

function SavedDailyCardItem({ card }: { card: DailyCard }) {
  const entitlement = getDailyCardEntitlement();
  const hasFullAccess = canViewFullDailyCard(entitlement);

  return (
    <CelestialCard
      eyebrow={formatCardDate(card.card_date)}
      icon="sunny-outline"
      title={card.word}
    >
      <Text style={styles.body}>{card.message}</Text>
      <InfoList
        items={[
          {
            label: 'Number',
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
      {hasFullAccess ? (
        <InfoList
          items={[
            { label: 'Energy', value: card.energy, icon: 'sparkles-outline' },
            { label: 'Advice', value: card.advice, icon: 'leaf-outline' },
          ]}
        />
      ) : (
        <AppButton
          href="/paywall"
          label="Unlock full reflection"
          style={styles.cardAction}
          variant="secondary"
        />
      )}
    </CelestialCard>
  );
}

export function DailyCardHistoryPreview() {
  const { cards, status } = useDailyCardHistory();
  const latestCards = cards.slice(0, 2);

  if (status === 'loading' || status === 'idle') {
    return (
      <LoadingStateCard
        body="Checking your saved Daily Cards."
        icon="bookmark-outline"
        title="Saved guidance"
      />
    );
  }

  if (latestCards.length === 0) {
    return (
      <EmptyStateCard
        actionHref="/daily"
        actionLabel="Open Daily Card"
        body="Your saved Daily Cards will appear here after your first daily reflection."
        icon="albums-outline"
        title="No saved Daily Cards yet"
      />
    );
  }

  return (
    <View style={styles.stack}>
      {latestCards.map((card) => (
        <SavedDailyCardItem card={card} key={card.id} />
      ))}
    </View>
  );
}

export function SavedDailyCardsScreen() {
  const { cards, error, reload, status } = useDailyCardHistory();

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="Your private Daily Card history."
        eyebrow="Saved readings"
        icon="bookmark-outline"
        title="Saved readings"
      />

      {status === 'loading' || status === 'idle' ? (
        <LoadingStateCard
          body="Loading your saved Daily Cards."
          icon="albums-outline"
          title="Saved guidance"
        />
      ) : null}

      {status === 'error' ? (
        <>
          <EmptyStateCard
            body={error ?? 'Saved Daily Cards could not be loaded.'}
            icon="alert-circle-outline"
            title="Saved readings unavailable"
          />
          <AppButton label="Try again" onPress={reload} variant="secondary" />
        </>
      ) : null}

      {status === 'ready' && cards.length === 0 ? (
        <EmptyStateCard
          actionHref="/daily"
          actionLabel="View Daily Card"
          body="Daily Cards will appear here after the first card is created and saved."
          icon="albums-outline"
          title="No saved guidance yet"
        />
      ) : null}

      {status === 'ready' && cards.length > 0 ? (
        <View style={styles.stack}>
          {cards.map((card) => (
            <SavedDailyCardItem card={card} key={card.id} />
          ))}
        </View>
      ) : null}

      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  cardAction: {
    marginTop: spacing.md,
  },
  stack: {
    gap: spacing.lg,
  },
});
