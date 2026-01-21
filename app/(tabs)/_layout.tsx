import { Tabs } from 'expo-router';

import { ExampleIcon, ExploreIcon, HomeIcon } from '@components/icons/SvgIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2a2a2a',
        },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#8f8f8f',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <ExploreIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="icons"
        options={{
          title: 'Icons',
          tabBarIcon: ({ color }) => <ExampleIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
