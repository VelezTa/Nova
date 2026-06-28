import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AnimatedCosmicOverlay,
  AnimatedGradientSheen,
  CosmicEntrance,
  CosmicGlow,
  CosmicPressable,
  CosmicSparkleDrift,
  ScreenTransition,
} from './cosmic-motion';

import { useNovaSound } from '@/sound/nova-sound';
import {
  colors,
  gradients,
  layout,
  radii,
  shadows,
  spacing,
  typography,
} from '@/theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

type RouteTarget = string;

type CosmicScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  background?: ReactNode;
}>;

export function CosmicScreen({
  children,
  scroll = true,
  contentStyle,
  background,
}: CosmicScreenProps) {
  const content = (
    <ScreenTransition style={[styles.content, contentStyle]}>
      {children}
    </ScreenTransition>
  );

  return (
    <LinearGradient colors={gradients.screen} style={styles.screen}>
      {background ?? <AnimatedCosmicOverlay />}
      <AnimatedCosmicOverlay />
      <SafeAreaView style={styles.safeArea}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

type HeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
  icon?: IconName;
};

export function ScreenHeader({
  eyebrow = 'Preview',
  title,
  body,
  align = 'left',
  icon = 'sparkles-outline',
}: HeaderProps) {
  return (
    <View style={[styles.header, align === 'center' && styles.centered]}>
      <View style={styles.headerIcon}>
        <Ionicons name={icon} color={colors.accent.gold} size={24} />
      </View>
      <Text style={[styles.eyebrow, align === 'center' && styles.textCenter]}>
        {eyebrow}
      </Text>
      <Text style={[styles.title, align === 'center' && styles.textCenter]}>
        {title}
      </Text>
      {body ? (
        <Text style={[styles.body, align === 'center' && styles.textCenter]}>
          {body}
        </Text>
      ) : null}
    </View>
  );
}

type ButtonProps = {
  label: string;
  href?: RouteTarget;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  href,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  style,
}: ButtonProps) {
  const router = useRouter();
  const { play } = useNovaSound();

  const handlePress = () => {
    if (disabled) {
      return;
    }

    if (onPress) {
      onPress();
      return;
    }

    if (href) {
      router.push(href as never);
    }
  };

  if (variant === 'primary') {
    return (
      <CosmicPressable
        disabled={disabled}
        onPress={handlePress}
        sound={() => play('tap')}
        style={[styles.buttonBase, disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={gradients.primaryButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryButton}
        >
          {icon ? (
            <Ionicons name={icon} color={colors.text.inverse} size={18} />
          ) : null}
          <Text style={styles.primaryButtonText}>{label}</Text>
          <AnimatedGradientSheen />
        </LinearGradient>
      </CosmicPressable>
    );
  }

  return (
    <CosmicPressable
      disabled={disabled}
      onPress={handlePress}
      sound={() => play('tap')}
      style={[
        styles.buttonBase,
        variant === 'secondary' ? styles.secondaryButton : styles.ghostButton,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? (
        <Ionicons name={icon} color={colors.accent.gold} size={18} />
      ) : null}
      <Text
        style={[
          styles.secondaryButtonText,
          variant === 'ghost' && styles.ghostButtonText,
        ]}
      >
        {label}
      </Text>
    </CosmicPressable>
  );
}

type CardProps = PropsWithChildren<{
  title?: string;
  eyebrow?: string;
  icon?: IconName;
  footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
}>;

export function CelestialCard({
  title,
  eyebrow,
  icon,
  footer,
  children,
  style,
}: CardProps) {
  return (
    <CosmicEntrance>
      <CosmicGlow>
        <LinearGradient colors={gradients.card} style={[styles.card, style]}>
          <CosmicSparkleDrift />
          {(title || eyebrow || icon) && (
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleBlock}>
                {eyebrow ? (
                  <Text style={styles.cardEyebrow}>{eyebrow}</Text>
                ) : null}
                {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
              </View>
              {icon ? (
                <View style={styles.cardIcon}>
                  <Ionicons name={icon} color={colors.accent.gold} size={21} />
                </View>
              ) : null}
            </View>
          )}
          <View>{children}</View>
          {footer ? <View style={styles.cardFooter}>{footer}</View> : null}
        </LinearGradient>
      </CosmicGlow>
    </CosmicEntrance>
  );
}

export function CosmicCard(props: CardProps) {
  return <CelestialCard {...props} />;
}

export function AnimatedGradientButton(props: ButtonProps) {
  return <AppButton {...props} />;
}

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: RouteTarget;
};

export function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel && actionHref ? (
        <Pressable onPress={() => router.push(actionHref as never)}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

type FeatureShortcutProps = {
  title: string;
  description: string;
  icon: IconName;
  href: RouteTarget;
};

export function FeatureShortcutCard({
  title,
  description,
  icon,
  href,
}: FeatureShortcutProps) {
  const router = useRouter();
  const { play } = useNovaSound();

  return (
    <CosmicPressable
      onPress={() => router.push(href as never)}
      sound={() => play('card')}
      style={styles.shortcut}
    >
      <View style={styles.shortcutIcon}>
        <Ionicons name={icon} color={colors.accent.gold} size={22} />
      </View>
      <Text style={styles.shortcutTitle}>{title}</Text>
      <Text style={styles.shortcutDescription}>{description}</Text>
    </CosmicPressable>
  );
}

type BadgeProps = PropsWithChildren<{
  icon?: IconName;
  tone?: 'gold' | 'violet' | 'green';
  style?: StyleProp<ViewStyle>;
}>;

export function Badge({ children, icon, tone = 'gold', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[`${tone}Badge`], style]}>
      {icon ? (
        <Ionicons name={icon} color={badgeColor[tone]} size={14} />
      ) : null}
      <Text style={[styles.badgeText, { color: badgeColor[tone] }]}>
        {children}
      </Text>
    </View>
  );
}

export function PlaceholderNotice({ label = 'Static preview' }) {
  return (
    <View style={styles.notice}>
      <Ionicons name="construct-outline" color={colors.accent.gold} size={16} />
      <Text style={styles.noticeText}>{label}</Text>
    </View>
  );
}

export function SafeDisclaimerBlock() {
  return (
    <View style={styles.disclaimer}>
      <Ionicons
        name="shield-checkmark-outline"
        color={colors.accent.positive}
        size={18}
      />
      <Text style={styles.disclaimerText}>
        Nova offers symbolic guidance for reflection and entertainment, not
        medical, legal, financial, or emergency advice.
      </Text>
    </View>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
  icon?: IconName;
};

export function InfoRow({
  label,
  value,
  icon = 'sparkles-outline',
}: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} color={colors.accent.softViolet} size={17} />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

type StaticFieldProps = {
  label: string;
  value: string;
  icon?: IconName;
};

export function StaticField({
  label,
  value,
  icon = 'create-outline',
}: StaticFieldProps) {
  return (
    <View style={styles.staticField}>
      <View style={styles.staticFieldLabel}>
        <Ionicons name={icon} color={colors.accent.gold} size={15} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

type StateCardProps = {
  title: string;
  body: string;
  icon?: IconName;
  actionLabel?: string;
  actionHref?: RouteTarget;
};

export function EmptyStateCard({
  title,
  body,
  icon = 'bookmark-outline',
  actionLabel,
  actionHref,
}: StateCardProps) {
  return (
    <CelestialCard icon={icon} title={title}>
      <Text style={styles.bodySmall}>{body}</Text>
      {actionLabel && actionHref ? (
        <AppButton
          href={actionHref}
          label={actionLabel}
          style={styles.cardAction}
          variant="secondary"
        />
      ) : null}
    </CelestialCard>
  );
}

export function LoadingStateCard({
  title,
  body,
  icon = 'moon-outline',
}: StateCardProps) {
  return (
    <CelestialCard icon={icon} title={title}>
      <View style={styles.loadingRow}>
        <View style={styles.loadingDot} />
        <View style={[styles.loadingDot, styles.loadingDotSoft]} />
        <View style={styles.loadingDot} />
      </View>
      <Text style={styles.bodySmall}>{body}</Text>
    </CelestialCard>
  );
}

type ShareCardPreviewProps = {
  colorName?: string;
  title?: string;
  message?: string;
  numberOfDay?: number;
};

export function ShareCardPreview({
  colorName = 'Gold',
  title = 'Clarity',
  message = 'Today invites you to slow down, listen closely, and choose what feels peaceful.',
  numberOfDay = 7,
}: ShareCardPreviewProps) {
  return (
    <CosmicEntrance>
      <CosmicGlow intensity="strong">
        <LinearGradient colors={gradients.shareCard} style={styles.shareCard}>
          <CosmicSparkleDrift />
          <Text style={styles.shareMoon}>☾</Text>
          <Text style={styles.shareEyebrow}>Nova daily card</Text>
          <Text style={styles.shareTitle}>{title}</Text>
          <Text style={styles.shareMessage}>{message}</Text>
          <View style={styles.shareMetaRow}>
            <View>
              <Text style={styles.shareMetaLabel}>Color</Text>
              <Text style={styles.shareMetaValue}>{colorName}</Text>
            </View>
            <View>
              <Text style={styles.shareMetaLabel}>Number</Text>
              <Text style={styles.shareMetaValue}>{numberOfDay}</Text>
            </View>
          </View>
        </LinearGradient>
      </CosmicGlow>
    </CosmicEntrance>
  );
}

type ScreenListProps = {
  items: InfoRowProps[];
};

export function InfoList({ items }: ScreenListProps) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <InfoRow key={`${item.label}-${item.value}`} {...item} />
      ))}
    </View>
  );
}

const badgeColor = {
  gold: colors.accent.gold,
  violet: colors.accent.softViolet,
  green: colors.accent.positive,
} as const;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    gap: spacing['2xl'],
    marginHorizontal: 'auto',
    maxWidth: layout.maxContentWidth,
    paddingBottom: 112,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
    width: '100%',
  },
  glowOrb: {
    borderRadius: 999,
    opacity: 0.58,
    position: 'absolute',
  },
  glowOrbOne: {
    backgroundColor: colors.glow.purple,
    height: 180,
    right: -80,
    top: 80,
    width: 180,
  },
  glowOrbTwo: {
    backgroundColor: colors.glow.gold,
    bottom: 120,
    height: 120,
    left: -70,
    width: 120,
  },
  star: {
    color: colors.accent.gold,
    opacity: 0.62,
    position: 'absolute',
  },
  starOne: {
    fontSize: 18,
    right: 28,
    top: 34,
  },
  starTwo: {
    fontSize: 14,
    left: 24,
    top: 110,
  },
  starThree: {
    fontSize: 20,
    right: 82,
    top: 214,
  },
  starFour: {
    bottom: 120,
    fontSize: 16,
    left: 40,
  },
  starField: {
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  header: {
    gap: spacing.sm,
    maxWidth: 560,
  },
  centered: {
    alignItems: 'center',
  },
  headerIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.subtleGold,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.accent.gold,
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
    fontFamily: 'serif',
  },
  body: {
    ...typography.body,
    color: colors.text.secondary,
    maxWidth: 520,
  },
  bodySmall: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  caption: {
    ...typography.caption,
    color: colors.text.muted,
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonBase: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: radii.pill,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: layout.minTouchTarget,
    overflow: 'hidden',
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: radii.pill,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  secondaryButton: {
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.card,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
  },
  ghostButton: {
    minHeight: 42,
    paddingHorizontal: spacing.lg,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.text.primary,
  },
  ghostButtonText: {
    color: colors.text.secondary,
  },
  disabled: {
    opacity: 0.58,
  },
  card: {
    borderColor: colors.border.card,
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.md,
    overflow: 'hidden',
    padding: spacing.lg,
    ...shadows.card,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  cardTitleBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  cardEyebrow: {
    ...typography.caption,
    color: colors.accent.gold,
    textTransform: 'uppercase',
  },
  cardTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
    fontFamily: 'serif',
  },
  cardIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.subtleGold,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  cardFooter: {
    borderColor: colors.border.card,
    borderTopWidth: 1,
    paddingTop: spacing.md,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 32,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 25,
  },
  sectionAction: {
    ...typography.caption,
    color: colors.accent.gold,
  },
  shortcut: {
    backgroundColor: colors.surface.soft,
    borderColor: colors.border.card,
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    gap: spacing.sm,
    minHeight: 132,
    minWidth: '46%',
    padding: spacing.md,
  },
  shortcutIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.violet,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  shortcutTitle: {
    ...typography.button,
    color: colors.text.primary,
  },
  shortcutDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  goldBadge: {
    backgroundColor: 'rgba(246, 199, 106, 0.1)',
    borderColor: colors.border.subtleGold,
  },
  violetBadge: {
    backgroundColor: 'rgba(123, 77, 255, 0.14)',
    borderColor: colors.border.violet,
  },
  greenBadge: {
    backgroundColor: 'rgba(167, 243, 208, 0.1)',
    borderColor: 'rgba(167, 243, 208, 0.24)',
  },
  badgeText: {
    ...typography.caption,
  },
  notice: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
    borderColor: colors.border.card,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  noticeText: {
    ...typography.caption,
    color: colors.text.muted,
  },
  disclaimer: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(167, 243, 208, 0.08)',
    borderColor: 'rgba(167, 243, 208, 0.22)',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
  },
  disclaimerText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  infoRow: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.card,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 64,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: radii.pill,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  infoText: {
    flex: 1,
    gap: spacing.xs,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  infoValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
  },
  staticField: {
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.card,
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: 64,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  staticFieldLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  fieldValue: {
    ...typography.body,
    color: colors.text.primary,
  },
  cardAction: {
    marginTop: spacing.md,
  },
  loadingRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  loadingDot: {
    backgroundColor: colors.accent.gold,
    borderRadius: radii.pill,
    height: 8,
    opacity: 0.86,
    width: 8,
  },
  loadingDotSoft: {
    backgroundColor: colors.accent.softPink,
  },
  shareCard: {
    aspectRatio: 9 / 16,
    borderColor: colors.border.subtleGold,
    borderRadius: radii.xl,
    borderWidth: 1,
    justifyContent: 'space-between',
    maxHeight: 500,
    minHeight: 380,
    overflow: 'hidden',
    padding: spacing.lg,
    ...shadows.gold,
  },
  shareMoon: {
    color: colors.accent.gold,
    fontSize: 46,
    textAlign: 'center',
  },
  shareEyebrow: {
    ...typography.caption,
    color: colors.accent.gold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  shareTitle: {
    color: colors.text.primary,
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 40,
    textAlign: 'center',
  },
  shareMessage: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  shareMetaRow: {
    borderColor: colors.border.subtleGold,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  shareMetaLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  shareMetaValue: {
    ...typography.body,
    color: colors.text.primary,
  },
  list: {
    gap: spacing.sm,
  },
});
