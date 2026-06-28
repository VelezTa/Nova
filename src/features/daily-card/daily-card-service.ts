import { getLocalCardDate } from './date';
import { dailyCardTextIsSafe } from './safety';
import type { DailyCard, DailyCardResponse } from './types';

import { supabase } from '@/lib/supabase';

const dailyCardFields =
  'id, user_id, card_date, word, message, number_of_day, color_name, color_hex, energy, advice, generation_source, created_at, updated_at';

function assertSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

function assertSafeCard(card: DailyCard) {
  if (
    !dailyCardTextIsSafe([
      card.word,
      card.message,
      card.color_name,
      card.energy,
      card.advice,
    ])
  ) {
    throw new Error('Daily Card content did not pass safety validation.');
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

export async function getCachedDailyCard(userId: string, cardDate: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('daily_cards')
    .select(dailyCardFields)
    .eq('user_id', userId)
    .eq('card_date', cardDate)
    .maybeSingle<DailyCard>();

  if (error) {
    throw new Error(
      (await getFunctionErrorMessage(error)) ??
        'Daily Card is not ready yet. Please try again.',
    );
  }

  if (data) {
    assertSafeCard(data);
  }

  return data;
}

export async function getDailyCardHistory(userId: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('daily_cards')
    .select(dailyCardFields)
    .eq('user_id', userId)
    .order('card_date', { ascending: false })
    .limit(30)
    .returns<DailyCard[]>();

  if (error) {
    throw error;
  }

  const cards = data ?? [];
  cards.forEach(assertSafeCard);

  return cards;
}

export async function loadOrCreateDailyCard(
  userId: string,
  cardDate = getLocalCardDate(),
) {
  const client = assertSupabaseConfigured();
  const cachedCard = await getCachedDailyCard(userId, cardDate);

  if (cachedCard) {
    return { cached: true, card: cachedCard };
  }

  const { data, error } = await client.functions.invoke<DailyCardResponse>(
    'daily-card',
    {
      body: { card_date: cardDate },
    },
  );

  if (error) {
    throw error;
  }

  if (!data?.card) {
    throw new Error('Daily Card is not ready yet. Please try again.');
  }

  assertSafeCard(data.card);

  return data;
}
