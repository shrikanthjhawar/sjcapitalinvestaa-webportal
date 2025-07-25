import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorInput from './CalculatorInput';

const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [totalValue, setTotalValue] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  useEffect(() => {
    const calculateSIP = () => {
      const i = expectedReturn / 100 / 12; // monthly interest rate
      const n = timePeriod * 12; // number of months
      const M = monthlyInvestment;

      if (M > 0 && expectedReturn > 0 && timePeriod > 0) {
        // Future Value of SIP = M * {[(1 + i)^n - 1] / i} * (1 + i)
        const futureValue = M * (Math.pow(1 + i, n) - 1) / i * (1 + i);
        const totalInvested = M * n;
        const returns = futureValue - totalInvested;

        setTotalValue(Math.round(futureValue));
        setInvestedAmount(Math.round(totalInvested));
        setEstimatedReturns(Math.round(returns));
      } else {
        setTotalValue(0);
        setInvestedAmount(0);
        setEstimatedReturns(0);
      }
    };

    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const chartData = [
    { name: 'Invested Amount', value: investedAmount },
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
          label="Monthly Investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={100000}
          step={500}
          prefix="₹"
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
        <CalculatorInput
          label="Time Period"
          value={timePeriod}
          onChange={setTimePeriod}
          min={1}
          max={40}
          step={1}
          suffix="Years"
        />
      </div>

      {/* Right side: Results and Chart */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 text-center">
          <div>
            <p className="text-gray-600">Invested Amount</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(investedAmount)}</p>
          </div>
          <div>
            <p className="text-gray-600">Est. Returns</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(estimatedReturns)}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Value</p>
            <p className="text-3xl font-extrabold text-blue-900">{formatCurrency(totalValue)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;