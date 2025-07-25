import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';

const GoalSipCalculator: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState(10000000); // Default: 1 Crore
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  const [monthlySip, setMonthlySip] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  useEffect(() => {
    const calculateGoalSip = () => {
      const FV = targetAmount;
      const i = expectedReturn / 100 / 12; // monthly interest rate
      const n = timePeriod * 12; // number of months

      if (FV > 0 && expectedReturn > 0 && timePeriod > 0) {
        // Required Monthly SIP = FV / ( {[(1 + i)^n - 1] / i} * (1 + i) )
        const requiredSip = FV / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const investedAmount = requiredSip * n;
        const returns = FV - investedAmount;

        setMonthlySip(Math.round(requiredSip));
        setTotalInvested(Math.round(investedAmount));
        setEstimatedReturns(Math.round(returns));
      } else {
        setMonthlySip(0);
        setTotalInvested(0);
        setEstimatedReturns(0);
      }
    };

    calculateGoalSip();
  }, [targetAmount, expectedReturn, timePeriod]);

  const chartData = [
    { name: 'Total Investment', value: totalInvested },
    { name: 'Estimated Returns', value: estimatedReturns },
  ];

  const COLORS = ['#0D47A1', '#F9A825']; // Blue, Yellow

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left side: Inputs */}
      <div className="w-full">
        <CalculatorInput
          label="Target Amount"
          value={targetAmount}
          onChange={setTargetAmount}
          min={100000}
          max={100000000} // 10 Crores
          step={100000}
          prefix="₹"
        />
        <CalculatorInput
          label="Investment Period"
          value={timePeriod}
          onChange={setTimePeriod}
          min={1}
          max={40}
          step={1}
          suffix="Years"
        />
        <CalculatorInput
          label="Expected Return Rate (p.a.)"
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
        <CallToActionButtons introText="Ready to achieve your financial goals?" containerClassName="mt-4 pt-4" />
      </div>

      {/* Right side: Results and Chart */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="space-y-2 text-center mb-8">
          <p className="text-lg text-gray-600">To reach {formatCurrency(targetAmount)}, you need to invest</p>
          <p className="text-4xl font-extrabold text-blue-900">{formatCurrency(monthlySip)}</p>
          <p className="text-lg text-gray-600">per month</p>
        </div>

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

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="text-center bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Total Invested</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
          </div>
          <div className="text-center bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Est. Returns</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(estimatedReturns)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSipCalculator;