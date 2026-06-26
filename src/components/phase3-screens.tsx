import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import {
  RealBirthDateScreen,
  RealBirthPlaceScreen,
  RealBirthTimeScreen,
  RealInterestScreen,
  RealNameScreen,
} from './onboarding-real-ui';
import {
  HomeFeatureCardBackground,
  Phase3VisualBackground,
} from './phase3-backgrounds';

import {
  AppButton,
  Badge,
  CelestialCard,
  CosmicGlow,
  CosmicPressable,
  CosmicScreen,
  EmptyStateCard,
  type IconName,
  InfoList,
  LoadingStateCard,
  PlaceholderNotice,
  SafeDisclaimerBlock,
  ScreenHeader,
  ShareCardPreview,
  StaticField,
} from '@/components';
import { useNovaSound } from '@/sound/nova-sound';
import { colors, spacing, typography } from '@/theme';

const dailyMessage =
  'Today invites you to slow down, listen closely, and choose what feels peaceful.';

export function NameScreen() {
  return <RealNameScreen />;
}

export function BirthDateScreen() {
  return <RealBirthDateScreen />;
}

export function BirthTimeScreen() {
  return <RealBirthTimeScreen />;
}

export function BirthPlaceScreen() {
  return <RealBirthPlaceScreen />;
}

export function InterestScreen() {
  return <RealInterestScreen />;
}

export function CosmicProfilePreviewScreen() {
  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant="profileResult" />}
      contentStyle={styles.resultContent}
    >
      <View style={styles.referenceTopBar}>
        <View style={styles.roundIconButton}>
          <Ionicons name="sparkles" color={colors.accent.gold} size={23} />
        </View>
        <View style={styles.roundIconButton}>
          <Ionicons
            name="settings-outline"
            color={colors.accent.gold}
            size={22}
          />
        </View>
      </View>

      <View style={styles.referenceHeader}>
        <Text style={styles.referenceEyebrow}>Good evening, Erika ✨</Text>
        <Text style={styles.referenceTitle}>Your cosmic profile</Text>
        <Text style={styles.referenceBody}>
          A symbolic vision of your energy and patterns.
        </Text>
      </View>

      <View style={styles.profileImageSpacer} />

      <View style={styles.referenceCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.cardTitleBlock}>
            <Text style={styles.referenceCardEyebrow}>Your essence</Text>
            <Text style={styles.referenceCardTitle}>
              Creative and sensitive focus
            </Text>
          </View>
          <View style={styles.smallRoundIcon}>
            <Ionicons
              name="planet-outline"
              color={colors.accent.gold}
              size={20}
            />
          </View>
        </View>
        <Text style={styles.referenceCardBody}>
          Curiosity, intuition, and warmth may be part of how you understand
          yourself and care for others.
        </Text>
        <View style={styles.referenceChipRow}>
          <ReferenceChip icon="sparkles-outline" label="Gemini" />
          <ReferenceChip
            icon="heart-outline"
            label="Emotional clarity"
            tone="violet"
          />
          <ReferenceChip
            icon="sparkles-outline"
            label="Empathic"
            tone="violet"
          />
        </View>
      </View>

      <View style={styles.energyPanel}>
        <View style={styles.energyHeader}>
          <Text style={styles.energyTitle}>Featured energies</Text>
          <Text style={styles.energyAction}>See more ›</Text>
        </View>
        <View style={styles.energyRow}>
          <EnergyBadge icon="heart-outline" label="Love" tone="pink" />
          <EnergyBadge icon="briefcase-outline" label="Work" />
          <EnergyBadge icon="cash-outline" label="Money" />
          <EnergyBadge icon="flower-outline" label="Wellness" tone="violet" />
        </View>
      </View>

      <AppButton href="/home" label="Explore my daily guide ✨" />
    </CosmicScreen>
  );
}

export function HomeScreen() {
  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant="home" />}
      contentStyle={styles.homeContent}
    >
      <View style={styles.homeTopRow}>
        <View>
          <Text style={styles.homeTitle}>Good evening, Erika ✨</Text>
          <Text style={styles.homeSubtitle}>
            What energy would you like to explore today?
          </Text>
        </View>
        <View style={styles.homeBell}>
          <Ionicons
            name="notifications-outline"
            color={colors.accent.gold}
            size={24}
          />
        </View>
      </View>

      <View style={styles.featureCard}>
        <HomeFeatureCardBackground>
          <View style={styles.featureCardOverlay}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="hand-left-outline"
                color={colors.accent.gold}
                size={23}
              />
            </View>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTitle}>Palm Reading</Text>
              <Text style={styles.featureBody}>
                Discover symbolic signals in your energy
              </Text>
            </View>
            <AppButton href="/palm" label="Start Reading" />
          </View>
        </HomeFeatureCardBackground>
      </View>
    </CosmicScreen>
  );
}

export function ExploreScreen() {
  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant="birthDate" />}
      contentStyle={styles.exploreContent}
    >
      <ScreenHeader
        body="Choose a static preview destination. These paths do not call AI, save data, or upload photos in this phase."
        eyebrow="Explore"
        icon="compass-outline"
        title="Explore your energy"
      />
      <View style={styles.exploreList}>
        <ExploreDestination
          href="/palm"
          icon="hand-left-outline"
          label="Palm Reading"
        />
        <ExploreDestination
          href="/compatibility"
          icon="heart-outline"
          label="Compatibility"
        />
        <ExploreDestination
          href="/birth-chart"
          icon="planet-outline"
          label="Birth Chart"
        />
        <ExploreDestination
          href="/weekly"
          icon="calendar-outline"
          label="Weekly Prediction"
        />
        <ExploreDestination
          href="/daily"
          icon="sunny-outline"
          label="Energy of the Day"
        />
        <ExploreDestination
          href="/rituals"
          icon="flower-outline"
          label="Rituals / Reflections"
        />
      </View>
    </CosmicScreen>
  );
}

export function JournalScreen() {
  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant="interest" />}
      contentStyle={styles.exploreContent}
    >
      <ScreenHeader
        body="A static journal surface for future reflections, saved cards, and reading history."
        eyebrow="Journal"
        icon="journal-outline"
        title="Your reflections"
      />
      <EmptyStateCard
        actionHref="/daily"
        actionLabel="View energy card"
        body="Saved reflections will appear here after persistence is approved."
        icon="bookmark-outline"
        title="No saved reflections yet"
      />
      <EmptyStateCard
        actionHref="/palm"
        actionLabel="Open palm preview"
        body="Future symbolic readings can be revisited from this space."
        icon="sparkles-outline"
        title="Reading history preview"
      />
    </CosmicScreen>
  );
}

export function BirthChartScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="A static placeholder for future symbolic birth chart guidance. No chart calculation or AI request is running here."
        eyebrow="Explore"
        icon="planet-outline"
        title="Birth Chart"
      />
      <CelestialCard icon="sparkles-outline" title="Chart preview">
        <Text style={styles.body}>
          Your birth chart will later offer positive, reflective guidance based
          on approved profile details.
        </Text>
      </CelestialCard>
      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

export function RitualsScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="A static placeholder for future reflective rituals and journaling prompts."
        eyebrow="Explore"
        icon="flower-outline"
        title="Rituals / Reflections"
      />
      <InfoList
        items={[
          {
            label: 'Evening reflection',
            value: 'Notice one moment that helped you feel grounded today.',
            icon: 'moon-outline',
          },
          {
            label: 'Gentle focus',
            value: 'Choose one supportive intention for tomorrow.',
            icon: 'sparkles-outline',
          },
        ]}
      />
      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

function ReferenceChip({
  icon,
  label,
  tone = 'gold',
}: {
  icon: IconName;
  label: string;
  tone?: 'gold' | 'violet';
}) {
  return (
    <View
      style={[
        styles.referenceChip,
        tone === 'violet' && styles.referenceChipViolet,
      ]}
    >
      <Ionicons
        name={icon}
        color={tone === 'gold' ? colors.accent.gold : colors.accent.softViolet}
        size={14}
      />
      <Text
        style={[
          styles.referenceChipText,
          tone === 'violet' && styles.referenceChipTextViolet,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function EnergyBadge({
  icon,
  label,
  tone = 'gold',
}: {
  icon: IconName;
  label: string;
  tone?: 'gold' | 'pink' | 'violet';
}) {
  const iconColor =
    tone === 'pink'
      ? '#F076BE'
      : tone === 'violet'
        ? colors.accent.softViolet
        : colors.accent.gold;

  return (
    <View style={styles.energyBadge}>
      <CosmicGlow>
        <View style={styles.energyIcon}>
          <Ionicons name={icon} color={iconColor} size={24} />
        </View>
      </CosmicGlow>
      <Text style={styles.energyLabel}>{label}</Text>
      <View style={styles.energyDots}>
        <View style={styles.energyDot} />
        <View style={styles.energyDot} />
        <View style={styles.energyDot} />
        <View style={[styles.energyDot, styles.energyDotMuted]} />
      </View>
    </View>
  );
}

function ExploreDestination({
  href,
  icon,
  label,
}: {
  href: string;
  icon: IconName;
  label: string;
}) {
  const router = useRouter();
  const { play } = useNovaSound();

  return (
    <CosmicPressable
      onPress={() => router.push(href as never)}
      sound={() => play('card')}
      style={styles.exploreDestination}
    >
      <View style={styles.exploreIcon}>
        <Ionicons name={icon} color={colors.accent.gold} size={22} />
      </View>
      <Text style={styles.exploreLabel}>{label}</Text>
      <Ionicons name="chevron-forward" color={colors.text.muted} size={18} />
    </CosmicPressable>
  );
}

export function DailyScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="clarity" />}>
      <ScreenHeader
        body="A static card template for future save, share, and download work."
        icon="sunny-outline"
        title="Daily card"
      />
      <PlaceholderNotice />
      <ShareCardPreview message={dailyMessage} title="Clarity" />
      <InfoList
        items={[
          { label: 'Energy', value: 'Soft Focus', icon: 'sparkles-outline' },
          {
            label: 'Lucky color',
            value: 'Gold',
            icon: 'color-palette-outline',
          },
          { label: 'Lucky number', value: '7', icon: 'ellipse-outline' },
        ]}
      />
      <View style={styles.buttonRow}>
        <AppButton disabled label="Save later" variant="secondary" />
        <AppButton disabled label="Share later" variant="secondary" />
      </View>
    </CosmicScreen>
  );
}

export function WeeklyScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthTime" />}>
      <ScreenHeader
        body="A calm weekly ritual preview using static safe content."
        icon="calendar-outline"
        title="Weekly prediction"
      />
      <PlaceholderNotice />
      <CelestialCard icon="moon-outline" title="A softer rhythm is opening">
        <Text style={styles.body}>
          This week may support small decisions, honest reflection, and gentle
          progress. You do not need to rush what is still becoming clear.
        </Text>
      </CelestialCard>
      <InfoList
        items={[
          {
            label: 'Love',
            value: 'Warm communication may feel supportive.',
            icon: 'heart-outline',
          },
          {
            label: 'Work',
            value: 'Steady focus could help one priority settle.',
            icon: 'briefcase-outline',
          },
          {
            label: 'Money',
            value: 'A mindful review may support calmer choices.',
            icon: 'wallet-outline',
          },
          {
            label: 'Wellness',
            value: 'Gentle pacing may help your energy feel clearer.',
            icon: 'flower-outline',
          },
        ]}
      />
    </CosmicScreen>
  );
}

export function ChatScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="cosmic" />}>
      <ScreenHeader
        body="A static chat shell. No AI request is sent in Phase 3."
        icon="chatbubble-ellipses-outline"
        title="Chat with your guide"
      />
      <PlaceholderNotice />
      <View style={styles.chatStack}>
        <ChatBubble side="right" text="What should I focus on today?" />
        <ChatBubble text="A helpful focus may be choosing one calm next step and letting the rest become clearer with time." />
        <ChatBubble side="right" text="Give me clarity in love." />
      </View>
      <View style={styles.optionGrid}>
        {[
          'What should I focus on today?',
          'Give me clarity in love',
          'How is my energy this week?',
          'What can I learn from this connection?',
        ].map((prompt) => (
          <Badge key={prompt} icon="sparkles-outline" tone="violet">
            {prompt}
          </Badge>
        ))}
      </View>
      <StaticField
        label="Message input"
        value="Disabled until AI chat phase"
        icon="send-outline"
      />
      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

export function PalmIntroScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthPlace" />}>
      <ScreenHeader
        body="A guided static entry point for symbolic palm reading."
        icon="hand-left-outline"
        title="Palm reading"
      />
      <PlaceholderNotice />
      <InfoList
        items={[
          {
            label: 'Lighting',
            value: 'Use clear, soft light.',
            icon: 'sunny-outline',
          },
          {
            label: 'Palm position',
            value: 'Keep one hand open and relaxed.',
            icon: 'hand-left-outline',
          },
          {
            label: 'Image quality',
            value: 'Avoid blur and strong shadows.',
            icon: 'images-outline',
          },
        ]}
      />
      <SafeDisclaimerBlock />
      <AppButton href="/palm-upload" label="Preview upload step" />
    </CosmicScreen>
  );
}

export function PalmUploadScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="name" />}>
      <ScreenHeader
        body="Static placeholders only. No camera, image picker, or upload logic exists here."
        icon="cloud-upload-outline"
        title="Palm photo placeholders"
      />
      <PlaceholderNotice />
      <StaticField
        label="Left hand"
        value="Photo placeholder only"
        icon="hand-left-outline"
      />
      <StaticField
        label="Right hand"
        value="Photo placeholder only"
        icon="hand-right-outline"
      />
      <AppButton
        href="/palm-result"
        label="Preview symbolic result"
        variant="secondary"
      />
    </CosmicScreen>
  );
}

export function PalmResultScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="safeSpace" />}>
      <ScreenHeader
        body="A static result layout with safe symbolic sections."
        icon="sparkles-outline"
        title="Palm result preview"
      />
      <PlaceholderNotice />
      <InfoList
        items={[
          {
            label: 'Heart line',
            value: 'May reflect warmth and careful emotional expression.',
            icon: 'heart-outline',
          },
          {
            label: 'Head line',
            value: 'Could suggest thoughtful focus and curiosity.',
            icon: 'bulb-outline',
          },
          {
            label: 'Growth area',
            value: 'A gentle invitation to trust steady progress.',
            icon: 'leaf-outline',
          },
        ]}
      />
      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

export function CompatibilityIntroScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="safeSpace" />}>
      <ScreenHeader
        body="A romantic, positive setup preview for two cosmic profiles."
        icon="heart-outline"
        title="Compatibility"
      />
      <PlaceholderNotice />
      <CelestialCard icon="people-outline" title="Explore a connection">
        <Text style={styles.body}>
          Create a positive compatibility reading based on two symbolic
          profiles. This Phase 3 screen does not save or submit data.
        </Text>
      </CelestialCard>
      <AppButton href="/compatibility/form" label="Preview form" />
    </CosmicScreen>
  );
}

export function CompatibilityFormScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="Static form surfaces for the future compatibility flow."
        icon="people-outline"
        title="Two profile preview"
      />
      <PlaceholderNotice />
      <StaticField
        label="Person A"
        value="Luna · May 21 · San Juan"
        icon="person-outline"
      />
      <StaticField
        label="Person B"
        value="Mateo · September 11 · Bogota"
        icon="person-outline"
      />
      <AppButton
        href="/compatibility/result"
        label="Preview result"
        variant="secondary"
      />
    </CosmicScreen>
  );
}

export function CompatibilityResultScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="welcome" />}>
      <ScreenHeader
        body="Static result copy stays positive, reflective, and non-deterministic."
        icon="heart-circle-outline"
        title="Warm Magnetic Balance"
      />
      <PlaceholderNotice />
      <CelestialCard
        eyebrow="Compatibility preview"
        icon="sparkles-outline"
        title="82%"
      >
        <Text style={styles.body}>
          This connection may bring a mix of emotional warmth and different
          communication rhythms. A healthy focus is patience, curiosity, and
          clear expression.
        </Text>
      </CelestialCard>
      <InfoList
        items={[
          {
            label: 'Emotional connection',
            value: 'Warmth may grow through steady attention.',
            icon: 'heart-outline',
          },
          {
            label: 'Communication',
            value: 'Clear words may help both people feel seen.',
            icon: 'chatbubble-outline',
          },
          {
            label: 'Growth',
            value: 'This pairing may invite patience and curiosity.',
            icon: 'leaf-outline',
          },
        ]}
      />
    </CosmicScreen>
  );
}

export function PaywallScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="homeFeature" />}>
      <ScreenHeader
        body="A visual paywall target only. No purchases, entitlements, or RevenueCat calls are implemented."
        icon="diamond-outline"
        title="Unlock your full cosmic guide"
      />
      <PlaceholderNotice label="Phase 3 paywall visual target only" />
      <CelestialCard
        eyebrow="Premium preview"
        icon="lock-closed-outline"
        title="Nova Plus"
      >
        <InfoList
          items={[
            {
              label: 'Daily cards',
              value: 'Premium visual styles later.',
              icon: 'card-outline',
            },
            {
              label: 'Palm readings',
              value: 'Full symbolic readings later.',
              icon: 'hand-left-outline',
            },
            {
              label: 'Compatibility',
              value: 'Extended insights later.',
              icon: 'heart-outline',
            },
          ]}
        />
      </CelestialCard>
      <AppButton disabled label="Purchases are disabled in Phase 3" />
      <AppButton disabled label="Restore purchases later" variant="ghost" />
    </CosmicScreen>
  );
}

export function ProfileScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="cosmic" />}>
      <ScreenHeader
        body="My Space preview for saved guidance, settings, and future subscription state."
        icon="person-circle-outline"
        title="My Space"
      />
      <PlaceholderNotice />
      <CelestialCard icon="moon-outline" title="Erika">
        <Text style={styles.body}>
          Your saved guidance and preferences will appear here after later
          phases are approved.
        </Text>
      </CelestialCard>
      <InfoList
        items={[
          {
            label: 'Saved readings',
            value: 'Open static saved view.',
            icon: 'bookmark-outline',
          },
          {
            label: 'Settings',
            value: 'Open static settings view.',
            icon: 'settings-outline',
          },
          {
            label: 'Paywall',
            value: 'Open visual paywall target.',
            icon: 'diamond-outline',
          },
        ]}
      />
      <View style={styles.buttonRow}>
        <AppButton href="/saved-readings" label="Saved" variant="secondary" />
        <AppButton href="/settings" label="Settings" variant="secondary" />
      </View>
      <AppButton href="/paywall" label="View paywall target" variant="ghost" />
    </CosmicScreen>
  );
}

export function SavedReadingsScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="Static empty states for saved daily cards, palm readings, and compatibility readings."
        icon="bookmark-outline"
        title="Saved readings"
      />
      <PlaceholderNotice />
      <EmptyStateCard
        actionHref="/daily"
        actionLabel="View today's card"
        body="Save daily cards, readings, and insights you want to revisit after persistence is approved."
        icon="albums-outline"
        title="Your saved guidance will appear here"
      />
      <EmptyStateCard
        actionHref="/compatibility"
        actionLabel="Start preview"
        body="Create a positive compatibility reading based on two cosmic profiles later."
        icon="heart-outline"
        title="Explore a connection"
      />
    </CosmicScreen>
  );
}

export function SettingsScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthDate" />}>
      <ScreenHeader
        body="Static settings target only. Preferences and account actions are not wired yet."
        icon="settings-outline"
        title="Settings"
      />
      <PlaceholderNotice />
      <InfoList
        items={[
          {
            label: 'Notifications',
            value: 'Later opt-in reminder settings.',
            icon: 'notifications-outline',
          },
          {
            label: 'Privacy',
            value: 'Later account and data controls.',
            icon: 'shield-checkmark-outline',
          },
          {
            label: 'Subscription',
            value: 'Later RevenueCat status surface.',
            icon: 'diamond-outline',
          },
        ]}
      />
      <LoadingStateCard
        body="Preparing your guidance is represented with a calm placeholder animation style."
        icon="moon-outline"
        title="Loading state preview"
      />
    </CosmicScreen>
  );
}

function ChatBubble({
  text,
  side = 'left',
}: {
  text: string;
  side?: 'left' | 'right';
}) {
  return (
    <View
      style={[styles.chatBubble, side === 'right' && styles.chatBubbleRight]}
    >
      <Text style={styles.chatBubbleText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    ...typography.body,
    color: colors.text.secondary,
  },
  cardHeaderRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  cardTitleBlock: {
    flex: 1,
    gap: 4,
  },
  energyAction: {
    ...typography.caption,
    color: colors.accent.gold,
  },
  energyBadge: {
    alignItems: 'center',
    flex: 1,
    gap: 3,
  },
  energyDot: {
    backgroundColor: colors.accent.violet,
    borderRadius: 999,
    height: 6,
    width: 6,
  },
  energyDotMuted: {
    opacity: 0.34,
  },
  energyDots: {
    flexDirection: 'row',
    gap: 4,
  },
  energyHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  energyIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(20, 15, 48, 0.82)',
    borderColor: 'rgba(167, 139, 250, 0.22)',
    borderRadius: 999,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  energyLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  energyPanel: {
    backgroundColor: 'rgba(6, 5, 24, 0.62)',
    borderColor: 'rgba(255, 211, 110, 0.18)',
    borderRadius: 18,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.md,
  },
  energyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  energyTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  exploreContent: {
    gap: spacing.xl,
  },
  exploreDestination: {
    alignItems: 'center',
    backgroundColor: 'rgba(10, 8, 31, 0.72)',
    borderColor: 'rgba(255, 211, 110, 0.16)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 58,
    padding: spacing.sm,
  },
  exploreIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 211, 110, 0.1)',
    borderColor: 'rgba(255, 211, 110, 0.2)',
    borderRadius: 999,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  exploreLabel: {
    ...typography.button,
    color: colors.text.primary,
    flex: 1,
  },
  exploreList: {
    gap: spacing.sm,
  },
  featureBody: {
    color: colors.text.secondary,
    fontSize: 17,
    lineHeight: 24,
    maxWidth: 244,
    textAlign: 'center',
  },
  featureCard: {
    borderColor: 'rgba(255, 211, 110, 0.34)',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
  },
  featureCardOverlay: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  featureCopy: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  featureIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 10, 48, 0.76)',
    borderColor: 'rgba(255, 211, 110, 0.28)',
    borderRadius: 999,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: spacing.lg,
    width: 50,
  },
  featureTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 34,
    lineHeight: 40,
    textAlign: 'center',
  },
  homeBell: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  homeContent: {
    gap: spacing.xl,
    paddingTop: spacing.xl,
  },
  homeSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 3,
  },
  homeTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 26,
    lineHeight: 31,
  },
  homeTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  optionGrid: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  profileImageSpacer: {
    minHeight: 126,
  },
  referenceBody: {
    color: colors.text.secondary,
    fontSize: 16,
    lineHeight: 23,
    maxWidth: 274,
  },
  referenceCard: {
    backgroundColor: 'rgba(8, 6, 28, 0.72)',
    borderColor: 'rgba(255, 211, 110, 0.34)',
    borderRadius: 18,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  referenceCardBody: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 21,
  },
  referenceCardEyebrow: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 15,
    lineHeight: 18,
  },
  referenceCardTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    lineHeight: 24,
  },
  referenceChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(246, 199, 106, 0.13)',
    borderColor: 'rgba(246, 199, 106, 0.32)',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  referenceChipRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  referenceChipText: {
    ...typography.caption,
    color: colors.accent.gold,
  },
  referenceChipTextViolet: {
    color: colors.accent.softViolet,
  },
  referenceChipViolet: {
    backgroundColor: 'rgba(123, 77, 255, 0.14)',
    borderColor: 'rgba(167, 139, 250, 0.28)',
  },
  referenceEyebrow: {
    color: colors.accent.gold,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  referenceHeader: {
    gap: spacing.sm,
  },
  referenceTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 39,
    lineHeight: 43,
  },
  referenceTopBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultContent: {
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  roundIconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(6, 5, 24, 0.62)',
    borderColor: 'rgba(255, 211, 110, 0.34)',
    borderRadius: 999,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  smallRoundIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(40, 21, 74, 0.76)',
    borderColor: 'rgba(255, 211, 110, 0.24)',
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  chatStack: {
    gap: spacing.md,
  },
  chatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface.elevated,
    borderColor: colors.border.card,
    borderRadius: 18,
    borderWidth: 1,
    maxWidth: '86%',
    padding: spacing.md,
  },
  chatBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(123, 77, 255, 0.28)',
    borderColor: colors.border.violet,
  },
  chatBubbleText: {
    ...typography.bodySmall,
    color: colors.text.primary,
  },
});
