import { motion } from 'framer-motion';
import { Zap, CheckCircle } from 'lucide-react';

const automations = [
  { name: "Auto-Generate Blog Posts", description: "Use AI to draft complete blog posts from topic ideas instantly." },
  { name: "Social Media Caption Generator", description: "Create engaging captions for Instagram, LinkedIn, and Twitter posts." },
  { name: "Meeting Notes Summarizer", description: "Summarize lengthy meeting transcripts into actionable bullet points." },
  { name: "Email Drafting Assistant", description: "Draft professional emails from bullet points or voice notes." },
  { name: "Code Snippet Generator", description: "Generate Python, JS, or Java code snippets based on your descriptions." },
  { name: "SEO Keyword Suggestions", description: "Get AI-recommended keywords to boost website SEO rankings." },
  { name: "Podcast Transcript Summarizer", description: "Summarize podcast or video transcripts into blog posts." },
  { name: "AI Chatbot for Customer Queries", description: "Automate first-level customer support with AI chatbots." },
  { name: "Content Rewriter", description: "Paraphrase articles or blogs while maintaining meaning and tone." },
  { name: "Text-to-Speech Narration", description: "Convert blog posts or scripts into natural AI voiceovers." },
  { name: "Speech-to-Text Notes", description: "Convert voice notes into written summaries efficiently." },
  { name: "Product Description Generator", description: "Generate catchy product descriptions for ecommerce listings." },
  { name: "AI-Based Resume Parser", description: "Extract structured data from resumes automatically." },
  { name: "Grammar and Tone Checker", description: "Improve grammar and adjust tone for professional communication." },
  { name: "Marketing Email Sequences", description: "Generate entire email marketing sequences with CTAs." },
  { name: "Course Outline Generator", description: "Create structured outlines for new AI or tech courses." },
  { name: "Image Alt Text Generator", description: "Generate descriptive alt text for website images to boost accessibility." },
  { name: "AI-Powered Quiz Creator", description: "Create quizzes automatically from topic materials or documents." },
  { name: "Data Insights Summary", description: "Summarize data insights from CSV or database queries in simple words." },
  { name: "Automated Translation", description: "Translate content into multiple languages while preserving context." },
  { name: "AI Video Script Generator", description: "Draft video scripts from titles or briefs in seconds." },
  { name: "Feedback Analysis", description: "Analyze customer feedback and extract key themes and sentiment." },
  { name: "Automated Invoicing", description: "Generate invoices from order data or Excel sheets automatically." },
  { name: "Smart Calendar Scheduling", description: "Suggest optimal meeting times based on calendar data." },
  { name: "Legal Document Summarizer", description: "Summarize contracts and legal documents for easy understanding." },
  { name: "Recipe Generator", description: "Create recipes from given ingredients using AI culinary models." },
  { name: "AI Image Generator", description: "Generate images or illustrations from text prompts for content use." },
  { name: "Voice Cloning for Brand AI", description: "Clone brand voice for consistent narration and audio branding." },
  { name: "AI Research Assistant", description: "Find, summarize, and cite research papers or academic content." },
  { name: "Daily News Digest", description: "Generate a concise daily news summary across multiple topics." },
];

export default function AutomationPage() {
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
            AI Automations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Supercharge your productivity with ready-to-use AI-powered automations for content, code, business, and daily tasks.
          </p>
        </motion.div>

        {/* Automations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {automations.map((automation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{automation.name}</h3>
              </div>
              <p className="text-gray-400 text-sm">{automation.description}</p>
              <div className="mt-4 flex items-center text-purple-400 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Ready to automate
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
