import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Copy, Check, TrendingUp, PiggyBank, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import usePersistentState from '../../hooks/usePersistentState';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';
import CalculatorDisclaimer from './CalculatorDisclaimer';
import { formatIndianCurrency } from '../../utils/formatCurrency';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const SIPCalculator: React.FC = () => {
  const [calculationMode, setCalculationMode] = usePersistentState<'regular' | 'stepUp'>('sip_mode', 'regular');
  const [monthlyInvestment, setMonthlyInvestment] = usePersistentState<number>('sip_monthlyInvestment', 10000);
  const [annualIncrease, setAnnualIncrease] = usePersistentState<number>('sip_annualIncrease', 10);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('sip_expectedReturn', 12);
  const [investmentPeriod, setInvestmentPeriod] = usePersistentState<number>('sip_investmentPeriod', 10);

  const [result, setResult] = useState<{
    futureValue: number;
    totalInvestment: number;
    estimatedReturns: number;
    yearlyData: { year: number; totalInvestment: number; futureValue: number; estimatedReturns: number; }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, copy] = useCopyToClipboard();

  useEffect(() => {
    if (monthlyInvestment <= 0 || expectedReturn <= 0 || investmentPeriod <= 0 || (calculationMode === 'stepUp' && annualIncrease < 0)) {
      setError('All values must be greater than zero.');
      setResult(null);
      return;
    }
    setError(null);

    let yearlyData: { year: number; totalInvestment: number; futureValue: number; estimatedReturns: number }[] = [];

    if (calculationMode === 'regular') {
      const P = monthlyInvestment;
      const i = expectedReturn / 100 / 12;
      const N_years = investmentPeriod;

      for (let year = 1; year <= N_years; year++) {
        const n_months = year * 12;
        const futureValueForYear = P * ((Math.pow(1 + i, n_months) - 1) / i) * (1 + i);
        const totalInvestmentForYear = P * n_months;
        const estimatedReturnsForYear = futureValueForYear - totalInvestmentForYear;
        yearlyData.push({
          year: year,
          totalInvestment: Math.round(totalInvestmentForYear),
          futureValue: Math.round(futureValueForYear),
          estimatedReturns: Math.round(estimatedReturnsForYear),
        });
      }
    } else {
      const P = monthlyInvestment;
      const annualRate = expectedReturn / 100;
      const monthlyRate = annualRate / 12;
      const growthRate = annualIncrease / 100;
      const N_years = investmentPeriod;

      let futureValue = 0;
      let totalInvestmentAgg = 0;

      for (let year = 1; year <= N_years; year++) {
        const currentMonthlySip = P * Math.pow(1 + growthRate, year - 1);
        let yearlyInvestment = 0;
        for (let month = 1; month <= 12; month++) {
          futureValue = futureValue * (1 + monthlyRate) + currentMonthlySip;
          yearlyInvestment += currentMonthlySip;
        }
        totalInvestmentAgg += yearlyInvestment;
        const estimatedReturnsForYear = futureValue - totalInvestmentAgg;

        yearlyData.push({
          year: year,
          totalInvestment: Math.round(totalInvestmentAgg),
          futureValue: Math.round(futureValue),
          estimatedReturns: Math.round(estimatedReturnsForYear),
        });
      }
    }

    const finalResult = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1] : { futureValue: 0, totalInvestment: 0 };
    const estimatedReturns = finalResult.futureValue - finalResult.totalInvestment;

    setResult({
      futureValue: finalResult.futureValue,
      totalInvestment: finalResult.totalInvestment,
      estimatedReturns: Math.round(estimatedReturns),
      yearlyData: yearlyData,
    });
  }, [monthlyInvestment, expectedReturn, investmentPeriod, calculationMode, annualIncrease]);

  const formatAxisY = (tick: number) => {
    if (tick >= 10000000) return `${(tick / 10000000).toFixed(1)} Cr`;
    if (tick >= 100000) return `${(tick / 100000).toFixed(1)} L`;
    if (tick >= 1000) return `${(tick / 1000).toFixed(0)}k`;
    return tick;
  };

  const handleCopy = () => {
    if (!result) return;
    
    const text = `SIP Calculator Results:
Monthly Investment: ${formatIndianCurrency(monthlyInvestment)}
Investment Period: ${investmentPeriod} years
Expected Return: ${expectedReturn}% p.a.
Total Investment: ${formatIndianCurrency(result.totalInvestment)}
Future Value: ${formatIndianCurrency(result.futureValue)}
Estimated Returns: ${formatIndianCurrency(result.estimatedReturns)}`;
    
    copy(text);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Inputs */}
        <div className="space-y-4">
          {/* SIP Mode Toggle */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
            <div className="flex gap-2 p-1 bg-neutral-100 rounded-lg">
              <button
                onClick={() => setCalculationMode('regular')}
                className={`flex-1 py-2 px-3 rounded-md font-heading font-medium text-sm transition-all duration-300 ${
                  calculationMode === 'regular'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-neutral-600 hover:text-primary'
                }`}
              >
                Regular SIP
              </button>
              <button
                onClick={() => setCalculationMode('stepUp')}
                className={`flex-1 py-2 px-3 rounded-md font-heading font-medium text-sm transition-all duration-300 ${
                  calculationMode === 'stepUp'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-neutral-600 hover:text-primary'
                }`}
              >
                Step-up SIP
              </button>
            </div>
          </div>

          {/* Input Controls */}
          <div className="space-y-4">
            <CalculatorInput
              label="Monthly Investment"
              value={monthlyInvestment}
              min={500}
              max={500000}
              step={500}
              onChange={setMonthlyInvestment}
              prefix="₹"
              icon={<PiggyBank className="h-4 w-4 text-accent" />}
              description="Amount you want to invest every month"
            />

            {calculationMode === 'stepUp' && (
              <CalculatorInput
                label="Annual Increase"
                value={annualIncrease}
                min={0}
                max={50}
                step={1}
                onChange={setAnnualIncrease}
                suffix="%"
                icon={<TrendingUp className="h-4 w-4 text-accent" />}
                description="Yearly increase in SIP amount"
              />
            )}

            <CalculatorInput
              label="Expected Annual Return"
              value={expectedReturn}
              min={1}
              max={30}
              step={0.5}
              onChange={setExpectedReturn}
              suffix="%"
              icon={<Target className="h-4 w-4 text-accent" />}
              description="Expected annual return from investments"
            />

            <CalculatorInput
              label="Investment Period"
              value={investmentPeriod}
              min={1}
              max={40}
              step={1}
              onChange={setInvestmentPeriod}
              suffix=" years"
              icon={<Calendar className="h-4 w-4 text-accent" />}
              description="Duration of your SIP investment"
            />
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          {/* Results Summary */}
          {result && !error && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-base font-semibold text-primary">Investment Summary</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-lg font-heading font-medium text-xs hover:bg-accent/20 transition-all duration-300"
                >
                  {copyStatus === 'copied' ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Main Result */}
              <div className="text-center mb-4 p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg">
                <div className="font-heading text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-1">
                  {formatIndianCurrency(result.futureValue)}
                </div>
                <p className="font-body text-neutral-600 text-sm">Future Value</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <div className="font-heading text-base font-semibold text-primary mb-1">
                    {formatIndianCurrency(result.totalInvestment)}
                  </div>
                  <p className="font-body text-xs text-neutral-600">Total Investment</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="font-heading text-base font-semibold text-green-600 mb-1">
                    {formatIndianCurrency(result.estimatedReturns)}
                  </div>
                  <p className="font-body text-xs text-neutral-600">Estimated Returns</p>
                </div>
              </div>

              {/* Return Percentage */}
              <div className="bg-accent-50 rounded-lg p-3 text-center">
                <div className="font-heading text-lg font-bold text-accent mb-1">
                  {((result.estimatedReturns / result.totalInvestment) * 100).toFixed(1)}%
                </div>
                <p className="font-body text-xs text-neutral-600">Total Return</p>
              </div>
            </div>
          )}

          {/* Chart */}
          {result && !error && result.yearlyData.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
              <h3 className="font-heading text-base font-semibold text-primary mb-3">Growth Projection</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#64748b"
                      fontSize={10}
                      fontFamily="Inter"
                    />
                                      <YAxis 
                    tickFormatter={(value: any) => String(formatAxisY(value as number))}
                    stroke="#64748b"
                    fontSize={10}
                    fontFamily="Inter"
                  />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        fontFamily: 'Inter',
                        fontSize: '11px'
                      }}
                      formatter={(value: number, name: string) => [
                        formatIndianCurrency(value),
                        name === 'totalInvestment' ? 'Investment' : 'Returns'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="totalInvestment"
                      stackId="1"
                      stroke="#0f172a"
                      fill="#0f172a"
                      fillOpacity={0.8}
                      name="totalInvestment"
                    />
                    <Area
                      type="monotone"
                      dataKey="estimatedReturns"
                      stackId="1"
                      stroke="#d4af37"
                      fill="#d4af37"
                      fillOpacity={0.8}
                      name="estimatedReturns"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-body text-red-700 text-center text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8">
        <CallToActionButtons 
          introText="Ready to start your SIP investment journey?"
          containerClassName="mt-0 pt-0 border-none"
        />
      </div>
    </div>
  );
};

export default SIPCalculator;