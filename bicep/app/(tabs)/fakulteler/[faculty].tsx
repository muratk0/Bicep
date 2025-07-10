import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const facultyNames: Record<string, string> = {
  tip: 'Tıp Fakültesi',
  eczacilik: 'Eczacılık Fakültesi',
  dis: 'Diş Hekimliği Fakültesi',
  egitim: 'Eğitim Fakültesi',
  muhendislik: 'Mühendislik ve Doğa Bilimleri Fakültesi',
  saglik: 'Sağlık Bilimleri Fakültesi',
  guzelsanat: 'Güzel Sanatlar ve Tasarım Fakültesi',
  hukuk: 'Hukuk Fakültesi',
};

const exampleEvents: Record<string, { date: string; title: string }[]> = {
  tip: [
    { date: '20.05.2025', title: 'Tıp Öğrenci Sempozyumu' },
    { date: '28.05.2025', title: 'Beyaz Önlük Giyme Töreni' },
  ],
  eczacilik: [
    { date: '22.05.2025', title: 'Eczacılık Kariyer Günü' },
    { date: '30.05.2025', title: 'İlaç Geliştirme Atölyesi' },
  ],
  dis: [
    { date: '25.05.2025', title: 'Diş Hekimliği Paneli' },
    { date: '01.06.2025', title: 'Ağız ve Diş Sağlığı Etkinliği' },
  ],
  egitim: [
    { date: '18.05.2025', title: 'Eğitimde Teknoloji Semineri' },
    { date: '27.05.2025', title: 'Öğretmenler Günü Kutlaması' },
  ],
  muhendislik: [
    { date: '19.05.2025', title: 'Yazılım Hackathonu' },
    { date: '29.05.2025', title: 'Mühendislik Proje Sergisi' },
  ],
  saglik: [
    { date: '21.05.2025', title: 'Sağlıkta Kariyer Paneli' },
    { date: '31.05.2025', title: 'Hemşirelik Haftası Etkinliği' },
  ],
  guzelsanat: [
    { date: '23.05.2025', title: 'Sanat Sergisi' },
    { date: '02.06.2025', title: 'Tasarım Atölyesi' },
  ],
  hukuk: [
    { date: '24.05.2025', title: 'Hukukta Güncel Gelişmeler Paneli' },
    { date: '03.06.2025', title: 'Moot Court Yarışması' },
  ],
};

export default function FacultyDetailScreen() {
  const { faculty } = useLocalSearchParams<{ faculty: string }>();
  const router = useRouter();
  const facultyName = facultyNames[faculty ?? ''] || 'Fakülte';
  const events = exampleEvents[faculty ?? ''] || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 4, marginRight: 8 }}>
          <Ionicons name="arrow-back" size={28} color="#2d4379" />
        </TouchableOpacity>
        <Text style={styles.header}>{facultyName}</Text>
      </View>
      {events.length === 0 ? (
        <Text style={styles.noEvent}>Bu fakülteye ait etkinlik bulunamadı.</Text>
      ) : (
        events.map((event, idx) => (
          <View key={idx} style={styles.eventCard}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7faff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2d4379', marginBottom: 24, textAlign: 'center' },
  eventCard: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  eventDate: { fontSize: 15, color: '#1bbf4c', fontWeight: 'bold', marginBottom: 6 },
  eventTitle: { fontSize: 17, color: '#222', fontWeight: 'bold' },
  noEvent: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 32 },
}); 