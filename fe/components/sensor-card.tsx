interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: string;
  status: 'aman' | 'waspada' | 'bahaya' | 'normal';
  description?: string;
}

export default function SensorCard({ title, value, unit, icon, status, description }: SensorCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'aman': return 'border-green-500 bg-green-50';
      case 'waspada': return 'border-yellow-500 bg-yellow-50';
      case 'bahaya': return 'border-red-500 bg-red-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className={`border-l-4 rounded-lg p-6 shadow-sm ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value} {unit}
          </p>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      <div className="mt-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusTextColor(status)}`}>
          {status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function getStatusTextColor(status: string): string {
  switch (status) {
    case 'aman': return 'bg-green-100 text-green-800';
    case 'waspada': return 'bg-yellow-100 text-yellow-800';
    case 'bahaya': return 'bg-red-100 text-red-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}