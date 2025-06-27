import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-white font-bold text-2xl">AI<span className="text-purple-500">by</span>DM</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Making artificial intelligence education accessible, engaging, and practical for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/tutorials" className="text-gray-400 hover:text-purple-400 transition-colors">Tutorials</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</Link>
          <Link to="/games" className="text-gray-400 hover:text-purple-400 transition-colors">Games</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-purple-400 transition-colors">AI Tools</Link></li>
              <li><Link to="/playground" className="text-gray-400 hover:text-purple-400 transition-colors">AI Playground</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link to="/courses/beginner" className="text-gray-400 hover:text-purple-400 transition-colors">Beginner's Guide</Link></li>
              <li><Link to="/courses/intermediate" className="text-gray-400 hover:text-purple-400 transition-colors">Intermediate AI</Link></li>
              <li><Link to="/courses/advanced" className="text-gray-400 hover:text-purple-400 transition-colors">Advanced Concepts</Link></li>
              <li><Link to="/automation" className="text-gray-400 hover:text-purple-400 transition-colors">AI Automation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} AIbyDM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
