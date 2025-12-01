export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-blue-100 to-green-100 py-6 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} Banjir Monitor System | Kelompok 2 IOT
          </p>
        </div>
      </div>
    </footer>
  );
}