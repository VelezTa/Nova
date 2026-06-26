import {
  CormorantGaramond_700Bold,
  useFonts as useCormorantFonts,
} from '@expo-google-fonts/cormorant-garamond';
import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  useFonts as useNunitoFonts,
} from '@expo-google-fonts/nunito-sans';
import { Stack } from 'expo-router';

import { SoundProvider } from '@/sound/nova-sound';
import { colors } from '@/theme';

export default function RootLayout() {
  const [displayFontsLoaded] = useCormorantFonts({
    CormorantGaramond_700Bold,
  });
  const [bodyFontsLoaded] = useNunitoFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });

  if (!displayFontsLoaded || !bodyFontsLoaded) {
    return null;
  }

  return (
    <SoundProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background.base },
          headerShown: false,
        }}
      />
    </SoundProvider>
  );
}
