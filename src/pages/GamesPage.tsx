import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Gamepad, Puzzle, Target } from 'lucide-react';
import AIQuizGame from '../components/AIQuizGame';

export default function GamesPage() {
  const otherGames = [
    {
      title: "AI Image Detective",
      description: "Can you spot which images were created by AI? Test your ability to distinguish between AI-generated and human-created visuals.",
      icon: <Brain className="h-6 w-6" />,
      comingSoon: true
    },
    {
      title: "Machine Learning Simulator",
      description: "Train a simple neural network by adjusting parameters and watch how it learns patterns in real-time.",
      icon: <Puzzle className="h-6 w-6" />,
      comingSoon: true
    },
    {
      title: "Prompt Engineering Challenge",
      description: "Master the art of prompt engineering by crafting prompts that achieve specific outcomes with generative AI.",
      icon: <Target className="h-6 w-6" />,
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Learn AI Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Interactive Games</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Reinforce your AI knowledge with fun, interactive games designed to challenge your understanding and make learning enjoyable.
          </p>
        </motion.div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <Gamepad className="h-8 w-8 mr-3 text-purple-400" />
                AI Knowledge Quiz
              </h2>
              <AIQuizGame />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">More AI Games Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherGames.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                className="bg-gradient-to-br from-purple-950/30 to-black backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-4 text-white">
                  {game.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                  {game.title}
                  {game.comingSoon && (
                    <span className="ml-2 text-xs font-medium text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </h3>
                <p className="text-gray-300 mb-4">{game.description}</p>
                <button 
                  className="text-purple-400 opacity-50 cursor-not-allowed flex items-center"
                >
                  Get notified when available <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            Games are a powerful way to reinforce learning. Check back regularly as we're constantly developing new interactive experiences to help you master AI concepts.
          </p>
          <Link to="/tutorials" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
            Explore AI Tutorials
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
