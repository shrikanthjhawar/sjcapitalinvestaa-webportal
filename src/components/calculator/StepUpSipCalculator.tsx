import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';

const StepUpSipCalculator: React.FC = () => {
  // Inputs
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [annualIncrease, setAnnualIncrease] = useState(10); // Percentage
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // Outputs
  const [totalValue, setTotalValue] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  useEffect(() => {
    const calculateStepUpSip = () => {
      const P = initialInvestment;
      const annualRate = expectedReturn / 100;
      const monthlyRate = annualRate / 12;
      const growthRate = annualIncrease / 100;
      const N = timePeriod;

      if (P <= 0 || expectedReturn <= 0 || N <= 0) {
        setTotalValue(0);
        setInvestedAmount(0);
        setEstimatedReturns(0);
        return;
      }

      let totalFutureValue = 0;
      let totalInvestedAmount = 0;

      for (let year = 1; year <= N; year++) {
        const currentMonthlySip = P * Math.pow(1 + growthRate, year - 1);
        totalInvestedAmount += currentMonthlySip * 12;

        // FV of this year's SIPs at the end of this year (as an annuity due)
        const fvOfSipThisYear = currentMonthlySip * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
        
        // This value then compounds for the remaining years
        const yearsRemaining = N - year;
        const finalFvForThisYear = fvOfSipThisYear * Math.pow(1 + annualRate, yearsRemaining);

        totalFutureValue += finalFvForThisYear;
      }

      setTotalValue(Math.round(totalFutureValue));
      setInvestedAmount(Math.round(totalInvestedAmount));
      setEstimatedReturns(Math.round(totalFutureValue - totalInvestedAmount));
    };

    calculateStepUpSip();
  }, [initialInvestment, annualIncrease, expectedReturn, timePeriod]);

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
          label="Initial Monthly Investment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          min={500}
          max={100000}
          step={500}
          prefix="₹"
        />
        <CalculatorInput
          label="Annual Step-up"
          value={annualIncrease}
          onChange={setAnnualIncrease}
          min={0}
          max={25}
          step={1}
          suffix="%"
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
        <CallToActionButtons introText="Ready to step-up your investments?" containerClassName="mt-4 pt-4" />
      </div>

      {/* Right side: Results and Chart */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 text-center">
          <div>
            <p className="text-gray-600">Total Invested</p>
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

export default StepUpSipCalculator;