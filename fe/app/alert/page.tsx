'use client';

import { useRealtimeData } from '@/hooks/use-realtime';

export default function AlertPage() {
  const { sensorData, recommendations, loading, error } = useRealtimeData();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-lg">Memuat data alert...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const getAlertLevel = (waterLevel: number, rainIntensity: number) => {
    if (waterLevel >= 70 || rainIntensity >= 30) {
      return 'bahaya';
    }
    if (waterLevel >= 30 || rainIntensity >= 10) {
      return 'waspada';
    }
    return 'aman';
  };

  const currentAlertLevel = getAlertLevel(
    sensorData?.waterLevel || 0, 
    sensorData?.rainIntensity || 0
  );

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'bahaya': return 'bg-red-500';
      case 'waspada': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'bahaya': return '🚨';
      case 'waspada': return '⚠️';
      default: return '✅';
    }
  };

  // Fallback recommendations jika data dari Firebase belum ada
  const fallbackRecommendations = {
    bahaya: {
      title: "🚨 STATUS BAHAYA - SEGERA EVAKUASI!",
      actions: [
        "Segera evakuasi ke tempat yang lebih tinggi",
        "Hubungi pihak berwenang setempat (112)",
        "Matikan listrik di area terdampak"
      ],
      emergencyContacts: ["BPBD: 021-1234567", "Pemadam: 113"]
    },
    waspada: {
      title: "⚠️ STATUS WASPADA - SIAP SIAGA!",
      actions: [
        "Pantau terus update informasi banjir",
        "Siapkan tas darurat dan dokumen penting"
      ],
      emergencyContacts: ["Posko Banjir: 021-7654321"]
    },
    aman: {
      title: "✅ STATUS AMAN - TETAP WASPADA",
      actions: [
        "Kondisi terkendali, tetap pantau perkembangan",
        "Pastikan saluran air sekitar lancar"
      ],
      emergencyContacts: ["Info Banjir: 021-8889999"]
    }
  };

  const currentRecommendation = recommendations?.[currentAlertLevel] || fallbackRecommendations[currentAlertLevel];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sistem Peringatan Banjir</h1>
        
        {/* Alert Box */}
        <div className={`text-white p-6 rounded-lg mb-6 ${getAlertColor(currentAlertLevel)} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Status: {currentAlertLevel.toUpperCase()}
              </h2>
              <p className="text-lg mb-4">{currentRecommendation.title}</p>
              <div className="space-y-1 text-white/90">
                <p>💧 Ketinggian Air: <strong>{sensorData?.waterLevel || 0} cm</strong></p>
                <p>🌧️ Intensitas Hujan: <strong>{sensorData?.rainIntensity || 0} mm/jam</strong></p>
                <p>🌊 Kecepatan Air: <strong>{sensorData?.waterFlow || 0} m/s</strong></p>
              </div>
            </div>
            <div className="text-6xl">
              {getAlertIcon(currentAlertLevel)}
            </div>
          </div>
        </div>

        {/* Rekomendasi Tindakan dari Firebase */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">📋 Rekomendasi Tindakan</h3>
          <div className="space-y-3">
            {currentRecommendation.actions.map((action, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kontak Darurat dari Firebase */}
        <div className="bg-red-50 border border-red-200 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-800">📞 Kontak Darurat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRecommendation.emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white p-3 rounded border">
                <p className="text-red-700 font-medium">{contact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Sensor */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">📊 Detail Monitoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">💧 Ketinggian Air:</span>
                <span className="font-semibold">{sensorData?.waterLevel || 0} cm</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">🌧️ Intensitas Hujan:</span>
                <span className="font-semibold">{sensorData?.rainIntensity || 0} mm/jam</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">🌊 Kecepatan Air:</span>
                <span className="font-semibold">{sensorData?.waterFlow || 0} m/s</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">⚙️ Status Pompa:</span>
                <span className={`font-semibold ${sensorData?.pumpStatus === 'on' ? 'text-green-600' : 'text-gray-600'}`}>
                  {sensorData?.pumpStatus === 'on' ? 'AKTIF' : 'NONAKTIF'}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">🕒 Update Terakhir:</span>
                <span className="font-semibold">
                  {sensorData?.timestamp ? new Date(sensorData.timestamp).toLocaleString('id-ID') : 'Tidak ada data'}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">⚠️ Status Sistem:</span>
                <span className={`font-semibold ${getStatusColor(sensorData?.status)}`}>
                  {(sensorData?.status || 'aman').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function untuk warna status
function getStatusColor(status?: string): string {
  switch (status) {
    case 'aman': return 'text-green-600';
    case 'waspada': return 'text-yellow-600';
    case 'bahaya': return 'text-red-600';
    default: return 'text-gray-600';
  }
}