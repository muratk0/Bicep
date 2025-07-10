import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppHeader from '../../components/AppHeader';

export default function ObsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a2a66' }}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.title}>OBS</Text>
        <Text style={styles.info}>Şu anda açıklanan not bulunmamaktadır.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a2a66',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    color: '#6c7685',
    textAlign: 'center',
  },
}); 