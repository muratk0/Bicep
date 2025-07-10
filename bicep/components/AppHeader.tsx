import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Modal, FlatList } from 'react-native';

interface AppHeaderProps {
  showBackButton?: boolean;
}

const exampleNotifications = [
  { id: '1', text: 'Bahar Festivali başlıyor!' },
  { id: '2', text: 'TÜBİTAK Proje Başvuruları Açıldı!' },
  { id: '3', text: 'Yeni etkinlik: Kariyer Günü' },
];

export default function AppHeader({ showBackButton = false }: AppHeaderProps) {
  const router = useRouter();
  const [permission, setPermission] = useState<null | boolean>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBellPress = () => {
    if (permission === null) {
      Alert.alert(
        'Bildirim İzni',
        'Bildirimlere izin verilsin mi?\nSadece okulun etkinlikleri için bildirim alırsınız.',
        [
          {
            text: 'Hayır',
            style: 'cancel',
            onPress: () => setPermission(false),
          },
          {
            text: 'Evet',
            onPress: () => setPermission(true),
          },
        ]
      );
    } else if (permission) {
      setModalVisible(true);
    } else {
      Alert.alert('Bildirimler Kapalı', 'Bildirim almak için izin vermelisiniz.');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.appTitle}>BICEP</Text>
      </View>
      <TouchableOpacity onPress={handleBellPress}>
        <Feather name="bell" size={24} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 320, maxWidth: '90%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0a2a66', marginBottom: 16 }}>Okul Bildirimleri</Text>
            <FlatList
              data={exampleNotifications}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                  <Text style={{ fontSize: 16, color: '#222' }}>{item.text}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 18, alignSelf: 'center' }}>
              <Text style={{ color: '#0a2a66', fontWeight: 'bold', fontSize: 16 }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0a2a66',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  appTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
  },
}); 