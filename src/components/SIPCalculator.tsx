import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Target, PiggyBank } from 'lucide-react';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [results, setResults] = useState({
    futureValue: 0,
    totalInvestment: 0,
    totalReturns: 0
  });

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = investmentPeriod * 12;
    
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = futureValue - totalInvestment;

    setResults({
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, investmentPeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            SIP
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-600 ml-2">
              Calculator
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate how your systematic investment plan can help you achieve your financial goals. 
            Discover the power of compounding with our interactive SIP calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-yellow-400 p-3 rounded-lg">
                <Calculator className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold">Calculate Your SIP</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Monthly Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-blue-300">₹</span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-blue-800 border border-blue-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="5000"
                  />
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full mt-2 accent-yellow-400"
                />
                <div className="flex justify-between text-sm text-blue-300 mt-1">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-blue-800 border border-blue-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="12"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full mt-2 accent-yellow-400"
                />
                <div className="flex justify-between text-sm text-blue-300 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-blue-800 border border-blue-700 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="10"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full mt-2 accent-yellow-400"
                />
                <div className="flex justify-between text-sm text-blue-300 mt-1">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-blue-50 p-8 rounded-2xl border border-yellow-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-900 to-yellow-600 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Investment Results</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Total Investment</p>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.totalInvestment)}</p>
                  </div>
                  <PiggyBank className="h-8 w-8 text-blue-600" />
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Total Returns</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(results.totalReturns)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900 to-yellow-600 rounded-lg text-white">
                  <div>
                    <p className="text-sm text-blue-100">Future Value</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.futureValue)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-100">Wealth Multiplier</p>
                    <p className="text-xl font-bold">{(results.futureValue / results.totalInvestment).toFixed(1)}x</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits of SIP</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Rupee cost averaging reduces market volatility impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Disciplined investing builds long-term wealth</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Power of compounding accelerates growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-gray-700">Flexible investment amounts and tenure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://demo.investwell.app/app/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-900 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-800 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Your SIP Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default SIPCalculator;