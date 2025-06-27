import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Users, Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "AI for Everyone",
    description: "An introduction to AI concepts for non-technical learners and professionals.",
    instructor: "Andrew Ng",
    duration: "6 hours",
    rating: 4.8,
    students: 32000,
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Deep Learning Specialization",
    description: "Master deep learning, build neural networks, and lead AI projects.",
    instructor: "Andrew Ng",
    duration: "40 hours",
    rating: 4.9,
    students: 15000,
    thumbnail: "https://images.unsplash.com/photo-1581090700227-4c4c4c4c4c4c?fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Generative AI Fundamentals",
    description: "Learn the core concepts of generative AI, transformers, and modern architectures.",
    instructor: "OpenAI Experts",
    duration: "12 hours",
    rating: 4.7,
    students: 8600,
    thumbnail: "https://images.unsplash.com/photo-1682685797439-6d70e3c4c4c4?fit=crop&w=800&q=80"
  },
  // ➡️ Add more courses dynamically from DB/API later
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            AI Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn AI with structured courses curated by experts to accelerate your skills and career.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">{course.instructor}</span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Course
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        {courses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Courses coming soon</h3>
            <p className="text-gray-400">Stay tuned for our upcoming courses launching shortly.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
