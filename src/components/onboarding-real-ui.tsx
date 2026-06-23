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

type IconName = ComponentProps<typeof Ionicons>['name'];
type RouteTarget = string;
type ScreenVariant =
  | 'welcome'
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
  topSafeAreaSpacing: 18,
  labelSpacing: 9,
  titleFontSize: 30,
  titleLineHeight: 35,
  welcomeTitleFontSize: 44,
  welcomeTitleLineHeight: 50,
  subtitleFontSize: 15,
  subtitleLineHeight: 21,
  cardWidth: '100%',
  cardMinHeight: 86,
  cardBorderRadius: 18,
  cardBorderColor: 'rgba(255, 205, 108, 0.34)',
  cardBackgroundOpacity: 0.82,
  inputHeight: 86,
  chipHeight: 42,
  radioRowHeight: 52,
  ctaHeight: 64,
  ctaBottomSpacing: 12,
  goldTextColor: '#FFD36E',
  creamTextColor: '#FFF1C8',
  mutedTextColor: '#D3C6F5',
  purpleGlowColor: 'rgba(132, 68, 255, 0.5)',
  backgroundGradientColors: ['#030412', '#08051C', '#140A32'] as [
    string,
    string,
    string,
  ],
} as const;

const colors = {
  ink: '#030412',
  deepInk: '#070417',
  gold: onboardingTokens.goldTextColor,
  cream: onboardingTokens.creamTextColor,
  muted: onboardingTokens.mutedTextColor,
  violet: '#B47DFF',
  rose: '#F076BE',
  mint: '#9EF2D1',
  card: 'rgba(21, 17, 43, 0.82)',
  cardDeep: 'rgba(8, 8, 25, 0.88)',
  purpleBorder: 'rgba(174, 99, 255, 0.42)',
  goldBorder: onboardingTokens.cardBorderColor,
  fieldBorder: 'rgba(214, 168, 255, 0.28)',
} as const;

const setupCopy = {
  notice: 'Phase 3 setup-only placeholder',
  eyebrow: 'PHASE 3 SETUP',
} as const;

export function RealWelcomeScreen() {
  return (
    <OnboardingScreen variant="welcome">
      <View style={styles.welcomeHeader}>
        <MoonBadge />
        <Text style={[styles.eyebrow, styles.centerText]}>WELCOME TO NOVA</Text>
        <Text style={[styles.welcomeTitle, styles.centerText]}>Meet Nova</Text>
        <Text style={[styles.welcomeBody, styles.centerText]}>
          Your daily cosmic guide for clarity, energy, and self-discovery.
        </Text>
      </View>

      <View style={styles.welcomeCards}>
        <InfoCard icon="sparkles-outline" title="A softer daily ritual">
          Nova uses symbolic, positive guidance to support reflection and calm.
          Production onboarding starts in a later approved phase.
        </InfoCard>
        <SafetyCard />
      </View>

      <View style={styles.bottomActions}>
        <GradientButton href="/name" icon="arrow-forward" label="Begin" />
        <TextLink href="/home" label="Open Phase 3 home" />
      </View>
    </OnboardingScreen>
  );
}

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
  const maxWidth = Math.min(width, 430);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient
        colors={onboardingTokens.backgroundGradientColors}
        style={StyleSheet.absoluteFill}
      />
      <CosmicBackground variant={variant} />
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.content,
            compact && styles.compactContent,
            { maxWidth },
            variant === 'welcome' && styles.welcomeContent,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}

function CosmicBackground({ variant }: { variant: ScreenVariant }) {
  const zodiac = variant === 'birthTime';
  const constellation = variant === 'interest';
  const welcome = variant === 'welcome';

  return (
    <View pointerEvents="none" style={styles.backgroundLayer}>
      <View
        style={[styles.glow, styles.topGlow, welcome && styles.subtleGlow]}
      />
      <View
        style={[styles.glow, styles.bottomGlow, welcome && styles.subtleGlow]}
      />
      <View
        style={[styles.horizonGlow, variant === 'welcome' && styles.hidden]}
      />
      <StarField dense={variant !== 'welcome'} />
      {variant === 'welcome' ? <WelcomeMoon /> : null}
      {variant === 'name' || variant === 'birthPlace' ? (
        <CrescentPlanet />
      ) : null}
      {variant === 'birthDate' ? <RightPlanet /> : null}
      {zodiac ? <ZodiacWheel /> : null}
      {constellation ? <Constellation /> : null}
      {variant !== 'welcome' && variant !== 'interest' ? <Landscape /> : null}
      {variant === 'birthPlace' ? <Island /> : null}
    </View>
  );
}

function StarField({ dense }: { dense: boolean }) {
  const stars = dense
    ? [
        [36, 32, 4],
        [72, 74, 2],
        [126, 50, 3],
        [182, 98, 4],
        [258, 60, 3],
        [330, 120, 4],
        [344, 262, 2],
        [44, 226, 2],
        [210, 274, 3],
        [120, 346, 2],
        [292, 406, 3],
        [58, 472, 2],
        [218, 520, 3],
      ]
    : [
        [58, 96, 2],
        [132, 68, 2],
        [246, 120, 3],
        [320, 248, 2],
        [90, 520, 2],
        [286, 462, 2],
      ];

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map(([left, top, size], index) => (
        <View
          key={`${left}-${top}-${index}`}
          style={[
            styles.dotStar,
            {
              height: size,
              left,
              top,
              width: size,
            },
          ]}
        />
      ))}
      <Text style={[styles.starGlyph, styles.starGlyphOne]}>✦</Text>
      <Text style={[styles.starGlyph, styles.starGlyphTwo]}>✧</Text>
      <Text style={[styles.starGlyph, styles.starGlyphThree]}>✦</Text>
      {dense ? (
        <Text style={[styles.starGlyph, styles.starGlyphFour]}>✧</Text>
      ) : null}
    </View>
  );
}

function WelcomeMoon() {
  return (
    <View style={styles.welcomeMoonRing}>
      <Text style={styles.backgroundMoon}>☾</Text>
    </View>
  );
}

function CrescentPlanet() {
  return (
    <View style={styles.crescentWrap}>
      <LinearGradient
        colors={['rgba(255, 202, 115, 0.9)', 'rgba(166, 56, 144, 0.78)']}
        style={styles.crescentBody}
      />
      <View style={styles.crescentCut} />
    </View>
  );
}

function RightPlanet() {
  return (
    <View style={styles.planetWrap}>
      <LinearGradient
        colors={['rgba(255, 204, 112, 0.7)', 'rgba(123, 45, 202, 0.36)']}
        style={styles.planet}
      />
      <View style={styles.planetShade} />
    </View>
  );
}

function ZodiacWheel() {
  const ticks = Array.from({ length: 12 }, (_, index) => index * 30);

  return (
    <View style={styles.zodiacWheel}>
      <View style={styles.zodiacCircleOuter} />
      <View style={styles.zodiacCircleInner} />
      {ticks.map((rotation) => (
        <View
          key={rotation}
          style={[
            styles.zodiacTick,
            { transform: [{ rotate: `${rotation}deg` }] },
          ]}
        />
      ))}
      <Text style={[styles.zodiacMark, styles.zodiacMarkOne]}>Ⅲ</Text>
      <Text style={[styles.zodiacMark, styles.zodiacMarkTwo]}>Ⅵ</Text>
      <Text style={[styles.zodiacMark, styles.zodiacMarkThree]}>Ⅸ</Text>
      <View style={styles.zodiacSun} />
    </View>
  );
}

function Constellation() {
  const dots = [
    styles.constellationDot0,
    styles.constellationDot1,
    styles.constellationDot2,
    styles.constellationDot3,
    styles.constellationDot4,
    styles.constellationDot5,
  ];

  return (
    <View style={styles.constellation}>
      <View style={[styles.constellationLine, styles.constellationLineOne]} />
      <View style={[styles.constellationLine, styles.constellationLineTwo]} />
      <View style={[styles.constellationLine, styles.constellationLineThree]} />
      {dots.map((dotStyle, index) => (
        <View key={index} style={[styles.constellationDot, dotStyle]} />
      ))}
    </View>
  );
}

function Landscape() {
  return (
    <View style={styles.landscape}>
      <View style={[styles.mountain, styles.mountainLeft]} />
      <View style={[styles.mountain, styles.mountainRight]} />
      <View style={styles.sunset} />
      <View style={styles.waterLine} />
      <View style={[styles.waterLine, styles.waterLineTwo]} />
    </View>
  );
}

function Island() {
  return (
    <View style={styles.island}>
      <View style={styles.islandHill} />
      <View style={styles.palmTrunk} />
      <View style={[styles.palmLeaf, styles.palmLeafOne]} />
      <View style={[styles.palmLeaf, styles.palmLeafTwo]} />
      <View style={[styles.palmLeaf, styles.palmLeafThree]} />
    </View>
  );
}

function SparkleBadge() {
  return (
    <View style={styles.sparkleBadge}>
      <Ionicons name="sparkles-outline" color={colors.gold} size={35} />
    </View>
  );
}

function MoonBadge() {
  return (
    <View style={styles.moonBadge}>
      <Text style={styles.badgeMoon}>☾</Text>
    </View>
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
        editable={false}
        pointerEvents="none"
        style={styles.textInput}
        value={value}
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

function InfoCard({
  icon,
  title,
  children,
}: PropsWithChildren<{ icon: IconName; title: string }>) {
  return (
    <LinearGradient
      colors={['rgba(61, 22, 96, 0.9)', 'rgba(10, 9, 30, 0.96)']}
      style={styles.infoCard}
    >
      <View style={styles.infoTitleRow}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Ionicons name={icon} color={colors.gold} size={38} />
      </View>
      <Text style={styles.infoBody}>{children}</Text>
    </LinearGradient>
  );
}

function SafetyCard() {
  return (
    <View style={styles.safetyCard}>
      <Ionicons name="shield-checkmark-outline" color={colors.mint} size={31} />
      <Text style={styles.safetyText}>
        Nova offers symbolic guidance for reflection and entertainment, not
        medical, legal, financial, or emergency advice.
      </Text>
    </View>
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

function TextLink({ href, label }: { href: RouteTarget; label: string }) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => router.push(href as never)}
    >
      <Text style={styles.textLink}>{label}</Text>
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
    gap: 19,
    paddingBottom: onboardingTokens.ctaBottomSpacing,
    paddingHorizontal: onboardingTokens.screenPadding,
    paddingTop: onboardingTokens.topSafeAreaSpacing,
    width: '100%',
  },
  compactContent: {
    gap: 15,
    paddingTop: 12,
  },
  welcomeContent: {
    gap: 15,
    paddingTop: 34,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  glow: {
    borderRadius: 999,
    position: 'absolute',
  },
  topGlow: {
    backgroundColor: onboardingTokens.purpleGlowColor,
    height: 260,
    opacity: 0.42,
    right: -118,
    top: 112,
    width: 260,
  },
  subtleGlow: {
    opacity: 0.08,
  },
  bottomGlow: {
    backgroundColor: 'rgba(213, 74, 171, 0.34)',
    bottom: 82,
    height: 190,
    left: -120,
    width: 190,
  },
  horizonGlow: {
    backgroundColor: 'rgba(251, 169, 74, 0.46)',
    borderRadius: 999,
    bottom: 122,
    height: 88,
    left: '28%',
    opacity: 0.7,
    position: 'absolute',
    width: 160,
  },
  hidden: {
    opacity: 0,
  },
  dotStar: {
    backgroundColor: colors.gold,
    borderRadius: 999,
    opacity: 0.8,
    position: 'absolute',
  },
  starGlyph: {
    color: colors.gold,
    position: 'absolute',
  },
  starGlyphOne: {
    fontSize: 25,
    right: 34,
    top: 54,
  },
  starGlyphTwo: {
    fontSize: 18,
    left: 46,
    top: 118,
  },
  starGlyphThree: {
    fontSize: 16,
    right: 118,
    top: 154,
  },
  starGlyphFour: {
    fontSize: 19,
    left: 88,
    top: 244,
  },
  welcomeMoonRing: {
    alignItems: 'center',
    borderColor: 'rgba(255, 211, 110, 0.28)',
    borderRadius: 86,
    borderWidth: 2,
    height: 172,
    justifyContent: 'center',
    opacity: 0.38,
    position: 'absolute',
    right: 140,
    top: 180,
    width: 172,
  },
  backgroundMoon: {
    color: '#FFD676',
    fontFamily: 'Georgia',
    fontSize: 94,
    lineHeight: 108,
    transform: [{ rotate: '-14deg' }],
  },
  crescentWrap: {
    height: 82,
    position: 'absolute',
    right: 36,
    top: 80,
    transform: [{ rotate: '-21deg' }],
    width: 82,
  },
  crescentBody: {
    borderRadius: 999,
    height: 82,
    width: 82,
  },
  crescentCut: {
    backgroundColor: colors.deepInk,
    borderRadius: 999,
    height: 76,
    left: 25,
    position: 'absolute',
    top: -2,
    width: 76,
  },
  planetWrap: {
    borderColor: 'rgba(255, 199, 110, 0.28)',
    borderRadius: 118,
    borderWidth: 1,
    height: 236,
    overflow: 'hidden',
    position: 'absolute',
    right: -84,
    top: 120,
    width: 236,
  },
  planet: {
    borderRadius: 112,
    height: 224,
    width: 224,
  },
  planetShade: {
    backgroundColor: 'rgba(36, 4, 54, 0.48)',
    borderRadius: 999,
    height: 190,
    left: -34,
    position: 'absolute',
    top: 30,
    width: 190,
  },
  zodiacWheel: {
    alignItems: 'center',
    height: 250,
    justifyContent: 'center',
    position: 'absolute',
    right: -76,
    top: 190,
    width: 250,
  },
  zodiacCircleOuter: {
    borderColor: 'rgba(255, 200, 105, 0.42)',
    borderRadius: 125,
    borderWidth: 1,
    height: 250,
    position: 'absolute',
    width: 250,
  },
  zodiacCircleInner: {
    borderColor: 'rgba(255, 200, 105, 0.26)',
    borderRadius: 98,
    borderWidth: 1,
    height: 196,
    position: 'absolute',
    width: 196,
  },
  zodiacTick: {
    backgroundColor: 'rgba(255, 200, 105, 0.26)',
    height: 118,
    position: 'absolute',
    top: 6,
    width: 1,
  },
  zodiacMark: {
    color: 'rgba(255, 210, 112, 0.68)',
    fontFamily: 'Georgia',
    fontSize: 22,
    position: 'absolute',
  },
  zodiacMarkOne: {
    left: 76,
    top: 54,
  },
  zodiacMarkTwo: {
    bottom: 54,
    right: 72,
  },
  zodiacMarkThree: {
    right: 50,
    top: 104,
  },
  zodiacSun: {
    backgroundColor: 'rgba(255, 203, 99, 0.88)',
    borderRadius: 999,
    height: 20,
    shadowColor: colors.gold,
    shadowOpacity: 0.75,
    shadowRadius: 18,
    width: 20,
  },
  constellation: {
    height: 210,
    position: 'absolute',
    right: 36,
    top: 80,
    width: 148,
  },
  constellationLine: {
    backgroundColor: 'rgba(255, 212, 112, 0.35)',
    height: 1,
    position: 'absolute',
  },
  constellationLineOne: {
    right: 58,
    top: 48,
    transform: [{ rotate: '24deg' }],
    width: 78,
  },
  constellationLineTwo: {
    right: 22,
    top: 92,
    transform: [{ rotate: '68deg' }],
    width: 70,
  },
  constellationLineThree: {
    right: 18,
    top: 144,
    transform: [{ rotate: '-42deg' }],
    width: 86,
  },
  constellationDot: {
    backgroundColor: colors.gold,
    borderRadius: 999,
    height: 5,
    position: 'absolute',
    width: 5,
  },
  constellationDot0: {
    right: 116,
    top: 32,
  },
  constellationDot1: {
    right: 74,
    top: 58,
  },
  constellationDot2: {
    right: 40,
    top: 92,
  },
  constellationDot3: {
    right: 54,
    top: 134,
  },
  constellationDot4: {
    right: 22,
    top: 166,
  },
  constellationDot5: {
    right: 88,
    top: 188,
  },
  landscape: {
    bottom: 92,
    height: 170,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  mountain: {
    borderBottomColor: 'rgba(7, 8, 25, 0.95)',
    borderBottomWidth: 116,
    borderLeftColor: 'transparent',
    borderLeftWidth: 122,
    borderRightColor: 'transparent',
    borderRightWidth: 122,
    height: 0,
    position: 'absolute',
    width: 0,
  },
  mountainLeft: {
    bottom: 0,
    left: -58,
  },
  mountainRight: {
    bottom: 0,
    right: -62,
  },
  sunset: {
    backgroundColor: 'rgba(255, 197, 91, 0.88)',
    borderRadius: 999,
    bottom: 40,
    height: 34,
    left: '46%',
    shadowColor: colors.gold,
    shadowOpacity: 0.8,
    shadowRadius: 18,
    width: 34,
  },
  waterLine: {
    backgroundColor: 'rgba(255, 203, 108, 0.5)',
    borderRadius: 999,
    bottom: 28,
    height: 2,
    left: '39%',
    position: 'absolute',
    width: 116,
  },
  waterLineTwo: {
    bottom: 16,
    left: '33%',
    opacity: 0.42,
    width: 160,
  },
  island: {
    bottom: 172,
    height: 70,
    position: 'absolute',
    right: 18,
    width: 72,
  },
  islandHill: {
    backgroundColor: 'rgba(7, 8, 24, 0.92)',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    bottom: 0,
    height: 20,
    position: 'absolute',
    width: 72,
  },
  palmTrunk: {
    backgroundColor: 'rgba(7, 8, 24, 0.95)',
    bottom: 16,
    height: 44,
    left: 32,
    position: 'absolute',
    transform: [{ rotate: '-9deg' }],
    width: 5,
  },
  palmLeaf: {
    backgroundColor: 'rgba(7, 8, 24, 0.95)',
    borderRadius: 999,
    height: 7,
    left: 22,
    position: 'absolute',
    top: 10,
    width: 34,
  },
  palmLeafOne: {
    transform: [{ rotate: '24deg' }],
  },
  palmLeafTwo: {
    transform: [{ rotate: '-26deg' }],
  },
  palmLeafThree: {
    left: 30,
    transform: [{ rotate: '86deg' }],
  },
  setupHeader: {
    gap: onboardingTokens.labelSpacing,
    zIndex: 1,
  },
  welcomeHeader: {
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  sparkleBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 17, 35, 0.74)',
    borderColor: colors.goldBorder,
    borderRadius: 999,
    borderWidth: 1.2,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  moonBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(26, 22, 39, 0.78)',
    borderColor: 'rgba(255, 211, 110, 0.43)',
    borderRadius: 999,
    borderWidth: 2,
    height: 86,
    justifyContent: 'center',
    width: 86,
  },
  badgeMoon: {
    color: '#FFD676',
    fontFamily: 'Georgia',
    fontSize: 58,
    lineHeight: 66,
    transform: [{ rotate: '-14deg' }],
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 19,
  },
  title: {
    ...titleShadow,
    color: colors.cream,
    fontFamily: 'Georgia',
    fontSize: onboardingTokens.titleFontSize,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: onboardingTokens.titleLineHeight,
    maxWidth: 300,
  },
  welcomeTitle: {
    ...titleShadow,
    color: colors.cream,
    fontFamily: 'Georgia',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 46,
  },
  body: {
    color: '#F1E8FF',
    fontSize: onboardingTokens.subtitleFontSize,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: onboardingTokens.subtitleLineHeight,
    maxWidth: 280,
  },
  welcomeBody: {
    color: colors.muted,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 25,
    maxWidth: 310,
  },
  centerText: {
    textAlign: 'center',
  },
  notice: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 14, 30, 0.82)',
    borderColor: colors.goldBorder,
    borderRadius: 999,
    borderWidth: 1.2,
    flexDirection: 'row',
    gap: 10,
    minHeight: 44,
    paddingHorizontal: 14,
    width: '100%',
    zIndex: 1,
  },
  compactNotice: {
    width: '72%',
  },
  noticeText: {
    color: colors.cream,
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 17,
  },
  noticeDot: {
    backgroundColor: colors.gold,
    borderRadius: 999,
    height: 4,
    width: 4,
  },
  fieldStack: {
    gap: 10,
    zIndex: 1,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderColor: colors.fieldBorder,
    borderRadius: onboardingTokens.cardBorderRadius,
    borderWidth: 1,
    minHeight: onboardingTokens.inputHeight,
    paddingHorizontal: 16,
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
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 18,
  },
  textInput: {
    color: colors.cream,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 26,
    marginTop: 9,
    padding: 0,
  },
  radioStack: {
    gap: 9,
    zIndex: 1,
  },
  radioRow: {
    alignItems: 'center',
    backgroundColor: 'rgba(47, 19, 73, 0.78)',
    borderColor: 'rgba(196, 103, 255, 0.45)',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    height: onboardingTokens.radioRowHeight,
    paddingHorizontal: 15,
  },
  radioText: {
    color: '#F0DFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 21,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    zIndex: 1,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: 'rgba(37, 17, 55, 0.82)',
    borderColor: 'rgba(205, 103, 255, 0.42)',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: onboardingTokens.chipHeight,
    paddingHorizontal: 12,
    width: '48.5%',
  },
  wideChip: {
    width: '100%',
  },
  chipText: {
    color: '#F0DFFF',
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 16,
  },
  welcomeCards: {
    gap: 14,
    zIndex: 1,
  },
  infoCard: {
    borderColor: colors.purpleBorder,
    borderRadius: 24,
    borderWidth: 1.3,
    minHeight: 148,
    padding: 18,
  },
  infoTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    color: colors.cream,
    flex: 1,
    fontFamily: 'Georgia',
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 29,
  },
  infoBody: {
    color: '#E7DDFC',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 23,
    marginTop: 14,
  },
  safetyCard: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(20, 24, 46, 0.86)',
    borderColor: 'rgba(137, 213, 200, 0.34)',
    borderRadius: 22,
    borderWidth: 1.1,
    flexDirection: 'row',
    gap: 17,
    minHeight: 116,
    padding: 17,
  },
  safetyText: {
    color: '#E0D8FA',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
  },
  bottomActions: {
    gap: 15,
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
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 22,
  },
  textLink: {
    color: '#D7B7FF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'center',
  },
});
