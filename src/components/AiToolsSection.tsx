import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  { name: 'ChatGPT', category: 'Language Model', description: 'Conversational AI for text generation, assistance, and creative writing', image: 'https://cdn.openai.com/chatgpt/favicon.png' },
  { name: 'DALL-E', category: 'Image Generation', description: 'Create original, realistic images and art from text prompts', image: 'https://cdn.openai.com/dall-e/favicon.png' },
  { name: 'Midjourney', category: 'Image Generation', description: 'Generate detailed illustrations and artwork from text prompts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Midjourney_Emblem_%E2%80%94_Discord.svg/512px-Midjourney_Emblem_%E2%80%94_Discord.svg.png' },
  { name: 'Jasper', category: 'Content Creation', description: 'AI writing assistant for marketing copy, blog posts, and content creation', image: 'https://www.jasper.ai/images/favicon.png' },
  { name: 'n8n', category: 'Automation', description: 'Workflow automation tool for connecting apps and automating tasks', image: 'https://n8n.io/images/favicon.png' },
  { name: 'Hugging Face', category: 'ML Models', description: 'Thousands of pre-trained models for NLP, vision, and more', image: 'https://huggingface.co/front/assets/favicon.ico' },
  { name: 'RunwayML', category: 'Video & Media', description: 'AI video editing and generation platform for creators', image: 'https://runwayml.com/favicon.ico' },
  { name: 'Copy.ai', category: 'Content Creation', description: 'Generate marketing copy, emails, blogs, and social posts', image: 'https://www.copy.ai/favicon.ico' },
  { name: 'Grammarly', category: 'Writing Assistant', description: 'Grammar checking and writing enhancement tool', image: 'https://static.grammarly.com/favicon.ico' },
  { name: 'Synthesia', category: 'Video AI', description: 'Create AI-generated videos with virtual avatars and voice', image: 'https://www.synthesia.io/favicon.ico' },
  { name: 'Replika', category: 'AI Companion', description: 'Conversational AI friend and companion chatbot', image: 'https://replika.ai/favicon.ico' },
  { name: 'Descript', category: 'Audio & Video Editing', description: 'AI-powered audio/video editing and transcription tool', image: 'https://www.descript.com/favicon.ico' },
  { name: 'Notion AI', category: 'Productivity', description: 'AI writing and summarization within Notion workspace', image: 'https://www.notion.so/images/favicon.ico' },
  { name: 'Pictory', category: 'Video AI', description: 'Turn long content into short branded videos automatically', image: 'https://pictory.ai/favicon.ico' },
  { name: 'ElevenLabs', category: 'Voice AI', description: 'AI voice synthesis and cloning for realistic speech', image: 'https://elevenlabs.io/favicon.ico' },
  // { name: 'Stability AI', category: 'Image Generation', description: 'Creators of Stable Diffusion image generation models', image: 'https://stability.ai/favicon.ico' },
  // { name: 'DeepL', category: 'Translation', description: 'High-accuracy AI translation across multiple languages', image: 'https://www.deepl.com/favicon.ico' },
  // { name: 'Lumen5', category: 'Video AI', description: 'Create marketing videos from blog posts with AI', image: 'https://lumen5.com/favicon.ico' },
  // { name: 'Zapier', category: 'Automation', description: 'Connect apps and automate workflows easily', image: 'https://zapier.com/favicon.ico' },
  // { name: 'Beautiful.ai', category: 'Presentation AI', description: 'Design beautiful presentations with AI assistance', image: 'https://www.beautiful.ai/favicon.ico' },
  // { name: 'Fireflies.ai', category: 'Meetings AI', description: 'Transcribe, summarize, and analyze meetings automatically', image: 'https://fireflies.ai/favicon.ico' },
  // { name: 'Otter.ai', category: 'Transcription', description: 'Record and transcribe meetings with AI-powered notes', image: 'https://otter.ai/favicon.ico' },
  // { name: 'AI Dungeon', category: 'Game AI', description: 'Interactive AI-powered storytelling adventure game', image: 'https://play.aidungeon.io/favicon.ico' },
  // { name: 'Caktus AI', category: 'Education AI', description: 'AI homework assistant for students', image: 'https://caktus.ai/favicon.ico' },
  // { name: 'Quillbot', category: 'Writing Assistant', description: 'Paraphrase, summarize, and check grammar with AI', image: 'https://quillbot.com/favicon.ico' },
  // { name: 'PromptHero', category: 'Prompt Database', description: 'Find prompts for Midjourney, DALL-E, and Stable Diffusion', image: 'https://prompthero.com/favicon.ico' },
  // { name: 'Bard', category: 'Language Model', description: 'Google’s conversational AI assistant', image: 'https://bard.google.com/favicon.ico' },
  // { name: 'Claude', category: 'Language Model', description: 'Anthropic’s safe conversational AI', image: 'https://claude.ai/favicon.ico' },
  // { name: 'Perplexity AI', category: 'Research AI', description: 'AI-powered search and research assistant', image: 'https://www.perplexity.ai/favicon.ico' },
  // { name: 'Genei', category: 'Research AI', description: 'Summarise research papers and web pages automatically', image: 'https://www.genei.io/favicon.ico' },
  // { name: 'Moonbeam', category: 'Writing AI', description: 'Long-form content writing assistant', image: 'https://moonbeam.ai/favicon.ico' },
  // { name: 'Mem AI', category: 'Productivity', description: 'AI-powered connected workspace and note-taking tool', image: 'https://mem.ai/favicon.ico' },
  // { name: 'Compose AI', category: 'Writing Assistant', description: 'AI autocompletion and writing tool for faster typing', image: 'https://compose.ai/favicon.ico' },
  // { name: 'Frase', category: 'SEO AI', description: 'Research and optimize content with AI for SEO ranking', image: 'https://www.frase.io/favicon.ico' },
  // { name: 'Surfer SEO', category: 'SEO AI', description: 'Optimize content to rank higher with AI suggestions', image: 'https://surferseo.com/favicon.ico' },
  // { name: 'AI Picasso', category: 'Image AI', description: 'Generate artistic AI illustrations from prompts', image: 'https://aipicasso.studio/favicon.ico' },
  // { name: 'NightCafe', category: 'Image AI', description: 'Create AI art with multiple models and styles', image: 'https://creator.nightcafe.studio/favicon.ico' },
  // { name: 'Stockimg AI', category: 'Design AI', description: 'Generate logos, posters, and designs with AI', image: 'https://stockimg.ai/favicon.ico' },
  // { name: 'Durable AI', category: 'Website Builder', description: 'Build entire websites with AI in 30 seconds', image: 'https://durable.co/favicon.ico' },
  // { name: 'DoNotPay', category: 'Legal AI', description: 'World’s first robot lawyer for legal assistance', image: 'https://donotpay.com/favicon.ico' },
  // { name: 'Quickchat AI', category: 'Chatbot AI', description: 'Build conversational AI agents with ease', image: 'https://quickchat.ai/favicon.ico' },
  // { name: 'Speechify', category: 'Voice AI', description: 'Text-to-speech app for reading articles and PDFs aloud', image: 'https://speechify.com/favicon.ico' },
  // { name: 'Cleanup.pictures', category: 'Image Editing AI', description: 'Remove unwanted objects from images instantly', image: 'https://cleanup.pictures/favicon.ico' },
  // // { name: 'Let's Enhance', category: 'Image Upscaling', description: 'Enhance and upscale image resolution using AI', image: 'https://letsenhance.io/favicon.ico' },
  // { name: 'Playground AI', category: 'Image Generation', description: 'Create AI images with various models and styles', image: 'https://playgroundai.com/favicon.ico' },
  // { name: 'PhotoRoom', category: 'Image Editing', description: 'Remove backgrounds and create product images easily', image: 'https://www.photoroom.com/favicon.ico' },
  // { name: 'Resemble AI', category: 'Voice AI', description: 'Create realistic AI voices for branding and products', image: 'https://www.resemble.ai/favicon.ico' },
  // { name: 'Podcastle', category: 'Podcast AI', description: 'Record, edit, and enhance podcasts with AI tools', image: 'https://podcastle.ai/favicon.ico' },
];

export default function AiToolsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI Tools</span> Explained
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the most powerful AI tools and learn how to use them effectively in your projects and daily tasks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gradient-to-br from-purple-950/30 to-black backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img src={tool.image} alt={tool.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6 relative">
                <span className="text-xs font-medium text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full">{tool.category}</span>
                <h3 className="text-xl font-semibold text-white mt-2 mb-2">{tool.name}</h3>
                <p className="text-gray-300 mb-4">{tool.description}</p>
                <Link to={`/tools/${tool.name.toLowerCase()}`} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/tools" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
            Explore All AI Tools
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
