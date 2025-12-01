import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRealtimeData } from '../hooks/useRealtimeData';

export default function Dashboard() {
  const { sensorData, loading, error } = useRealtimeData();

  const getAlertInfo = () => {
    const waterLevel = sensorData?.waterLevel || 0;
    
    if (waterLevel >= 70) {
      return {
        level: 'BAHAYA',
        color: '#dc2626',
        icon: '🚨',
        message: 'Segera evakuasi!'
      };
    } else if (waterLevel >= 30) {
      return {
        level: 'WASPADA', 
        color: '#d97706',
        icon: '⚠️',
        message: 'Waspada banjir!'
      };
    } else {
      return {
        level: 'AMAN',
        color: '#16a34a',
        icon: '✅',
        message: 'Kondisi aman.'
      };
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Memuat informasi banjir...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  const alert = getAlertInfo();

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.alertCard, { backgroundColor: alert.color }]}>
        <Text style={styles.alertIcon}>{alert.icon}</Text>
        <Text style={styles.alertLevel}>{alert.level}</Text>
        <Text style={styles.alertMessage}>{alert.message}</Text>
        <Text style={styles.waterLevel}>
          Ketinggian Air: {sensorData?.waterLevel || 0} cm
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Informasi:</Text>
        <Text>Status: {sensorData?.status || 'Tidak diketahui'}</Text>
        <Text>Hujan: {sensorData?.rainIntensity || 0} mm/jam</Text>
        <Text>Update: {sensorData?.timestamp ? 
          new Date(sensorData.timestamp).toLocaleString('id-ID') : 'Tidak ada data'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  alertIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  alertLevel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  alertMessage: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  waterLevel: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});