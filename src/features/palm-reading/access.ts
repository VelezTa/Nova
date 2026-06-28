import type { PalmReadingEntitlement } from './types';

export function getPalmReadingEntitlement(): PalmReadingEntitlement {
  return 'free';
}

export function canViewFullPalmReading(entitlement: PalmReadingEntitlement) {
  return (
    entitlement === 'plus' ||
    entitlement === 'pro' ||
    entitlement === 'palm_full'
  );
}
