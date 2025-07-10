import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppHeader from '../../components/AppHeader';

const history = [
  { course: 'PHY101', date: '2024-05-01 09:00' },
  { course: 'MTH101', date: '2024-04-28 13:30' },
  { course: 'CSE201', date: '2024-04-20 10:15' },
];

export default function QrHistoryScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/qr')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#0a2a66" />
        </TouchableOpacity>
        <View style={styles.titleBox}>
          <Text style={styles.headerTitle}>Geçmiş Yoklamalarım</Text>
        </View>
      </View>
      <View style={styles.container}>
        {history.map((item, idx) => (
          <View key={idx} style={styles.itemBox}>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minHeight: 64,
  },
  backBtn: {
    marginLeft: 8,
    marginRight: 0,
    padding: 4,
    zIndex: 2,
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
    backgroundColor: '#f7faff',
    borderRadius: 16,
    paddingVertical: 10,
    marginVertical: 10,
    marginLeft: -28,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a2a66',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    padding: 18,
  },
  itemBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  course: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a2a66',
  },
  date: {
    fontSize: 14,
    color: '#6c7685',
    marginTop: 4,
  },
}); 