import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import type { ColorValue } from 'react-native';

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
          backgroundColor: colors.surface.base,
          borderColor: colors.border.card,
          borderTopWidth: 1,
          height: 82,
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
        name="daily"
        options={{
          tabBarIcon: tabIcon('calendar-outline', 'calendar'),
          title: 'Daily',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: tabIcon(
            'chatbubble-ellipses-outline',
            'chatbubble-ellipses',
          ),
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="palm"
        options={{
          tabBarIcon: tabIcon('hand-left-outline', 'hand-left'),
          title: 'Palm',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: tabIcon('person-circle-outline', 'person-circle'),
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
