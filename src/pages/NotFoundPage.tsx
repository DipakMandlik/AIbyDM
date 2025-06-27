import { Link } from 'react-router-dom';
import { ArrowLeft, House } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-900/30 text-white border border-purple-500/30">
          <span className="text-4xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center"
          >
            <House className="mr-2 h-5 w-5" />
            Go House
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-black/40 hover:bg-black/60 backdrop-blur text-white border border-purple-500/30 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
