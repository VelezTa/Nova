import { StyleSheet, Text, View } from 'react-native';

import {
  canViewFullWeeklyPrediction,
  getWeeklyPredictionEntitlement,
} from './access';
import type { WeeklyPrediction } from './types';
import {
  useWeeklyPrediction,
  useWeeklyPredictionHistory,
} from './use-weekly-prediction';

import {
  AppButton,
  CelestialCard,
  CosmicScreen,
  EmptyStateCard,
  InfoList,
  LoadingStateCard,
  SafeDisclaimerBlock,
  ScreenHeader,
  SectionHeader,
} from '@/components';
import { Phase3VisualBackground } from '@/components/phase3-backgrounds';
import { colors, radii, spacing, typography } from '@/theme';

function formatWeekStart(value: string) {
  const [year, month, day] = value.split('-');
  return `${month}/${day}/${year}`;
}

function WeeklyPreview({ prediction }: { prediction: WeeklyPrediction }) {
  return (
    <>
      <CelestialCard
        eyebrow={`Week of ${formatWeekStart(prediction.week_start)}`}
        icon="calendar-outline"
        title={prediction.word_of_week}
      >
        <Text style={styles.message}>{prediction.general_energy}</Text>
        <View style={styles.colorRow}>
          <View
            accessibilityLabel={`${prediction.color_name} color swatch`}
            style={[
              styles.colorSwatch,
              { backgroundColor: prediction.color_hex },
            ]}
          />
          <Text style={styles.colorText}>
            {prediction.color_name} - {prediction.color_hex}
          </Text>
        </View>
      </CelestialCard>

      <InfoList
        items={[
          {
            label: 'Favorable day',
            value: prediction.favorable_day,
            icon: 'sparkles-outline',
          },
          {
            label: 'Word of the week',
            value: prediction.word_of_week,
            icon: 'chatbubble-ellipses-outline',
          },
        ]}
      />
    </>
  );
}

function FullWeeklyReflection({
  hasFullAccess,
  prediction,
}: {
  hasFullAccess: boolean;
  prediction: WeeklyPrediction;
}) {
  if (hasFullAccess) {
    return (
      <InfoList
        items={[
          { label: 'Love', value: prediction.love, icon: 'heart-outline' },
          { label: 'Work', value: prediction.work, icon: 'briefcase-outline' },
          { label: 'Money', value: prediction.money, icon: 'wallet-outline' },
          {
            label: 'Wellness',
            value: prediction.wellness,
            icon: 'flower-outline',
          },
          { label: 'Advice', value: prediction.advice, icon: 'leaf-outline' },
        ]}
      />
    );
  }

  return (
    <CelestialCard
      eyebrow="Nova Plus"
      icon="lock-closed-outline"
      title="Unlock the full weekly reflection"
    >
      <Text style={styles.body}>
        {
          "Go deeper into this week's love, work, money, wellness, and advice with Nova Plus or Pro."
        }
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

function WeeklyPredictionContent({
  prediction,
}: {
  prediction: WeeklyPrediction;
}) {
  const entitlement = getWeeklyPredictionEntitlement();
  const hasFullAccess = canViewFullWeeklyPrediction(entitlement);

  return (
    <>
      <WeeklyPreview prediction={prediction} />
      <FullWeeklyReflection
        hasFullAccess={hasFullAccess}
        prediction={prediction}
      />
      <SafeDisclaimerBlock />
    </>
  );
}

function SavedWeeklyPredictionItem({
  prediction,
}: {
  prediction: WeeklyPrediction;
}) {
  const entitlement = getWeeklyPredictionEntitlement();
  const hasFullAccess = canViewFullWeeklyPrediction(entitlement);

  return (
    <CelestialCard
      eyebrow={`Week of ${formatWeekStart(prediction.week_start)}`}
      icon="moon-outline"
      title={prediction.word_of_week}
    >
      <Text style={styles.body}>{prediction.general_energy}</Text>
      <InfoList
        items={[
          {
            label: 'Favorable day',
            value: prediction.favorable_day,
            icon: 'sparkles-outline',
          },
          {
            label: 'Color',
            value: `${prediction.color_name} - ${prediction.color_hex}`,
            icon: 'color-palette-outline',
          },
        ]}
      />
      {hasFullAccess ? (
        <InfoList
          items={[
            { label: 'Love', value: prediction.love, icon: 'heart-outline' },
            {
              label: 'Work',
              value: prediction.work,
              icon: 'briefcase-outline',
            },
            {
              label: 'Money',
              value: prediction.money,
              icon: 'wallet-outline',
            },
            {
              label: 'Wellness',
              value: prediction.wellness,
              icon: 'flower-outline',
            },
            {
              label: 'Advice',
              value: prediction.advice,
              icon: 'leaf-outline',
            },
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

function WeeklyPredictionHistory({
  currentWeekStart,
}: {
  currentWeekStart: string;
}) {
  const { error, predictions, reload, status } =
    useWeeklyPredictionHistory(currentWeekStart);
  const latestPredictions = predictions.slice(0, 3);

  return (
    <View style={styles.historySection}>
      <SectionHeader title="Saved weekly history" />

      {status === 'loading' || status === 'idle' ? (
        <LoadingStateCard
          body="Checking your saved Weekly Predictions."
          icon="bookmark-outline"
          title="Saved weekly guidance"
        />
      ) : null}

      {status === 'error' ? (
        <>
          <EmptyStateCard
            body={error ?? 'Saved Weekly Predictions could not be loaded.'}
            icon="alert-circle-outline"
            title="Weekly history unavailable"
          />
          <AppButton label="Try again" onPress={reload} variant="secondary" />
        </>
      ) : null}

      {status === 'ready' && latestPredictions.length === 0 ? (
        <EmptyStateCard
          body="Your saved Weekly Predictions will appear here after another week is created."
          icon="albums-outline"
          title="No past weeks yet"
        />
      ) : null}

      {status === 'ready' && latestPredictions.length > 0 ? (
        <View style={styles.stack}>
          {latestPredictions.map((prediction) => (
            <SavedWeeklyPredictionItem
              key={prediction.id}
              prediction={prediction}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

export function WeeklyPredictionScreen() {
  const { error, prediction, reload, status, weekStart } =
    useWeeklyPrediction();

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthTime" />}>
      <ScreenHeader
        body="A safe symbolic reflection for the week ahead."
        eyebrow="Weekly guidance"
        icon="calendar-outline"
        title="Weekly prediction"
      />

      {status === 'loading' || status === 'idle' ? (
        <LoadingStateCard
          body="Opening this week's saved prediction or creating one safe reflection."
          icon="moon-outline"
          title="Reading the week gently"
        />
      ) : null}

      {status === 'error' ? (
        <EmptyStateCard
          body={
            error ?? 'Weekly Prediction is not ready yet. Please try again.'
          }
          icon="alert-circle-outline"
          title="Weekly Prediction is not ready"
        />
      ) : null}

      {status === 'error' ? (
        <AppButton
          label="Retry Weekly Prediction"
          onPress={reload}
          variant="secondary"
        />
      ) : null}

      {status === 'ready' && prediction ? (
        <WeeklyPredictionContent prediction={prediction} />
      ) : null}

      <WeeklyPredictionHistory currentWeekStart={weekStart} />
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
    flex: 1,
  },
  historySection: {
    gap: spacing.lg,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
  },
  stack: {
    gap: spacing.lg,
  },
});
