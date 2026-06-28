import type { DailyCardEntitlement } from './types';

export function getDailyCardEntitlement(): DailyCardEntitlement {
  return 'free';
}

export function canViewFullDailyCard(entitlement: DailyCardEntitlement) {
  return entitlement === 'plus' || entitlement === 'pro';
}
