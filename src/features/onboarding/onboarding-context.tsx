import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import { initialOnboardingForm, type OnboardingForm } from './cosmic-profile';

type OnboardingDraftContextValue = {
  form: OnboardingForm;
  resetForm: () => void;
  updateForm: (values: Partial<OnboardingForm>) => void;
};

const OnboardingDraftContext =
  createContext<OnboardingDraftContextValue | null>(null);

export function OnboardingDraftProvider({ children }: PropsWithChildren) {
  const [form, setForm] = useState<OnboardingForm>(initialOnboardingForm);

  const value = useMemo<OnboardingDraftContextValue>(
    () => ({
      form,
      resetForm: () => setForm(initialOnboardingForm),
      updateForm: (values) =>
        setForm((current) => ({
          ...current,
          ...values,
        })),
    }),
    [form],
  );

  return (
    <OnboardingDraftContext.Provider value={value}>
      {children}
    </OnboardingDraftContext.Provider>
  );
}

export function useOnboardingDraft() {
  const value = useContext(OnboardingDraftContext);

  if (!value) {
    throw new Error(
      'useOnboardingDraft must be used within OnboardingDraftProvider.',
    );
  }

  return value;
}
