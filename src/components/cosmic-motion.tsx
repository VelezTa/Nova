import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radii } from '@/theme';

type StarSeed = {
  delay: number;
  drift: number;
  duration: number;
  left: `${number}%`;
  size: number;
  top: `${number}%`;
};

const starSeeds: StarSeed[] = [
  { left: '8%', top: '11%', size: 2.5, delay: 0, duration: 3200, drift: 5 },
  { left: '18%', top: '27%', size: 3.8, delay: 720, duration: 4600, drift: -4 },
  { left: '32%', top: '8%', size: 2.2, delay: 420, duration: 3900, drift: 4 },
  {
    left: '51%',
    top: '18%',
    size: 3.2,
    delay: 1120,
    duration: 5200,
    drift: -6,
  },
  { left: '66%', top: '7%', size: 2.3, delay: 1900, duration: 4300, drift: 3 },
  { left: '83%', top: '21%', size: 4.4, delay: 320, duration: 5700, drift: -5 },
  { left: '13%', top: '48%', size: 3.3, delay: 1480, duration: 6100, drift: 6 },
  { left: '41%', top: '42%', size: 2.2, delay: 860, duration: 3600, drift: -3 },
  { left: '72%', top: '51%', size: 3, delay: 2300, duration: 4800, drift: 5 },
  {
    left: '91%',
    top: '39%',
    size: 2.6,
    delay: 1760,
    duration: 5400,
    drift: -4,
  },
  { left: '26%', top: '67%', size: 3.7, delay: 1260, duration: 6600, drift: 4 },
  { left: '58%', top: '73%', size: 2.8, delay: 510, duration: 4500, drift: -5 },
  { left: '76%', top: '82%', size: 3.1, delay: 2070, duration: 5900, drift: 3 },
  { left: '7%', top: '78%', size: 2.1, delay: 990, duration: 5100, drift: -3 },
  { left: '46%', top: '61%', size: 2.4, delay: 2600, duration: 6200, drift: 4 },
  { left: '88%', top: '69%', size: 3, delay: 3100, duration: 5300, drift: -5 },
  { left: '31%', top: '88%', size: 2.5, delay: 180, duration: 4400, drift: 3 },
  {
    left: '63%',
    top: '34%',
    size: 2.4,
    delay: 1450,
    duration: 4900,
    drift: -4,
  },
  { left: '22%', top: '16%', size: 1.8, delay: 2700, duration: 3700, drift: 3 },
  {
    left: '54%',
    top: '87%',
    size: 2.1,
    delay: 3400,
    duration: 4200,
    drift: -3,
  },
  {
    left: '95%',
    top: '14%',
    size: 1.9,
    delay: 1280,
    duration: 4700,
    drift: -2,
  },
  { left: '37%', top: '76%', size: 2.6, delay: 2220, duration: 5600, drift: 5 },
];

export function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) {
        setReducedMotion(enabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReducedMotion,
    );

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return reducedMotion;
}

export function AnimatedCosmicOverlay() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <RiverLightReflection />
      <TwinklingStars />
    </View>
  );
}

export function RiverLightReflection() {
  const reducedMotion = useReducedMotionPreference();
  const [flow] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const animation = Animated.loop(
      Animated.timing(flow, {
        duration: 9000,
        easing: Easing.inOut(Easing.sin),
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [flow, reducedMotion]);

  const translateX = flow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-26, 34, -26],
  });
  const opacity = flow.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.14, 0.34, 0.14],
  });

  return (
    <View style={styles.riverReflectionLayer}>
      <Animated.View
        style={[
          styles.riverReflection,
          !reducedMotion && {
            opacity,
            transform: [{ translateX }, { rotate: '-7deg' }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(246, 199, 106, 0)',
            'rgba(246, 199, 106, 0.18)',
            'rgba(161, 218, 255, 0.16)',
            'rgba(246, 199, 106, 0.08)',
            'rgba(246, 199, 106, 0)',
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

export function TwinklingStars() {
  return (
    <View style={styles.starLayer}>
      {starSeeds.map((star) => (
        <TwinklingStar key={`${star.left}-${star.top}`} {...star} />
      ))}
    </View>
  );
}

function TwinklingStar({ delay, drift, duration, left, size, top }: StarSeed) {
  const reducedMotion = useReducedMotionPreference();
  const [twinkle] = useState(() => new Animated.Value(0.45));

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(twinkle, {
          duration,
          easing: Easing.inOut(Easing.sin),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(twinkle, {
          duration: Math.round(duration * 0.72),
          easing: Easing.inOut(Easing.sin),
          toValue: 0.2,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [delay, duration, reducedMotion, twinkle]);

  const translateX = twinkle.interpolate({
    inputRange: [0.2, 1],
    outputRange: [0, drift],
  });
  const scale = twinkle.interpolate({
    inputRange: [0.2, 1],
    outputRange: [0.92, 1.16],
  });

  return (
    <Animated.View
      style={[
        styles.starWrapper,
        {
          height: size,
          left,
          opacity: reducedMotion ? 0.5 : twinkle,
          top,
          transform: reducedMotion ? undefined : [{ translateX }, { scale }],
          width: size,
        },
      ]}
    >
      <View style={styles.starHalo} />
      <View style={styles.starCore} />
    </Animated.View>
  );
}

type CosmicGlowProps = PropsWithChildren<{
  intensity?: 'soft' | 'strong';
  style?: StyleProp<ViewStyle>;
}>;

export function CosmicGlow({
  children,
  intensity = 'soft',
  style,
}: CosmicGlowProps) {
  const reducedMotion = useReducedMotionPreference();
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          duration: intensity === 'strong' ? 3600 : 5200,
          easing: Easing.inOut(Easing.sin),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          duration: intensity === 'strong' ? 4200 : 5800,
          easing: Easing.inOut(Easing.sin),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [intensity, pulse, reducedMotion]);

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [intensity === 'strong' ? 0.28 : 0.16, 0.5],
  });
  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, intensity === 'strong' ? 1.08 : 1.04],
  });

  return (
    <View style={[styles.glowWrapper, style]}>
      {reducedMotion ? null : (
        <Animated.View
          pointerEvents="none"
          style={[styles.glowPulse, { opacity, transform: [{ scale }] }]}
        />
      )}
      {children}
    </View>
  );
}

export function CosmicSparkleDrift() {
  const reducedMotion = useReducedMotionPreference();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const animation = Animated.loop(
      Animated.timing(progress, {
        duration: 5600,
        easing: Easing.inOut(Easing.sin),
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [progress, reducedMotion]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 36],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, -8, 18],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.18, 0.72, 0.18],
  });

  if (reducedMotion) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.sparkleDrift,
        { opacity, transform: [{ translateX }, { translateY }] },
      ]}
    >
      <View style={[styles.sparkleDot, styles.sparkleDotLarge]} />
      <View style={[styles.sparkleDot, styles.sparkleDotSoft]} />
      <View style={styles.sparkleDot} />
    </Animated.View>
  );
}

type EntranceProps = PropsWithChildren<{
  delay?: number;
  style?: StyleProp<ViewStyle>;
}>;

export function CosmicEntrance({ children, delay = 0, style }: EntranceProps) {
  const reducedMotion = useReducedMotionPreference();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(1);
      return;
    }

    Animated.timing(progress, {
      delay,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [delay, progress, reducedMotion]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: reducedMotion ? undefined : [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

type CosmicPressableProps = PropsWithChildren<{
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  sound?: () => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}>;

export function CosmicPressable({
  children,
  disabled,
  onPress,
  sound,
  style,
}: CosmicPressableProps) {
  const reducedMotion = useReducedMotionPreference();
  const [scale] = useState(() => new Animated.Value(1));

  const pressTo = (value: number) => {
    if (reducedMotion) {
      return;
    }

    Animated.spring(scale, {
      damping: 17,
      mass: 0.7,
      stiffness: 180,
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={(event) => {
        if (!disabled) {
          sound?.();
          onPress?.(event);
        }
      }}
      onPressIn={() => pressTo(0.982)}
      onPressOut={() => pressTo(1)}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export function AnimatedGradientSheen() {
  const reducedMotion = useReducedMotionPreference();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const animation = Animated.loop(
      Animated.timing(progress, {
        duration: 6800,
        easing: Easing.inOut(Easing.sin),
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [progress, reducedMotion]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-110, 110],
  });

  if (reducedMotion) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.buttonSheen, { transform: [{ translateX }] }]}
    >
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.24)',
          'rgba(255, 255, 255, 0)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonSheen: {
    bottom: 0,
    left: '20%',
    position: 'absolute',
    top: 0,
    width: 92,
  },
  glowPulse: {
    backgroundColor: colors.glow.gold,
    borderRadius: radii.pill,
    bottom: -6,
    left: -6,
    position: 'absolute',
    right: -6,
    top: -6,
  },
  glowWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  riverReflection: {
    bottom: 84,
    height: 96,
    left: '-12%',
    opacity: 0.28,
    position: 'absolute',
    width: '126%',
  },
  riverReflectionLayer: {
    bottom: 0,
    height: '42%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
  },
  sparkleDot: {
    backgroundColor: colors.accent.gold,
    borderRadius: 999,
    height: 4,
    position: 'absolute',
    right: 0,
    top: 20,
    width: 4,
  },
  sparkleDotLarge: {
    height: 7,
    right: 18,
    top: 0,
    width: 7,
  },
  sparkleDotSoft: {
    backgroundColor: colors.accent.softPink,
    height: 5,
    right: 36,
    top: 28,
    width: 5,
  },
  sparkleDrift: {
    height: 42,
    position: 'absolute',
    right: 24,
    top: 18,
    width: 48,
  },
  starCore: {
    backgroundColor: 'rgba(255, 247, 206, 0.96)',
    borderRadius: 999,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  starHalo: {
    backgroundColor: 'rgba(255, 211, 110, 0.1)',
    borderRadius: 999,
    bottom: -2,
    left: -2,
    position: 'absolute',
    right: -2,
    top: -2,
  },
  starLayer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  starWrapper: {
    position: 'absolute',
  },
});
