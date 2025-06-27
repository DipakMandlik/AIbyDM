import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // EmailJS integration
    emailjs.send(
      'service_yhni4fi',   // your Service ID
      'template_s1znuf6',  // your Template ID
      { user_email: email }, // variable data for template
      'mWQOrgvnKTfanh2Yn'  // your Public Key
    )
    .then(() => {
      setSubmitted(true);
    })
    .catch((err) => {
      console.error(err);
      setError('Failed to subscribe. Please try again later.');
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-black/80 to-purple-900/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-purple-500/20 shadow-xl shadow-purple-500/10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-4">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-xl opacity-70 animate-pulse"></div>
              <span className="relative text-white px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-purple-500/20 text-sm font-medium">
                Join our community
              </span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay updated with the latest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI innovation</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and get weekly updates on new tutorials, tools, and AI breakthroughs.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-black/50 text-white border border-purple-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 max-w-lg mx-auto flex items-center"
            >
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <p className="text-white">Thank you for subscribing! Check your email for confirmation.</p>
            </motion.div>
          )}

          <p className="text-gray-400 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
