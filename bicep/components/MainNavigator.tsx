import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import AnasayfaScreen from '../app/(tabs)/anasayfa';
import BottomTabBar from './BottomTabBar';

// Şu anlık placeholder ekranlar kullanıyoruz
// Gerçek ekranlar geliştirildikçe bunları güncelle
const CuzdanScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Cüzdan Ekranı</Text>
  </View>
);

const QRKodScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>QR Kod Ekranı</Text>
  </View>
);

const MenulerScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Menüler Ekranı</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar activeRouteName={props.state.routes[props.state.index].name} />}
        screenOptions={{ 
          headerShown: false,
        }}
      >
        <Tab.Screen name="Anasayfa" component={AnasayfaScreen} />
        <Tab.Screen name="Cuzdan" component={CuzdanScreen} />
        <Tab.Screen name="QRKod" component={QRKodScreen} />
        <Tab.Screen name="Menuler" component={MenulerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator; 