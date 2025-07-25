import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, InfinityIcon, BarChart3 } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CallToActionButtons from '../CallToActionButtons';

const SwpCalculator: React.FC = () => {
  const [totalInvestment, setTotalInvestment] = usePersistentState<number>('swp_totalInvestment', 10000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = usePersistentState<number>('swp_monthlyWithdrawal', 50000);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('swp_expectedReturn', 8);

  const [result, setResult] = useState<{
    years: number;
    months: number;
    totalWithdrawn: number;
    totalInterest: number;
    willLastForever: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (totalInvestment <= 0 || monthlyWithdrawal <= 0 || expectedReturn <= 0) {
      setError('All values must be greater than zero.');
      setResult(null);
      return;
    }
    setError(null);

    const P = totalInvestment;
    const W = monthlyWithdrawal;
    const i = expectedReturn / 100 / 12; // Monthly interest rate

    // Check if withdrawals are sustainable from interest alone
    if (i > 0 && W <= P * i) {
      setResult({ willLastForever: true, years: Infinity, months: 0, totalWithdrawn: 0, totalInterest: 0 });
      return;
    }

    // Formula to calculate number of periods (months)
    const n_months_float = Math.log(W / (W - P * i)) / Math.log(1 + i);

    if (isFinite(n_months_float) && n_months_float > 0) {
      const totalMonths = Math.floor(n_months_float);
      const finalYears = Math.floor(totalMonths / 12);
      const finalMonths = totalMonths % 12;
      const finalTotalWithdrawn = W * totalMonths;
      const fv = P * Math.pow(1 + i, totalMonths) - W * ((Math.pow(1 + i, totalMonths) - 1) / i);
      const finalTotalInterest = finalTotalWithdrawn + fv - P;

      setResult({
        willLastForever: false,
        years: finalYears,
        months: finalMonths,
        totalWithdrawn: Math.round(finalTotalWithdrawn),
        totalInterest: Math.round(finalTotalInterest),
      });
    } else {
      setError('Withdrawal amount is too high for the investment to sustain.');
      setResult(null);
    }
  }, [totalInvestment, monthlyWithdrawal, expectedReturn]);

  const formatIndianCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

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
        <div className="space-y-6">
          <div>
            <label htmlFor="totalInvestment" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Total Investment</span>
              <span className="font-bold text-blue-600">{formatIndianCurrency(totalInvestment)}</span>
            </label>
            <input type="range" id="totalInvestment" min="100000" max={50000000} step={100000} value={totalInvestment} onChange={(e) => setTotalInvestment(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
          <div>
            <label htmlFor="monthlyWithdrawal" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Withdrawal per Month</span>
              <span className="font-bold text-blue-600">{formatIndianCurrency(monthlyWithdrawal)}</span>
            </label>
            <input type="range" id="monthlyWithdrawal" min="1000" max={500000} step={1000} value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
          <div>
            <label htmlFor="expectedReturn" className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Expected Annual Return</span>
              <span className="font-bold text-blue-600">{expectedReturn}% p.a.</span>
            </label>
            <input type="range" id="expectedReturn" min="1" max={20} step={0.5} value={expectedReturn} onChange={(e) => setExpectedReturn(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
          <CallToActionButtons introText="Ready to plan your regular income?" containerClassName="mt-8 pt-6 border-t border-gray-200" />
        </div>

        {/* Results & Chart */}
        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 min-h-[350px]">
          {error && <div className="text-center text-red-600"><AlertCircle className="w-12 h-12 mx-auto mb-2" /><p className="font-semibold">{error}</p></div>}
          
          {result && result.willLastForever && !error && (
            <div className="text-center text-green-600">
              <InfinityIcon className="w-16 h-16 mx-auto mb-2" />
              <p className="text-4xl font-extrabold">Your money can last forever</p>
              <p className="text-sm text-gray-600 mt-2">Your withdrawal amount is less than or equal to your monthly interest earned.</p>
            </div>
          )}

          {result && !result.willLastForever && !error && (
            <div className="w-full text-center">
              <p className="text-lg text-gray-600">Your money will last for</p>
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-700 my-2">
                {result.years} <span className="text-3xl font-semibold">Yrs</span> & {result.months} <span className="text-3xl font-semibold">Mos</span>
              </p>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Pie data={[ { name: 'Principal Amount', value: totalInvestment }, { name: 'Total Interest', value: result.totalInterest > 0 ? result.totalInterest : 0 } ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} fill="#8884d8" dataKey="value" nameKey="name">
                      <Cell key="cell-0" fill="#FFBB28" />
                      <Cell key="cell-1" fill="#0088FE" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
                <div className="text-center"><p className="text-sm text-gray-500">Total Withdrawn</p><p className="font-bold text-lg text-gray-800">{formatIndianCurrency(result.totalWithdrawn)}</p></div>
                <div className="text-center"><p className="text-sm text-gray-500">Total Interest</p><p className="font-bold text-lg text-gray-800">{formatIndianCurrency(result.totalInterest)}</p></div>
              </div>
            </div>
          )}

          {!result && !error && <div className="text-center text-gray-500"><BarChart3 className="w-12 h-12 mx-auto mb-2" /><p>Adjust the sliders to see your results.</p></div>}
        </div>
      </div>
  );
};

export default SwpCalculator;