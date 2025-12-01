import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';
import { useRealtimeData } from '../hooks/useRealtimeData';

export default function AlertScreen() {
  const { sensorData, recommendations } = useRealtimeData();

  const emergencyContacts = [
    { name: 'BPBD Darurat', number: '112', type: 'emergency' },
    { name: 'Pemadam Kebakaran', number: '113', type: 'emergency' },
    { name: 'Ambulans', number: '118', type: 'emergency' },
    { name: 'Polisi', number: '110', type: 'emergency' },
    { name: 'Posko Banjir Jakarta', number: '021-1234567', type: 'info' },
    { name: 'Dinas PUPR', number: '021-5556666', type: 'info' },
  ];

  const callNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const evacuationSteps = [
    '1. Matikan listrik dan gas',
    '2. Bawa dokumen penting',
    '3. Gunakan pakaian yang mudah dikenali',
    '4. Evakuasi ke tempat tinggi',
    '5. Hubungi nomor darurat',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Emergency Instructions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚨 Panduan Evakuasi Darurat</Text>
        {evacuationSteps.map((step, index) => (
          <Text key={index} style={styles.stepText}>{step}</Text>
        ))}
      </View>

      {/* Current Alert Status */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Status Saat Ini</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Level Air:</Text>
          <Text style={styles.statusValue}>{sensorData?.waterLevel || 0} cm</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={[
            styles.statusValue,
            { color: getStatusColor(sensorData?.status) }
          ]}>
            {(sensorData?.status || 'aman').toUpperCase()}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Curah Hujan:</Text>
          <Text style={styles.statusValue}>{sensorData?.rainIntensity || 0} mm/jam</Text>
        </View>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📞 Kontak Darurat</Text>
        <Text style={styles.contactSubtitle}>Tap untuk menghubungi:</Text>
        
        {emergencyContacts.map((contact, index) => (
          <View 
            key={index} 
            style={[
              styles.contactItem,
              contact.type === 'emergency' && styles.emergencyContact
            ]}
            onTouchEnd={() => callNumber(contact.number)}
          >
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </View>
            <Text style={styles.callButton}>📞</Text>
          </View>
        ))}
      </View>

      {/* Safety Tips */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Tips Keselamatan</Text>
        <Text style={styles.tipText}>• Jangan berjalan di air banjir</Text>
        <Text style={styles.tipText}>• Hindari kabel listrik jatuh</Text>
        <Text style={styles.tipText}>• Waspada binatang berbisa</Text>
        <Text style={styles.tipText}>• Pantau informasi resmi</Text>
        <Text style={styles.tipText}>• Siapkan persediaan makanan</Text>
      </View>
    </ScrollView>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'bahaya': return '#dc2626';
    case 'waspada': return '#d97706';
    case 'aman': return '#16a34a';
    default: return '#6b7280';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  stepText: {
    color: '#4b5563',
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  statusLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  statusValue: {
    color: '#1f2937',
    fontSize: 14,
    fontWeight: '500',
  },
  contactSubtitle: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  emergencyContact: {
    backgroundColor: '#fef2f2',
    marginHorizontal: -12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  contactName: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  contactNumber: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  callButton: {
    fontSize: 20,
  },
  tipText: {
    color: '#4b5563',
    marginBottom: 6,
    fontSize: 14,
  },
});