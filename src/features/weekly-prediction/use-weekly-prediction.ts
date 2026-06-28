import { useCallback, useEffect, useState } from 'react';

import { getLocalWeekStartDate } from './date';
import {
  getWeeklyPredictionHistory,
  loadOrCreateWeeklyPrediction,
} from './weekly-prediction-service';
import type { WeeklyPrediction } from './types';

import { useAuth } from '@/features/auth/auth-context';

type WeeklyPredictionStatus = 'idle' | 'loading' | 'ready' | 'error';
type WeeklyPredictionHistoryStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useWeeklyPrediction() {
  const { user } = useAuth();
  const [prediction, setPrediction] = useState<WeeklyPrediction | null>(null);
  const [weekStart] = useState(() => getLocalWeekStartDate());
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<WeeklyPredictionStatus>('idle');

  const loadPrediction = useCallback(async () => {
    if (!user) {
      setError('Sign in to view your Weekly Prediction.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await loadOrCreateWeeklyPrediction(user.id, weekStart);
      setPrediction(result.prediction);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Weekly Prediction is not ready yet. Please try again.',
      );
      setStatus('error');
    }
  }, [user, weekStart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadPrediction();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadPrediction]);

  return { error, prediction, reload: loadPrediction, status, weekStart };
}

export function useWeeklyPredictionHistory(currentWeekStart: string) {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<WeeklyPrediction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<WeeklyPredictionHistoryStatus>('idle');

  const loadHistory = useCallback(async () => {
    if (!user) {
      setPredictions([]);
      setStatus('ready');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const history = await getWeeklyPredictionHistory(
        user.id,
        currentWeekStart,
      );
      setPredictions(history);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Saved Weekly Predictions could not be loaded.',
      );
      setStatus('error');
    }
  }, [currentWeekStart, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadHistory();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadHistory]);

  return { error, predictions, reload: loadHistory, status };
}
