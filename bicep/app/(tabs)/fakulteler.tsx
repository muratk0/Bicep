import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import AppHeader from '../../components/AppHeader';

const faculties = [
  { key: 'tip', name: 'Tıp Fakültesi' },
  { key: 'eczacilik', name: 'Eczacılık Fakültesi' },
  { key: 'dis', name: 'Diş Hekimliği Fakültesi' },
  { key: 'egitim', name: 'Eğitim Fakültesi' },
  { key: 'muhendislik', name: 'Mühendislik ve Doğa Bilimleri Fakültesi' },
  { key: 'saglik', name: 'Sağlık Bilimleri Fakültesi' },
  { key: 'guzelsanat', name: 'Güzel Sanatlar ve Tasarım Fakültesi' },
  { key: 'hukuk', name: 'Hukuk Fakültesi' },
];

export default function FakultelerScreen() {
  const router = useRouter();

  const handleFacultyPress = (facultyKey: string) => {
    router.push({ pathname: '/(tabs)/fakulteler/[faculty]', params: { faculty: facultyKey } } as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <AppHeader showBackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Fakülteler</Text>
        <FlatList
          data={faculties}
          contentContainerStyle={{ padding: 16 }}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleFacultyPress(item.key)}>
              <Text style={styles.facultyName}>{item.name}</Text>
            </TouchableOpacity>
          )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 18,
    marginLeft: 24,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  facultyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a2a66',
    letterSpacing: 0.5,
  },
}); 