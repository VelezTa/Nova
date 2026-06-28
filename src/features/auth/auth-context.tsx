import type { Session, User } from '@supabase/supabase-js';
import type { PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type ProfileSummary = {
  id: string;
  name: string;
  mainInterest: string;
};

type ProfileStatus = 'loading' | 'missing' | 'complete';

type AuthContextValue = {
  initializing: boolean;
  isConfigured: boolean;
  profile: ProfileSummary | null;
  profileError: string | null;
  profileStatus: ProfileStatus;
  session: Session | null;
  user: User | null;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadProfileForUser(userId: string) {
  if (!supabase) {
    return {
      error: 'Supabase is not configured.',
      profile: null,
      status: 'missing' as const,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, main_interest')
    .eq('user_id', userId)
    .maybeSingle();

  if (profileError) {
    return {
      error: profileError.message,
      profile: null,
      status: 'missing' as const,
    };
  }

  if (!profile) {
    return { error: null, profile: null, status: 'missing' as const };
  }

  const { data: birthProfile, error: birthProfileError } = await supabase
    .from('birth_profiles')
    .select('id')
    .eq('user_id', userId)
    .eq('profile_id', profile.id)
    .eq('person_label', 'self')
    .maybeSingle();

  if (birthProfileError) {
    return {
      error: birthProfileError.message,
      profile: null,
      status: 'missing' as const,
    };
  }

  if (!birthProfile) {
    return { error: null, profile: null, status: 'missing' as const };
  }

  return {
    error: null,
    profile: {
      id: profile.id,
      mainInterest: profile.main_interest,
      name: profile.name,
    },
    status: 'complete' as const,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(Boolean(supabase));
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(
    supabase ? 'loading' : 'missing',
  );
  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [profileError, setProfileError] = useState<string | null>(
    supabase ? null : 'Supabase environment variables are not configured.',
  );

  const setMissingProfile = useCallback((error: string | null = null) => {
    setProfile(null);
    setProfileError(error);
    setProfileStatus('missing');
  }, []);

  const refreshProfileForSession = useCallback(
    async (nextSession: Session | null) => {
      if (!nextSession?.user) {
        setMissingProfile();
        return;
      }

      setProfileStatus('loading');
      const result = await loadProfileForUser(nextSession.user.id);

      setProfile(result.profile);
      setProfileError(result.error);
      setProfileStatus(result.status);
    },
    [setMissingProfile],
  );

  const refreshProfile = useCallback(async () => {
    await refreshProfileForSession(session);
  }, [refreshProfileForSession, session]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!mounted) {
          return;
        }

        setSession(data.session);
        await refreshProfileForSession(data.session);
      })
      .finally(() => {
        if (mounted) {
          setInitializing(false);
        }
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
        void refreshProfileForSession(nextSession);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [refreshProfileForSession, setMissingProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Supabase is not configured.');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setSession(null);
    setMissingProfile();
  }, [setMissingProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      initializing,
      isConfigured: isSupabaseConfigured,
      profile,
      profileError,
      profileStatus,
      refreshProfile,
      session,
      signIn,
      signOut,
      signUp,
      user: session?.user ?? null,
    }),
    [
      initializing,
      profile,
      profileError,
      profileStatus,
      refreshProfile,
      session,
      signIn,
      signOut,
      signUp,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return value;
}
