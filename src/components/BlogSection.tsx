import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: "Getting Started with Generative AI: A Beginner's Guide",
    excerpt: "Learn the basics of generative AI models and how they're transforming creative work across industries.",
    date: 'June 25, 2025',
    readTime: '6 min read',
    category: 'Beginners',
    image: 'https://imgs.search.brave.com/-gQY7Rpue5n_SqchB-t6F4b5gUf3Vn6OCv0LPCqN6SY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ka3B4/YW91enBlZG9rLmNs/b3VkZnJvbnQubmV0/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIz/LzA1L0EtQmVnaW5u/ZXJzLUd1aWRlLVRv/LUdldHRpbmctU3Rh/cnRlZC1XaXRoLUdl/bmVyYXRpdmUtQXJ0/aWZpY2lhbC1JbnRl/bGxpZ2VuY2Uud2Vi/cA'
  },
  {
    id: 2,
    title: 'How to Use AI to Automate Your Daily Tasks',
    excerpt: 'Discover practical ways to integrate AI tools into your workflow to save time and boost productivity.',
    date: 'June 21, 2025',
    readTime: '8 min read',
    category: 'Productivity',
    image: 'https://imgs.search.brave.com/aoRdrvDIhcaFWcI-u5djdagNWdIUuYYboqEPQrOOe7Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjdmMjRjYzkwMDk3/M2RlMTNkN2JlYjQv/NjNlZWM3Nzc5MjU0/ZjExODQ1MjUyNjhl/X0hvdyUyMHRvJTIw/bWFrZSUyMHlvdXIl/MjB3b3JrZmxvdyUy/MG1vcmUlMjBlZmZp/Y2llbnQlMjB3aXRo/JTIwdGFzayUyMGF1/dG9tYXRpb24uc3Zn'
  },
  {
    id: 3,
    title: 'The Future of AI in Healthcare: Trends to Watch',
    excerpt: 'Explore how artificial intelligence is revolutionizing healthcare through diagnostics, treatment, and patient care.',
    date: 'June 18, 2025',
    readTime: '10 min read',
    category: 'Industry',
    image: 'https://imgs.search.brave.com/CZ7hVifN-8Xw722Af9NfpOKRLHYxYIULFh3qGNHSwKY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbnRl/cnNvZy5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMTAv/RnV0dXJlLVRyZW5k/cy1pbi1BSS1mb3It/SGVhbHRoY2FyZS05/NjB4NjQwLmpwZw'
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-950/30 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Latest from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Blog</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Insights, tutorials, and the latest news about artificial intelligence and machine learning.
            </p>
          </div>
          <Link to="/blogs" className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4 md:mt-0 font-medium transition-colors">
            View all articles <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium text-white bg-purple-600 px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                </div>
                <Link to={`/blogs/${blog.id}`} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
