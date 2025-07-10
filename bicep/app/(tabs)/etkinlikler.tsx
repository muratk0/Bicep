import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const events = [
  { date: '15.05.2025', title: 'Biruni Bahar Festivali' },
  { date: '20.05.2025', title: 'Kariyer Günü: Sağlıkta Gelecek' },
  { date: '25.05.2025', title: 'Spor Turnuvası - Futbol Finali' },
  { date: '28.05.2025', title: 'Tiyatro Gecesi: "Biruni Sahnesi"' },
  { date: '30.05.2025', title: 'Gönüllülük Kulübü Kan Bağışı Etkinliği' },
  { date: '02.06.2025', title: 'Yaz Dönemi Açık Hava Sineması' },
];

export default function Etkinlikler() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, marginRight: 8 }}>
          <Ionicons name="arrow-back" size={28} color="#2d4379" />
        </TouchableOpacity>
        <Text style={styles.header}>Okul Etkinlikleri</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 32}}>
        {events.map((event, idx) => (
          <View key={idx} style={styles.eventCard}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2d4379', marginBottom: 24, textAlign: 'center' },
  eventCard: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  eventDate: { fontSize: 15, color: '#1bbf4c', fontWeight: 'bold', marginBottom: 6 },
  eventTitle: { fontSize: 17, color: '#222', fontWeight: 'bold' },
}); 