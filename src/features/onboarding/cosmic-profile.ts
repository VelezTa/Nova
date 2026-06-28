export const MAIN_INTERESTS = [
  'Love',
  'Career',
  'Money',
  'Self-growth',
  'Emotional clarity',
  'Compatibility',
  'Daily guidance',
] as const;

export const APPROXIMATE_TIME_RANGES = [
  'Early morning',
  'Morning',
  'Afternoon',
  'Evening',
  'Night',
] as const;

export type MainInterest = (typeof MAIN_INTERESTS)[number];
export type BirthTimeAccuracy = 'exact' | 'approximate';

export type OnboardingForm = {
  name: string;
  gender: string;
  pronouns: string;
  relationshipStatus: string;
  birthDate: string;
  birthTime: string;
  birthTimeAccuracy: BirthTimeAccuracy;
  approximateTimeRange: string;
  birthCity: string;
  birthCountry: string;
  mainInterest: MainInterest | '';
};

export type OnboardingErrors = Partial<Record<keyof OnboardingForm, string>>;

export const initialOnboardingForm: OnboardingForm = {
  approximateTimeRange: '',
  birthCity: '',
  birthCountry: '',
  birthDate: '',
  birthTime: '',
  birthTimeAccuracy: 'exact',
  gender: '',
  mainInterest: '',
  name: '',
  pronouns: '',
  relationshipStatus: '',
};

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

function trimmed(value: string) {
  return value.trim();
}

function checkText(
  errors: OnboardingErrors,
  field: keyof OnboardingForm,
  value: string,
  label: string,
  maxLength: number,
  required = false,
) {
  const nextValue = trimmed(value);

  if (required && !nextValue) {
    errors[field] = `${label} is required.`;
    return;
  }

  if (nextValue.length > maxLength) {
    errors[field] = `${label} must be ${maxLength} characters or fewer.`;
  }
}

export function validateNameStep(form: OnboardingForm) {
  const errors: OnboardingErrors = {};

  checkText(errors, 'name', form.name, 'Name', 80, true);
  checkText(errors, 'gender', form.gender, 'Gender', 40);
  checkText(errors, 'pronouns', form.pronouns, 'Pronouns', 40);
  checkText(
    errors,
    'relationshipStatus',
    form.relationshipStatus,
    'Relationship status',
    60,
  );

  return errors;
}

export function validateBirthDateStep(form: OnboardingForm) {
  const errors: OnboardingErrors = {};
  const birthDate = trimmed(form.birthDate);

  if (!birthDate) {
    errors.birthDate = 'Birth date is required.';
    return errors;
  }

  if (!isoDatePattern.test(birthDate)) {
    errors.birthDate = 'Use YYYY-MM-DD format.';
    return errors;
  }

  const parsedDate = new Date(`${birthDate}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    errors.birthDate = 'Enter a valid birth date.';
    return errors;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate > today) {
    errors.birthDate = 'Birth date cannot be in the future.';
  }

  return errors;
}

export function validateBirthTimeStep(form: OnboardingForm) {
  const errors: OnboardingErrors = {};

  if (form.birthTimeAccuracy === 'exact') {
    if (!trimmed(form.birthTime)) {
      errors.birthTime = 'Birth time is required for exact time.';
    } else if (!timePattern.test(trimmed(form.birthTime))) {
      errors.birthTime = 'Use 24-hour HH:MM format.';
    }

    return errors;
  }

  if (!trimmed(form.approximateTimeRange)) {
    errors.approximateTimeRange = 'Choose an approximate time range.';
  }

  return errors;
}

export function validateBirthPlaceStep(form: OnboardingForm) {
  const errors: OnboardingErrors = {};

  checkText(errors, 'birthCity', form.birthCity, 'Birth city', 120, true);
  checkText(
    errors,
    'birthCountry',
    form.birthCountry,
    'Birth country',
    120,
    true,
  );

  return errors;
}

export function validateInterestStep(form: OnboardingForm) {
  const errors: OnboardingErrors = {};

  if (!form.mainInterest) {
    errors.mainInterest = 'Choose a main interest.';
  } else if (!MAIN_INTERESTS.includes(form.mainInterest as MainInterest)) {
    errors.mainInterest = 'Choose one of the documented interests.';
  }

  return errors;
}

export function validateOnboardingForm(form: OnboardingForm) {
  return {
    ...validateNameStep(form),
    ...validateBirthDateStep(form),
    ...validateBirthTimeStep(form),
    ...validateBirthPlaceStep(form),
    ...validateInterestStep(form),
  };
}

export function hasErrors(errors: OnboardingErrors) {
  return Object.keys(errors).length > 0;
}

export function normalizeOnboardingForm(form: OnboardingForm): OnboardingForm {
  const birthTimeAccuracy = form.birthTimeAccuracy;

  return {
    approximateTimeRange:
      birthTimeAccuracy === 'approximate'
        ? trimmed(form.approximateTimeRange)
        : '',
    birthCity: trimmed(form.birthCity),
    birthCountry: trimmed(form.birthCountry),
    birthDate: trimmed(form.birthDate),
    birthTime: birthTimeAccuracy === 'exact' ? trimmed(form.birthTime) : '',
    birthTimeAccuracy,
    gender: trimmed(form.gender),
    mainInterest: form.mainInterest,
    name: trimmed(form.name),
    pronouns: trimmed(form.pronouns),
    relationshipStatus: trimmed(form.relationshipStatus),
  };
}

export function createCosmicSummary(form: OnboardingForm) {
  return `Your profile may support ${form.mainInterest.toLowerCase()} with a gentle focus on reflection, timing, and emotional clarity.`;
}
