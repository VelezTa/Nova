import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { type ColorValue } from 'react-native';

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
  return function NovaTabIcon({
    color,
    focused,
  }: {
    color: ColorValue;
    focused: boolean;
  }) {
    return (
      <Ionicons
        color={focused ? colors.accent.gold : (color as string)}
        name={focused ? 'sparkles' : 'sparkles-outline'}
        size={focused ? 28 : 24}
      />
    );
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: 'fade',
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
        name="settings"
        options={{
          href: null,
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
