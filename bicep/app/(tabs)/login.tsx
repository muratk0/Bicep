import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Burada gerçek bir doğrulama yapılabilir
    if (!studentNumber || !password) {
      Alert.alert('Hata', 'Lütfen öğrenci numarası ve şifre giriniz');
      return;
    }
    
    // Başarılı giriş sonrası ana sayfaya yönlendir
    router.replace('/(tabs)/anasayfa');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>BICEP</Text>
        <Feather name="bell" size={24} color="#fff" />
      </View>

      {/* Karşılama Metni */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>BICEP</Text>
        <Text style={styles.welcomeSubtitle}>Kampüs Cüzdanına Hoş Geldiniz</Text>
      </View>

      {/* Giriş Formu */}
      <View style={styles.form}>
        {/* Öğrenci Numarası */}
        <View style={styles.inputRow}>
          <Feather name="user" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput
            placeholder="Öğrenci numaranızı giriniz"
            keyboardType="numeric"
            style={styles.input}
            value={studentNumber}
            onChangeText={setStudentNumber}
            placeholderTextColor="#aaa"
          />
        </View>
        {/* Şifre */}
        <View style={styles.inputRow}>
          <Feather name="lock" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput
            placeholder="Şifrenizi giriniz"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
          />
        </View>
        {/* Ek Seçenekler */}
        <View style={styles.optionsRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? '#0a2a66' : undefined}
              style={styles.checkbox}
            />
            <Text style={{ marginLeft: 6 }}>Beni hatırla</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Bilgi', 'Şifre hatırlatma özelliği yakında eklenecek.')}>
            <Text style={styles.link}>Şifremi unuttum</Text>
          </TouchableOpacity>
        </View>
        {/* Giriş Yap Butonu */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0a2a66',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  appTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
  },
  welcomeContainer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'serif', // Özel font eklemek isterseniz değiştirin
    color: '#0a2a66',
    marginBottom: 8,
    letterSpacing: 1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  form: {
    marginHorizontal: 24,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafbfc',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  link: {
    color: '#0a2a66',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0a2a66',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
  },
}); 