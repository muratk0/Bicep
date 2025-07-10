import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import AppHeader from '../../components/AppHeader';

const rewards = [
  { id: '1', name: 'Sweat', point: 1000 },
  { id: '2', name: 'Çay', point: 300 },
  { id: '3', name: 'Şapka', point: 500 },
  { id: '4', name: 'Kahve', point: 400 },
];

export default function PuanScreen() {
  // Örnek güncel puan
  const currentPoint = 720;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Güncel Puanınız</Text>
        <View style={styles.pointBox}>
          <Text style={styles.pointText}>{currentPoint} P</Text>
        </View>
        <Text style={styles.subtitle}>Puan Karşılığı Alabilecekleriniz</Text>
        <FlatList
          data={rewards}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.rewardCard}>
              <Text style={styles.rewardName}>{item.name}</Text>
              <Text style={styles.rewardPoint}>{item.point} P</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    marginLeft: 24,
    color: '#222',
  },
  pointBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginHorizontal: 24,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  pointText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a2a66',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 24,
    marginBottom: 10,
    color: '#222',
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'space-between',
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a2a66',
    letterSpacing: 0.5,
  },
  rewardPoint: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
}); 