import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/40 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-600/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-xl opacity-70 animate-pulse"></div>
              <h2 className="relative text-lg sm:text-xl font-medium text-white px-6 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-purple-500/20">
                The Future of AI Learning is Here
              </h2>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Learn AI the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Right Way</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-8"
          >
            Discover the power of artificial intelligence through interactive tutorials, practical examples, and hands-on learning. From beginners to experts, AIbyDM helps you master the AI revolution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/tutorials" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center group">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/assistant" className="bg-black/40 hover:bg-black/60 backdrop-blur text-white border border-purple-500/30 px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              Talk to AI Assistant
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 w-full max-w-5xl"
        >
         <div className="relative aspect-video rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-black flex items-center justify-center">
    <a 
      href="https://youtu.be/PeMlggyqz0Y?si=x3qR0idJaHwvqGHO" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-center px-6"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Watch our introduction to AI</h3>
      <p className="text-gray-300">Learn the basics of AI and how AIbyDM can help you master it</p>
    </a>
  </div>
</div>

        </motion.div>
      </div>
    </div>
  );
}
