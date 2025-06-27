import { motion } from 'framer-motion';
import { BookOpen, Code, Compass, Cpu, GitBranch, Layers } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Comprehensive Tutorials',
    description: 'Step-by-step guides to master various AI platforms and ML models with practical examples.'
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: 'AI Tool Explorer',
    description: 'Discover and learn how to use the latest AI tools with real-world use cases and examples.'
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Interactive Coding',
    description: 'Practice building AI applications with our interactive coding environments and challenges.'
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'AI Fundamentals',
    description: 'Build a strong foundation in AI concepts, from basic principles to advanced techniques.'
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'Automation Workflows',
    description: 'Learn how to automate tasks using AI with tools like n8n, Make, and Zapier.'
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Practical Projects',
    description: 'Apply your knowledge through hands-on projects that solve real-world problems.'
  }
];

export default function FeatureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Power of AI</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            AIbyDM provides everything you need to understand and master artificial intelligence technology in an engaging and practical way.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/40 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
