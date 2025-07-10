import { Ionicons } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabBar from '../../components/BottomTabBar';

export default function TabLayout() {
  const pathname = usePathname();
  
  // Login ekranında tab bar'ı gösterme
  if (pathname === '/(tabs)/login') {
    return (
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
        <Tabs.Screen 
          name="login" 
          options={{ 
            title: 'Giriş',
            tabBarStyle: { display: 'none' },
            tabBarButton: () => null 
          }} 
        />
      </Tabs>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => {
          // Eğer login ekranındaysak tab bar'ı gösterme
          const currentRoute = props.state.routes[props.state.index].name;
          
          if (currentRoute === 'login') {
            return null;
          }
          
          return <BottomTabBar activeRouteName={currentRoute} />;
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen 
          name="anasayfa" 
          options={{ 
            title: 'Ana Sayfa',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="cuzdan" 
          options={{ 
            title: 'Cüzdan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet" size={size} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="qr-ode" 
          options={{ 
            title: 'QR Öde',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="qr-code" size={size} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="menuler" 
          options={{ 
            title: 'Puan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy" size={size} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="servis" 
          options={{ 
            title: 'Servis',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bus" size={size} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="biprojem" 
          options={{ 
            title: 'Biprojem', 
            tabBarButton: () => null 
          }} 
        />
        <Tabs.Screen
          name="login" 
          options={{
            title: 'Giriş', 
            tabBarStyle: { display: 'none' },
            tabBarButton: () => null 
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
