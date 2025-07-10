import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Yemekhane() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, marginRight: 8 }}>
          <Ionicons name="arrow-back" size={28} color="#2d4379" />
        </TouchableOpacity>
        <Text style={styles.header}>Yemekhane Günlük Menü</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>8 Mayıs 2025</Text>
          <Text style={styles.menuItem}>Mercimek Çorbası</Text>
          <Text style={styles.menuItem}>Tavuk Sote</Text>
          <Text style={styles.menuItem}>Pirinç Pilavı</Text>
          <Text style={styles.menuItem}>Yoğurt</Text>
          <Text style={styles.menuItem}>Meyve</Text>
          <Text style={styles.price}>Fiyat: 250₺</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2d4379', marginBottom: 24, textAlign: 'center' },
  menuCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, alignItems: 'center' },
  menuTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#2d4379' },
  menuItem: { fontSize: 16, color: '#222', marginBottom: 6 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#1bbf4c', marginTop: 16 },
}); 