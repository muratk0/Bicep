import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../../components/AppHeader';

export default function ProfilScreen() {
  const router = useRouter();
  
  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabınızdan çıkış yapıldı!', [
      {
        text: 'Tamam',
        onPress: () => router.replace('/(tabs)/login')
      }
    ]); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.infoBox}>
            <View style={styles.profileHeader}>
              <Ionicons name="person-circle" size={80} color="#0a2a66" />
              <Text style={styles.name}>Fatih Kılıç</Text>
              <Text style={styles.studentId}>2023123456</Text>
            </View>
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Bölüm</Text>
                <Text style={styles.value}>Bilgisayar Mühendisliği</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Sınıf</Text>
                <Text style={styles.value}>3. Sınıf</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>E-posta</Text>
                <Text style={styles.value}>fatih.kılıç@st.biruni.edu.tr</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/obs')}>
              <Ionicons name="book-outline" size={20} color="#0a2a66" style={{ marginRight: 8 }} />
              <Text style={styles.actionText}>OBS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/qr')}>
              <Ionicons name="qr-code-outline" size={20} color="#0a2a66" style={{ marginRight: 8 }} />
              <Text style={styles.actionText}>Ders Yoklama</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.logoutText}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    padding: 16,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a2a66',
    marginTop: 12,
  },
  studentId: {
    fontSize: 16,
    color: '#6c7685',
    marginTop: 4,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6eaf0',
  },
  label: {
    fontSize: 15,
    color: '#6c7685',
  },
  value: {
    fontSize: 15,
    color: '#0a2a66',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#0a2a66',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 32,
  },
  actionBtn: {
    backgroundColor: '#e6eaf0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 0,
  },
  actionText: {
    color: '#0a2a66',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 