import { StyleSheet, Text, View } from 'react-native';

import {
  RealBirthDateScreen,
  RealBirthPlaceScreen,
  RealBirthTimeScreen,
  RealInterestScreen,
  RealNameScreen,
  RealWelcomeScreen,
} from './onboarding-real-ui';

import {
  AppButton,
  Badge,
  CelestialCard,
  CosmicScreen,
  EmptyStateCard,
  FeatureShortcutCard,
  InfoList,
  LoadingStateCard,
  PlaceholderNotice,
  SafeDisclaimerBlock,
  ScreenHeader,
  SectionHeader,
  ShareCardPreview,
  StaticField,
} from '@/components';
import { colors, spacing, typography } from '@/theme';

const dailyMessage =
  'Today invites you to slow down, listen closely, and choose what feels peaceful.';

export function WelcomeScreen() {
  return <RealWelcomeScreen />;
}

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
    <CosmicScreen>
      <ScreenHeader
        body="A preview of the future profile summary, written as symbolic reflection."
        title="Your cosmic profile preview"
      />
      <PlaceholderNotice />
      <CelestialCard
        eyebrow="Preview insight"
        icon="planet-outline"
        title="Soft Creative Focus"
      >
        <Text style={styles.body}>
          Your profile may reflect curiosity, warmth, and a helpful desire to
          understand emotional patterns with care.
        </Text>
        <View style={styles.metaRow}>
          <Badge icon="sparkles-outline">Gemini</Badge>
          <Badge icon="heart-outline" tone="violet">
            Emotional clarity
          </Badge>
        </View>
      </CelestialCard>
      <SafeDisclaimerBlock />
      <AppButton href="/home" label="Enter Nova" />
    </CosmicScreen>
  );
}

export function HomeScreen() {
  return (
    <CosmicScreen>
      <ScreenHeader
        body="Welcome back. Your setup-only cosmic dashboard is ready to preview."
        eyebrow="Good evening, Erika"
        icon="moon-outline"
        title="Your cosmic guide"
      />
      <PlaceholderNotice />
      <CelestialCard
        eyebrow="Card of the day"
        footer={
          <View style={styles.metaRowSpread}>
            <InfoPill label="Word" value="Clarity" />
            <InfoPill label="Number" value="7" />
            <InfoPill label="Color" value="Gold" />
          </View>
        }
        icon="card-outline"
        title="A soft reset is available"
      >
        <Text style={styles.body}>{dailyMessage}</Text>
      </CelestialCard>
      <SectionHeader actionHref="/daily" actionLabel="Open" title="Today" />
      <View style={styles.grid}>
        <FeatureShortcutCard
          description="A calm weekly preview"
          href="/weekly"
          icon="calendar-outline"
          title="Weekly"
        />
        <FeatureShortcutCard
          description="Reflective chat preview"
          href="/chat"
          icon="chatbubble-ellipses-outline"
          title="Ask Nova"
        />
        <FeatureShortcutCard
          description="Symbolic hand reading"
          href="/palm"
          icon="hand-left-outline"
          title="Palm"
        />
        <FeatureShortcutCard
          description="Positive connection view"
          href="/compatibility"
          icon="heart-outline"
          title="Compatibility"
        />
      </View>
    </CosmicScreen>
  );
}

export function DailyScreen() {
  return (
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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
    <CosmicScreen>
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

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoPill}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={styles.pillValue}>{value}</Text>
    </View>
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
  stack: {
    gap: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  optionGrid: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  metaRowSpread: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  infoPill: {
    gap: spacing.xs,
  },
  pillLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  pillValue: {
    ...typography.bodySmall,
    color: colors.text.primary,
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
