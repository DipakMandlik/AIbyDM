import { useState } from 'react';
import assistantAnswers from '../data/assistantAnswers';
import { Cpu, Send } from 'lucide-react';

export default function AiAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = () => {
    const q = input.toLowerCase();
    const found = assistantAnswers.find(item => q.includes(item.question));
    if (found) {
      setResponse(found.answer);
    } else {
      setResponse("Sorry, I don't have an answer for that yet. Please try asking about AI concepts, tools, or basics.");
    }
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
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
          <p className="text-xs text-gray-400">Ask about AI basics, tools, and concepts</p>
        </div>
      </div>

      {/* Response */}
      <div className="flex-1 overflow-y-auto p-6">
        {response ? (
          <div className="bg-gray-800/70 border border-purple-500/20 p-4 rounded-lg text-gray-200 shadow">
            {response}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">Ask me anything about AI to get started.</div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-500/20 bg-gradient-to-r from-black via-purple-950/20 to-black">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question about AI..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-500/30 focus:outline-none focus:border-purple-500 shadow-inner"
          />
          <button
            onClick={handleAsk}
            disabled={!input.trim()}
            className={`p-3 rounded-lg bg-gradient-to-r ${
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
