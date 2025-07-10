import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Biprojem() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [activeTab, setActiveTab] = useState('ekle');

  // Örnek projeler
  const exampleProjects = [
    { id: 1, title: 'Akıllı Su Şişesi', desc: 'Su içmeyi hatırlatan, mobil uygulama ile entegre akıllı şişe.' },
    { id: 2, title: 'Kampüs Mobil Uygulaması', desc: 'Ders programı, yemek listesi ve etkinlik takibi bir arada.' },
    { id: 3, title: 'Geri Dönüşüm Otomatı', desc: 'Atık toplayan ve ödül veren akıllı otomat sistemi.' },
    { id: 4, title: 'Dijital Kütüphane', desc: 'Kampüs içi kitap paylaşım ve ödünç alma platformu.' },
  ];

  const handleSubmit = () => {
    alert('Başvurun alındı!');
    setTitle('');
    setDesc('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Üstte başlık ve sekmeler */}
        <View style={{ marginTop: 16, marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 0, zIndex: 2, padding: 4 }}>
              <Ionicons name="arrow-back" size={28} color="#2d4379" />
            </TouchableOpacity>
            <Image source={require('../../assets/images/biprojemlogo.png')} style={styles.iconLogo} />
            <Text style={styles.headerText}>BICEP</Text>
            <Text style={styles.headerText2}>BİPROJEM</Text>
          </View>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'ekle' && styles.tabButtonActive]}
              onPress={() => setActiveTab('ekle')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'ekle' && styles.tabButtonTextActive]}>+ Proje Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'basvurular' && styles.tabButtonActive]}
              onPress={() => setActiveTab('basvurular')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'basvurular' && styles.tabButtonTextActive]}>Başvurular</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* İçerik */}
        {activeTab === 'ekle' && (
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Proje Başlığı"
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, {height: 60}]}
              placeholder="Proje Açıklaması"
              placeholderTextColor="#888"
              value={desc}
              onChangeText={setDesc}
              multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Başvuru Yap</Text>
            </TouchableOpacity>
          </View>
        )}
        {activeTab === 'basvurular' && (
          <View style={{ marginTop: 8 }}>
            {exampleProjects.map((proj) => (
              <View key={proj.id} style={styles.projectBox}>
                <Text style={styles.projectTitle}>{proj.title}</Text>
                <Text style={styles.projectDesc}>{proj.desc}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7faff', padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 8 },
  iconLogo: { width: 32, height: 32, marginRight: 8, resizeMode: 'contain' },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#2d4379', marginRight: 8 },
  headerText2: { fontSize: 24, fontWeight: 'bold', color: '#222' },
  tabsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 8, backgroundColor: '#e6f0fa', marginHorizontal: 4 },
  tabButtonActive: { backgroundColor: '#b5d4f7' },
  tabButtonText: { color: '#2d4379', fontWeight: 'bold', fontSize: 16 },
  tabButtonTextActive: { color: '#222' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 8, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: '#f7faff' },
  button: { backgroundColor: '#a3c9f7', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  projectBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  projectTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2d4379',
    marginBottom: 6,
  },
  projectDesc: {
    fontSize: 15,
    color: '#444',
  },
});