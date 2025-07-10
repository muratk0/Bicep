import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabBarProps {
  activeRouteName?: string;
}

const BottomTabBar = ({ activeRouteName }: TabBarProps) => {
  // Aktif route name
  const currentRoute = activeRouteName || '';
  
  // Tab item component
  const TabItem = ({ 
    routeName, 
    label, 
    iconName 
  }: { 
    routeName: string, 
    label: string, 
    iconName: any  // any kullanarak tip hatasından kaçınıyoruz
  }) => {
    const isActive = currentRoute === routeName;
    
    const handlePress = () => {
      // Her bir sekme için sabit yolları tanımlayalım
      switch(routeName) {
        case 'anasayfa':
          router.push('/(tabs)/anasayfa');
          break;
        case 'cuzdan':
          router.push('/(tabs)/cuzdan');
          break;
        case 'qr-ode':
          router.push('/(tabs)/qr-ode');
          break;
        case 'menuler':
          router.push('/(tabs)/menuler');
          break;
        case 'profil':
          router.push('/(tabs)/profil');
          break;
        default:
          break;
      }
    };
    
    return (
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={handlePress}
      >
        <MaterialCommunityIcons 
          name={iconName} 
          size={24} 
          color={isActive ? '#0a2a66' : '#6c7685'} 
        />
        <Text style={isActive ? styles.tabTextActive : styles.tabText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.tabBar}>
      <TabItem 
        routeName="anasayfa" 
        label="Ana sayfa" 
        iconName="home-variant" 
      />
      <TabItem 
        routeName="cuzdan" 
        label="Cüzdan" 
        iconName="wallet" 
      />
      <TabItem 
        routeName="qr-ode" 
        label="QR öde" 
        iconName="qrcode-scan" 
      />
      <TabItem 
        routeName="menuler" 
        label="Puan" 
        iconName="trophy" 
      />
      <TabItem 
        routeName="profil" 
        label="Profil" 
        iconName="account-circle" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#e6eaf0',
    backgroundColor: '#fff',
    paddingBottom: 4,
    paddingTop: 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 13,
    color: '#6c7685',
    marginTop: 2,
    fontWeight: '500',
  },
  tabTextActive: {
    fontSize: 13,
    color: '#0a2a66',
    marginTop: 2,
    fontWeight: 'bold',
  },
});

export default BottomTabBar; 