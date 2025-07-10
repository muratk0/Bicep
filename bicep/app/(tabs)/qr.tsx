import { Camera, CameraView } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function QrScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

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
                  onPress: () => {},
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
      <View style={{ backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 12, alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e6eaf0', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 18, marginBottom: 8 }}
          onPress={() => router.push('/(tabs)/qr-history')}
        >
          <Ionicons name="time-outline" size={20} color="#0a2a66" style={{ marginRight: 8 }} />
          <Text style={{ color: '#0a2a66', fontWeight: 'bold', fontSize: 16 }}>Geçmiş yoklamalarım</Text>
        </TouchableOpacity>
      </View>
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