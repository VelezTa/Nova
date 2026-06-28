import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { useDailyCard } from './use-daily-card';

import { AppButton, Badge } from '@/components';
import { colors, spacing, typography } from '@/theme';

export function DailyCardHomeSummary() {
  const { card, status } = useDailyCard();

  const title = status === 'ready' && card ? card.word : 'Today opens gently';
  const body =
    status === 'ready' && card
      ? card.message
      : 'Open your Daily Card for a symbolic reflection made for today.';

  return (
    <View style={styles.overlay}>
      <View style={styles.topRow}>
        <View style={styles.featureIcon}>
          <Ionicons name="sunny-outline" color={colors.accent.gold} size={23} />
        </View>
        <Badge icon="sparkles-outline" tone="gold">
          Daily energy
        </Badge>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <AppButton href="/daily" label="View daily energy" variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  copy: {
    gap: spacing.sm,
  },
  featureIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.subtleGold,
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  overlay: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: 'space-between',
    padding: spacing.xl,
  },
  title: {
    ...typography.cardTitle,
    color: colors.text.primary,
    fontFamily: 'serif',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
