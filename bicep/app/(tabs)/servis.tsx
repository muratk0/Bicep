import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const servisBilgileri = [
  {
    baslik: 'Kazlıçeşme Ring',
    saatler: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  },
  {
    baslik: 'Teknopark Ring',
    saatler: ['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30']
  }
];

function saatleriSatirlaraBol(saatler: string[], satirUzunlugu: number) {
  const satirlar = [];
  for (let i = 0; i < saatler.length; i += satirUzunlugu) {
    satirlar.push(saatler.slice(i, i + satirUzunlugu));
  }
  return satirlar;
}

export default function Servis() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, marginRight: 8 }}>
          <Ionicons name="arrow-back" size={28} color="#2d4379" />
        </TouchableOpacity>
        <Text style={styles.header}>Servis Bilgileri</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {servisBilgileri.map((servis, index) => (
          <View key={index} style={styles.servisCard}>
            <Text style={styles.servisBaslik}>{servis.baslik}</Text>
            <View style={styles.saatlerContainer}>
              {saatleriSatirlaraBol(servis.saatler, 4).map((satir, idx) => (
                <View key={idx} style={styles.saatSatiri}>
                  {satir.map((saat, i) => (
                    <Text key={i} style={styles.saatText}>{saat}</Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#2d4379', marginBottom: 24, textAlign: 'center' },
  servisCard: { backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  servisBaslik: { fontSize: 20, fontWeight: 'bold', color: '#2d4379', marginBottom: 14 },
  saatlerContainer: { },
  saatSatiri: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  saatText: { fontSize: 18, color: '#222', minWidth: 60, textAlign: 'center' }
}); 