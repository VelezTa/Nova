import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

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
  PlaceholderNotice,
  SafeDisclaimerBlock,
  ScreenHeader,
  SectionHeader,
  ShareCardPreview,
  StaticField,
} from '@/components';
import { useAuth } from '@/features/auth/auth-context';
import {
  DailyCardHistoryPreview,
  DailyCardHomeSummary,
} from '@/features/daily-card';
import { useNovaSound, type NovaSoundVolume } from '@/sound/nova-sound';
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
        <Text style={styles.referenceEyebrow}>Good evening, Erika</Text>
        <Text style={styles.referenceTitle}>Your cosmic profile</Text>
        <Text style={styles.referenceBody}>
          A symbolic view of your energy and patterns.
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

      <AppButton href="/home" label="Open my guide" />
    </CosmicScreen>
  );
}

export function HomeScreen() {
  const { profile } = useAuth();
  const displayName = profile?.name ?? 'there';

  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant="home" />}
      contentStyle={styles.homeContent}
    >
      <View style={styles.homeTopRow}>
        <View>
          <Text style={styles.homeTitle}>Good evening, {displayName}</Text>
          <Text style={styles.homeSubtitle}>
            A calm place for daily guidance and reflection.
          </Text>
        </View>
        <View style={styles.homeMark}>
          <Ionicons
            name="sparkles-outline"
            color={colors.accent.gold}
            size={24}
          />
        </View>
      </View>

      <View style={styles.dailySummaryCard}>
        <HomeFeatureCardBackground>
          <DailyCardHomeSummary />
        </HomeFeatureCardBackground>
      </View>

      <CelestialCard icon="chatbubble-ellipses-outline" title="Talk with Nova">
        <Text style={styles.body}>
          Ask for a grounded, positive perspective when you want clarity.
        </Text>
        <AppButton
          href="/chat"
          label="Talk to Nova"
          style={styles.cardAction}
        />
      </CelestialCard>

      <View style={styles.homeSection}>
        <SectionHeader title="Cosmic tools" />
        <View style={styles.toolGrid}>
          <HomeToolCard
            description="Symbolic signals from your hand."
            href="/palm"
            icon="hand-left-outline"
            title="Palm reading"
          />
          <HomeToolCard
            description="Reflect on connection patterns."
            href="/compatibility"
            icon="heart-outline"
            title="Compatibility"
          />
          <HomeToolCard
            description="A calm chart preview."
            href="/birth-chart"
            icon="planet-outline"
            title="Birth chart"
          />
          <HomeToolCard
            description="A softer rhythm for the week."
            href="/weekly"
            icon="calendar-outline"
            title="Weekly prediction"
          />
          <HomeToolCard
            description="Today's symbolic card."
            href="/daily"
            icon="sunny-outline"
            title="Daily energy"
          />
          <HomeToolCard
            description="Gentle prompts for grounding."
            href="/rituals"
            icon="flower-outline"
            title="Rituals"
          />
        </View>
      </View>

      <View style={styles.homeSection}>
        <SectionHeader title="Reflect" />
        <View style={styles.shortcutRow}>
          <HomeSmallShortcut
            href="/journal"
            icon="journal-outline"
            label="Journal"
          />
          <HomeSmallShortcut
            href="/profile"
            icon="person-circle-outline"
            label="Cosmic profile"
          />
        </View>
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
        body="A quiet place for future reflections and saved guidance."
        eyebrow="Journal"
        icon="journal-outline"
        title="Your reflections"
      />
      <EmptyStateCard
        actionHref="/daily"
        actionLabel="View daily energy"
        body="Saved reflections and readings will appear here after persistence is approved."
        icon="bookmark-outline"
        title="Nothing saved yet"
      />
    </CosmicScreen>
  );
}

export function BirthChartScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="A static preview for future symbolic chart guidance."
        eyebrow="Cosmic tool"
        icon="planet-outline"
        title="Birth chart"
      />
      <CelestialCard icon="sparkles-outline" title="Chart preview">
        <Text style={styles.body}>
          Your chart will later offer positive, reflective guidance based on
          approved profile details.
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
        body="Short prompts for calm reflection."
        eyebrow="Cosmic tool"
        icon="flower-outline"
        title="Rituals"
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

export function DailyScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="clarity" />}>
      <ScreenHeader
        body="A symbolic card for today's energy."
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
        <AppButton disabled label="Share later" variant="ghost" />
      </View>
    </CosmicScreen>
  );
}

export function WeeklyScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthTime" />}>
      <ScreenHeader
        body="A calm preview for the days ahead."
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
        body="A static chat preview for future reflective guidance."
        icon="chatbubble-ellipses-outline"
        title="Talk with Nova"
      />
      <PlaceholderNotice />
      <View style={styles.chatStack}>
        <ChatBubble side="right" text="What should I focus on today?" />
        <ChatBubble text="A helpful focus may be choosing one calm next step and letting the rest become clearer with time." />
        <ChatBubble side="right" text="Give me clarity in love." />
      </View>
      <View style={styles.optionGrid}>
        {['What should I focus on today?', 'Give me clarity in love'].map(
          (prompt) => (
            <Badge key={prompt} icon="sparkles-outline" tone="violet">
              {prompt}
            </Badge>
          ),
        )}
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
        body="A simple preview for future symbolic palm guidance."
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
      <AppButton href="/palm-upload" label="Start reading" />
    </CosmicScreen>
  );
}

export function PalmUploadScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="name" />}>
      <ScreenHeader
        body="Static placeholders only. No camera or upload logic runs here."
        icon="cloud-upload-outline"
        title="Palm photos"
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
      <AppButton href="/palm-result" label="Preview result" />
    </CosmicScreen>
  );
}

export function PalmResultScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="safeSpace" />}>
      <ScreenHeader
        body="A safe symbolic result preview."
        icon="sparkles-outline"
        title="Palm result"
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
        body="A positive preview for two cosmic profiles."
        icon="heart-outline"
        title="Compatibility"
      />
      <PlaceholderNotice />
      <CelestialCard icon="people-outline" title="Connection preview">
        <Text style={styles.body}>
          Reflect on connection patterns with warm, non-deterministic guidance.
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
        body="Static fields for the future compatibility flow."
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
      <AppButton href="/compatibility/result" label="Preview result" />
    </CosmicScreen>
  );
}

export function CompatibilityResultScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="welcome" />}>
      <ScreenHeader
        body="Positive, reflective, and non-deterministic."
        icon="heart-circle-outline"
        title="Magnetic Balance"
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
        body="Premium preview. Purchases are not active."
        icon="diamond-outline"
        title="Nova Plus"
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
      <AppButton
        disabled
        label="Purchases disabled in preview"
        variant="secondary"
      />
      <AppButton disabled label="Restore purchases later" variant="ghost" />
    </CosmicScreen>
  );
}

export function ProfileScreen() {
  const { profile } = useAuth();

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="cosmic" />}>
      <ScreenHeader
        body="Your profile, saved guidance, and quiet preferences."
        icon="person-circle-outline"
        title="Profile"
      />
      <CelestialCard icon="moon-outline" title={profile?.name ?? 'Profile'}>
        <Text style={styles.body}>
          Your private cosmic profile is saved for reflective guidance.
        </Text>
      </CelestialCard>
      <InfoList
        items={[
          {
            label: 'Main interest',
            value: profile?.mainInterest ?? 'Not set',
            icon: 'sparkles-outline',
          },
          {
            label: 'Saved',
            value: 'Private Daily Card history.',
            icon: 'bookmark-outline',
          },
          {
            label: 'Settings',
            value: 'Sound and account preferences.',
            icon: 'settings-outline',
          },
          {
            label: 'Nova Plus',
            value: 'Visual paywall target.',
            icon: 'diamond-outline',
          },
        ]}
      />
      <View style={styles.buttonRow}>
        <AppButton href="/settings" label="Open settings" />
        <AppButton
          href="/saved-readings"
          label="Saved readings"
          variant="secondary"
        />
      </View>
      <DailyCardHistoryPreview />
      <AppButton href="/paywall" label="View paywall target" variant="ghost" />
    </CosmicScreen>
  );
}

export function SavedReadingsScreen() {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant="home" />}>
      <ScreenHeader
        body="A future home for saved readings."
        icon="bookmark-outline"
        title="Saved readings"
      />
      <PlaceholderNotice />
      <EmptyStateCard
        actionHref="/daily"
        actionLabel="View daily energy"
        body="Daily cards, palm readings, and compatibility notes will appear here after persistence is approved."
        icon="albums-outline"
        title="No saved guidance yet"
      />
    </CosmicScreen>
  );
}

export function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="birthDate" />}>
      <ScreenHeader
        body="Keep preferences simple and quiet."
        icon="settings-outline"
        title="Settings"
      />
      <SoundSettingsCard />
      <CelestialCard icon="person-circle-outline" title="Profile">
        <Text style={styles.body}>
          View your cosmic profile preview, saved guidance, and future account
          surfaces from here.
        </Text>
        <AppButton
          href="/profile"
          label="Open profile"
          style={styles.cardAction}
          variant="secondary"
        />
      </CelestialCard>
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
      <AppButton
        label="Sign out"
        onPress={() => {
          void signOut();
        }}
        variant="secondary"
      />
    </CosmicScreen>
  );
}

function HomeToolCard({
  description,
  href,
  icon,
  title,
}: {
  description: string;
  href: string;
  icon: IconName;
  title: string;
}) {
  const router = useRouter();
  const { play } = useNovaSound();

  return (
    <CosmicPressable
      onPress={() => router.push(href as never)}
      sound={() => play('card')}
      style={styles.homeToolCard}
    >
      <View style={styles.homeToolIcon}>
        <Ionicons name={icon} color={colors.accent.gold} size={20} />
      </View>
      <Text style={styles.homeToolTitle}>{title}</Text>
      <Text style={styles.homeToolDescription}>{description}</Text>
    </CosmicPressable>
  );
}

function HomeSmallShortcut({
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
      sound={() => play('tap')}
      style={styles.homeSmallShortcut}
    >
      <Ionicons name={icon} color={colors.accent.gold} size={18} />
      <Text style={styles.homeSmallShortcutText}>{label}</Text>
    </CosmicPressable>
  );
}

const volumeOptions: { label: string; value: NovaSoundVolume }[] = [
  { label: 'Soft', value: 'soft' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Full', value: 'full' },
];

function SoundSettingsCard() {
  const {
    ambientEnabled,
    effectsEnabled,
    setAmbientEnabled,
    setEffectsEnabled,
    setVolume,
    volume,
  } = useNovaSound();
  const volumeDisabled = !ambientEnabled && !effectsEnabled;

  return (
    <CelestialCard icon="volume-medium-outline" title="Sound">
      <View style={styles.settingStack}>
        <SoundSettingRow
          description="Gentle taps and card reveal sounds."
          label="Sound effects"
          onValueChange={setEffectsEnabled}
          value={effectsEnabled}
        />
        <SoundSettingRow
          description="A quiet mystical nature loop while enabled."
          label="Mystical ambient sound"
          onValueChange={setAmbientEnabled}
          value={ambientEnabled}
        />
        <View style={styles.volumeBlock}>
          <Text style={styles.settingLabel}>Volume</Text>
          <View style={styles.volumeOptions}>
            {volumeOptions.map((option) => {
              const selected = option.value === volume;

              return (
                <Pressable
                  accessibilityRole="button"
                  disabled={volumeDisabled}
                  key={option.value}
                  onPress={() => setVolume(option.value)}
                  style={[
                    styles.volumeOption,
                    selected && styles.volumeOptionSelected,
                    volumeDisabled && styles.volumeOptionDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.volumeOptionText,
                      selected && styles.volumeOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </CelestialCard>
  );
}

function SoundSettingRow({
  description,
  label,
  onValueChange,
  value,
}: {
  description: string;
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingText}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        ios_backgroundColor="rgba(255, 255, 255, 0.16)"
        onValueChange={onValueChange}
        thumbColor={value ? colors.accent.gold : colors.text.secondary}
        trackColor={{
          false: 'rgba(255, 255, 255, 0.16)',
          true: 'rgba(246, 199, 106, 0.36)',
        }}
        value={value}
      />
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
  cardAction: {
    marginTop: spacing.md,
  },
  dailySummaryCard: {
    borderColor: 'rgba(255, 211, 110, 0.34)',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dailySummaryCopy: {
    gap: spacing.sm,
  },
  dailySummaryOverlay: {
    flex: 1,
    gap: spacing.lg,
    justifyContent: 'space-between',
    minHeight: 268,
    padding: spacing.lg,
  },
  dailySummaryTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  energyLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  energyPanel: {
    backgroundColor: 'rgba(6, 5, 24, 0.62)',
    borderColor: 'rgba(255, 211, 110, 0.18)',
    borderRadius: 16,
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
    gap: spacing['2xl'],
  },
  featureBody: {
    color: colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
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
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  featureTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 29,
    lineHeight: 34,
  },
  homeMark: {
    alignItems: 'center',
    backgroundColor: 'rgba(6, 5, 24, 0.62)',
    borderColor: 'rgba(255, 211, 110, 0.24)',
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  homeContent: {
    gap: spacing['2xl'],
    paddingTop: spacing.lg,
  },
  homeSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 3,
    maxWidth: 300,
  },
  homeSection: {
    gap: spacing.sm,
  },
  homeSmallShortcut: {
    alignItems: 'center',
    backgroundColor: 'rgba(10, 8, 31, 0.66)',
    borderColor: 'rgba(255, 211, 110, 0.14)',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  homeSmallShortcutText: {
    ...typography.button,
    color: colors.text.primary,
  },
  homeTitle: {
    color: colors.text.primary,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 28,
    lineHeight: 32,
  },
  homeTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  homeToolCard: {
    backgroundColor: 'rgba(10, 8, 31, 0.72)',
    borderColor: 'rgba(255, 211, 110, 0.14)',
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    gap: spacing.xs,
    minHeight: 128,
    padding: spacing.md,
  },
  homeToolDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  homeToolIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 211, 110, 0.1)',
    borderColor: 'rgba(255, 211, 110, 0.2)',
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  homeToolTitle: {
    ...typography.button,
    color: colors.text.primary,
  },
  optionGrid: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  profileImageSpacer: {
    minHeight: 96,
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
    borderRadius: 16,
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
    fontSize: 36,
    lineHeight: 40,
  },
  referenceTopBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultContent: {
    gap: spacing.md,
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
  settingDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  settingLabel: {
    ...typography.button,
    color: colors.text.primary,
  },
  settingRow: {
    alignItems: 'center',
    borderColor: colors.border.card,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    minHeight: 58,
    paddingBottom: spacing.md,
  },
  settingStack: {
    gap: spacing.lg,
  },
  settingText: {
    flex: 1,
    gap: 3,
  },
  shortcutRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  volumeBlock: {
    gap: spacing.sm,
  },
  volumeOption: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
    borderWidth: 1,
    flex: 1,
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  volumeOptionDisabled: {
    opacity: 0.48,
  },
  volumeOptionSelected: {
    backgroundColor: 'rgba(246, 199, 106, 0.14)',
    borderColor: 'rgba(246, 199, 106, 0.4)',
  },
  volumeOptionText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  volumeOptionTextSelected: {
    color: colors.accent.gold,
  },
  volumeOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  buttonRow: {
    gap: spacing.sm,
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
