import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-bold text-xl md:text-2xl">AI<span className="text-purple-500">by</span>DM</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <div className="relative group">
                <button className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Learn <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                  <div className="py-1">
                    <Link to="/tutorials" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-purple-900/50">Tutorials</Link>
                    <Link to="/blogs" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-purple-900/50">Blogs</Link>
                    <Link to="/courses" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-purple-900/50">Courses</Link>
                  </div>
                </div>
              </div>
              <Link to="/tools" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">AI Tools</Link>
              <Link to="/games" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Games</Link>
              <Link to="/blogs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Blog</Link>
              <Link to="/automations" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Automation</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Link to="/assistant" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              Talk to AI Assistant
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-900/30 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/tutorials" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Tutorials</Link>
            <Link to="/blogs" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blogs</Link>
            <Link to="/tools" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">AI Tools</Link>
            <Link to="/games" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Games</Link>
            <Link to="/blogs" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blog</Link>
            <Link to="/automations" className="text-gray-300 hover:bg-purple-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Automation</Link>
            <Link to="/assistant" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium">Talk to AI Assistant</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
