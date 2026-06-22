import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ComponentProps, PropsWithChildren } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = ComponentProps<typeof Ionicons>['name'];

type Field = {
  icon: IconName;
  label: string;
  value: string;
};

type Chip = {
  icon: IconName;
  label: string;
};

type RouteTarget = string;

const backgrounds = {
  welcome: require('../../assets/onboarding-reference/welcome.png'),
  name: require('../../assets/onboarding-reference/name.png'),
  birthDate: require('../../assets/onboarding-reference/birth-date.png'),
  birthTime: require('../../assets/onboarding-reference/birth-time.png'),
  birthPlace: require('../../assets/onboarding-reference/birth-place.png'),
  interest: require('../../assets/onboarding-reference/interest.png'),
} satisfies Record<string, ImageSourcePropType>;

const colors = {
  gold: '#FFD36F',
  goldSoft: '#FFEFC5',
  cream: '#FFF3D1',
  lilac: '#D4C8F3',
  violet: '#A783FF',
  ink: '#040512',
  glass: 'rgba(26, 20, 48, 0.78)',
  glassDeep: 'rgba(9, 9, 24, 0.7)',
  border: 'rgba(255, 211, 111, 0.36)',
  violetBorder: 'rgba(167, 131, 255, 0.38)',
  mint: '#9FF4D2',
} as const;

export function ReferenceWelcomeScreen() {
  return (
    <ReferenceScreen background={backgrounds.welcome} centered>
      <View style={styles.welcomeHeader}>
        <View style={styles.moonBadge}>
          <Ionicons name="moon" color={colors.gold} size={44} />
        </View>
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
        <ReferenceButton href="/name" icon="arrow-forward" label="Begin" />
        <ReferenceLink href="/home" label="Open Phase 3 home" />
      </View>
    </ReferenceScreen>
  );
}

export function ReferenceNameScreen() {
  return (
    <ReferenceSetupScreen
      background={backgrounds.name}
      body="This screen will collect a preferred name later. For now it previews the visual style only."
      fields={[{ icon: 'person-outline', label: 'Name', value: 'Erika' }]}
      nextHref="/birth-date"
      title="What should Nova call you?"
    />
  );
}

export function ReferenceBirthDateScreen() {
  return (
    <ReferenceSetupScreen
      background={backgrounds.birthDate}
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
    />
  );
}

export function ReferenceBirthTimeScreen() {
  return (
    <ReferenceSetupScreen
      background={backgrounds.birthTime}
      body="Nova will support exact, approximate, and unknown birth time paths in a later phase."
      nextHref="/birth-place"
      options={[
        { icon: 'ellipse-outline', label: 'Exact time' },
        { icon: 'ellipse-outline', label: 'Approximate range' },
        { icon: 'ellipse-outline', label: 'I do not know' },
      ]}
      title="Do you know your birth time?"
    />
  );
}

export function ReferenceBirthPlaceScreen() {
  return (
    <ReferenceSetupScreen
      background={backgrounds.birthPlace}
      body="Location fields are static here and are not connected to storage or geocoding."
      fields={[
        { icon: 'location-outline', label: 'City', value: 'San Juan' },
        { icon: 'globe-outline', label: 'Country', value: 'Puerto Rico' },
      ]}
      nextHref="/interest"
      title="Where were you born?"
    />
  );
}

export function ReferenceInterestScreen() {
  return (
    <ReferenceSetupScreen
      background={backgrounds.interest}
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
    />
  );
}

type ReferenceSetupScreenProps = {
  background: ImageSourcePropType;
  title: string;
  body: string;
  nextHref: RouteTarget;
  fields?: Field[];
  options?: Chip[];
  chips?: Chip[];
};

function ReferenceSetupScreen({
  background,
  title,
  body,
  nextHref,
  fields = [],
  options = [],
  chips = [],
}: ReferenceSetupScreenProps) {
  return (
    <ReferenceScreen background={background}>
      <View style={styles.setupHeader}>
        <SparkleBadge />
        <Text style={styles.eyebrow}>PHASE 3 SETUP</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>

      <SetupNotice />

      {fields.length > 0 ? (
        <View style={styles.fieldStack}>
          {fields.map((field) => (
            <ReferenceField key={field.label} {...field} />
          ))}
        </View>
      ) : null}

      {options.length > 0 ? (
        <View style={styles.optionStack}>
          {options.map((option) => (
            <ReferenceOption key={option.label} {...option} />
          ))}
        </View>
      ) : null}

      {chips.length > 0 ? (
        <View style={styles.chipGrid}>
          {chips.map((chip) => (
            <ReferenceChip key={chip.label} {...chip} />
          ))}
        </View>
      ) : null}

      <View style={styles.bottomActions}>
        <ReferenceButton href={nextHref} label="Continue" />
      </View>
    </ReferenceScreen>
  );
}

type ReferenceScreenProps = PropsWithChildren<{
  background: ImageSourcePropType;
  centered?: boolean;
}>;

function ReferenceScreen({
  background,
  centered = false,
  children,
}: ReferenceScreenProps) {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ImageBackground
        resizeMode="cover"
        source={background}
        style={styles.backgroundImage}
      />
      <View style={styles.scrim} />
      <CosmicDecorations />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            centered && styles.centeredContent,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CosmicDecorations() {
  return (
    <View pointerEvents="none" style={styles.decorations}>
      <View style={[styles.orb, styles.topOrb]} />
      <View style={[styles.orb, styles.bottomOrb]} />
      <Text style={[styles.star, styles.starOne]}>✦</Text>
      <Text style={[styles.star, styles.starTwo]}>✧</Text>
      <Text style={[styles.star, styles.starThree]}>✦</Text>
      <Text style={[styles.star, styles.starFour]}>✧</Text>
      <Text style={[styles.star, styles.starFive]}>•</Text>
    </View>
  );
}

function SparkleBadge() {
  return (
    <View style={styles.sparkleBadge}>
      <Ionicons name="sparkles-outline" color={colors.gold} size={34} />
    </View>
  );
}

function SetupNotice() {
  return (
    <View style={styles.notice}>
      <Ionicons name="construct-outline" color={colors.gold} size={22} />
      <Text style={styles.noticeText}>Phase 3 setup-only placeholder</Text>
      <View style={styles.noticeDot} />
    </View>
  );
}

function ReferenceField({ icon, label, value }: Field) {
  return (
    <View style={styles.fieldCard}>
      <View style={styles.fieldLabelRow}>
        <Ionicons name={icon} color={colors.gold} size={20} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function ReferenceOption({ icon, label }: Chip) {
  return (
    <View style={styles.optionPill}>
      <Ionicons name={icon} color={colors.violet} size={24} />
      <Text style={styles.optionText}>{label}</Text>
    </View>
  );
}

function ReferenceChip({ icon, label }: Chip) {
  return (
    <View style={[styles.chip, label === 'Daily guidance' && styles.wideChip]}>
      <Ionicons
        name={icon}
        color={label === 'Daily guidance' ? colors.gold : '#F47BC1'}
        size={18}
      />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: PropsWithChildren<{ icon: IconName; title: string }>) {
  return (
    <LinearGradient
      colors={['rgba(54, 23, 94, 0.86)', 'rgba(10, 9, 29, 0.92)']}
      style={styles.infoCard}
    >
      <View style={styles.infoCardHeader}>
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
      <Ionicons name="shield-checkmark-outline" color={colors.mint} size={30} />
      <Text style={styles.safetyText}>
        Nova offers symbolic guidance for reflection and entertainment, not
        medical, legal, financial, or emergency advice.
      </Text>
    </View>
  );
}

function ReferenceButton({
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
      style={styles.buttonShell}
    >
      <LinearGradient
        colors={['#FFD06D', '#E16AF0', '#8645FF']}
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.button}
      >
        {icon ? <Ionicons name={icon} color={colors.ink} size={25} /> : null}
        <Text style={styles.buttonText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

function ReferenceLink({ href, label }: { href: RouteTarget; label: string }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(href as never)}>
      <Text style={styles.linkText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.ink,
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    opacity: 0,
  },
  scrim: {
    backgroundColor: 'rgba(4, 5, 18, 0.38)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  decorations: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  orb: {
    borderRadius: 999,
    position: 'absolute',
  },
  topOrb: {
    backgroundColor: 'rgba(83, 49, 154, 0.48)',
    height: 190,
    right: -86,
    top: 76,
    width: 190,
  },
  bottomOrb: {
    backgroundColor: 'rgba(112, 77, 124, 0.36)',
    bottom: 116,
    height: 132,
    left: -82,
    width: 132,
  },
  star: {
    color: colors.gold,
    position: 'absolute',
  },
  starOne: {
    fontSize: 24,
    right: 33,
    top: 40,
  },
  starTwo: {
    fontSize: 18,
    left: 34,
    top: 118,
  },
  starThree: {
    bottom: 134,
    fontSize: 18,
    left: 44,
  },
  starFour: {
    fontSize: 14,
    right: 116,
    top: 225,
  },
  starFive: {
    fontSize: 24,
    right: 82,
    top: 224,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  centeredContent: {
    alignItems: 'stretch',
    paddingTop: 26,
  },
  setupHeader: {
    gap: 10,
  },
  welcomeHeader: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  sparkleBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(20, 18, 36, 0.68)',
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1.2,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  moonBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(34, 29, 45, 0.72)',
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1.2,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 20,
  },
  title: {
    color: colors.cream,
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 38,
  },
  welcomeTitle: {
    color: colors.cream,
    fontFamily: 'serif',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 42,
  },
  body: {
    color: colors.lilac,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 22,
  },
  welcomeBody: {
    color: colors.lilac,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
  },
  centerText: {
    textAlign: 'center',
  },
  notice: {
    alignItems: 'center',
    backgroundColor: 'rgba(44, 31, 50, 0.76)',
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1.2,
    flexDirection: 'row',
    gap: 10,
    minHeight: 40,
    paddingHorizontal: 14,
  },
  noticeText: {
    color: colors.goldSoft,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 18,
  },
  noticeDot: {
    backgroundColor: colors.gold,
    borderRadius: 999,
    height: 5,
    opacity: 0.8,
    width: 5,
  },
  fieldStack: {
    gap: 12,
  },
  fieldCard: {
    backgroundColor: colors.glass,
    borderColor: 'rgba(167, 131, 255, 0.24)',
    borderRadius: 18,
    borderWidth: 1,
    gap: 18,
    minHeight: 88,
    paddingHorizontal: 17,
    paddingVertical: 17,
  },
  fieldLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  fieldLabel: {
    color: 'rgba(212, 200, 243, 0.68)',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 21,
  },
  fieldValue: {
    color: colors.goldSoft,
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 24,
  },
  optionStack: {
    gap: 12,
  },
  optionPill: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(48, 25, 91, 0.72)',
    borderColor: colors.violetBorder,
    borderRadius: 18,
    borderWidth: 1.2,
    flexDirection: 'row',
    gap: 10,
    minHeight: 50,
    paddingHorizontal: 14,
  },
  optionText: {
    color: '#C3A7FF',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: 'rgba(48, 25, 91, 0.72)',
    borderColor: colors.violetBorder,
    borderRadius: 14,
    borderWidth: 1.1,
    flexDirection: 'row',
    gap: 8,
    minHeight: 43,
    paddingHorizontal: 13,
    width: '48%',
  },
  wideChip: {
    width: '100%',
  },
  chipText: {
    color: '#CDBBFF',
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  welcomeCards: {
    gap: 12,
  },
  infoCard: {
    borderColor: colors.violetBorder,
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
    padding: 18,
  },
  infoCardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
  },
  infoTitle: {
    color: colors.cream,
    flex: 1,
    fontFamily: 'serif',
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 28,
  },
  infoBody: {
    color: colors.lilac,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  safetyCard: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(23, 26, 48, 0.82)',
    borderColor: 'rgba(159, 244, 210, 0.28)',
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  safetyText: {
    color: colors.lilac,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  bottomActions: {
    gap: 18,
    marginTop: 'auto',
    paddingTop: 10,
  },
  buttonShell: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 13,
    justifyContent: 'center',
    minHeight: 55,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  linkText: {
    color: '#D2B4FF',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    textAlign: 'center',
  },
});
