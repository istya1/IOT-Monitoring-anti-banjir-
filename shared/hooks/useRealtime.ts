import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../config/firebase'; // Import dari shared config

export interface SensorData {
  waterLevel: number;
  rainIntensity: number;
  waterFlow: number;
  pumpStatus: 'on' | 'off';
  timestamp: number;
  status: 'aman' | 'waspada' | 'bahaya';
}

export interface Recommendation {
  title: string;
  actions: string[];
  emergencyContacts: string[];
}

export interface FirebaseData {
  sensors: SensorData;
  recommendations: {
    aman: Recommendation;
    waspada: Recommendation;
    bahaya: Recommendation;
  };
}

export const useRealtimeData = (path: string = '/') => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [recommendations, setRecommendations] = useState<{
    aman: Recommendation;
    waspada: Recommendation;
    bahaya: Recommendation;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dbRef = ref(db, path);

    const handleData = (snapshot: any) => {
      const firebaseData: FirebaseData = snapshot.val();
      
      if (firebaseData) {
        setSensorData(firebaseData.sensors || null);
        setRecommendations(firebaseData.recommendations || null);
      }
      setLoading(false);
    };

    const handleError = (error: any) => {
      setError(error.message);
      setLoading(false);
    };

    onValue(dbRef, handleData, handleError);

    return () => {
      off(dbRef, 'value', handleData);
    };
  }, [path]);

  return { 
    sensorData, 
    recommendations, 
    loading, 
    error 
  };
};