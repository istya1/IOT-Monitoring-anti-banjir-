'use client';

import { useRealtimeData } from '@/hooks/use-realtime';
import SensorCard from '@/components/sensor-card';
import AlertBox from '@/components/alert-box';

export default function DashboardPage() {
  const { sensorData, loading, error } = useRealtimeData();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-lg">Memuat data sensor...</div>
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

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dashboard Monitoring Banjir
        </h1>
        
        {/* Alert Box */}
        <AlertBox sensorData={sensorData} />
        
        {/* Sensor Cards Grid - FOKUS BANJIR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SensorCard
            title="Ketinggian Air"
            value={sensorData?.waterLevel || 0}
            unit="cm"
            icon="💧"
            status={getWaterLevelStatus(sensorData?.waterLevel || 0)}
            description="Level air saat ini"
          />
          
          <SensorCard
            title="Intensitas Hujan"
            value={sensorData?.rainIntensity || 0}
            unit="mm/jam"
            icon="🌧️"
            status={getRainStatus(sensorData?.rainIntensity || 0)}
            description="Curah hujan terkini"
          />
          
          <SensorCard
            title="Kecepatan Air"
            value={sensorData?.waterFlow || 0}
            unit="m/s"
            icon="🌊"
            status={getFlowStatus(sensorData?.waterFlow || 0)}
            description="Arus sungai/saluran"
          />
          
          <SensorCard
            title="Status Pompa"
            value={sensorData?.pumpStatus === 'on' ? 'Aktif' : 'Nonaktif'}
            unit=""
            icon="⚙️"
            status={sensorData?.pumpStatus === 'on' ? 'waspada' : 'aman'}
            description="Mesin pompa air"
          />
          
          <SensorCard
            title="Tingkat Bahaya"
            value={getDangerLevel(sensorData)}
            unit=""
            icon="⚠️"
            status={sensorData?.status || 'aman'}
            description="Indikator risiko banjir"
          />
          
          <SensorCard
            title="Update Terakhir"
            value={sensorData?.timestamp ? new Date(sensorData.timestamp).toLocaleTimeString('id-ID') : 'N/A'}
            unit=""
            icon="🕒"
            status="normal"
            description="Data real-time"
          />
        </div>

        {/* Data Historis Sederhana */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Trend Ketinggian Air (24 Jam)</h2>
          <div className="h-32 bg-gray-100 rounded flex items-end justify-between p-4">
            {/* Simple bar chart placeholder */}
            <div className="text-center">
              <div className="bg-blue-500 w-8 mx-auto rounded-t" style={{ height: '40%' }}></div>
              <div className="text-xs mt-1">06:00</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-8 mx-auto rounded-t" style={{ height: '60%' }}></div>
              <div className="text-xs mt-1">12:00</div>
            </div>
            <div className="text-center">
              <div className="bg-red-500 w-8 mx-auto rounded-t" style={{ height: '80%' }}></div>
              <div className="text-xs mt-1">18:00</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-8 mx-auto rounded-t" style={{ height: `${Math.min((sensorData?.waterLevel || 0) / 2, 100)}%` }}></div>
              <div className="text-xs mt-1">Sekarang</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getWaterLevelStatus(level: number): 'aman' | 'waspada' | 'bahaya' {
  if (level < 30) return 'aman';
  if (level < 70) return 'waspada';
  return 'bahaya';
}

function getRainStatus(intensity: number): 'aman' | 'waspada' | 'bahaya' {
  if (intensity < 10) return 'aman';
  if (intensity < 30) return 'waspada';
  return 'bahaya';
}

function getFlowStatus(flow: number): 'aman' | 'waspada' | 'bahaya' {
  if (flow < 1) return 'aman';
  if (flow < 2) return 'waspada';
  return 'bahaya';
}

function getDangerLevel(data: any): string {
  if (!data) return 'Tidak Ada Data';
  
  const waterLevel = data.waterLevel || 0;
  const rainIntensity = data.rainIntensity || 0;
  
  if (waterLevel >= 70 || rainIntensity >= 30) return 'TINGGI';
  if (waterLevel >= 30 || rainIntensity >= 10) return 'SEDANG';
  return 'RENDAH';
}