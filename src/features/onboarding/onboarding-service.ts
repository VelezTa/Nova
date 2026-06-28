import {
  createCosmicSummary,
  normalizeOnboardingForm,
  type OnboardingForm,
} from './cosmic-profile';

import { supabase } from '@/lib/supabase';

export async function saveOnboardingProfile(
  form: OnboardingForm,
  userId: string,
) {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const normalized = normalizeOnboardingForm(form);
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .upsert(
      {
        cosmic_summary: createCosmicSummary(normalized),
        gender: normalized.gender || null,
        main_interest: normalized.mainInterest,
        name: normalized.name,
        pronouns: normalized.pronouns || null,
        relationship_status: normalized.relationshipStatus || null,
        user_id: userId,
      },
      { onConflict: 'user_id' },
    )
    .select('id')
    .single();

  if (profileError) {
    throw profileError;
  }

  const { error: birthProfileError } = await supabase
    .from('birth_profiles')
    .upsert(
      {
        approximate_time_range: normalized.approximateTimeRange || null,
        birth_city: normalized.birthCity,
        birth_country: normalized.birthCountry,
        birth_date: normalized.birthDate,
        birth_time: normalized.birthTime || null,
        birth_time_accuracy: normalized.birthTimeAccuracy,
        name: normalized.name,
        person_label: 'self',
        profile_id: profile.id,
        user_id: userId,
      },
      { onConflict: 'profile_id,person_label' },
    );

  if (birthProfileError) {
    throw birthProfileError;
  }
}
