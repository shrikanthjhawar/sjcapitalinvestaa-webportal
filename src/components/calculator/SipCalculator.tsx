import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, BarChart3 } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = usePersistentState<number>('sip_monthlyInvestment', 10000);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('sip_expectedReturn', 12);
  const [investmentPeriod, setInvestmentPeriod] = usePersistentState<number>('sip_investmentPeriod', 10);

  const [result, setResult] = useState<{ futureValue: number; totalInvestment: number; estimatedReturns: number; } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (monthlyInvestment <= 0 || expectedReturn <= 0 || investmentPeriod <= 0) {
      setError('All values must be greater than zero.');
      setResult(null);
      return;
    }
    setError(null);

    const i = expectedReturn / 100 / 12; // Monthly interest rate
    const n = investmentPeriod * 12; // Total number of investments (months)
    const P = monthlyInvestment;

    // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvestment = P * n;
    const estimatedReturns = futureValue - totalInvestment;

    setResult({
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
    });
  }, [monthlyInvestment, expectedReturn, investmentPeriod]);

  const CustomTooltip = ({ active, payload }: any) => {
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
        {/* Input Controls */}
        <div className="space-y-8">
          <CalculatorInput
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            min={500} max={100000} step={500}
            prefix="₹"
          />
          <CalculatorInput
            label="Expected Annual Return"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={1} max={20} step={0.5}
            suffix="% p.a."
          />
          <CalculatorInput
            label="Investment Period"
            value={investmentPeriod}
            onChange={setInvestmentPeriod}
            min={1} max={40} step={1}
            suffix="Years"
          />
          <CallToActionButtons introText="Ready to start investing?" containerClassName="mt-4 pt-4" />
        </div>

        {/* Results & Chart */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6">
          {error && (
            <div className="text-center text-red-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">{error}</p>
            </div>
          )}
          {result && !error && (
            <div className="w-full text-center">
              <p className="text-lg text-gray-600">Estimated Future Value</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-700 my-2">{formatIndianCurrency(result.futureValue)}</p>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Pie
                      data={[
                        { name: 'Total Investment', value: result.totalInvestment },
                        { name: 'Estimated Returns', value: result.estimatedReturns },
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
              <div className="mt-4 flex justify-around w-full max-w-sm mx-auto">
                <div>
                  <p className="text-sm text-gray-500">Total Investment</p>
                  <p className="font-bold text-lg text-gray-800">{formatIndianCurrency(result.totalInvestment)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Returns</p>
                  <p className="font-bold text-lg text-gray-800">{formatIndianCurrency(result.estimatedReturns)}</p>
                </div>
              </div>
            </div>
          )}
          {!result && !error && (
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Adjust the sliders to see your results.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default SIPCalculator;