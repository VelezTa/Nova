import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ComponentProps } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import clarityBackground from '../../assets/images/reference-intro-background-clarity.png';
import safeSpaceBackground from '../../assets/images/reference-intro-background-safe-space.png';
import welcomeBackground from '../../assets/images/reference-intro-background-welcome.png';

import {
  AnimatedCosmicOverlay,
  AnimatedGradientSheen,
  CosmicGlow,
  CosmicPressable,
} from './cosmic-motion';

import { MuteToggle, useNovaSound } from '@/sound/nova-sound';

type IconName = ComponentProps<typeof Ionicons>['name'];
type RouteTarget = string;

type IntroStep = 'welcome' | 'clarity' | 'safeSpace';

type IntroContent = {
  badgeIcon: IconName;
  buttonLabel: string;
  eyebrow: string;
  nextHref: RouteTarget;
  step: number;
  subtitle: string;
  title: string;
  variant: IntroStep;
};

const introSteps: Record<IntroStep, IntroContent> = {
  welcome: {
    badgeIcon: 'sparkles-outline',
    buttonLabel: 'Siguiente',
    eyebrow: 'BIENVENIDA A NOVA',
    nextHref: '/onboarding-clarity',
    step: 0,
    subtitle:
      'Reflexiona, entiende tu energía y recibe claridad para vivir con más intención.',
    title: 'Tu guía cósmica diaria',
    variant: 'welcome',
  },
  clarity: {
    badgeIcon: 'hand-left-outline',
    buttonLabel: 'Siguiente',
    eyebrow: 'CONÓCETE MEJOR',
    nextHref: '/onboarding-safe-space',
    step: 1,
    subtitle:
      'Nova combina sabiduría astrológica y simbólica para ayudarte a entender tu camino único.',
    title: 'Descubre patrones y claridad',
    variant: 'clarity',
  },
  safeSpace: {
    badgeIcon: 'heart-outline',
    buttonLabel: 'Comenzar',
    eyebrow: 'ESTAMOS CONTIGO',
    nextHref: '/name',
    step: 2,
    subtitle:
      'Nova es tu ritual diario de calma, inspiración y autoconocimiento. Cuando necesites claridad, aquí estaremos.',
    title: 'Un espacio seguro para ti',
    variant: 'safeSpace',
  },
};

const backgroundImages = {
  welcome: welcomeBackground,
  clarity: clarityBackground,
  safeSpace: safeSpaceBackground,
} as const;

const fonts = {
  body: 'NunitoSans_400Regular',
  bodyExtraBold: 'NunitoSans_800ExtraBold',
  display: 'CormorantGaramond_700Bold',
} as const;

const colors = {
  cream: '#FFF1C8',
  gold: '#FFD36E',
  ink: '#02030D',
  muted: '#D8C9F5',
} as const;

export function ReferenceIntroWelcomeScreen() {
  return <ReferenceIntroScreen content={introSteps.welcome} />;
}

export function ReferenceIntroClarityScreen() {
  return <ReferenceIntroScreen content={introSteps.clarity} />;
}

export function ReferenceIntroSafeSpaceScreen() {
  return <ReferenceIntroScreen content={introSteps.safeSpace} />;
}

function ReferenceIntroScreen({ content }: { content: IntroContent }) {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const compact = height < 820;
  const maxWidth = Math.min(width, 402);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Image
        resizeMode="cover"
        source={backgroundImages[content.variant]}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={[
          'rgba(0, 0, 10, 0.08)',
          'rgba(2, 3, 17, 0.02)',
          'rgba(2, 3, 17, 0.1)',
          'rgba(1, 1, 8, 0.58)',
        ]}
        locations={[0, 0.3, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />
      <VignetteLayer />
      <AnimatedCosmicOverlay />
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <View
          style={[
            styles.content,
            compact && styles.compactContent,
            { maxWidth },
          ]}
        >
          <CosmicGlow>
            <View style={styles.brandMark}>
              <Text style={styles.brandStar}>✦</Text>
            </View>
          </CosmicGlow>

          <View
            style={[styles.copyBlock, variantStyles[content.variant].copyBlock]}
          >
            <IconBadge icon={content.badgeIcon} />
            <Text style={styles.eyebrow}>{content.eyebrow}</Text>
            <Text style={[styles.title, variantStyles[content.variant].title]}>
              {content.title}
            </Text>
            <Text
              style={[styles.subtitle, variantStyles[content.variant].subtitle]}
            >
              {content.subtitle}
            </Text>
          </View>

          <View
            style={[
              styles.bottomBlock,
              variantStyles[content.variant].bottomBlock,
            ]}
          >
            <PaginationDots activeStep={content.step} />
            <GradientButton
              label={content.buttonLabel}
              onPress={() => router.push(content.nextHref as never)}
            />
          </View>
        </View>
        <View style={styles.soundControl}>
          <MuteToggle />
        </View>
      </SafeAreaView>
    </View>
  );
}

function IconBadge({ icon }: { icon: IconName }) {
  return (
    <View style={styles.iconBadge}>
      <Ionicons name={icon} color={colors.gold} size={32} />
    </View>
  );
}

function PaginationDots({ activeStep }: { activeStep: number }) {
  return (
    <View style={styles.pagination}>
      {[0, 1, 2].map((step) => (
        <View
          key={step}
          style={[styles.dot, activeStep === step && styles.activeDot]}
        />
      ))}
    </View>
  );
}

function GradientButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const { play } = useNovaSound();

  return (
    <CosmicPressable
      onPress={onPress}
      sound={() => play('tap')}
      style={styles.buttonPressable}
    >
      <LinearGradient
        colors={['#FFD06F', '#EA78D6', '#7A3AFB']}
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{label}</Text>
        <AnimatedGradientSheen />
      </LinearGradient>
    </CosmicPressable>
  );
}

function VignetteLayer() {
  return (
    <Svg
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFill}
      viewBox="0 0 402 874"
    >
      <Defs>
        <RadialGradient id="edgeVignette" cx="50%" cy="36%" r="74%">
          <Stop offset="0" stopColor="#000000" stopOpacity="0" />
          <Stop offset="0.62" stopColor="#000000" stopOpacity="0.08" />
          <Stop offset="1" stopColor="#000000" stopOpacity="0.68" />
        </RadialGradient>
      </Defs>
      <Rect fill="url(#edgeVignette)" height="874" width="402" />
      <Circle cx="201" cy="668" fill="#030412" opacity="0.18" r="210" />
    </Svg>
  );
}

const titleShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.54)',
  textShadowOffset: { width: 0, height: 3 },
  textShadowRadius: 2,
} as const;

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#B653FF',
    opacity: 1,
    transform: [{ scale: 1.18 }],
  },
  backgroundImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  bottomBlock: {
    gap: 24,
    marginTop: 'auto',
    paddingBottom: 24,
    width: '100%',
  },
  brandMark: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  brandStar: {
    color: colors.gold,
    fontSize: 26,
    lineHeight: 28,
  },
  button: {
    alignItems: 'center',
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    width: '100%',
  },
  buttonPressable: {
    borderRadius: 999,
    shadowColor: '#9C55FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },
  buttonText: {
    color: '#14091D',
    fontFamily: fonts.bodyExtraBold,
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 21,
  },
  compactContent: {
    paddingTop: 12,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 24,
    width: '100%',
  },
  copyBlock: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(2, 3, 15, 0.08)',
    borderRadius: 28,
    marginTop: 'auto',
    paddingBottom: 18,
    paddingHorizontal: 8,
    paddingTop: 18,
    width: '100%',
  },
  dot: {
    backgroundColor: '#7E78A5',
    borderRadius: 999,
    height: 6,
    opacity: 0.54,
    width: 6,
  },
  eyebrow: {
    color: colors.gold,
    fontFamily: fonts.bodyExtraBold,
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 17,
    marginTop: 18,
    textAlign: 'center',
  },
  iconBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(14, 13, 31, 0.58)',
    borderColor: 'rgba(255, 211, 110, 0.42)',
    borderRadius: 999,
    borderWidth: 1.1,
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  soundControl: {
    left: 28,
    position: 'absolute',
    top: 58,
    zIndex: 4,
  },
  screen: {
    backgroundColor: colors.ink,
    flex: 1,
  },
  subtitle: {
    ...titleShadow,
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 276,
    textAlign: 'center',
  },
  title: {
    ...titleShadow,
    color: colors.cream,
    fontFamily: fonts.display,
    fontSize: 32,
    letterSpacing: 0,
    lineHeight: 35,
    marginTop: 8,
    maxWidth: 286,
    textAlign: 'center',
  },
});

const variantStyles = {
  welcome: StyleSheet.create({
    bottomBlock: {
      paddingBottom: 24,
    },
    copyBlock: {
      marginBottom: 32,
    },
    subtitle: {
      maxWidth: 238,
    },
    title: {
      fontSize: 31,
      lineHeight: 34,
      maxWidth: 248,
    },
  }),
  clarity: StyleSheet.create({
    bottomBlock: {
      paddingBottom: 24,
    },
    copyBlock: {
      marginBottom: 34,
    },
    subtitle: {
      maxWidth: 276,
    },
    title: {
      fontSize: 30,
      lineHeight: 33,
      maxWidth: 238,
    },
  }),
  safeSpace: StyleSheet.create({
    bottomBlock: {
      paddingBottom: 24,
    },
    copyBlock: {
      backgroundColor: 'rgba(2, 3, 15, 0.18)',
      marginBottom: 30,
    },
    subtitle: {
      maxWidth: 250,
    },
    title: {
      fontSize: 31,
      lineHeight: 34,
      maxWidth: 260,
    },
  }),
} as const;
