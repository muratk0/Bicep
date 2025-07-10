import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../components/AppHeader';

const ROWS = 4;
const COLS = 4;
const ROOMS = [
  { id: 1, name: 'Oda 1', available: true },
  { id: 2, name: 'Oda 2', available: false },
  { id: 3, name: 'Oda 3', available: true },
  { id: 4, name: 'Oda 4', available: true },
];
const HOURS = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
];

const filledSeats = [2, 7, 8, 13, 17, 21];
const seats = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  filled: filledSeats.includes(i + 1),
}));
const totalSeats = seats.length;
const filledCount = filledSeats.filter(id => id <= totalSeats).length;
const occupancyRate = Math.round((filledCount / totalSeats) * 100);

export default function KutuphaneScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'sira' | 'oda'>('sira');
  const [selectedSeat, setSelectedSeat] = useState<{id: number; filled: boolean} | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<{id: number; name: string; available: boolean} | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const openSeatModal = (seat: {id: number; filled: boolean}) => {
    setSelectedSeat(seat);
    setModalVisible(true);
  };
  const openRoomModal = (room: {id: number; name: string; available: boolean}) => {
    setSelectedRoom(room);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedSeat(null);
    setSelectedRoom(null);
    setSelectedHour(null);
    setModalVisible(false);
  };

  const handleReserve = () => {
    // Burada randevu alma işlemi yapılabilir (örn. API çağrısı)
    closeModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader />
      {/* Doluluk Oranı Kutusu */}
      <View style={styles.occupancyBox}>
        <Text style={styles.occupancyText}>Doluluk: %{occupancyRate} ({filledCount}/{totalSeats})</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${occupancyRate}%` }]} />
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'sira' && styles.tabActive]}
          onPress={() => setTab('sira')}
        >
          <Text style={[styles.tabText, tab === 'sira' && styles.tabTextActive]}>Kütüphane Sıraları</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'oda' && styles.tabActive]}
          onPress={() => setTab('oda')}
        >
          <Text style={[styles.tabText, tab === 'oda' && styles.tabTextActive]}>Çalışma Odaları</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {tab === 'sira' ? (
          <View style={styles.overheadContainer}>
            {/* 4'erli satırlar ve aralara masa kutusu */}
            {(() => {
              const rows = [];
              for (let i = 0; i < 4; i++) {
                if (i > 0 && (i === 1 || i === 3)) {
                  rows.push(
                    <View key={`masa-${i}`} style={styles.masaSeparator}>
                      <Text style={{ color: '#1A4D8C', fontWeight: 'bold', fontSize: 16, opacity: 0.7 }}>Masa</Text>
                    </View>
                  );
                }
                const rowSeats = seats.slice(i * 4, i * 4 + 4);
                rows.push(
                  <View key={`row-${i}`} style={styles.gridRow}>
                    {rowSeats.map((seat) => (
                      <TouchableOpacity
                        key={seat.id}
                        style={[
                          styles.seatBox,
                          seat.filled ? styles.seatFilled : styles.seatEmpty,
                        ]}
                        disabled={seat.filled}
                        onPress={() => openSeatModal(seat)}
                      >
                        <Text style={styles.seatIcon}>🪑</Text>
                        <Text style={styles.seatNumber}>{seat.id}</Text>
                      </TouchableOpacity>
                    ))}
                    {/* Satırda eksik varsa boş kutu ekle */}
                    {Array.from({ length: 4 - rowSeats.length }).map((_, idx) => (
                      <View key={`empty-${i}-${idx}`} style={{ width: 60, height: 60, margin: 8, backgroundColor: 'transparent' }} />
                    ))}
                  </View>
                );
              }
              return rows;
            })()}
          </View>
        ) : (
          <View style={styles.roomContainer}>
            {ROOMS.map((room) => (
              <TouchableOpacity
                key={room.id}
                style={styles.roomCard}
                onPress={() => openRoomModal(room)}
              >
                <Text style={styles.roomIcon}>🚪</Text>
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={[styles.roomStatus, { color: room.available ? '#1A4D8C' : '#aaa' }]}>Müsaitlik Durumu: {room.available ? 'Müsait' : 'Dolu'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedSeat && (
              <>
                <Text style={styles.modalTitle}>Sıra {selectedSeat.id}</Text>
                {HOURS.map((hour, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.hourBtn, selectedHour === hour && styles.hourBtnSelected]}
                    onPress={() => setSelectedHour(hour)}
                  >
                    <Text style={[styles.hourText, selectedHour === hour && styles.hourTextSelected]}>{hour}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.reserveBtn, !selectedHour && { opacity: 0.5 }]}
                  onPress={handleReserve}
                  disabled={!selectedHour}
                >
                  <Text style={styles.reserveBtnText}>RANDEVU AL</Text>
                </TouchableOpacity>
              </>
            )}
            {selectedRoom && (
              <>
                <Text style={styles.modalTitle}>{selectedRoom.name}</Text>
                {HOURS.map((hour, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.hourBtn, selectedHour === hour && styles.hourBtnSelected]}
                    onPress={() => setSelectedHour(hour)}
                  >
                    <Text style={[styles.hourText, selectedHour === hour && styles.hourTextSelected]}>{hour}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.reserveBtn, !selectedHour && { opacity: 0.5 }]}
                  onPress={handleReserve}
                  disabled={!selectedHour}
                >
                  <Text style={styles.reserveBtnText}>RANDEVU AL</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>Geri Dön</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    margin: 18,
    backgroundColor: '#F2F6FA',
    borderRadius: 16,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#1A4D8C',
  },
  tabText: {
    color: '#1A4D8C',
    fontWeight: '600',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
  },
  seatBox: {
    width: 60,
    height: 60,
    margin: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6ECF5',
    elevation: 2,
  },
  seatEmpty: {
    backgroundColor: '#1A4D8C',
  },
  seatFilled: {
    backgroundColor: '#D3D7DE',
  },
  seatIcon: {
    fontSize: 24,
    marginBottom: 2,
    color: '#fff',
  },
  seatNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  roomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  roomCard: {
    width: 150,
    height: 120,
    backgroundColor: '#F2F6FA',
    borderRadius: 18,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  roomIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A4D8C',
  },
  roomStatus: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30,40,60,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A4D8C',
    marginBottom: 12,
  },
  hourBtn: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F2F6FA',
    marginVertical: 3,
    alignItems: 'center',
  },
  hourBtnSelected: {
    backgroundColor: '#1A4D8C',
  },
  hourTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hourText: {
    fontSize: 16,
    color: '#1A4D8C',
    marginVertical: 2,
  },
  reserveBtn: {
    marginTop: 18,
    backgroundColor: '#1A4D8C',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  reserveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backBtn: {
    margin: 18,
    backgroundColor: '#1A4D8C',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  occupancyBox: {
    marginHorizontal: 18,
    marginTop: 16,
    marginBottom: 4,
    backgroundColor: '#F2F6FA',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  occupancyText: {
    color: '#1A4D8C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overheadContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  masaSeparator: {
    width: '100%',
    height: 38,
    backgroundColor: '#BFD7ED',
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    maxWidth: 320,
  },
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: '#E6ECF5',
    borderRadius: 8,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1A4D8C',
    borderRadius: 8,
  },
}); 