import React, { useState, useEffect } from 'react';
import { ChevronRight, RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';

// TypeScript interfaces for type safety
interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  answers: Answer[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  answeredQuestions: { questionId: string; selectedAnswer: string; isCorrect: boolean }[];
}

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: { [questionId: string]: string };
  showResults: boolean;
  startTime: number;
  timeSpent: number;
}

const QuizApp: React.FC = () => {
  // Mock quiz data - in a real app, this would come from an API
  const mockQuizData: Quiz = {
    id: 'quiz-1',
    title: 'General Knowledge Quiz',
    description: 'Test your knowledge across various topics!',
    questions: [
      {
        id: 'q1',
        question: 'What is the capital of France?',
        category: 'Geography',
        difficulty: 'easy',
        answers: [
          { id: 'a1', text: 'London', isCorrect: false },
          { id: 'a2', text: 'Berlin', isCorrect: false },
          { id: 'a3', text: 'Paris', isCorrect: true },
          { id: 'a4', text: 'Madrid', isCorrect: false }
        ]
      },
      {
        id: 'q2',
        question: 'Which planet is known as the Red Planet?',
        category: 'Science',
        difficulty: 'easy',
        answers: [
          { id: 'a5', text: 'Venus', isCorrect: false },
          { id: 'a6', text: 'Mars', isCorrect: true },
          { id: 'a7', text: 'Jupiter', isCorrect: false },
          { id: 'a8', text: 'Saturn', isCorrect: false }
        ]
      },
      {
        id: 'q3',
        question: 'Who wrote "Romeo and Juliet"?',
        category: 'Literature',
        difficulty: 'medium',
        answers: [
          { id: 'a9', text: 'Charles Dickens', isCorrect: false },
          { id: 'a10', text: 'William Shakespeare', isCorrect: true },
          { id: 'a11', text: 'Jane Austen', isCorrect: false },
          { id: 'a12', text: 'Mark Twain', isCorrect: false }
        ]
      },
      {
        id: 'q4',
        question: 'What is the largest mammal in the world?',
        category: 'Biology',
        difficulty: 'medium',
        answers: [
          { id: 'a13', text: 'African Elephant', isCorrect: false },
          { id: 'a14', text: 'Blue Whale', isCorrect: true },
          { id: 'a15', text: 'Giraffe', isCorrect: false },
          { id: 'a16', text: 'Polar Bear', isCorrect: false }
        ]
      },
      {
        id: 'q5',
        question: 'In which year did World War II end?',
        category: 'History',
        difficulty: 'hard',
        answers: [
          { id: 'a17', text: '1944', isCorrect: false },
          { id: 'a18', text: '1945', isCorrect: true },
          { id: 'a19', text: '1946', isCorrect: false },
          { id: 'a20', text: '1947', isCorrect: false }
        ]
      }
    ]
  };

  // State management with proper TypeScript typing
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showResults: false,
    startTime: 0,
    timeSpent: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate API call to fetch quiz data
  useEffect(() => {
    const fetchQuizData = async (): Promise<void> => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQuiz(mockQuizData);
      setQuizState(prev => ({ ...prev, startTime: Date.now() }));
      setLoading(false);
    };

    fetchQuizData();
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerId: string): void => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionId]: answerId
      }
    }));
  };

  // Navigate to next question
  const handleNextQuestion = (): void => {
    if (!quiz) return;
    
    if (quizState.currentQuestionIndex < quiz.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      finishQuiz();
    }
  };

  // Finish quiz and show results
  const finishQuiz = (): void => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - quizState.startTime) / 1000);
    
    setQuizState(prev => ({
      ...prev,
      showResults: true,
      timeSpent
    }));
  };

  // Calculate quiz results
  const calculateResults = (): QuizResult | null => {
    if (!quiz) return null;

    const answeredQuestions = quiz.questions.map(question => {
      const selectedAnswerId = quizState.selectedAnswers[question.id];
      const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
      return {
        questionId: question.id,
        selectedAnswer: selectedAnswer?.text || 'No answer',
        isCorrect: selectedAnswer?.isCorrect || false
      };
    });

    const correctAnswers = answeredQuestions.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    return {
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      timeSpent: quizState.timeSpent,
      answeredQuestions
    };
  };

  // Reset quiz
  const resetQuiz = (): void => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      showResults: false,
      startTime: Date.now(),
      timeSpent: 0
    });
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: Question['difficulty']): string => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load quiz. Please try again.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const selectedAnswer = quizState.selectedAnswers[currentQuestion?.id];
  const progress = ((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Results view
  if (quizState.showResults) {
    const results = calculateResults();
    if (!results) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">Here are your results</p>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
                <div className="text-3xl font-bold">{results.score}%</div>
                <div className="text-green-100">Final Score</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
                <div className="text-3xl font-bold">{results.correctAnswers}/{results.totalQuestions}</div>
                <div className="text-blue-100">Correct Answers</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center">
                <div className="text-3xl font-bold">{Math.floor(results.timeSpent / 60)}:{(results.timeSpent % 60).toString().padStart(2, '0')}</div>
                <div className="text-purple-100">Time Spent</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Question Review</h3>
              {quiz.questions.map((question, index) => {
                const result = results.answeredQuestions[index];
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800 flex-1">{question.question}</h4>
                      {result.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Your answer: <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {result.selectedAnswer}
                      </span>
                    </p>
                    {!result.isCorrect && (
                      <p className="text-sm text-green-600">
                        Correct answer: {question.answers.find(a => a.isCorrect)?.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">{quiz.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {quizState.currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </span>
              <span className="text-sm text-gray-500">{currentQuestion.category}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === answer.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === answer.id
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === answer.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="font-medium">{answer.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2 ${
                selectedAnswer
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {quizState.currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;

