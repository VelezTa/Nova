import type { WeeklyPredictionEntitlement } from './types';

export function getWeeklyPredictionEntitlement(): WeeklyPredictionEntitlement {
  return 'free';
}

export function canViewFullWeeklyPrediction(
  entitlement: WeeklyPredictionEntitlement,
) {
  return entitlement === 'plus' || entitlement === 'pro';
}
