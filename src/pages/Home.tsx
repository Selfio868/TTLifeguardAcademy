import { LifeBuoy } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <LifeBuoy className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">TTLifeguard Academy</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to TTLifeguard Academy</h2>
          <p className="mt-4 text-lg text-gray-600">
            Your source for 3D lifeguard equipment models and training materials
          </p>
        </div>
      </main>
    </div>
  );
}