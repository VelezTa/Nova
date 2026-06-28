import { useCallback, useEffect, useState } from 'react';

import { getLocalCardDate } from './date';
import {
  getDailyCardHistory,
  loadOrCreateDailyCard,
} from './daily-card-service';
import type { DailyCard } from './types';

import { useAuth } from '@/features/auth/auth-context';

type DailyCardStatus = 'idle' | 'loading' | 'ready' | 'error';
type DailyCardHistoryStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useDailyCard() {
  const { user } = useAuth();
  const [card, setCard] = useState<DailyCard | null>(null);
  const [cardDate] = useState(() => getLocalCardDate());
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<DailyCardStatus>('idle');

  const loadCard = useCallback(async () => {
    if (!user) {
      setError('Sign in to view your Daily Card.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await loadOrCreateDailyCard(user.id, cardDate);
      setCard(result.card);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Daily Card is not ready yet. Please try again.',
      );
      setStatus('error');
    }
  }, [cardDate, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadCard();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadCard]);

  return { card, cardDate, error, reload: loadCard, status };
}

export function useDailyCardHistory() {
  const { user } = useAuth();
  const [cards, setCards] = useState<DailyCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<DailyCardHistoryStatus>('idle');

  const loadHistory = useCallback(async () => {
    if (!user) {
      setCards([]);
      setStatus('ready');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const history = await getDailyCardHistory(user.id);
      setCards(history);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Saved Daily Cards could not be loaded.',
      );
      setStatus('error');
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadHistory();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadHistory]);

  return { cards, error, reload: loadHistory, status };
}
