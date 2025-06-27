import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Send, User } from 'lucide-react';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm your AI learning assistant. How can I help you learn about artificial intelligence today?"
  }
];

const fallbackAnswers = [
  { question: "what is ai", answer: "AI stands for Artificial Intelligence. It is a field of computer science focused on creating systems capable of performing tasks that require human intelligence, such as understanding language, recognizing images, and making decisions." },
  { question: "machine learning", answer: "Machine Learning is a subset of AI where algorithms improve themselves through data and experience without being explicitly programmed for each task." },
  { question: "deep learning", answer: "Deep Learning is a type of machine learning that uses neural networks with many layers to process complex data like images, audio, and text." },
  { question: "natural language processing", answer: "Natural Language Processing (NLP) is a branch of AI that focuses on enabling computers to understand, interpret, and generate human language." },
  { question: "computer vision", answer: "Computer Vision is a field of AI that trains computers to interpret and process visual information from the world, such as images and videos." },
  { question: "ai tools", answer: "Some popular AI tools include ChatGPT for conversational AI, DALL-E for image generation, and Hugging Face for pre-trained ML models." },
  // ➡️ Extend with more Q&A for broader coverage
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input
    };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    const found = fallbackAnswers.find(item => lowerInput.includes(item.question));

    const aiResponse: Message = {
      id: messages.length + 2,
      role: 'assistant',
      content: found
        ? found.answer
        : "I'm sorry, I don't have an answer for that right now. Please ask about AI concepts, tools, or learning topics."
    };

    setTimeout(() => {
      setMessages(prev => [...prev, aiResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/70 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 flex items-center bg-gradient-to-r from-purple-950/30 to-black">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mr-3">
          <Cpu className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">AI Learning Assistant</h3>
          <p className="text-xs text-gray-400">Ask anything about AI concepts</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-xl ${message.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none'} shadow`}>
              <div className="flex items-center mb-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${message.role === 'user' ? 'bg-purple-500' : 'bg-indigo-600'}`}>
                  {message.role === 'user'
                    ? <User className="h-4 w-4 text-white" />
                    : <Cpu className="h-4 w-4 text-white" />}
                </div>
                <span className="text-xs opacity-70">{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-500/20 bg-gradient-to-r from-black via-purple-950/20 to-black">
        <div className="flex items-center">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask something about AI..."
            className="flex-1 bg-gray-800 text-white rounded-lg border border-purple-500/30 p-3 focus:outline-none focus:border-purple-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`ml-2 p-3 rounded-lg bg-gradient-to-r ${
              !input.trim()
                ? 'from-purple-600/50 to-indigo-600/50 cursor-not-allowed'
                : 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            } text-white transition-colors shadow`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
