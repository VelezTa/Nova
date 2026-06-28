import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import cosmicOnboardingBackground from '../../assets/images/cosmic-onboarding-background.png';
import homeFeatureCardBackground from '../../assets/images/home-feature-card-background.png';
import homeShellBackground from '../../assets/images/home-shell-background.png';
import birthDateBackground from '../../assets/images/onboarding-background-birth-date.png';
import birthPlaceBackground from '../../assets/images/onboarding-background-birth-place.png';
import birthTimeBackground from '../../assets/images/onboarding-background-birth-time.png';
import interestBackground from '../../assets/images/onboarding-background-interest.png';
import nameBackground from '../../assets/images/onboarding-background-name.png';
import profileResultBackground from '../../assets/images/profile-result-background.png';
import clarityBackground from '../../assets/images/reference-intro-background-clarity.png';
import safeSpaceBackground from '../../assets/images/reference-intro-background-safe-space.png';
import welcomeBackground from '../../assets/images/reference-intro-background-welcome.png';

import { AnimatedCosmicOverlay } from './cosmic-motion';

export type VisualBackgroundVariant =
  | 'birthDate'
  | 'birthPlace'
  | 'birthTime'
  | 'clarity'
  | 'cosmic'
  | 'home'
  | 'homeFeature'
  | 'interest'
  | 'name'
  | 'profileResult'
  | 'safeSpace'
  | 'welcome';

type VisualBackgroundProps = {
  variant: VisualBackgroundVariant;
};

const screenBackgrounds = {
  birthDate: birthDateBackground,
  birthPlace: birthPlaceBackground,
  birthTime: birthTimeBackground,
  clarity: clarityBackground,
  cosmic: cosmicOnboardingBackground,
  profileResult: profileResultBackground,
  home: homeShellBackground,
  homeFeature: homeFeatureCardBackground,
  interest: interestBackground,
  name: nameBackground,
  safeSpace: safeSpaceBackground,
  welcome: welcomeBackground,
} as const;

export function Phase3VisualBackground({ variant }: VisualBackgroundProps) {
  const scrim =
    variant === 'profileResult'
      ? styles.profileReadabilityScrim
      : styles.homeReadabilityScrim;

  return (
    <View pointerEvents="none" style={styles.backgroundLayer}>
      <Image
        resizeMode="cover"
        source={screenBackgrounds[variant]}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={[
          'rgba(0, 2, 12, 0.08)',
          'rgba(0, 2, 12, 0.02)',
          'rgba(0, 0, 8, 0.18)',
        ]}
        locations={[0, 0.52, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.readabilityScrim, scrim]} />
      <VignetteLayer />
      <AnimatedCosmicOverlay />
    </View>
  );
}

type FeatureCardBackgroundProps = {
  children: ReactNode;
};

export function HomeFeatureCardBackground({
  children,
}: FeatureCardBackgroundProps) {
  return (
    <ImageBackground
      imageStyle={styles.featureCardImage}
      resizeMode="cover"
      source={homeFeatureCardBackground}
      style={styles.featureCardBackground}
    >
      <LinearGradient
        colors={[
          'rgba(12, 6, 32, 0.16)',
          'rgba(12, 6, 32, 0.05)',
          'rgba(6, 3, 20, 0.34)',
        ]}
        locations={[0, 0.48, 1]}
        style={StyleSheet.absoluteFill}
      />
      <AnimatedCosmicOverlay />
      {children}
    </ImageBackground>
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
        <RadialGradient id="phase3EdgeVignette" cx="50%" cy="42%" r="78%">
          <Stop offset="0" stopColor="#000000" stopOpacity="0" />
          <Stop offset="0.72" stopColor="#000000" stopOpacity="0.1" />
          <Stop offset="1" stopColor="#000000" stopOpacity="0.72" />
        </RadialGradient>
      </Defs>
      <Rect fill="url(#phase3EdgeVignette)" height="874" width="402" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  backgroundLayer: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  featureCardBackground: {
    minHeight: 356,
    overflow: 'hidden',
  },
  featureCardImage: {
    borderRadius: 20,
  },
  homeReadabilityScrim: {
    backgroundColor: 'rgba(0, 2, 13, 0.1)',
    bottom: '34%',
  },
  profileReadabilityScrim: {
    backgroundColor: 'rgba(0, 2, 13, 0.08)',
    bottom: '54%',
  },
  readabilityScrim: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
