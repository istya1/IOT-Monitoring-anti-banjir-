import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../config/firebase';

export const useRealtimeData = (path = '/') => {
  const [sensorData, setSensorData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, path);

    const handleData = (snapshot) => {
      const firebaseData = snapshot.val();
      
      if (firebaseData) {
        setSensorData(firebaseData.sensors || null);
        setRecommendations(firebaseData.recommendations || null);
      }
      setLoading(false);
    };

    const handleError = (error) => {
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