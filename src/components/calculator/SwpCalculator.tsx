import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorInput from './CalculatorInput';

const SwpCalculator: React.FC = () => {
  // Inputs
  const [totalInvestment, setTotalInvestment] = useState(10000000); // 1 Crore
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50000); // 50k
  const [expectedReturn, setExpectedReturn] = useState(8); // % p.a.

  // Outputs
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [willLastForever, setWillLastForever] = useState(false);

  useEffect(() => {
    const calculateSwp = () => {
      const P = totalInvestment;
      const W = monthlyWithdrawal;
      const i = expectedReturn / 100 / 12; // monthly interest rate

      // Check if withdrawals are sustainable from interest alone
      if (i > 0 && W <= P * i) {
        setWillLastForever(true);
        setYears(Infinity);
        setMonths(0);
        setTotalWithdrawn(0);
        setTotalInterest(0);
        return;
      }
      setWillLastForever(false);

      if (P > 0 && W > 0 && expectedReturn > 0) {
        // Formula to calculate number of periods (months)
        const n_months_float = Math.log(W / (W - P * i)) / Math.log(1 + i);
        
        if (isFinite(n_months_float) && n_months_float > 0) {
            const totalMonths = Math.floor(n_months_float);
            const finalYears = Math.floor(totalMonths / 12);
            const finalMonths = totalMonths % 12;
            
            const finalTotalWithdrawn = W * totalMonths;
            // FV = P(1+i)^n - W * [((1+i)^n - 1)/i]
            const fv = P * Math.pow(1 + i, totalMonths) - W * ((Math.pow(1 + i, totalMonths) - 1) / i);
            const finalTotalInterest = finalTotalWithdrawn + fv - P;

            setYears(finalYears);
            setMonths(finalMonths);
            setTotalWithdrawn(Math.round(finalTotalWithdrawn));
            setTotalInterest(Math.round(finalTotalInterest));
        } else {
            setYears(0);
            setMonths(0);
            setTotalWithdrawn(0);
            setTotalInterest(0);
        }
      } else {
        setYears(0);
        setMonths(0);
        setTotalWithdrawn(0);
        setTotalInterest(0);
      }
    };

    calculateSwp();
  }, [totalInvestment, monthlyWithdrawal, expectedReturn]);

  const chartData = [
    { name: 'Principal Amount', value: totalInvestment },
    { name: 'Total Interest', value: totalInterest > 0 ? totalInterest : 0 },
  ];

  const COLORS = ['#0D47A1', '#F9A825']; // Blue, Yellow

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left side: Inputs */}
      <div className="w-full">
        <CalculatorInput label="Total Investment" value={totalInvestment} onChange={setTotalInvestment} min={100000} max={50000000} step={100000} prefix="₹" />
        <CalculatorInput label="Withdrawal per Month" value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} min={1000} max={500000} step={1000} prefix="₹" />
        <CalculatorInput label="Expected Return Rate (p.a.)" value={expectedReturn} onChange={setExpectedReturn} min={1} max={20} step={0.5} suffix="%" />
      </div>

      {/* Right side: Results and Chart */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="space-y-2 text-center mb-8">
          <p className="text-lg text-gray-600">Your money will last for</p>
          {willLastForever ? (
            <p className="text-4xl font-extrabold text-green-600">Forever</p>
          ) : (
            <p className="text-4xl font-extrabold text-blue-900">
              {years} <span className="text-2xl font-semibold">Years</span> & {months} <span className="text-2xl font-semibold">Months</span>
            </p>
          )}
          {willLastForever && <p className="text-sm text-gray-500 mt-2">Your withdrawal amount is less than or equal to your monthly interest earned.</p>}
        </div>

        {!willLastForever && (
          <>
            <div className="w-full h-64 mb-6">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
              <div className="text-center bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-600">Principal Amount</p><p className="text-xl font-bold text-gray-900">{formatCurrency(totalInvestment)}</p></div>
              <div className="text-center bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-600">Total Interest</p><p className="text-xl font-bold text-gray-900">{formatCurrency(totalInterest)}</p></div>
              <div className="text-center bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-600">Total Withdrawn</p><p className="text-xl font-bold text-gray-900">{formatCurrency(totalWithdrawn)}</p></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SwpCalculator;