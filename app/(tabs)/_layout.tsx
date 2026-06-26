import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { CosmicGlow } from '@/components';
import { colors, radii, spacing, typography } from '@/theme';

type TabIconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(name: TabIconName, focusedName: TabIconName = name) {
  return function TabIcon({
    color,
    focused,
  }: {
    color: ColorValue;
    focused: boolean;
  }) {
    return (
      <Ionicons
        color={color as string}
        name={focused ? focusedName : name}
        size={focused ? 25 : 23}
      />
    );
  };
}

function novaTabIcon() {
  return function NovaTabIcon({ focused }: { focused: boolean }) {
    return (
      <CosmicGlow intensity={focused ? 'strong' : 'soft'}>
        <View style={[styles.novaIcon, focused && styles.novaIconFocused]}>
          <Ionicons
            color={colors.accent.gold}
            name={focused ? 'sparkles' : 'sparkles-outline'}
            size={31}
          />
        </View>
      </CosmicGlow>
    );
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent.gold,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarLabelStyle: {
          ...typography.caption,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(7, 7, 24, 0.96)',
          borderColor: 'rgba(255, 255, 255, 0.07)',
          borderTopWidth: 1,
          height: 90,
          paddingBottom: spacing.md,
          paddingTop: spacing.sm,
        },
        tabBarItemStyle: {
          borderRadius: radii.md,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: tabIcon('home-outline', 'home'),
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: tabIcon('compass-outline', 'compass'),
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: novaTabIcon(),
          title: 'Nova',
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: tabIcon('journal-outline', 'journal'),
          title: 'Journal',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: tabIcon('person-circle-outline', 'person-circle'),
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="daily"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="palm"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  novaIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(55, 28, 96, 0.78)',
    borderColor: 'rgba(255, 211, 110, 0.32)',
    borderRadius: 999,
    borderWidth: 1,
    height: 58,
    justifyContent: 'center',
    marginTop: -12,
    width: 58,
  },
  novaIconFocused: {
    backgroundColor: 'rgba(100, 48, 160, 0.82)',
    borderColor: 'rgba(255, 211, 110, 0.48)',
  },
});
