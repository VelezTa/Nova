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
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient as SvgLinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

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
  topSafeAreaSpacing: 20,
  labelSpacing: 8,
  titleFontSize: 31,
  titleLineHeight: 35,
  welcomeTitleFontSize: 35,
  welcomeTitleLineHeight: 39,
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
  purpleGlowColor: 'rgba(132, 68, 255, 0.5)',
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
  const maxWidth = Math.min(width, 402);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient
        colors={onboardingTokens.backgroundGradientColors}
        style={StyleSheet.absoluteFill}
      />
      <CosmicBackground variant={variant} />
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <View
          style={[
            styles.content,
            compact && styles.compactContent,
            { maxWidth },
            variant === 'welcome' && styles.welcomeContent,
            variant === 'interest' && styles.interestContent,
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
        [34, 28, 2.4],
        [70, 72, 1.5],
        [124, 52, 2],
        [188, 96, 2.4],
        [252, 62, 1.8],
        [338, 116, 2.3],
        [342, 258, 1.5],
        [42, 226, 1.4],
        [210, 272, 1.8],
        [118, 344, 1.4],
        [292, 402, 1.8],
        [56, 472, 1.4],
        [218, 518, 1.8],
        [365, 72, 2],
        [148, 156, 1.3],
        [318, 352, 1.5],
      ]
    : [
        [56, 94, 1.6],
        [132, 66, 1.5],
        [246, 120, 2],
        [320, 248, 1.5],
        [90, 520, 1.5],
        [286, 462, 1.5],
        [348, 160, 2],
      ];

  return (
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 402 874">
      <Defs>
        <RadialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#FFE08A" stopOpacity="1" />
          <Stop offset="1" stopColor="#F4A13F" stopOpacity="0.15" />
        </RadialGradient>
      </Defs>
      {stars.map(([left, top, size], index) => (
        <Circle
          cx={left}
          cy={top}
          fill="url(#starGlow)"
          key={`${left}-${top}-${index}`}
          opacity={0.82}
          r={size}
        />
      ))}
      <SparklePath x={360} y={46} scale={1.05} />
      <SparklePath x={42} y={112} scale={0.72} />
      <SparklePath x={258} y={136} scale={0.58} />
      {dense ? <SparklePath x={328} y={356} scale={0.5} /> : null}
    </Svg>
  );
}

function SparklePath({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Path
        d="M0 -18 C3 -6 6 -3 18 0 C6 3 3 6 0 18 C-3 6 -6 3 -18 0 C-6 -3 -3 -6 0 -18Z"
        fill="#FFD978"
      />
      <Path
        d="M0 -12 C2 -4 4 -2 12 0 C4 2 2 4 0 12 C-2 4 -4 2 -12 0 C-4 -2 -2 -4 0 -12Z"
        fill="#FFF0B4"
        opacity={0.42}
      />
    </G>
  );
}

function CrescentPlanet() {
  return (
    <Svg style={styles.crescentWrap} viewBox="0 0 88 88">
      <Defs>
        <SvgLinearGradient id="crescentFill" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFD078" />
          <Stop offset="0.58" stopColor="#B44D9F" />
          <Stop offset="1" stopColor="#46175F" />
        </SvgLinearGradient>
      </Defs>
      <Circle cx="44" cy="44" fill="url(#crescentFill)" r="39" />
      <Circle cx="58" cy="30" fill="#060619" r="39" />
      <Path
        d="M26 19 C19 31 20 48 29 61"
        stroke="rgba(255, 217, 126, 0.42)"
        strokeWidth="1"
      />
    </Svg>
  );
}

function RightPlanet() {
  return (
    <Svg style={styles.planetWrap} viewBox="0 0 240 240">
      <Defs>
        <RadialGradient id="planetFill" cx="36%" cy="44%" r="58%">
          <Stop offset="0" stopColor="#FFD778" stopOpacity="0.9" />
          <Stop offset="0.36" stopColor="#B64991" stopOpacity="0.72" />
          <Stop offset="1" stopColor="#321068" stopOpacity="0.38" />
        </RadialGradient>
      </Defs>
      <Circle
        cx="120"
        cy="120"
        fill="url(#planetFill)"
        r="113"
        stroke="rgba(255, 202, 114, 0.26)"
        strokeWidth="1"
      />
      <Path
        d="M37 112 C70 88 112 78 165 88"
        fill="none"
        opacity="0.34"
        stroke="#FFD677"
        strokeWidth="1.2"
      />
      <Path
        d="M30 144 C78 122 135 120 199 139"
        fill="none"
        opacity="0.2"
        stroke="#FFD677"
        strokeWidth="1"
      />
    </Svg>
  );
}

function ZodiacWheel() {
  const ticks = Array.from({ length: 12 }, (_, index) => index * 30);

  return (
    <Svg style={styles.zodiacWheel} viewBox="0 0 260 260">
      <Circle
        cx="130"
        cy="130"
        fill="none"
        r="124"
        stroke="rgba(255, 207, 111, 0.42)"
        strokeWidth="1"
      />
      <Circle
        cx="130"
        cy="130"
        fill="none"
        r="96"
        stroke="rgba(255, 207, 111, 0.26)"
        strokeWidth="1"
      />
      {ticks.map((rotation) => (
        <Line
          key={rotation}
          opacity={0.25}
          stroke="#FFD36E"
          strokeWidth="1"
          transform={`rotate(${rotation} 130 130)`}
          x1="130"
          x2="130"
          y1="8"
          y2="34"
        />
      ))}
      <Line
        opacity={0.36}
        stroke="#FFD36E"
        strokeWidth="1"
        x1="130"
        x2="130"
        y1="12"
        y2="248"
      />
      <Line
        opacity={0.2}
        stroke="#FFD36E"
        strokeWidth="1"
        x1="12"
        x2="248"
        y1="130"
        y2="130"
      />
      <Circle cx="184" cy="132" fill="#FFD36E" opacity="0.9" r="10" />
    </Svg>
  );
}

function Constellation() {
  const points = [
    [18, 22],
    [66, 40],
    [105, 68],
    [82, 116],
    [112, 156],
    [68, 188],
  ];

  return (
    <Svg style={styles.constellation} viewBox="0 0 150 210">
      <Path
        d="M18 22 L66 40 L105 68 L82 116 L112 156 L68 188"
        fill="none"
        opacity="0.46"
        stroke="#FFD36E"
        strokeWidth="1"
      />
      {points.map(([cx, cy], index) => (
        <Circle
          cx={cx}
          cy={cy}
          fill="#FFD36E"
          key={`${cx}-${cy}`}
          r={index === 0 || index === 2 ? 2.5 : 2}
        />
      ))}
      <SparklePath x={118} y={28} scale={0.34} />
    </Svg>
  );
}

function Landscape() {
  return (
    <Svg style={styles.landscape} viewBox="0 0 402 250">
      <Defs>
        <RadialGradient id="sunsetGlow" cx="50%" cy="52%" r="50%">
          <Stop offset="0" stopColor="#FFD471" stopOpacity="0.92" />
          <Stop offset="0.36" stopColor="#D54EA9" stopOpacity="0.42" />
          <Stop offset="1" stopColor="#120823" stopOpacity="0" />
        </RadialGradient>
        <SvgLinearGradient id="river" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFD777" stopOpacity="0.78" />
          <Stop offset="0.56" stopColor="#B94AD1" stopOpacity="0.32" />
          <Stop offset="1" stopColor="#050617" stopOpacity="0.2" />
        </SvgLinearGradient>
      </Defs>
      <Rect fill="rgba(50, 18, 70, 0.36)" height="116" y="42" width="402" />
      <Path
        d="M0 74 C44 44 86 60 128 86 C176 116 238 98 294 64 C336 38 372 46 402 70 L402 250 L0 250Z"
        fill="rgba(74, 22, 79, 0.52)"
      />
      <Circle cx="202" cy="96" fill="url(#sunsetGlow)" r="92" />
      <Circle cx="202" cy="96" fill="#FFD36E" opacity="0.72" r="17" />
      <Path d="M0 112 C42 86 83 114 119 137 L0 250Z" fill="#080719" />
      <Path d="M402 106 C360 87 324 118 282 154 L402 250Z" fill="#09081C" />
      <Path
        d="M122 250 C158 204 176 172 202 111 C224 164 238 207 274 250Z"
        fill="#0B0820"
      />
      <Path
        d="M203 116 C191 143 218 158 204 181 C190 205 205 223 198 250"
        fill="none"
        stroke="url(#river)"
        strokeLinecap="round"
        strokeWidth="13"
      />
      <Path
        d="M152 143 C190 137 226 137 266 143"
        fill="none"
        opacity="0.42"
        stroke="#FFD36E"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <Path
        d="M130 172 C176 165 232 166 278 172"
        fill="none"
        opacity="0.28"
        stroke="#FFD36E"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}

function Island() {
  return (
    <Svg style={styles.island} viewBox="0 0 84 76">
      <Path d="M0 70 C22 48 64 48 84 70Z" fill="#070819" />
      <Path
        d="M42 64 C39 42 39 24 45 8"
        fill="none"
        stroke="#050513"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <Path
        d="M45 10 C28 8 18 17 12 30"
        fill="none"
        stroke="#050513"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <Path
        d="M46 10 C62 10 72 18 78 31"
        fill="none"
        stroke="#050513"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <Path
        d="M46 10 C40 22 36 31 30 40"
        fill="none"
        stroke="#050513"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </Svg>
  );
}

function SparkleBadge() {
  return (
    <View style={styles.sparkleBadge}>
      <SparkleIcon size={38} />
    </View>
  );
}

function MoonBadge() {
  return (
    <View style={styles.moonBadge}>
      <Svg height="54" viewBox="0 0 64 64" width="54">
        <Path
          d="M43 10 C25 14 15 28 18 43 C21 57 38 61 51 51 C38 51 29 43 28 32 C27 22 32 14 43 10Z"
          fill="#FFD878"
        />
      </Svg>
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
        {icon === 'sparkles-outline' ? (
          <SparkleIcon size={36} />
        ) : (
          <Ionicons name={icon} color={colors.gold} size={34} />
        )}
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
  welcomeContent: {
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  interestContent: {
    gap: 14,
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
    height: 218,
    opacity: 0.34,
    right: -110,
    top: 142,
    width: 218,
  },
  subtleGlow: {
    opacity: 0.23,
  },
  bottomGlow: {
    backgroundColor: 'rgba(213, 74, 171, 0.34)',
    bottom: 96,
    height: 176,
    left: -108,
    width: 176,
  },
  horizonGlow: {
    backgroundColor: 'rgba(251, 169, 74, 0.46)',
    borderRadius: 999,
    bottom: 116,
    height: 76,
    left: '33%',
    opacity: 0.62,
    position: 'absolute',
    width: 138,
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
    height: 88,
    position: 'absolute',
    right: 28,
    top: 64,
    transform: [{ rotate: '-21deg' }],
    width: 88,
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
    height: 236,
    position: 'absolute',
    right: -78,
    top: 116,
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
    height: 260,
    position: 'absolute',
    right: -78,
    top: 180,
    width: 260,
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
    right: 30,
    top: 70,
    width: 150,
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
    bottom: 62,
    height: 198,
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
    bottom: 178,
    height: 76,
    position: 'absolute',
    right: 14,
    width: 84,
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
    gap: 7,
    paddingHorizontal: 4,
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
  moonBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(26, 22, 39, 0.78)',
    borderColor: 'rgba(255, 211, 110, 0.43)',
    borderRadius: 999,
    borderWidth: 1.4,
    height: 80,
    justifyContent: 'center',
    width: 80,
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
  welcomeTitle: {
    ...titleShadow,
    color: colors.cream,
    fontFamily: fonts.display,
    fontSize: onboardingTokens.welcomeTitleFontSize,
    letterSpacing: 0,
    lineHeight: onboardingTokens.welcomeTitleLineHeight,
  },
  body: {
    color: '#F1E8FF',
    fontFamily: fonts.body,
    fontSize: onboardingTokens.subtitleFontSize,
    letterSpacing: 0,
    lineHeight: onboardingTokens.subtitleLineHeight,
    maxWidth: 240,
  },
  welcomeBody: {
    color: colors.muted,
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
    maxWidth: 212,
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
  welcomeCards: {
    gap: 10,
    zIndex: 1,
  },
  infoCard: {
    borderColor: colors.purpleBorder,
    borderRadius: 18,
    borderWidth: 1.3,
    minHeight: 174,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  infoTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 21,
    letterSpacing: 0,
    lineHeight: 25,
  },
  infoBody: {
    color: '#E7DDFC',
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
    marginTop: 12,
  },
  safetyCard: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(20, 24, 46, 0.86)',
    borderColor: 'rgba(137, 213, 200, 0.34)',
    borderRadius: 16,
    borderWidth: 1.1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 118,
    padding: 14,
  },
  safetyText: {
    color: '#E0D8FA',
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 17,
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
  textLink: {
    color: '#D7B7FF',
    fontFamily: fonts.bodyExtraBold,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: 'center',
  },
});
