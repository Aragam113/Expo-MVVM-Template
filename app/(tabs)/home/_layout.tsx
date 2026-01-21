import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'simple_push',
        animationDuration: Platform.OS === 'android' ? undefined : 200,
        contentStyle: { backgroundColor: '#141414' },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
