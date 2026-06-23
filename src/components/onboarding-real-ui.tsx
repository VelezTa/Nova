import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ComponentProps, PropsWithChildren } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { CosmicOnboardingBackground } from './cosmic-onboarding-background';

type IconName = ComponentProps<typeof Ionicons>['name'];
type RouteTarget = string;
type ScreenVariant =
  | 'name'
  | 'birthDate'
  | 'birthTime'
  | 'birthPlace'
  | 'interest';

type Field = {
  icon: IconName;
  label: string;
  value: string;
};

type Choice = {
  icon: IconName;
  label: string;
};

export const onboardingTokens = {
  screenPadding: 28,
  topSafeAreaSpacing: 20,
  labelSpacing: 8,
  titleFontSize: 31,
  titleLineHeight: 35,
  subtitleFontSize: 13,
  subtitleLineHeight: 19,
  cardWidth: '100%',
  cardMinHeight: 82,
  cardBorderRadius: 16,
  cardBorderColor: 'rgba(255, 205, 108, 0.34)',
  cardBackgroundOpacity: 0.82,
  inputHeight: 86,
  chipHeight: 38,
  radioRowHeight: 48,
  ctaHeight: 52,
  ctaBottomSpacing: 9,
  goldTextColor: '#FFD36E',
  creamTextColor: '#FFF1C8',
  mutedTextColor: '#D3C6F5',
  backgroundGradientColors: ['#020513', '#07071C', '#120823'] as [
    string,
    string,
    string,
  ],
} as const;

const fonts = {
  display: 'CormorantGaramond_700Bold',
  body: 'NunitoSans_400Regular',
  bodySemi: 'NunitoSans_600SemiBold',
  bodyBold: 'NunitoSans_700Bold',
  bodyExtraBold: 'NunitoSans_800ExtraBold',
} as const;

const colors = {
  ink: '#030412',
  deepInk: '#070417',
  gold: onboardingTokens.goldTextColor,
  cream: onboardingTokens.creamTextColor,
  rose: '#F076BE',
  card: 'rgba(21, 17, 43, 0.82)',
  goldBorder: onboardingTokens.cardBorderColor,
  fieldBorder: 'rgba(214, 168, 255, 0.28)',
} as const;

const setupCopy = {
  notice: 'Phase 3 setup-only placeholder',
  eyebrow: 'PHASE 3 SETUP',
} as const;

export function RealNameScreen() {
  return (
    <SetupScreen
      body="This screen will collect a preferred name later. For now it previews the visual style only."
      fields={[{ icon: 'person-outline', label: 'Name', value: 'Erika' }]}
      nextHref="/birth-date"
      title="What should Nova call you?"
      variant="name"
    />
  );
}

export function RealBirthDateScreen() {
  return (
    <SetupScreen
      body="Birth details will support symbolic personalization after onboarding is approved."
      fields={[
        {
          icon: 'calendar-outline',
          label: 'Date of birth',
          value: 'May 21, 1994',
        },
      ]}
      nextHref="/birth-time"
      title="When were you born?"
      variant="birthDate"
    />
  );
}

export function RealBirthTimeScreen() {
  return (
    <SetupScreen
      body="Nova will support exact, approximate, and unknown birth time paths in a later phase."
      nextHref="/birth-place"
      radioOptions={[
        { icon: 'ellipse-outline', label: 'Exact time' },
        { icon: 'ellipse-outline', label: 'Approximate range' },
        { icon: 'ellipse-outline', label: 'I do not know' },
      ]}
      title="Do you know your birth time?"
      variant="birthTime"
    />
  );
}

export function RealBirthPlaceScreen() {
  return (
    <SetupScreen
      body="Location fields are static here and are not connected to storage or geocoding."
      fields={[
        { icon: 'location-outline', label: 'City', value: 'San Juan' },
        { icon: 'globe-outline', label: 'Country', value: 'Puerto Rico' },
      ]}
      nextHref="/interest"
      title="Where were you born?"
      variant="birthPlace"
    />
  );
}

export function RealInterestScreen() {
  return (
    <SetupScreen
      body="These preview chips match the approved guidance themes without saving a selection."
      chips={[
        { icon: 'heart-outline', label: 'Love' },
        { icon: 'briefcase-outline', label: 'Career' },
        { icon: 'cash-outline', label: 'Money' },
        { icon: 'star-outline', label: 'Self-growth' },
        { icon: 'flower-outline', label: 'Emotional clarity' },
        { icon: 'people-outline', label: 'Compatibility' },
        { icon: 'moon-outline', label: 'Daily guidance' },
      ]}
      nextHref="/cosmic-profile"
      title="What do you want guidance on most?"
      variant="interest"
    />
  );
}

type SetupScreenProps = {
  title: string;
  body: string;
  nextHref: RouteTarget;
  variant: ScreenVariant;
  fields?: Field[];
  radioOptions?: Choice[];
  chips?: Choice[];
};

function SetupScreen({
  title,
  body,
  nextHref,
  variant,
  fields = [],
  radioOptions = [],
  chips = [],
}: SetupScreenProps) {
  return (
    <OnboardingScreen variant={variant}>
      <View style={styles.setupHeader}>
        <SparkleBadge />
        <Text style={styles.eyebrow}>{setupCopy.eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>

      <SetupNotice
        compact={variant === 'birthTime' || variant === 'interest'}
      />

      {fields.length > 0 ? (
        <View style={styles.fieldStack}>
          {fields.map((field) => (
            <InputCard key={field.label} {...field} />
          ))}
        </View>
      ) : null}

      {radioOptions.length > 0 ? (
        <View style={styles.radioStack}>
          {radioOptions.map((option) => (
            <RadioRow key={option.label} {...option} />
          ))}
        </View>
      ) : null}

      {chips.length > 0 ? (
        <View style={styles.chipGrid}>
          {chips.map((chip) => (
            <InterestChip key={chip.label} {...chip} />
          ))}
        </View>
      ) : null}

      <View style={styles.bottomActions}>
        <GradientButton href={nextHref} label="Continue" />
      </View>
    </OnboardingScreen>
  );
}

function OnboardingScreen({
  children,
  variant,
}: PropsWithChildren<{ variant: ScreenVariant }>) {
  const { height, width } = useWindowDimensions();
  const compact = height < 820;
  const maxWidth = Math.min(width, 402);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient
        colors={onboardingTokens.backgroundGradientColors}
        style={StyleSheet.absoluteFill}
      />
      <CosmicOnboardingBackground />
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <View
          style={[
            styles.content,
            compact && styles.compactContent,
            { maxWidth },
            variant === 'interest' && styles.interestContent,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}

function SparkleBadge() {
  return (
    <View style={styles.sparkleBadge}>
      <SparkleIcon size={38} />
    </View>
  );
}

function SparkleIcon({ size }: { size: number }) {
  return (
    <Svg height={size} viewBox="0 0 52 52" width={size}>
      <Path
        d="M25 2 C28 16 34 22 50 25 C34 28 28 34 25 50 C22 34 16 28 2 25 C16 22 22 16 25 2Z"
        fill="none"
        stroke="#FFD36E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <Path
        d="M9 4 C10 10 13 13 19 14 C13 15 10 18 9 24 C8 18 5 15 -1 14 C5 13 8 10 9 4Z"
        fill="none"
        stroke="#FFD36E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        transform="translate(4 8)"
      />
      <Path
        d="M38 7 C39 13 42 16 48 17 C42 18 39 21 38 27 C37 21 34 18 28 17 C34 16 37 13 38 7Z"
        fill="none"
        stroke="#FFD36E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </Svg>
  );
}

function SetupNotice({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.notice, compact && styles.compactNotice]}>
      <Ionicons name="construct-outline" color={colors.gold} size={21} />
      <Text style={styles.noticeText}>{setupCopy.notice}</Text>
      <View style={styles.noticeDot} />
    </View>
  );
}

function InputCard({ icon, label, value }: Field) {
  return (
    <View style={styles.inputCard}>
      <View style={styles.inputLabelRow}>
        <Ionicons name={icon} color={colors.gold} size={20} />
        <Text style={styles.inputLabel}>{label}</Text>
      </View>
      <TextInput
        accessibilityLabel={label}
        cursorColor={colors.gold}
        defaultValue={value}
        placeholder={label}
        placeholderTextColor="rgba(229, 218, 255, 0.6)"
        selectionColor="rgba(255, 211, 110, 0.35)"
        style={styles.textInput}
      />
    </View>
  );
}

function RadioRow({ icon, label }: Choice) {
  return (
    <Pressable accessibilityRole="radio" style={styles.radioRow}>
      <Ionicons name={icon} color="#DFA5FF" size={24} />
      <Text style={styles.radioText}>{label}</Text>
    </Pressable>
  );
}

function InterestChip({ icon, label }: Choice) {
  const wide = label === 'Daily guidance';

  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.chip, wide && styles.wideChip]}
    >
      <Ionicons
        name={icon}
        color={wide ? colors.gold : colors.rose}
        size={18}
      />
      <Text style={styles.chipText}>{label}</Text>
    </Pressable>
  );
}

function GradientButton({
  href,
  icon,
  label,
}: {
  href: RouteTarget;
  icon?: IconName;
  label: string;
}) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(href as never)}
      style={styles.buttonPressable}
    >
      <LinearGradient
        colors={['#FFD06F', '#EA78D6', '#8B45FF']}
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.button}
      >
        {icon ? <Ionicons name={icon} color={colors.ink} size={26} /> : null}
        <Text style={styles.buttonText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const titleShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.58)',
  textShadowOffset: { width: 0, height: 3 },
  textShadowRadius: 2,
} as const;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.ink,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    gap: 16,
    paddingBottom: onboardingTokens.ctaBottomSpacing,
    paddingHorizontal: onboardingTokens.screenPadding,
    paddingTop: onboardingTokens.topSafeAreaSpacing,
    width: '100%',
  },
  compactContent: {
    gap: 12,
    paddingTop: 5,
  },
  interestContent: {
    gap: 14,
  },
  setupHeader: {
    gap: onboardingTokens.labelSpacing,
    zIndex: 1,
  },
  sparkleBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 17, 35, 0.74)',
    borderColor: colors.goldBorder,
    borderRadius: 999,
    borderWidth: 1.2,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fonts.bodyExtraBold,
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  title: {
    ...titleShadow,
    color: colors.cream,
    fontFamily: fonts.display,
    fontSize: onboardingTokens.titleFontSize,
    letterSpacing: 0,
    lineHeight: onboardingTokens.titleLineHeight,
    maxWidth: 210,
  },
  body: {
    color: '#F1E8FF',
    fontFamily: fonts.body,
    fontSize: onboardingTokens.subtitleFontSize,
    letterSpacing: 0,
    lineHeight: onboardingTokens.subtitleLineHeight,
    maxWidth: 240,
  },
  notice: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 14, 30, 0.82)',
    borderColor: colors.goldBorder,
    borderRadius: 999,
    borderWidth: 1.2,
    flexDirection: 'row',
    gap: 9,
    minHeight: 38,
    paddingHorizontal: 13,
    width: '100%',
    zIndex: 1,
  },
  compactNotice: {
    width: '72%',
  },
  noticeText: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.bodyExtraBold,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 15,
  },
  noticeDot: {
    backgroundColor: colors.gold,
    borderRadius: 999,
    height: 4,
    width: 4,
  },
  fieldStack: {
    gap: 9,
    zIndex: 1,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderColor: colors.fieldBorder,
    borderRadius: onboardingTokens.cardBorderRadius,
    borderWidth: 1,
    minHeight: onboardingTokens.inputHeight,
    paddingHorizontal: 15,
    paddingVertical: 14,
    width: onboardingTokens.cardWidth,
  },
  inputLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
  },
  inputLabel: {
    color: 'rgba(229, 218, 255, 0.76)',
    fontFamily: fonts.body,
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
  },
  textInput: {
    color: colors.cream,
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 26,
    marginTop: 7,
    padding: 0,
  },
  radioStack: {
    gap: 8,
    zIndex: 1,
  },
  radioRow: {
    alignItems: 'center',
    backgroundColor: 'rgba(47, 19, 73, 0.78)',
    borderColor: 'rgba(196, 103, 255, 0.45)',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 11,
    height: onboardingTokens.radioRowHeight,
    paddingHorizontal: 15,
  },
  radioText: {
    color: '#F0DFFF',
    fontFamily: fonts.bodySemi,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 21,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    zIndex: 1,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: 'rgba(37, 17, 55, 0.82)',
    borderColor: 'rgba(205, 103, 255, 0.42)',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    height: onboardingTokens.chipHeight,
    paddingHorizontal: 11,
    width: '48.5%',
  },
  wideChip: {
    width: '100%',
  },
  chipText: {
    color: '#F0DFFF',
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 16,
  },
  bottomActions: {
    gap: 10,
    marginTop: 'auto',
    zIndex: 1,
  },
  buttonPressable: {
    borderRadius: 999,
  },
  button: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 16,
    height: onboardingTokens.ctaHeight,
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#15091D',
    fontFamily: fonts.bodyExtraBold,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 22,
  },
});
