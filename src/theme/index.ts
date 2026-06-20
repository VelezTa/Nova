import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  background: {
    base: '#050511',
    gradientStart: '#050511',
    gradientMiddle: '#120B2F',
    gradientEnd: '#24104F',
  },
  surface: {
    base: '#101021',
    elevated: '#17172C',
    soft: 'rgba(23, 23, 44, 0.82)',
    glass: 'rgba(255, 255, 255, 0.06)',
  },
  accent: {
    deepPurple: '#2B165F',
    violet: '#7B4DFF',
    softViolet: '#A78BFA',
    softPink: '#D86CFF',
    gold: '#F6C76A',
    warmGold: '#D99A3D',
    positive: '#A7F3D0',
  },
  text: {
    primary: '#F8EFD2',
    secondary: '#BEB6D8',
    muted: '#81779F',
    inverse: '#171021',
  },
  border: {
    subtleGold: 'rgba(246, 199, 106, 0.22)',
    card: 'rgba(255, 255, 255, 0.08)',
    violet: 'rgba(167, 139, 250, 0.24)',
  },
  glow: {
    purple: 'rgba(123, 77, 255, 0.35)',
    gold: 'rgba(246, 199, 106, 0.28)',
  },
} as const;

export const gradients = {
  screen: [
    colors.background.gradientStart,
    colors.background.gradientMiddle,
    colors.background.gradientEnd,
  ] as [string, string, string],
  card: ['rgba(43, 22, 95, 0.78)', 'rgba(16, 16, 33, 0.94)'] as [
    string,
    string,
  ],
  primaryButton: [
    colors.accent.gold,
    colors.accent.softPink,
    colors.accent.violet,
  ] as [string, string, string],
  violetGlow: ['rgba(123, 77, 255, 0.32)', 'rgba(216, 108, 255, 0.12)'] as [
    string,
    string,
  ],
  shareCard: ['#2B165F', '#120B2F', '#050511'] as [string, string, string],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '700',
    letterSpacing: 0,
  } satisfies TextStyle,
  screenTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: 0,
  } satisfies TextStyle,
  cardTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: 0,
  } satisfies TextStyle,
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0,
  } satisfies TextStyle,
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  } satisfies TextStyle,
  button: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    letterSpacing: 0,
  } satisfies TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0,
  } satisfies TextStyle,
} as const;

export const shadows = {
  card: Platform.select({
    web: {
      boxShadow: `0 18px 26px ${colors.glow.purple}`,
    },
    default: {
      shadowColor: colors.glow.purple,
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.26,
      shadowRadius: 26,
      elevation: 10,
    },
  }) satisfies ViewStyle,
  gold: Platform.select({
    web: {
      boxShadow: `0 14px 22px ${colors.glow.gold}`,
    },
    default: {
      shadowColor: colors.glow.gold,
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.22,
      shadowRadius: 22,
      elevation: 8,
    },
  }) satisfies ViewStyle,
} as const;

export const layout = {
  screenPadding: spacing.lg,
  maxContentWidth: 720,
  minTouchTarget: 44,
} as const;
