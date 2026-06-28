import type { AIChatAccess, AIChatEntitlement } from './types';

export function getAIChatEntitlement(): AIChatEntitlement {
  return 'free';
}

export function getAIChatAccess(
  entitlement: AIChatEntitlement,
  usedUserMessages: number,
): AIChatAccess {
  if (entitlement === 'plus' || entitlement === 'pro') {
    return { entitlement, limit_reached: false };
  }

  const remaining = Math.max(0, 1 - usedUserMessages);

  return {
    entitlement,
    limit_reached: remaining <= 0,
    remaining_free_messages: remaining,
  };
}

export function canSendAIChatMessage(access: AIChatAccess) {
  return !access.limit_reached;
}
