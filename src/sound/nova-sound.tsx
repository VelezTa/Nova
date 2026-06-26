import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import * as SecureStore from 'expo-secure-store';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import cardOpenSound from '../../assets/audio/nova-card-open.wav';
import natureRiverLoop from '../../assets/audio/nova-nature-river.mp3';
import softTapSound from '../../assets/audio/nova-soft-tap.wav';

type NovaSoundName = 'ambient' | 'card' | 'tap';
export type NovaSoundVolume = 'soft' | 'balanced' | 'full';

type SoundContextValue = {
  ambientEnabled: boolean;
  effectsEnabled: boolean;
  play: (sound: Exclude<NovaSoundName, 'ambient'>) => void;
  ready: boolean;
  setAmbientEnabled: (enabled: boolean) => void;
  setEffectsEnabled: (enabled: boolean) => void;
  setVolume: (volume: NovaSoundVolume) => void;
  volume: NovaSoundVolume;
};

const SoundContext = createContext<SoundContextValue | null>(null);
const ambientPreferenceKey = 'nova.sound.ambient.enabled.v2';
const effectsPreferenceKey = 'nova.sound.effects.enabled.v1';
const legacyMutePreferenceKey = 'nova.sound.muted.v3';
const volumePreferenceKey = 'nova.sound.volume.v1';

const volumeLevel: Record<NovaSoundVolume, number> = {
  soft: 0.42,
  balanced: 0.68,
  full: 0.88,
};

export function SoundProvider({ children }: PropsWithChildren) {
  const ambientPlayer = useAudioPlayer(natureRiverLoop);
  const cardPlayer = useAudioPlayer(cardOpenSound);
  const tapPlayer = useAudioPlayer(softTapSound);
  const [ambientEnabled, setAmbientEnabledState] = useState(true);
  const [effectsEnabled, setEffectsEnabledState] = useState(true);
  const [ready, setReady] = useState(false);
  const [volume, setVolumeState] = useState<NovaSoundVolume>('balanced');

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    }).catch(() => undefined);

    Promise.all([
      SecureStore.getItemAsync(ambientPreferenceKey),
      SecureStore.getItemAsync(effectsPreferenceKey),
      SecureStore.getItemAsync(volumePreferenceKey),
      SecureStore.getItemAsync(legacyMutePreferenceKey),
    ])
      .then(([storedAmbient, storedEffects, storedVolume, legacyMuted]) => {
        if (storedAmbient === 'false') {
          setAmbientEnabledState(false);
        }

        if (storedEffects === 'false' || legacyMuted === 'true') {
          setEffectsEnabledState(false);
        }

        if (
          storedVolume === 'soft' ||
          storedVolume === 'balanced' ||
          storedVolume === 'full'
        ) {
          setVolumeState(storedVolume);
        }
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const level = volumeLevel[volume];

    // expo-audio exposes loop and volume as player properties.
    // eslint-disable-next-line react-hooks/immutability
    ambientPlayer.loop = true;
    ambientPlayer.volume = level * 0.74;
    // eslint-disable-next-line react-hooks/immutability
    cardPlayer.volume = level * 0.62;
    // eslint-disable-next-line react-hooks/immutability
    tapPlayer.volume = level * 0.5;
  }, [ambientPlayer, cardPlayer, tapPlayer, volume]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    SecureStore.setItemAsync(
      ambientPreferenceKey,
      String(ambientEnabled),
    ).catch(() => undefined);
    SecureStore.setItemAsync(
      effectsPreferenceKey,
      String(effectsEnabled),
    ).catch(() => undefined);
    SecureStore.setItemAsync(volumePreferenceKey, volume).catch(
      () => undefined,
    );

    if (!ambientEnabled) {
      ambientPlayer.pause();
      return;
    }

    ambientPlayer.seekTo(0).catch(() => undefined);
    ambientPlayer.play();
  }, [ambientEnabled, ambientPlayer, effectsEnabled, ready, volume]);

  const value = useMemo<SoundContextValue>(
    () => ({
      ambientEnabled,
      effectsEnabled,
      play(sound) {
        if (!ready || !effectsEnabled) {
          return;
        }

        const player = sound === 'card' ? cardPlayer : tapPlayer;

        player.seekTo(0).catch(() => undefined);
        player.play();
      },
      ready,
      setAmbientEnabled: setAmbientEnabledState,
      setEffectsEnabled: setEffectsEnabledState,
      setVolume: setVolumeState,
      volume,
    }),
    [ambientEnabled, cardPlayer, effectsEnabled, ready, tapPlayer, volume],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useNovaSound() {
  const context = useContext(SoundContext);

  if (!context) {
    return {
      ambientEnabled: false,
      effectsEnabled: false,
      play: () => undefined,
      ready: false,
      setAmbientEnabled: () => undefined,
      setEffectsEnabled: () => undefined,
      setVolume: () => undefined,
      volume: 'balanced',
    } satisfies SoundContextValue;
  }

  return context;
}
