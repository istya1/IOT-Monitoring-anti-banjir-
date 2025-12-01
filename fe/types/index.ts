export interface SensorData {
  waterLevel: number;
  temperature: number;
  humidity: number;
  timestamp: number;
  status: 'aman' | 'waspada' | 'bahaya';
}