import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import AppHeader from '../../components/AppHeader';

const transactions = [
  {
    id: '1',
    type: 'out',
    description: 'Yemekhane Ödemesi',
    amount: -12.5,
    date: '8 Mayıs 2025, 09:15',
  },
  {
    id: '2',
    type: 'out',
    description: 'Kitapçı Alışverişi',
    amount: -85,
    date: '7 Mayıs 2025, 15:45',
  },
  {
    id: '3',
    type: 'in',
    description: 'Kantin Yüklemesi',
    amount: 100,
    date: '6 Mayıs 2025, 12:30',
  },
];

export default function CuzdanScreen() {
  const router = useRouter();

  const handleQrPay = () => {
    router.push('/(tabs)/qr-ode');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader />
      <View style={styles.contentContainer}>
        {/* Mevcut Bakiye Kartı */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Mevcut Bakiye</Text>
          <Text style={styles.balanceAmount}>₺1.250,00</Text>
        </View>
        {/* QR ile Ödeme */}
        <TouchableOpacity style={styles.qrButton} onPress={handleQrPay}>
          <Ionicons name="qr-code-outline" size={28} color="#fff" />
          <Text style={styles.qrButtonText}>QR ile Öde</Text>
        </TouchableOpacity>
        {/* Son İşlemler */}
        <View style={styles.transactionsSection}>
          <Text style={styles.transactionsTitle}>Son İşlemler</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Ionicons
                  name={item.type === 'in' ? 'arrow-down' : 'arrow-up'}
                  size={18}
                  color={item.type === 'in' ? '#27ae60' : '#e74c3c'}
                  style={{ marginRight: 8 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionDesc}>{item.description}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.type === 'in' ? '#27ae60' : '#e74c3c' },
                  ]}
                >
                  {item.type === 'in' ? '+' : '-'}₺{Math.abs(item.amount).toFixed(2)}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  balanceCard: {
    backgroundColor: '#1a237e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 0,
  },
  balanceTitle: { color: '#fff', fontSize: 16, marginBottom: 8 },
  balanceAmount: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginBottom: 22,
    alignSelf: 'stretch',
  },
  qrButtonText: { color: '#fff', fontSize: 18, marginLeft: 12, fontWeight: 'bold' },
  transactionsSection: { flex: 1 },
  transactionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, marginLeft: 2 },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionDesc: { fontSize: 16 },
  transactionDate: { fontSize: 12, color: '#888' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
}); 