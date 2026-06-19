import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Phase 2 setup</Text>
        <Text style={styles.title}>Nova</Text>
        <Text style={styles.body}>
          Temporary Expo Router shell. Production features start in later
          approved phases.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  eyebrow: {
    marginBottom: 8,
    color: '#6f6b7a',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    color: '#211a32',
    fontSize: 40,
    fontWeight: '700',
  },
  body: {
    marginTop: 16,
    maxWidth: 320,
    color: '#4f485d',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
