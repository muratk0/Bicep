import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';

const menu = [
  { name: 'Bubble Tea', price: 55, desc: 'Tapioka incili, soğuk aromalı çay.' },
  { name: 'Yeşil Çay', price: 30, desc: 'Taze demlenmiş, sağlıklı yeşil çay.' },
  { name: 'Sıcak Çikolata', price: 35, desc: 'Yoğun çikolatalı sıcak içecek.' },
  { name: 'Limonlu Ice Tea', price: 28, desc: 'Buzlu, limon aromalı soğuk çay.' },
];

export default function TeaShopMenuScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader showBackButton />
      <View style={styles.container}>
        <Text style={styles.title}>TeaShop Menüsü</Text>
        <FlatList
          data={menu}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.price}>{item.price}₺</Text>
              </View>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: 'bold', margin: 18, color: '#222' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#0a2a66' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#0a2a66' },
  desc: { fontSize: 14, color: '#444', marginTop: 4 },
}); 