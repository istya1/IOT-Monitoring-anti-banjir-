'use client';

import { SensorData } from '@/hooks/use-realtime';

interface AlertBoxProps {
  sensorData: SensorData | null;
}

export default function AlertBox({ sensorData }: AlertBoxProps) {
  if (!sensorData) return null;

  const getAlertInfo = () => {
    if (sensorData.waterLevel >= 100) {
      return {
        message: '🚨 PERINGATAN TINGGI! Ketinggian air mencapai level berbahaya!',
        color: 'bg-red-500 text-white',
        visible: true
      };
    } else if (sensorData.waterLevel >= 50) {
      return {
        message: '⚠️ WASPADA! Ketinggian air mulai meningkat.',
        color: 'bg-yellow-500 text-white',
        visible: true
      };
    }
    return {
      message: '✅ Kondisi normal',
      color: 'bg-green-500 text-white',
      visible: sensorData.status === 'aman'
    };
  };

  const alert = getAlertInfo();

  if (!alert.visible) return null;

  return (
    <div className={`p-4 rounded-lg mb-6 ${alert.color}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold">{alert.message}</p>
        <span className="text-lg">📢</span>
      </div>
    </div>
  );
}