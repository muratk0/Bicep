import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import AppHeader from '../../components/AppHeader';



const { width } = Dimensions.get('window');

// Dummy duyuru verisi
// ... existing code ...
const announcements = [
  { id: 1, title: 'Yeni Kampanya!', desc: 'Tüm kafelerde %10 indirim.', image: require('../../assets/images/kah.png') },
  { id: 2, title: 'Birunide Bahar Coşkusu', desc: '', image: require('../../assets/images/festival.png') },
  { id: 3, title: 'Bakiye Yükleme', desc: "Bicep'e hızlı ve kolay şekilde anında bakiye yükleyebilirsin!", image: require('../../assets/images/bakiye.png') },
];
// ... existing code ...

const clubStories = [
  {
    id: 1,
    name: 'Mühendislik Kulübü',
    icon: <FontAwesome5 name="cogs" size={22} color="#0a2a66" />,
    stories: [
      { id: 'm1', title: 'Robotik Atölyesi', image: require('../../assets/images/muhkulp.png') },
    ],
  },
  {
    id: 2,
    name: 'Sinema Kulübü',
    icon: <MaterialCommunityIcons name="movie-open" size={22} color="#0a2a66" />,
    stories: [
      { id: 's1', title: 'Sinema Kulübü', image: require('../../assets/images/sinkulp.png') },
    ],
  },
  {
    id: 3,
    name: 'Gezi Kulübü',
    icon: <MaterialCommunityIcons name="hiking" size={22} color="#0a2a66" />,
    stories: [
      { id: 'g1', title: 'Gezi Kulübü', image: require('../../assets/images/gezikulp.png') },
    ],
  },
  {
    id: 4,
    name: 'Kitap Kulübü',
    icon: <Feather name="book-open" size={22} color="#0a2a66" />,
    stories: [
      { id: 'k1', title: 'Kitap Kulübü', image: require('../../assets/images/kitkulpp.png') },
    ],
  },
];

export default function AnasayfaScreen() {
  const router = useRouter();
  const [balance] = useState(1250);
  const [iban] = useState('TRXX XXXX XXXX XXXX XX');
  const [transactions] = useState([
    { id: 1, title: 'Yemekhane Ödemesi', amount: -12.50, icon: 'store', color: '#222' },
    { id: 2, title: 'Kitapçı Ödemesi', amount: -85, icon: 'shopping-bag', color: '#222' },
    { id: 3, title: 'Yükleme', amount: 100, icon: 'arrow-down-circle', color: '#1bbf4c' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [clubStoryModal, setClubStoryModal] = useState(false);
  const [activeClubIndex, setActiveClubIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (clubStoryModal && flatListRef.current) {
      const storiesLength = clubStories[activeClubIndex].stories.length;
      const safeIndex = Math.min(activeStoryIndex, storiesLength - 1);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: safeIndex, animated: false });
      }, 100);
    }
  }, [clubStoryModal, activeClubIndex]);

  const handleViewAllTransactions = () => {
    router.push('/(tabs)/cuzdan');
  };

  const handleAnnouncementPress = (img: any) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  // Simgeden başlatmak için index bul
  const getStartIndex = (clubIdx: number) => {
    let index = 0;
    for (let i = 0; i < clubIdx; i++) {
      index += clubStories[i].stories.length;
    }
    return index;
  };

  // Tüm kulüplerin storylerini tek bir düz diziye çevir
  const allStories = clubStories.flatMap((club, clubIdx) =>
    club.stories.map(story => ({ ...story, clubName: club.name }))
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      {/* Kulüp Story Simgeleri */}
      <View style={[styles.fixedCircleMenu, { justifyContent: 'center' }]}> 
        {clubStories.map((club, idx) => (
          <TouchableOpacity key={club.id} style={styles.circleIcon} onPress={() => {
            setActiveClubIndex(idx);
            setActiveStoryIndex(getStartIndex(idx));
            setClubStoryModal(true);
          }}>
            {club.icon}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Alanı - Duyuru Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.announcementScroll}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {announcements.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.announcementCardLarge}
              onPress={() => handleAnnouncementPress(item.image)}
              activeOpacity={0.8}
            >
              {typeof item.image === 'string' ? (
                <Image source={{ uri: item.image }} style={styles.announcementImageLarge} />
              ) : (
                <Image source={item.image} style={styles.announcementImageLarge} />
              )}
              <Text style={styles.announcementTitleLarge}>{item.title}</Text>
              <Text style={styles.announcementDescLarge}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Modal ile afiş gösterimi */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              {selectedImage && (
                typeof selectedImage === 'string' ? (
                  <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
                ) : (
                  <Image source={selectedImage} style={styles.modalImage} resizeMode="contain" />
                )
              )}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Kulüp Story Modal */}
        <Modal
          visible={clubStoryModal}
          animationType="slide"
          transparent
          onRequestClose={() => setClubStoryModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setClubStoryModal(false)}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                  ref={flatListRef}
                  data={allStories}
                  horizontal
                  pagingEnabled
                  initialScrollIndex={activeStoryIndex}
                  getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexGrow: 0 }}
                  contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                  removeClippedSubviews={false}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback>
                      <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                          source={item.image}
                          style={{
                            width: width * 0.9,
                            height: width * 1.2,
                            borderRadius: 24,
                            marginBottom: 18,
                            resizeMode: 'cover',
                            borderWidth: 3,
                            borderColor: '#fff',
                            marginTop: 12,
                          }}
                        />
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', textShadowColor: '#222', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }}>{item.title}</Text>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{item.clubName}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  onMomentumScrollEnd={e => {
                    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                    setActiveStoryIndex(idx);
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Kampüs Hizmetleri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kampüs Hizmetleri</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/(tabs)/yemekhane')}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#0a2a66" />
              <Text style={styles.serviceText}>Yemekhane</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/kutuphane')}>
              <Feather name="book" size={24} color="#0a2a66" />
              <Text style={styles.serviceText}>Kütüphane</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/(tabs)/etkinlikler')}>
              <Feather name="calendar" size={24} color="#0a2a66" />
              <Text style={styles.serviceText}>Etkinlikler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/(tabs)/servis')}>
              <MaterialIcons name="directions-bus" size={24} color="#0a2a66" />
              <Text style={styles.serviceText}>Servis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/fakulteler')}>
              <FontAwesome5 name="university" size={24} color="#0a2a66" />
              <Text style={styles.serviceText}>Fakülte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/biprojem')}>
              <Feather name="edit" size={24} color="#0a2a66" />
              <Text style={styles.serviceText}>BİPROJEM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bakiye Bilgisi */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Bakiye</Text>
          <Text style={styles.balance}>{balance.toLocaleString('tr-TR')} ₺</Text>
        </View>

        {/* Hesap Hareketleri */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>Hesap Hareketleri</Text>
            <TouchableOpacity onPress={handleViewAllTransactions}>
              <Text style={styles.link}>Tüm İşlemleri Görüntüle</Text>
            </TouchableOpacity>
          </View>
          {transactions.map((tx: any) => (
            <View key={tx.id} style={styles.transactionRow}>
              <View style={styles.transactionIconBox}>
                {tx.icon === 'store' && <Feather name="shopping-bag" size={20} color="#0a2a66" />}
                {tx.icon === 'shopping-bag' && <Feather name="shopping-cart" size={20} color="#0a2a66" />}
                {tx.icon === 'arrow-down-circle' && <Feather name="arrow-down-circle" size={20} color="#1bbf4c" />}
              </View>
              <Text style={styles.transactionTitle}>{tx.title}</Text>
              <Text style={[styles.transactionAmount, { color: tx.amount > 0 ? '#1bbf4c' : '#222' }] }>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('tr-TR')} ₺
              </Text>
            </View>
          ))}
        </View>

        {/* Hızlı İşlemler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={[styles.quickActions, { justifyContent: 'center' }]}>
            <TouchableOpacity style={[styles.quickActionBtn, { width: '50%' }]}>
              <Feather name="plus-circle" size={22} color="#0a2a66" />
              <Text style={styles.quickActionText}>Para Yükle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedCircleMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0a2a66',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  circleIcon: {
    backgroundColor: '#f2f6fa',
    borderRadius: 32,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  announcementScroll: {
    marginVertical: 12,
    minHeight: 140,
  },
  announcementCardLarge: {
    width: width * 0.7,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  announcementImageLarge: {
    width: '100%',
    height: 115,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e6eaf0',
  },
  announcementTitleLarge: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#0a2a66',
    marginBottom: 3,
  },
  announcementDescLarge: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
  balanceBox: {
    marginHorizontal: 18,
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#13387C',
    paddingVertical: 18,
    paddingHorizontal: 24,
    shadowColor: '#13387C',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#222',
  },
  balance: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a2a66',
  },
  section: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  link: {
    color: '#0a2a66',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  transactionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e6eaf0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  transactionTitle: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quickActionBtn: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
  },
  quickActionText: {
    marginTop: 6,
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceText: {
    marginTop: 8,
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30,40,60,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    elevation: 5,
    maxWidth: width * 0.85,
    maxHeight: width * 1.1,
  },
  modalImage: {
    width: width * 0.7,
    height: width * 0.9,
    borderRadius: 12,
  },
}); 