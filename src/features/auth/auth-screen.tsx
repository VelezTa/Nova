import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useAuth } from './auth-context';

import {
  AppButton,
  CelestialCard,
  CosmicScreen,
  SafeDisclaimerBlock,
  ScreenHeader,
} from '@/components';
import {
  Phase3VisualBackground,
  type VisualBackgroundVariant,
} from '@/components/phase3-backgrounds';
import { colors, spacing, typography } from '@/theme';

type AuthMode = 'sign-in' | 'sign-up';

const authBackgroundVariants: VisualBackgroundVariant[] = [
  'cosmic',
  'clarity',
  'safeSpace',
  'welcome',
  'name',
  'birthDate',
  'interest',
];

function randomAuthBackground() {
  const index = Math.floor(Math.random() * authBackgroundVariants.length);

  return authBackgroundVariants[index];
}

export function AuthScreen() {
  const { isConfigured, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [backgroundVariant] = useState(randomAuthBackground);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignUp = mode === 'sign-up';

  async function submit() {
    const normalizedEmail = email.trim().toLowerCase();

    setError(null);
    setNotice(null);

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      if (isSignUp) {
        await signUp(normalizedEmail, password);
        setNotice(
          'Account created. If email confirmation is enabled, confirm your email before signing in.',
        );
      } else {
        await signIn(normalizedEmail, password);
      }
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : 'Authentication failed. Try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <CosmicScreen
      background={<Phase3VisualBackground variant={backgroundVariant} />}
    >
      <ScreenHeader
        body="Create your private Nova account to save your symbolic profile and continue your guidance safely."
        icon="person-circle-outline"
        title={isSignUp ? 'Create your account' : 'Welcome back'}
      />

      {!isConfigured ? (
        <CelestialCard icon="settings-outline" title="Supabase not configured">
          <Text style={styles.body}>
            Add EXPO_PUBLIC_SUPABASE_URL and
            EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your local environment to
            enable real authentication.
          </Text>
        </CelestialCard>
      ) : (
        <CelestialCard
          icon={isSignUp ? 'sparkles-outline' : 'log-in-outline'}
          title={isSignUp ? 'Sign up' : 'Sign in'}
        >
          <View style={styles.form}>
            <AuthInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              label="Email"
              onChangeText={setEmail}
              placeholder="you@example.com"
              value={email}
            />
            <AuthInput
              autoCapitalize="none"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              label="Password"
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              secureTextEntry
              value={password}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {notice ? <Text style={styles.notice}>{notice}</Text> : null}
            <AppButton
              disabled={submitting}
              label={
                submitting
                  ? 'Please wait...'
                  : isSignUp
                    ? 'Create account'
                    : 'Sign in'
              }
              onPress={submit}
            />
            <AppButton
              label={
                isSignUp ? 'I already have an account' : 'Create a new account'
              }
              onPress={() => {
                setError(null);
                setNotice(null);
                setMode(isSignUp ? 'sign-in' : 'sign-up');
              }}
              variant="ghost"
            />
          </View>
        </CelestialCard>
      )}

      <SafeDisclaimerBlock />
    </CosmicScreen>
  );
}

type AuthInputProps = {
  autoCapitalize?: 'none';
  autoComplete?: 'email' | 'current-password' | 'new-password';
  keyboardType?: 'email-address';
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
};

function AuthInput({
  autoCapitalize,
  autoComplete,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  value,
}: AuthInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        secureTextEntry={secureTextEntry}
        selectionColor="rgba(246, 199, 106, 0.38)"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    ...typography.body,
    color: colors.text.secondary,
  },
  error: {
    ...typography.bodySmall,
    color: '#FEB2B2',
  },
  form: {
    gap: spacing.lg,
  },
  input: {
    ...typography.body,
    borderColor: colors.border.violet,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text.primary,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.accent.gold,
    textTransform: 'uppercase',
  },
  notice: {
    ...typography.bodySmall,
    color: colors.accent.positive,
  },
});
