import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Stack screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)/anasayfa" />
            <Stack.Screen name="(tabs)/cuzdan" />
            <Stack.Screen name="(tabs)/qr-ode" />
            <Stack.Screen name="(tabs)/menuler" />
            <Stack.Screen name="(tabs)/login" options={{ headerShown: false }} />
      </Stack>
        </View>
      <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
