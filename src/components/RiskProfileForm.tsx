import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Shield, Zap, RefreshCw, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import CallToActionButtons from './CallToActionButtons';
import usePersistentState from '../hooks/usePersistentState';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Question = {
  id: string;
  text: string;
  options: { text: string; score: number }[];
  weight?: number; // Defaults to 1 if not provided
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
  profile: 'Conservative' | 'Moderate' | 'Aggressive';
  score: number;
  recommendation: string;
  Icon: React.ElementType;
  allocation: { name: string; value: number }[];
};

const profileDefinitions: (Omit<ProfileResult, 'score'> & { maxScore: number })[] = [
  {
    profile: 'Conservative',
    maxScore: 16,
    recommendation: 'You prioritize capital protection. Consider investments like Debt Mutual Funds, Fixed Deposits, and other low-risk options.',
    Icon: Shield,
    allocation: [
      { name: 'Debt', value: 80 },
      { name: 'Equity', value: 20 },
    ],
  },
  {
    profile: 'Moderate',
    maxScore: 26,
    recommendation: 'You seek a balance between risk and return. A diversified portfolio with a mix of Equity and Debt funds (Hybrid Funds) could be suitable.',
    Icon: BarChart,
       allocation: [
      { name: 'Debt', value: 40 },
      { name: 'Equity', value: 60 },
    ],
  },
  {
    profile: 'Aggressive',
    maxScore: Infinity,
    recommendation: 'You are comfortable with high risk for potentially higher returns. Consider focusing on Equity Mutual Funds, including Small and Mid-cap funds.',
    Icon: Zap,
       allocation: [
      { name: 'Debt', value: 10 },
      { name: 'Equity', value: 90 },
    ],
  },
];

const COLORS = ['#0D47A1', '#F9A825', '#4CAF50', '#FF5722']; // Blue, Yellow, Green, Orange
const RADIAN = Math.PI / 180;

const RiskProfileForm: React.FC = () => {
  const [quizStarted, setQuizStarted] = usePersistentState<boolean>('riskProfile_quizStarted', false);
  const [currentStep, setCurrentStep] = usePersistentState<number>('riskProfile_currentStep', 0);
  const [answers, setAnswers] = usePersistentState<Answers>('riskProfile_answers', {});
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chartLoading, setChartLoading] = useState(true);

  const [direction, setDirection] = useState(1);

  // Effect to handle chart loading state
  React.useEffect(() => {
    if (result) {
      setChartLoading(true);
      const timer = setTimeout(() => {
        setChartLoading(false);
      }, 500); // Corresponds to the result card animation duration
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleAnswerChange = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    setError(null); // Clear error when user starts answering

    // Use a short timeout to let the user see their selection before advancing
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setDirection(1);
        setCurrentStep(prev => prev + 1);
      } else {
        // It's the last question, so calculate the result
        calculateAndSetResult(newAnswers);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  const calculateAndSetResult = (finalAnswers: Answers) => {
    if (Object.keys(finalAnswers).length < questions.length) {
      setError('Please answer all questions before submitting.');
      return;
    }

    let weightedScoreSum = 0;
    let totalWeight = 0;

    questions.forEach(question => {
      const score = finalAnswers[question.id];
      const weight = question.weight || 1;
      weightedScoreSum += score * weight;
      totalWeight += weight;
    });

    // Calculate a normalized score that fits the original 7-35 scale for consistent profiling
    const normalizedScore = (weightedScoreSum / totalWeight) * questions.length;
    const totalScore = Math.round(normalizedScore);

    const resultDefinition = profileDefinitions.find(p => totalScore <= p.maxScore);

    if (resultDefinition) {
      const { maxScore, ...profileData } = resultDefinition;
      setResult({
        ...profileData,
        score: totalScore,
      });
    } else {
      console.error("Could not determine risk profile for score:", totalScore);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  const handleReset = () => {
    setQuizStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
    setChartLoading(true);
    setDirection(1);
    // Also clear the persisted state so the user can start fresh
    setQuizStarted(false);
    setCurrentStep(0);
    setAnswers({});
  };

  const progressPercentage = quizStarted ? ((currentStep + 1) / questions.length) * 100 : 0;

  return (
    <div id="risk-profiler" className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Discover Your Investor Profile</h2>
          <p className="mt-4 text-lg text-gray-600">Answer a few questions to understand your risk tolerance and get personalized insights.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {quizStarted && result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className=""
              >
                <div className="text-center mb-6">
                  <result.Icon className="mx-auto h-16 w-16 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold text-gray-800">Your Investor Profile is</h3>
                  <p className="mt-1 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-600">{result.profile}</p>
                  <p className="mt-2 text-xs text-gray-500">Based on a score of {result.score}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center mt-6">
                  {/* Left side: Recommendation */}
                  <div className="md:col-span-3">
                      <h4 className="font-bold text-base text-gray-900 mb-2">Recommended Strategy</h4>
                      <p className="text-gray-600 mb-4 leading-normal text-xs">{result.recommendation}</p>
                      <h4 className="font-bold text-base text-gray-900 mb-2">Suggested Asset Allocation</h4>
                      <ul className="space-y-2">
                      {result.allocation.map((alloc, index) => (
                          <li key={alloc.name} className="flex items-center text-sm">
                          <span className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                          <span className="font-medium text-gray-700">{alloc.name}:</span>
                          <span className="ml-auto font-bold text-gray-800">{alloc.value}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right side: Chart */}
                  <div className="md:col-span-2 w-full h-64 flex items-center justify-center">
                    {chartLoading ? (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Generating Chart...</p>
                      </div>
                    ) : (
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            isAnimationActive={true}
                            animationDuration={800}
                            data={result.allocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            innerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                              // Add a guard to prevent rendering if essential props are missing
                              if (midAngle === undefined || percent === undefined || innerRadius === undefined || outerRadius === undefined) {
                                return null;
                              }
                              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                  <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="bold">
                                  {`${(percent * 100).toFixed(0)}%`}
                                </text>
                              );
                            }}
                          >
                            {result.allocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `${value}%`} />
                          <Legend iconType="circle" />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                </div>
              </div>

                <CallToActionButtons containerClassName="mt-8" introText="Ready to take the next step based on your profile?" />

                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0 pt-0.5">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-yellow-800">Disclaimer</p>
                    <p className="mt-1 text-xs leading-relaxed text-yellow-700">
                      This risk profile is for informational purposes only and does not constitute financial advice. Please consult with a certified financial advisor before making any investment decisions.
                    </p>
                  </div>
                </div>
              </div>
                <div className="text-center mt-6">
                <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors text-xs"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Take the Quiz Again
                </button>
              </div>
            </motion.div>
          ) : !quizStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900">Ready to Find Your Path?</h3>
              <p className="mt-2 text-gray-600 max-w-xl mx-auto">
                This quick assessment will help us understand your financial goals and comfort with risk, guiding you to the right investment strategy.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="mt-8 inline-flex items-center gap-2 bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors transform hover:scale-105"
              >
                Let's Begin
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          ) : (
            <div>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="relative"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-base font-medium text-gray-600">Question {currentStep + 1} of {questions.length}</span>
                    <span className="text-sm font-medium text-gray-600">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                {/* Current Question */}
                <div className="text-center min-h-[84px] sm:min-h-[56px] flex items-center justify-center">
                  <p className="text-lg font-semibold text-gray-900 mb-6 sm:text-xl">
                    {questions[currentStep].text}
                  </p>
                </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[160px]">
                {questions[currentStep].options.map((option) => (
                  <label
                    key={option.score}
                    className={`relative flex items-center justify-center text-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                      answers[questions[currentStep].id] === option.score
                        ? 'bg-blue-600 border-blue-700 text-white shadow-lg'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={questions[currentStep].id}
                      value={option.score}
                      checked={answers[questions[currentStep].id] === option.score}
                      onChange={() => handleAnswerChange(questions[currentStep].id, option.score)}
                      className="sr-only" // Hide the actual radio button
                    />
                    <span className="font-medium text-sm">{option.text}</span>
                    {answers[questions[currentStep].id] === option.score && (
                      <motion.div
                        layoutId="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute -top-3 -right-3 bg-white rounded-full p-0.5"
                      >
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      </motion.div>
                    )}
                  </label>
                ))}
              </div>

                <div className="min-h-[24px] text-center mt-4">
                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`inline-flex items-center gap-2 text-gray-600 font-bold py-3 px-6 rounded-lg hover:text-gray-900 transition-colors ${
                      currentStep === 0 ? 'invisible' : 'visible'
                    }`}
                  >
                    <ArrowLeft className="h-5 w-5" /> Back
                  </button>
              </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
};

export default RiskProfileForm;