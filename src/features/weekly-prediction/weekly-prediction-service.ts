import { getLocalWeekStartDate } from './date';
import {
  weeklyMoneyTextIsSafe,
  weeklyPredictionTextIsSafe,
  weeklyWellnessTextIsSafe,
} from './safety';
import type { WeeklyPrediction, WeeklyPredictionResponse } from './types';

import { supabase } from '@/lib/supabase';

const weeklyPredictionFields =
  'id, user_id, week_start, general_energy, love, work, money, wellness, favorable_day, word_of_week, color_name, color_hex, advice, generation_source, created_at, updated_at';

function assertSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

function assertSafePrediction(prediction: WeeklyPrediction) {
  if (
    !weeklyPredictionTextIsSafe([
      prediction.general_energy,
      prediction.love,
      prediction.work,
      prediction.favorable_day,
      prediction.word_of_week,
      prediction.color_name,
      prediction.advice,
    ]) ||
    !weeklyMoneyTextIsSafe(prediction.money) ||
    !weeklyWellnessTextIsSafe(prediction.wellness)
  ) {
    throw new Error(
      'Weekly Prediction content did not pass safety validation.',
    );
  }
}

async function getFunctionErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'context' in error) {
    const context = error.context as { json?: () => Promise<unknown> };

    if (typeof context?.json === 'function') {
      try {
        const body = (await context.json()) as { error?: unknown };

        if (typeof body.error === 'string') {
          return body.error;
        }
      } catch {
        return null;
      }
    }
  }

  return error instanceof Error ? error.message : null;
}

export async function getCachedWeeklyPrediction(
  userId: string,
  weekStart: string,
) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('weekly_predictions')
    .select(weeklyPredictionFields)
    .eq('user_id', userId)
    .eq('week_start', weekStart)
    .maybeSingle<WeeklyPrediction>();

  if (error) {
    throw new Error(
      (await getFunctionErrorMessage(error)) ??
        'Weekly Prediction is not ready yet. Please try again.',
    );
  }

  if (data) {
    assertSafePrediction(data);
  }

  return data;
}

export async function getWeeklyPredictionHistory(
  userId: string,
  currentWeekStart: string,
) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('weekly_predictions')
    .select(weeklyPredictionFields)
    .eq('user_id', userId)
    .lt('week_start', currentWeekStart)
    .order('week_start', { ascending: false })
    .limit(12)
    .returns<WeeklyPrediction[]>();

  if (error) {
    throw error;
  }

  const predictions = data ?? [];
  predictions.forEach(assertSafePrediction);

  return predictions;
}

export async function loadOrCreateWeeklyPrediction(
  userId: string,
  weekStart = getLocalWeekStartDate(),
) {
  const client = assertSupabaseConfigured();
  const cachedPrediction = await getCachedWeeklyPrediction(userId, weekStart);

  if (cachedPrediction) {
    return { cached: true, prediction: cachedPrediction };
  }

  const { data, error } =
    await client.functions.invoke<WeeklyPredictionResponse>(
      'weekly-prediction',
      {
        body: { week_start: weekStart },
      },
    );

  if (error) {
    throw error;
  }

  if (!data?.prediction) {
    throw new Error('Weekly Prediction is not ready yet. Please try again.');
  }

  assertSafePrediction(data.prediction);

  return data;
}
