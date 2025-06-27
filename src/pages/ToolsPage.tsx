import { motion } from 'framer-motion';

const tools = [
  { name: 'ChatGPT', description: 'Conversational AI by OpenAI', link: 'https://chat.openai.com' },
  { name: 'DALL-E', description: 'AI image generation by OpenAI', link: 'https://labs.openai.com' },
  { name: 'Midjourney', description: 'AI art generation platform', link: 'https://midjourney.com' },
  { name: 'Stable Diffusion', description: 'Open source image generation', link: 'https://stablediffusionweb.com' },
  { name: 'Hugging Face', description: 'Models, datasets, and AI tools hub', link: 'https://huggingface.co' },
  { name: 'Bard', description: 'Google’s conversational AI', link: 'https://bard.google.com' },
  { name: 'Claude', description: 'Anthropic’s safe conversational AI', link: 'https://claude.ai' },
  { name: 'RunwayML', description: 'Creative AI video and image tools', link: 'https://runwayml.com' },
  { name: 'Copy.ai', description: 'AI copywriting assistant', link: 'https://copy.ai' },
  { name: 'Jasper', description: 'AI content writing platform', link: 'https://www.jasper.ai' },
  { name: 'ElevenLabs', description: 'AI voice generation and cloning', link: 'https://elevenlabs.io' },
  { name: 'Synthesia', description: 'AI video avatar generator', link: 'https://www.synthesia.io' },
  { name: 'Notion AI', description: 'AI-powered notes and documents', link: 'https://notion.so' },
  { name: 'Replika', description: 'AI companion chatbot', link: 'https://replika.ai' },
  { name: 'Descript', description: 'AI video and audio editing', link: 'https://descript.com' },
  { name: 'Fireflies.ai', description: 'Meeting transcription and notes', link: 'https://fireflies.ai' },
  { name: 'Otter.ai', description: 'Real-time transcription tool', link: 'https://otter.ai' },
  { name: 'Quillbot', description: 'AI paraphrasing tool', link: 'https://quillbot.com' },
  { name: 'Grammarly', description: 'AI grammar and writing assistant', link: 'https://grammarly.com' },
  { name: 'Surfer SEO', description: 'AI SEO content optimization', link: 'https://surferseo.com' },

  // ➡️ Continue adding like this up to 100:
  // { name: 'Tool 21', description: 'Description for Tool 21', link: 'https://example.com' },
  // { name: 'Tool 22', description: 'Description for Tool 22', link: 'https://example.com' },
  // // ...
  // { name: 'Tool 100', description: 'Description for Tool 100', link: 'https://example.com' },
];

export default function ToolsPage() {
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
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Tools & Technologies</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore powerful AI tools, models, and technologies to accelerate your learning and projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{tool.name}</h3>
              <p className="text-gray-300 mb-4">{tool.description}</p>
              <a 
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Visit Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
