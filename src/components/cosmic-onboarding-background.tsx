import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import birthDateBackground from '../../assets/images/onboarding-background-birth-date.png';
import birthPlaceBackground from '../../assets/images/onboarding-background-birth-place.png';
import birthTimeBackground from '../../assets/images/onboarding-background-birth-time.png';
import interestBackground from '../../assets/images/onboarding-background-interest.png';
import nameBackground from '../../assets/images/onboarding-background-name.png';

export type CosmicOnboardingBackgroundVariant =
  | 'name'
  | 'birthDate'
  | 'birthTime'
  | 'birthPlace'
  | 'interest';

type CosmicOnboardingBackgroundProps = {
  variant?: CosmicOnboardingBackgroundVariant;
};

const backgroundImages = {
  name: nameBackground,
  birthDate: birthDateBackground,
  birthTime: birthTimeBackground,
  birthPlace: birthPlaceBackground,
  interest: interestBackground,
} as const;

export function CosmicOnboardingBackground({
  variant = 'name',
}: CosmicOnboardingBackgroundProps) {
  const variantStyle = variantStyles[variant];

  return (
    <View pointerEvents="none" style={styles.backgroundLayer}>
      <Image
        resizeMode="cover"
        source={backgroundImages[variant]}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={[
          'rgba(0, 2, 13, 0.08)',
          'rgba(2, 3, 17, 0.04)',
          'rgba(7, 2, 18, 0.08)',
          'rgba(0, 0, 8, 0.24)',
        ]}
        locations={[0, 0.34, 0.68, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.readabilityScrim, variantStyle.scrim]} />
      <VignetteLayer />
    </View>
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
        <RadialGradient id="edgeVignette" cx="50%" cy="44%" r="76%">
          <Stop offset="0" stopColor="#000000" stopOpacity="0" />
          <Stop offset="0.68" stopColor="#000000" stopOpacity="0.08" />
          <Stop offset="1" stopColor="#000000" stopOpacity="0.68" />
        </RadialGradient>
      </Defs>
      <Rect fill="url(#edgeVignette)" height="874" width="402" />
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
  birthDateScrim: {
    backgroundColor: 'rgba(2, 3, 16, 0.08)',
    bottom: '42%',
  },
  birthPlaceScrim: {
    backgroundColor: 'rgba(2, 3, 16, 0.06)',
    bottom: '58%',
  },
  birthTimeScrim: {
    backgroundColor: 'rgba(2, 3, 16, 0.1)',
    bottom: '34%',
  },
  interestScrim: {
    backgroundColor: 'rgba(2, 3, 16, 0.08)',
    bottom: '31%',
  },
  nameScrim: {
    backgroundColor: 'rgba(2, 3, 16, 0.08)',
    bottom: '39%',
  },
  readabilityScrim: {
    backgroundColor: 'rgba(2, 3, 16, 0.18)',
    bottom: '39%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const variantStyles = {
  name: {
    scrim: styles.nameScrim,
  },
  birthDate: {
    scrim: styles.birthDateScrim,
  },
  birthTime: {
    scrim: styles.birthTimeScrim,
  },
  birthPlace: {
    scrim: styles.birthPlaceScrim,
  },
  interest: {
    scrim: styles.interestScrim,
  },
} as const;
