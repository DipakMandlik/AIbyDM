import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Check, CircleHelp, Sparkles, X } from 'lucide-react';

const quizQuestions = [
  {
    question: "What does the 'I' in AI stand for?",
    options: ["Internet", "Intelligence", "Interface", "Integration"],
    correctAnswer: "Intelligence",
    explanation: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines."
  },
  {
    question: "Which of these is NOT a type of machine learning?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Directional Learning"],
    correctAnswer: "Directional Learning",
    explanation: "The three main types of machine learning are Supervised Learning, Unsupervised Learning, and Reinforcement Learning. Directional Learning is not a standard type."
  },
  {
    question: "What is the name of the AI model behind ChatGPT?",
    options: ["GPT", "BERT", "DALL-E", "LaMDA"],
    correctAnswer: "GPT",
    explanation: "ChatGPT is powered by GPT (Generative Pre-trained Transformer) models, specifically GPT-3.5 and GPT-4, developed by OpenAI."
  },
  {
    question: "Which company created the AI image generator DALL-E?",
    options: ["Google", "OpenAI", "Microsoft", "Meta"],
    correctAnswer: "OpenAI",
    explanation: "DALL-E was created by OpenAI, the same company that developed ChatGPT and GPT models."
  },
  {
    question: "What is the process of teaching a machine learning model called?",
    options: ["Educating", "Training", "Instructing", "Programming"],
    correctAnswer: "Training",
    explanation: "The process of feeding data to a machine learning model so it can learn patterns is called training."
  }
];

export default function AIQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer after selection
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = (score / quizQuestions.length) * 100;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-6 bg-black/30 rounded-xl border border-purple-500/20"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-6">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
        <p className="text-lg text-gray-300 mb-4">
          You scored {score} out of {quizQuestions.length} ({percentage}%)
        </p>
        
        <div className="w-full max-w-md bg-black/20 rounded-full h-4 mb-6">
          <div 
            className={`h-4 rounded-full ${
              percentage >= 80 ? 'bg-green-500' : 
              percentage >= 60 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="mb-6 text-center">
          {percentage >= 80 ? (
            <p className="text-green-400 flex items-center justify-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Excellent! You're an AI knowledge expert!
            </p>
          ) : percentage >= 60 ? (
            <p className="text-yellow-400">Good job! You have a solid understanding of AI basics.</p>
          ) : (
            <p className="text-gray-400">Keep learning! Check out our tutorials to improve your AI knowledge.</p>
          )}
        </div>
        
        <button
          onClick={resetQuiz}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="rounded-xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span className="text-sm text-gray-400">Score: {score}</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-white mb-6">{currentQuizQuestion.question}</h3>
        
        <div className="space-y-3 mb-6">
          {currentQuizQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                selectedAnswer === option
                  ? option === currentQuizQuestion.correctAnswer
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-red-500/20 border-red-500'
                  : selectedAnswer !== null && option === currentQuizQuestion.correctAnswer
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-black/30 border-purple-500/30 hover:border-purple-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{option}</span>
                {selectedAnswer === option && (
                  option === currentQuizQuestion.correctAnswer ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )
                )}
                {selectedAnswer !== null && selectedAnswer !== option && option === currentQuizQuestion.correctAnswer && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6 flex"
          >
            <CircleHelp className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-purple-200 font-medium mb-1">Explanation</p>
              <p className="text-sm text-gray-300">{currentQuizQuestion.explanation}</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-end">
          {selectedAnswer && (
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
