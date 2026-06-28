import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useAuth } from './auth-context';

export function AuthRouteGate({ children }: PropsWithChildren) {
  const { initializing, isConfigured, profileStatus, session } = useAuth();
  const navigationState = useRootNavigationState();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!navigationState?.key || initializing) {
      return;
    }

    const rootSegment = segments[0] as string | undefined;
    const inAuth = rootSegment === 'auth';
    const inOnboarding = rootSegment === '(onboarding)';

    if (!isConfigured || !session) {
      if (!inAuth) {
        router.replace('/auth' as never);
      }

      return;
    }

    if (profileStatus === 'loading') {
      return;
    }

    if (profileStatus === 'missing') {
      if (!inOnboarding) {
        router.replace('/name');
      }

      return;
    }

    if (inAuth || inOnboarding || !rootSegment) {
      router.replace('/home');
    }
  }, [
    initializing,
    isConfigured,
    navigationState?.key,
    profileStatus,
    router,
    segments,
    session,
  ]);

  return children;
}
