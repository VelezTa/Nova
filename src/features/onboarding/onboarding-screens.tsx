import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';

import {
  APPROXIMATE_TIME_RANGES,
  hasErrors,
  MAIN_INTERESTS,
  normalizeOnboardingForm,
  type OnboardingErrors,
  type OnboardingForm,
  validateBirthDateStep,
  validateBirthPlaceStep,
  validateBirthTimeStep,
  validateInterestStep,
  validateNameStep,
  validateOnboardingForm,
} from './cosmic-profile';
import { useOnboardingDraft } from './onboarding-context';
import { saveOnboardingProfile } from './onboarding-service';

import { useAuth } from '@/features/auth/auth-context';
import {
  AppButton,
  Badge,
  CelestialCard,
  CosmicScreen,
  SafeDisclaimerBlock,
  ScreenHeader,
} from '@/components';
import { Phase3VisualBackground } from '@/components/phase3-backgrounds';
import { colors, spacing, typography } from '@/theme';

type StepValidator = (form: OnboardingForm) => OnboardingErrors;

function useStepSubmit(validator: StepValidator, nextHref: string) {
  const router = useRouter();
  const { form } = useOnboardingDraft();
  const [errors, setErrors] = useState<OnboardingErrors>({});

  function continueToNext() {
    const nextErrors = validator(form);
    setErrors(nextErrors);

    if (!hasErrors(nextErrors)) {
      router.push(nextHref as never);
    }
  }

  return { continueToNext, errors, setErrors };
}

export function OnboardingNameScreen() {
  const { form, updateForm } = useOnboardingDraft();
  const { continueToNext, errors, setErrors } = useStepSubmit(
    validateNameStep,
    '/birth-date',
  );

  return (
    <OnboardingShell
      body="Tell Nova how to address you. Optional details can help personalize future reflections without changing the safety rules."
      title="What should Nova call you?"
      variant="name"
    >
      <CelestialCard icon="person-outline" title="Your basics">
        <View style={styles.form}>
          <FormInput
            error={errors.name}
            label="Name"
            onChangeText={(name) => {
              setErrors((current) => ({ ...current, name: undefined }));
              updateForm({ name });
            }}
            placeholder="Your name"
            value={form.name}
          />
          <FormInput
            error={errors.gender}
            label="Gender (optional)"
            onChangeText={(gender) => updateForm({ gender })}
            placeholder="Optional"
            value={form.gender}
          />
          <FormInput
            error={errors.pronouns}
            label="Pronouns (optional)"
            onChangeText={(pronouns) => updateForm({ pronouns })}
            placeholder="Optional"
            value={form.pronouns}
          />
          <FormInput
            error={errors.relationshipStatus}
            label="Relationship status (optional)"
            onChangeText={(relationshipStatus) =>
              updateForm({ relationshipStatus })
            }
            placeholder="Optional"
            value={form.relationshipStatus}
          />
          <AppButton label="Continue" onPress={continueToNext} />
        </View>
      </CelestialCard>
    </OnboardingShell>
  );
}

export function OnboardingBirthDateScreen() {
  const { form, updateForm } = useOnboardingDraft();
  const { continueToNext, errors, setErrors } = useStepSubmit(
    validateBirthDateStep,
    '/birth-time',
  );

  return (
    <OnboardingShell
      body="Your date of birth supports symbolic personalization. Nova does not present predictions as guaranteed facts."
      title="When were you born?"
      variant="birthDate"
    >
      <CelestialCard icon="calendar-outline" title="Birth date">
        <View style={styles.form}>
          <FormInput
            error={errors.birthDate}
            keyboardType="numbers-and-punctuation"
            label="Date of birth"
            onChangeText={(birthDate) => {
              setErrors((current) => ({
                ...current,
                birthDate: undefined,
              }));
              updateForm({ birthDate });
            }}
            placeholder="YYYY-MM-DD"
            value={form.birthDate}
          />
          <Text style={styles.helper}>Use a full date such as 1994-05-21.</Text>
          <AppButton label="Continue" onPress={continueToNext} />
        </View>
      </CelestialCard>
    </OnboardingShell>
  );
}

export function OnboardingBirthTimeScreen() {
  const { form, updateForm } = useOnboardingDraft();
  const { continueToNext, errors, setErrors } = useStepSubmit(
    validateBirthTimeStep,
    '/birth-place',
  );
  const exact = form.birthTimeAccuracy === 'exact';

  return (
    <OnboardingShell
      body="Exact and approximate birth times are both supported. If exact time is unknown, choose the closest range."
      title="Do you know your birth time?"
      variant="birthTime"
    >
      <CelestialCard icon="time-outline" title="Birth time">
        <View style={styles.form}>
          <View style={styles.choiceRow}>
            <ChoicePill
              label="Exact time"
              onPress={() => {
                setErrors({});
                updateForm({
                  approximateTimeRange: '',
                  birthTimeAccuracy: 'exact',
                });
              }}
              selected={exact}
            />
            <ChoicePill
              label="I do not know exact time"
              onPress={() => {
                setErrors({});
                updateForm({
                  birthTime: '',
                  birthTimeAccuracy: 'approximate',
                });
              }}
              selected={!exact}
            />
          </View>

          {exact ? (
            <FormInput
              error={errors.birthTime}
              keyboardType="numbers-and-punctuation"
              label="Exact birth time"
              onChangeText={(birthTime) => {
                setErrors((current) => ({
                  ...current,
                  birthTime: undefined,
                }));
                updateForm({ birthTime });
              }}
              placeholder="HH:MM"
              value={form.birthTime}
            />
          ) : (
            <View style={styles.choiceStack}>
              {APPROXIMATE_TIME_RANGES.map((range) => (
                <ChoicePill
                  key={range}
                  label={range}
                  onPress={() => {
                    setErrors((current) => ({
                      ...current,
                      approximateTimeRange: undefined,
                    }));
                    updateForm({ approximateTimeRange: range });
                  }}
                  selected={form.approximateTimeRange === range}
                />
              ))}
              <ErrorText message={errors.approximateTimeRange} />
            </View>
          )}

          <AppButton label="Continue" onPress={continueToNext} />
        </View>
      </CelestialCard>
    </OnboardingShell>
  );
}

export function OnboardingBirthPlaceScreen() {
  const { form, updateForm } = useOnboardingDraft();
  const { continueToNext, errors, setErrors } = useStepSubmit(
    validateBirthPlaceStep,
    '/interest',
  );

  return (
    <OnboardingShell
      body="Birth place helps future symbolic personalization. Geocoding is not part of this phase."
      title="Where were you born?"
      variant="birthPlace"
    >
      <CelestialCard icon="location-outline" title="Birth place">
        <View style={styles.form}>
          <FormInput
            error={errors.birthCity}
            label="Birth city"
            onChangeText={(birthCity) => {
              setErrors((current) => ({
                ...current,
                birthCity: undefined,
              }));
              updateForm({ birthCity });
            }}
            placeholder="City"
            value={form.birthCity}
          />
          <FormInput
            error={errors.birthCountry}
            label="Birth country"
            onChangeText={(birthCountry) => {
              setErrors((current) => ({
                ...current,
                birthCountry: undefined,
              }));
              updateForm({ birthCountry });
            }}
            placeholder="Country"
            value={form.birthCountry}
          />
          <AppButton label="Continue" onPress={continueToNext} />
        </View>
      </CelestialCard>
    </OnboardingShell>
  );
}

export function OnboardingInterestScreen() {
  const { form, updateForm } = useOnboardingDraft();
  const { continueToNext, errors, setErrors } = useStepSubmit(
    validateInterestStep,
    '/cosmic-profile',
  );

  return (
    <OnboardingShell
      body="Choose the theme that feels most useful now. Nova keeps guidance reflective, positive, and non-deterministic."
      title="What do you want guidance on most?"
      variant="interest"
    >
      <CelestialCard icon="sparkles-outline" title="Main interest">
        <View style={styles.form}>
          <View style={styles.choiceStack}>
            {MAIN_INTERESTS.map((interest) => (
              <ChoicePill
                key={interest}
                label={interest}
                onPress={() => {
                  setErrors((current) => ({
                    ...current,
                    mainInterest: undefined,
                  }));
                  updateForm({ mainInterest: interest });
                }}
                selected={form.mainInterest === interest}
              />
            ))}
          </View>
          <ErrorText message={errors.mainInterest} />
          <AppButton label="Review profile" onPress={continueToNext} />
        </View>
      </CelestialCard>
    </OnboardingShell>
  );
}

export function OnboardingReviewScreen() {
  const router = useRouter();
  const { refreshProfile, user } = useAuth();
  const { form, resetForm } = useOnboardingDraft();
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const normalized = normalizeOnboardingForm(form);

  async function saveProfile() {
    const nextErrors = validateOnboardingForm(form);
    setErrors(nextErrors);
    setSubmitError(null);

    if (hasErrors(nextErrors)) {
      setSubmitError('Review the highlighted fields before saving.');
      return;
    }

    if (!user) {
      setSubmitError('Sign in before saving your profile.');
      return;
    }

    setSaving(true);

    try {
      await saveOnboardingProfile(form, user.id);
      await refreshProfile();
      resetForm();
      router.replace('/home');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Profile could not be saved. Try again.',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <OnboardingShell
      body="Review your details before Nova saves your private cosmic profile."
      title="Your cosmic profile"
      variant="profileResult"
    >
      <CelestialCard icon="moon-outline" title={normalized.name || 'Profile'}>
        <View style={styles.reviewStack}>
          <ReviewRow label="Birth date" value={normalized.birthDate} />
          <ReviewRow
            label="Birth time"
            value={
              normalized.birthTimeAccuracy === 'exact'
                ? normalized.birthTime
                : normalized.approximateTimeRange
            }
          />
          <ReviewRow
            label="Birth place"
            value={`${normalized.birthCity}, ${normalized.birthCountry}`}
          />
          <ReviewRow label="Main interest" value={normalized.mainInterest} />
          {normalized.gender ? (
            <ReviewRow label="Gender" value={normalized.gender} />
          ) : null}
          {normalized.pronouns ? (
            <ReviewRow label="Pronouns" value={normalized.pronouns} />
          ) : null}
          {normalized.relationshipStatus ? (
            <ReviewRow
              label="Relationship"
              value={normalized.relationshipStatus}
            />
          ) : null}
          <Badge icon="shield-checkmark-outline" tone="green">
            Private to your account
          </Badge>
          {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
          {hasErrors(errors) ? (
            <AppButton href="/name" label="Edit details" variant="secondary" />
          ) : null}
          <AppButton
            disabled={saving}
            label={saving ? 'Saving...' : 'Save cosmic profile'}
            onPress={saveProfile}
          />
        </View>
      </CelestialCard>
      <SafeDisclaimerBlock />
    </OnboardingShell>
  );
}

type ShellProps = {
  body: string;
  children: ReactNode;
  title: string;
  variant:
    | 'birthDate'
    | 'birthPlace'
    | 'birthTime'
    | 'interest'
    | 'name'
    | 'profileResult';
};

function OnboardingShell({ body, children, title, variant }: ShellProps) {
  return (
    <CosmicScreen background={<Phase3VisualBackground variant={variant} />}>
      <ScreenHeader
        body={body}
        eyebrow="Onboarding"
        icon="sparkles-outline"
        title={title}
      />
      {children}
    </CosmicScreen>
  );
}

type FormInputProps = {
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

function FormInput({
  error,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  value,
}: FormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        selectionColor="rgba(246, 199, 106, 0.38)"
        style={[styles.input, Boolean(error) && styles.inputError]}
        value={value}
      />
      <ErrorText message={error} />
    </View>
  );
}

function ChoicePill({
  label,
  onPress,
  selected,
}: {
  label: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.choicePill,
        selected && styles.selectedChoice,
        pressed && styles.pressedChoice,
      ]}
    >
      <Text style={[styles.choiceText, selected && styles.selectedChoiceText]}>
        {label}
      </Text>
      {selected ? (
        <Ionicons
          name="checkmark-circle"
          color={colors.accent.gold}
          size={18}
        />
      ) : null}
    </Pressable>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value || 'Not set'}</Text>
    </View>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  choicePill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.055)',
    borderColor: colors.border.violet,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
  },
  choiceRow: {
    gap: spacing.sm,
  },
  choiceStack: {
    gap: spacing.sm,
  },
  choiceText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  error: {
    ...typography.bodySmall,
    color: '#FEB2B2',
  },
  form: {
    gap: spacing.lg,
  },
  helper: {
    ...typography.bodySmall,
    color: colors.text.muted,
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
  inputError: {
    borderColor: '#FEB2B2',
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.accent.gold,
    textTransform: 'uppercase',
  },
  pressedChoice: {
    opacity: 0.82,
  },
  reviewLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  reviewRow: {
    borderBottomColor: colors.border.card,
    borderBottomWidth: 1,
    gap: spacing.xs,
    paddingBottom: spacing.sm,
  },
  reviewStack: {
    gap: spacing.md,
  },
  reviewValue: {
    ...typography.body,
    color: colors.text.primary,
  },
  selectedChoice: {
    backgroundColor: 'rgba(246, 199, 106, 0.12)',
    borderColor: colors.accent.gold,
  },
  selectedChoiceText: {
    color: colors.text.primary,
  },
});
