import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';

const menu = [
  { name: 'Klasik Hamburger', price: 75, desc: 'Dana köftesi, marul, domates, turşu ve özel sos ile.' },
  { name: 'Patates Kızartması', price: 30, desc: 'Çıtır patates kızartması.' },
  { name: 'Soğuk Çay', price: 20, desc: 'Buzlu, limonlu soğuk çay.' },
  { name: 'Tavuk Wrap', price: 60, desc: 'Izgara tavuk, yeşillik ve soslu lavaş.' },
];

export default function IDCafeMenuScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader showBackButton />
      <View style={styles.container}>
        <Text style={styles.title}>IDCafe Menüsü</Text>
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