import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';

export default function QRCodeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  // Kategori butonuna tıklama işlevi
  const handleCategoryPress = (category: string) => {
    // İlgili sayfaya yönlendirme veya işlem yapma
    Alert.alert(`${category} bölümüne tıklandı`, `${category} bölümü için işlem yapılacak`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <AppHeader />
        <Text style={styles.text}>Kamera izni isteniyor...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <AppHeader />
        <Text style={styles.text}>Kamera erişimi reddedildi</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'Kamera İzni Gerekli',
              'Kamera özelliğini kullanabilmek için kamera izni gereklidir. Lütfen ayarlardan kamera iznini etkinleştirin.',
              [
                {
                  text: 'Tamam',
                  onPress: () => router.back(),
                },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      {/* QR Scanner */}
      <View style={styles.scannerContainer}>
        <View style={styles.scannerFrame}>
          <CameraView style={styles.camera}>
            <View style={styles.scannerOverlay}>
              <View style={styles.scannerBorder} />
            </View>
          </CameraView>
        </View>
        <Text style={styles.instructionText}>
          QR kodunu çerçeve içerisinde olacak şekilde okutunuz
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0a2a66', // Koyu mavi
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationIcon: {
    padding: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EFF1F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 16,
  },
  camera: {
    width: 280,
    height: 280,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scannerFrame: {
    width: 280,
    height: 280,
    borderRadius: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  scannerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBorder: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: '#0066ff',
    borderRadius: 8,
  },
  instructionText: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 