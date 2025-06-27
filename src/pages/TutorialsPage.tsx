import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star, 
  ChevronRight, 
  Brain, 
  Code, 
  Database, 
  Zap,
  Award,
  Search
} from 'lucide-react';

const tutorialCategories = [
  { id: 'all', name: 'All Tutorials', icon: BookOpen },
  { id: 'basics', name: 'AI Basics', icon: Brain },
  { id: 'ml', name: 'Machine Learning', icon: Database },
  { id: 'coding', name: 'AI Programming', icon: Code },
  { id: 'advanced', name: 'Advanced Topics', icon: Zap }
];

const tutorials = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    description: "Learn the fundamentals of AI, its history, and current applications in the modern world.",
    category: "basics",
    duration: "45 min",
    difficulty: "Beginner",
    rating: 4.8,
    students: 12500,
    thumbnail: "🤖",
    lessons: 8,
    topics: ["AI History", "Types of AI", "Current Applications", "Future Trends"]
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts of machine learning, algorithms, and how machines learn from data.",
    category: "ml",
    duration: "1.2 hours",
    difficulty: "Beginner",
    rating: 4.9,
    students: 9800,
    thumbnail: "🧠",
    lessons: 12,
    topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "Data Processing"]
  },
  {
    id: 3,
    title: "Python for AI Development",
    description: "Master Python programming specifically for AI and machine learning applications.",
    category: "coding",
    duration: "2 hours",
    difficulty: "Intermediate",
    rating: 4.7,
    students: 8200,
    thumbnail: "🐍",
    lessons: 15,
    topics: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow Basics"]
  },
  {
    id: 4,
    title: "Deep Learning with Neural Networks",
    description: "Dive deep into neural networks, backpropagation, and building your first deep learning models.",
    category: "advanced",
    duration: "3 hours",
    difficulty: "Advanced",
    rating: 4.6,
    students: 5400,
    thumbnail: "⚡",
    lessons: 20,
    topics: ["Neural Architecture", "Backpropagation", "CNNs", "RNNs"]
  },
  {
    id: 5,
    title: "Natural Language Processing",
    description: "Learn how AI understands and processes human language, from basics to transformer models.",
    category: "advanced",
    duration: "2.5 hours",
    difficulty: "Advanced",
    rating: 4.8,
    students: 6100,
    thumbnail: "💬",
    lessons: 18,
    topics: ["Text Processing", "Sentiment Analysis", "Transformers", "BERT & GPT"]
  },
  {
    id: 6,
    title: "Computer Vision Basics",
    description: "Understand how computers see and interpret visual information using AI techniques.",
    category: "ml",
    duration: "1.8 hours",
    difficulty: "Intermediate",
    rating: 4.7,
    students: 7300,
    thumbnail: "👁️",
    lessons: 14,
    topics: ["Image Processing", "Feature Detection", "Object Recognition", "CNN Applications"]
  },
  {
    id: 7,
    title: "AI Ethics and Responsible AI",
    description: "Explore the ethical implications of AI and learn how to develop responsible AI systems.",
    category: "basics",
    duration: "1 hour",
    difficulty: "Beginner",
    rating: 4.9,
    students: 11200,
    thumbnail: "⚖️",
    lessons: 10,
    topics: ["Bias in AI", "Privacy", "Fairness", "AI Governance"]
  },
  {
    id: 8,
    title: "Building AI Applications",
    description: "Learn to create real-world AI applications from concept to deployment.",
    category: "coding",
    duration: "4 hours",
    difficulty: "Advanced",
    rating: 4.5,
    students: 4800,
    thumbnail: "🚀",
    lessons: 25,
    topics: ["API Development", "Model Deployment", "Cloud AI", "Production Systems"]
  }
];

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return parseFloat(a.duration) - parseFloat(b.duration);
      case 'popular':
      default:
        return b.students - a.students;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              AI Learning Tutorials
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master artificial intelligence with our comprehensive, hands-on tutorials designed for every skill level
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-300">Expert Tutorials</div>
          </div>
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">10K+</div>
            <div className="text-gray-300">Active Learners</div>
          </div>
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">4.8⭐</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">100%</div>
            <div className="text-gray-300">Free Access</div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {tutorialCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex gap-4 flex-1 min-w-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Shortest First</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center text-6xl">
                {tutorial.thumbnail}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm">{tutorial.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {tutorial.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tutorial.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tutorial.students.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {tutorial.lessons} lessons
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Certificate
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTutorials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No tutorials found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}