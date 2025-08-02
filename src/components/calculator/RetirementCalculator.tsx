import React, { useState, useEffect } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CallToActionButtons from '../CallToActionButtons';
import usePersistentState from '../../hooks/usePersistentState';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = usePersistentState<number>('retirement_currentAge', 30);
  const [retirementAge, setRetirementAge] = usePersistentState<number>('retirement_retirementAge', 60);
  const [monthlyInvestment, setMonthlyInvestment] = usePersistentState<number>('retirement_monthlyInvestment', 5000);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('retirement_expectedReturn', 12);

  const [result, setResult] = useState<{ corpus: number; totalInvestment: number; wealthGained: number; } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect handles all the calculation logic whenever an input changes.
    if (retirementAge <= currentAge) {
      setError('Retirement age must be greater than current age.');
      setResult(null);
    } else {
      setError(null);
      const investmentPeriodYears = retirementAge - currentAge;
      const totalInvestment = monthlyInvestment * 12 * investmentPeriodYears;
      const annualInvestment = monthlyInvestment * 12;
      const rateOfReturn = expectedReturn / 100;
      let futureValue = 0;

      for (let year = 1; year <= investmentPeriodYears; year++) {
        futureValue = (futureValue + annualInvestment) * (1 + rateOfReturn);
      }
      
      const wealthGained = futureValue - totalInvestment;
      setResult({ corpus: Math.round(futureValue), totalInvestment, wealthGained: Math.round(wealthGained) });
    }
  }, [currentAge, retirementAge, monthlyInvestment, expectedReturn]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{`${payload[0].name}`}</p>
          <p style={{ color: payload[0].payload.fill }}>{`Value: ${formatIndianCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls Column */}
        <div className="space-y-2">
          <CalculatorInput
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={retirementAge - 1}
            step={1}
            suffix="Years"
          />
          <CalculatorInput
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={currentAge + 1}
            max={80}
            step={1}
            suffix="Years"
          />
          <CalculatorInput
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            min={500}
            max={100000}
            step={500}
            prefix="₹"
          />
          <CalculatorInput
            label="Expected Annual Return"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={5}
            max={20}
            step={0.5}
            suffix="% p.a."
          />
          {/* Call to Action Buttons */}
          <CallToActionButtons introText="Ready to start your journey?" containerClassName="mt-8 pt-6 border-t border-gray-200" />
        </div>

        {/* Results & Chart Column */}
        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
          {error && (
            <div className="text-center text-red-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">{error}</p>
            </div>
          )}
          {result && !error && (
            <div className="w-full text-center">
              <p className="text-lg text-gray-600">Your Estimated Corpus</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-700 my-2">{formatIndianCurrency(result.corpus)}</p>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Pie
                      data={[
                        { name: 'Total Investment', value: result.totalInvestment },
                        { name: 'Wealth Gained', value: result.wealthGained },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      <Cell key="cell-0" fill="#FFBB28" />
                      <Cell key="cell-1" fill="#0088FE" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {!result && !error && (
            <div className="text-center text-gray-500">
              <Calculator className="w-12 h-12 mx-auto mb-2" />
              <p>Adjust the sliders to see your results.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default RetirementCalculator;