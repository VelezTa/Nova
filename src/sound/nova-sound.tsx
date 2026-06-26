import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import * as SecureStore from 'expo-secure-store';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import cardOpenSound from '../../assets/audio/nova-card-open.wav';
import natureRiverLoop from '../../assets/audio/nova-nature-river.mp3';
import softTapSound from '../../assets/audio/nova-soft-tap.wav';

import { colors, layout, radii } from '@/theme';

type NovaSoundName = 'ambient' | 'card' | 'tap';

type SoundContextValue = {
  muted: boolean;
  play: (sound: Exclude<NovaSoundName, 'ambient'>) => void;
  toggleMuted: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);
const mutePreferenceKey = 'nova.sound.muted.v3';

export function SoundProvider({ children }: PropsWithChildren) {
  const ambientPlayer = useAudioPlayer(natureRiverLoop);
  const cardPlayer = useAudioPlayer(cardOpenSound);
  const tapPlayer = useAudioPlayer(softTapSound);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: false,
      shouldPlayInBackground: false,
    }).catch(() => undefined);

    SecureStore.getItemAsync(mutePreferenceKey)
      .then((stored) => {
        if (stored === 'false') {
          setMuted(false);
        }
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    // expo-audio exposes loop and volume as player properties.
    // eslint-disable-next-line react-hooks/immutability
    ambientPlayer.loop = true;
    ambientPlayer.volume = 0.72;
    // eslint-disable-next-line react-hooks/immutability
    cardPlayer.volume = 0.48;
    // eslint-disable-next-line react-hooks/immutability
    tapPlayer.volume = 0.38;
  }, [ambientPlayer, cardPlayer, tapPlayer]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    SecureStore.setItemAsync(mutePreferenceKey, String(muted)).catch(
      () => undefined,
    );

    if (muted) {
      ambientPlayer.pause();
      return;
    }

    ambientPlayer.seekTo(0).catch(() => undefined);
    ambientPlayer.play();
  }, [ambientPlayer, muted, ready]);

  const value = useMemo<SoundContextValue>(
    () => ({
      muted,
      play(sound) {
        if (muted) {
          return;
        }

        const player = sound === 'card' ? cardPlayer : tapPlayer;

        player.seekTo(0).catch(() => undefined);
        player.play();
      },
      toggleMuted() {
        setMuted((current) => !current);
      },
    }),
    [cardPlayer, muted, tapPlayer],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useNovaSound() {
  const context = useContext(SoundContext);

  if (!context) {
    return {
      muted: true,
      play: () => undefined,
      toggleMuted: () => undefined,
    } satisfies SoundContextValue;
  }

  return context;
}

export function MuteToggle() {
  const { muted, play, toggleMuted } = useNovaSound();

  return (
    <Pressable
      accessibilityLabel={muted ? 'Unmute Nova sounds' : 'Mute Nova sounds'}
      accessibilityRole="button"
      onPress={() => {
        if (muted) {
          toggleMuted();
          return;
        }

        play('tap');
        toggleMuted();
      }}
      style={styles.toggle}
    >
      <View style={[styles.statusDot, !muted && styles.statusDotActive]} />
      <Ionicons
        color={colors.accent.gold}
        name={muted ? 'volume-mute-outline' : 'volume-high-outline'}
        size={22}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    alignItems: 'center',
    backgroundColor: 'rgba(14, 9, 42, 0.92)',
    borderColor: 'rgba(255, 211, 110, 0.74)',
    borderRadius: radii.pill,
    borderWidth: 1.4,
    height: layout.minTouchTarget + 6,
    justifyContent: 'center',
    shadowColor: colors.accent.gold,
    shadowOpacity: 0.42,
    shadowRadius: 16,
    width: layout.minTouchTarget + 6,
  },
  statusDot: {
    backgroundColor: colors.text.muted,
    borderRadius: radii.pill,
    height: 7,
    position: 'absolute',
    right: 7,
    top: 7,
    width: 7,
  },
  statusDotActive: {
    backgroundColor: colors.accent.positive,
  },
});
