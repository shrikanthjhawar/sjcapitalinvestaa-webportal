import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Shield, Zap, RefreshCw, ArrowLeft, ArrowRight, AlertTriangle, Target, TrendingUp } from 'lucide-react';
import CallToActionButtons from './CallToActionButtons';

type Question = {
  id: string;
  text: string;
  options: { text: string; score: number }[];
  weight?: number;
};

const questions: Question[] = [
  {
    id: 'q1',
    text: 'What is your primary investment objective?',
    options: [
      { text: 'Capital Preservation: I want to protect my initial investment.', score: 1 },
      { text: 'Income: I need regular income from my investments.', score: 2 },
      { text: 'Balanced: A mix of growth and safety.', score: 3 },
      { text: 'Growth: I aim for long-term capital appreciation.', score: 4 },
      { text: 'Aggressive Growth: I seek maximum returns, accepting high risk.', score: 5 },
    ],
  },
  {
    id: 'q2',
    text: 'What is your investment time horizon?',
    weight: 1.25,
    options: [
      { text: 'Less than 1 year', score: 1 },
      { text: '1 to 3 years', score: 2 },
      { text: '3 to 5 years', score: 3 },
      { text: '5 to 10 years', score: 4 },
      { text: 'More than 10 years', score: 5 },
    ],
  },
  {
    id: 'q3',
    text: 'What percentage of your monthly income are you comfortable saving/investing?',
    options: [
      { text: 'Less than 5%', score: 1 },
      { text: '5% to 10%', score: 2 },
      { text: '10% to 20%', score: 3 },
      { text: '20% to 30%', score: 4 },
      { text: 'More than 30%', score: 5 },
    ],
  },
  {
    id: 'q4',
    text: 'Which statement best describes your risk appetite?',
    weight: 1.5,
    options: [
      { text: 'I avoid risk and prefer guaranteed returns.', score: 1 },
      { text: 'I take small risks for potentially small returns.', score: 2 },
      { text: 'I am willing to accept moderate risk for moderate returns.', score: 3 },
      { text: 'I am comfortable with significant risk for high returns.', score: 4 },
      { text: 'I thrive on high-risk, high-reward investments.', score: 5 },
    ],
  },
  {
    id: 'q5',
    text: 'What is your past investment experience?',
    options: [
      { text: 'None, I am a beginner.', score: 1 },
      { text: 'Limited (e.g., FDs, Savings Accounts).', score: 2 },
      { text: 'Some experience with Mutual Funds or Stocks.', score: 3 },
      { text: 'Experienced with a variety of financial products.', score: 4 },
      { text: 'Expert, I actively manage a diverse portfolio.', score: 5 },
    ],
  },
  {
    id: 'q6',
    text: 'If your portfolio dropped 15% in a month, how would you react?',
    weight: 1.5,
    options: [
      { text: 'Sell all my investments to prevent further loss.', score: 1 },
      { text: 'Sell some investments.', score: 2 },
      { text: 'Hold and wait for the market to recover.', score: 3 },
      { text: 'See it as an opportunity and invest more.', score: 4 },
      { text: 'Invest significantly more, I love a good discount.', score: 5 },
    ],
  },
  {
    id: 'q7',
    text: 'How soon might you need to access a significant portion of these investments?',
    options: [
      { text: 'In less than 6 months (Very High Liquidity Need).', score: 1 },
      { text: 'In 6 months to 2 years.', score: 2 },
      { text: 'In 2 to 5 years.', score: 3 },
      { text: 'In 5 to 10 years.', score: 4 },
      { text: 'Not for at least 10 years (Very Low Liquidity Need).', score: 5 },
    ],
  },
];

type Answers = { [key: string]: number };
type ProfileResult = {
  profile: string;
  description: string;
  score: number;
  recommendation: string;
  Icon: React.ElementType;
  allocation: { name: string; value: number }[];
};

const RiskProfileForm: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ProfileResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (score: number) => {
    setSelectedAnswer(score);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
      setAnswers(newAnswers);
      
      if (currentQuestionIndex === questions.length - 1) {
        const calculatedResult = calculateProfile(newAnswers);
        setResult(calculatedResult);
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex - 1].id] || null);
    }
  };

  const calculateProfile = (userAnswers: Answers): ProfileResult => {
    let totalScore = 0;
    let totalWeight = 0;

    questions.forEach(question => {
      const answer = userAnswers[question.id];
      if (answer !== undefined) {
        const weight = question.weight || 1;
        totalScore += answer * weight;
        totalWeight += weight;
      }
    });

    const averageScore = totalScore / totalWeight;
    let profile: string;
    let description: string;
    let recommendation: string;
    let Icon: any;

    if (averageScore <= 1.5) {
      profile = "Conservative";
      description = "You prefer safety and stability over high returns. Your investments focus on capital preservation with minimal risk.";
      recommendation = "Focus on debt funds, government securities, and high-quality corporate bonds. Consider a small allocation to equity funds for long-term growth.";
      Icon = Shield;
    } else if (averageScore <= 2.5) {
      profile = "Moderately Conservative";
      description = "You seek a balance between safety and growth, willing to take some risk for better returns.";
      recommendation = "A balanced approach with 60-70% debt instruments and 30-40% equity funds. Consider hybrid funds for diversification.";
      Icon = Target;
    } else if (averageScore <= 3.5) {
      profile = "Balanced";
      description = "You're comfortable with moderate risk and seek steady growth over time.";
      recommendation = "Equal allocation between debt and equity (50-50). Diversify across different fund categories and sectors.";
      Icon = BarChart;
    } else if (averageScore <= 4.5) {
      profile = "Moderately Aggressive";
      description = "You're willing to take higher risks for potentially higher returns.";
      recommendation = "Higher equity allocation (70-80%) with focus on growth funds. Maintain some debt exposure for stability.";
      Icon = Zap;
    } else {
      profile = "Aggressive";
      description = "You're comfortable with high risk and seek maximum returns over the long term.";
      recommendation = "Heavy equity focus (80-90%) with emphasis on small-cap and sector funds. Minimal debt exposure.";
      Icon = TrendingUp;
    }

    return {
      profile,
      description,
      recommendation,
      score: Math.round(averageScore * 10) / 10,
      Icon,
      allocation: [
        { name: "Equity Funds", value: Math.round((averageScore / 5) * 80) },
        { name: "Debt Funds", value: Math.round(((5 - averageScore) / 5) * 80) },
        { name: "Hybrid Funds", value: 20 }
      ]
    };
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 rounded-full px-3 sm:px-4 py-2 text-sm font-semibold mb-4">
          <Target className="h-4 w-4" />
          Risk Assessment
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
          Discover Your Investor Profile
        </h1>
        <p className="font-body text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Answer a few simple questions to understand your risk tolerance and get personalized investment insights.
        </p>
      </div>

      {/* Progress Bar */}
      {!showResults && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-accent-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Question Form or Results */}
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-neutral-200 p-6 sm:p-8"
          >
            {/* Question */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-4 sm:mb-6">
                {currentQuestion.text}
              </h2>
              
              {/* Options */}
              <div className="space-y-3 sm:space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option.score)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:shadow-md active:scale-95 touch-manipulation ${
                      selectedAnswer === option.score
                        ? 'border-accent bg-accent-50 text-accent-700'
                        : 'border-neutral-200 hover:border-accent/30 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="font-medium text-sm sm:text-base">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentQuestionIndex === 0
                    ? 'text-neutral-400 cursor-not-allowed'
                    : 'text-neutral-600 hover:text-primary hover:bg-neutral-100 active:scale-95'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedAnswer === null
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-accent-gradient text-primary hover:shadow-glow active:scale-95'
                }`}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Get Results' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Results Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-neutral-200 p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-accent-100 rounded-2xl mb-4 sm:mb-6">
                <BarChart className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-3 sm:mb-4">
                Your Risk Profile: {result?.profile}
              </h2>
              <p className="font-body text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                {result?.description}
              </p>
            </div>

            {/* Call to Action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <CallToActionButtons 
                containerClassName="bg-primary-gradient rounded-2xl p-6 text-white text-center" 
                introText="Ready to take the next step based on your profile?" 
              />
            </motion.div>

            {/* Premium Disclaimer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2.5 rounded-xl flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-amber-800 text-sm">Important Disclaimer</h4>
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-700 rounded-full px-2 py-1 text-xs font-medium">
                      <Shield className="h-3 w-3" />
                      Advisory Notice
                    </div>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This risk profile assessment is for <strong>informational purposes only</strong> and does not constitute financial, investment, or legal advice. 
                    The results are based on your responses and general market assumptions. We strongly recommend consulting with a 
                    <strong> certified financial advisor</strong> before making any investment decisions based on this assessment.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reset Button */}
            <div className="text-center mt-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-primary font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 border border-neutral-200 hover:border-primary/30 text-sm active:scale-95 touch-manipulation"
              >
                <RefreshCw className="h-4 w-4" />
                Retake Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RiskProfileForm;
