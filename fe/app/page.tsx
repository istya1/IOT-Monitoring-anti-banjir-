import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-green-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Sistem Monitoring Banjir
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pantau ketinggian air, suhu, dan kelembaban secara real-time 
            untuk antisipasi banjir lebih dini
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Lihat Dashboard
            </Link>
            <Link 
              href="/alert" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Notifikasi Alert
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">💧</div>
            <h3 className="text-xl font-semibold mb-2">Monitoring Real-time</h3>
            <p className="text-gray-600">Pantau ketinggian air secara langsung dengan update data setiap detik</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Sistem Peringatan</h3>
            <p className="text-gray-600">Dapatkan notifikasi ketika ketinggian air mencapai level berbahaya</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Data Historis</h3>
            <p className="text-gray-600">Analisis trend ketinggian air dari waktu ke waktu</p>
          </div>
        </div>
      </div>
    </div>
  );
}