import { useCallback, useEffect, useState } from 'react';

import {
  generatePalmReading,
  getLatestPalmReading,
  getPalmReading,
  getPalmReadingHistory,
  submitPalmReading,
} from './palm-reading-service';
import type { PalmReading, SelectedPalmImage } from './types';

import { useAuth } from '@/features/auth/auth-context';

type PalmReadingStatus = 'idle' | 'loading' | 'ready' | 'error';
type PalmUploadStatus = 'idle' | 'uploading' | 'ready' | 'error';

export function usePalmReading(readingId?: string | null) {
  const { user } = useAuth();
  const [reading, setReading] = useState<PalmReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<PalmReadingStatus>('idle');

  const loadReading = useCallback(async () => {
    if (!user) {
      setError('Sign in to view your Palm Reading.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const loadedReading = readingId
        ? await getPalmReading(readingId, user.id)
        : await getLatestPalmReading(user.id);

      setReading(loadedReading);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Palm Reading could not be loaded.',
      );
      setStatus('error');
    }
  }, [readingId, user]);

  const retryGeneration = useCallback(async () => {
    if (!reading) {
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await generatePalmReading(reading.id);
      setReading(result.reading);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Palm Reading could not be generated.',
      );
      setStatus('error');
    }
  }, [reading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadReading();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadReading]);

  return { error, reading, reload: loadReading, retryGeneration, status };
}

export function usePalmReadingHistory() {
  const { user } = useAuth();
  const [readings, setReadings] = useState<PalmReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<PalmReadingStatus>('idle');

  const loadHistory = useCallback(async () => {
    if (!user) {
      setReadings([]);
      setStatus('ready');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const history = await getPalmReadingHistory(user.id);
      setReadings(history);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Saved Palm Readings could not be loaded.',
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

  return { error, readings, reload: loadHistory, status };
}

export function usePalmReadingUpload() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<PalmReading | null>(null);
  const [status, setStatus] = useState<PalmUploadStatus>('idle');

  const submit = useCallback(
    async ({
      leftImage,
      rightImage,
    }: {
      leftImage: SelectedPalmImage | null;
      rightImage: SelectedPalmImage | null;
    }) => {
      if (!user) {
        setError('Sign in to create a Palm Reading.');
        setStatus('error');
        return null;
      }

      if (!leftImage || !rightImage) {
        setError('Both left and right palm images are required.');
        setStatus('error');
        return null;
      }

      setStatus('uploading');
      setError(null);

      try {
        const result = await submitPalmReading({
          leftImage,
          rightImage,
          userId: user.id,
        });
        setReading(result.reading);
        setStatus('ready');
        return result.reading;
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Palm Reading could not be created.',
        );
        setStatus('error');
        return null;
      }
    },
    [user],
  );

  return { error, reading, status, submit };
}
