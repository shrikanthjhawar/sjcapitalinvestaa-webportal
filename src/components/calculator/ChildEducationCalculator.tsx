import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';

const ChildEducationCalculator: React.FC = () => {
  // Inputs
  const [currentCost, setCurrentCost] = useState(2000000); // 20 Lakhs
  const [childAge, setChildAge] = useState(5); // 5 years old
  const [educationAge, setEducationAge] = useState(18); // Funds needed at 18
  const [inflationRate, setInflationRate] = useState(8); // % p.a.
  const [expectedReturn, setExpectedReturn] = useState(12); // % p.a.

  // Outputs
  const [futureCost, setFutureCost] = useState(0);
  const [monthlySip, setMonthlySip] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  const yearsToInvest = educationAge - childAge;

  useEffect(() => {
    const calculateEducationCost = () => {
      if (yearsToInvest <= 0) {
        setFutureCost(currentCost);
        setMonthlySip(0);
        setTotalInvested(0);
        setEstimatedReturns(0);
        return;
      }

      // 1. Calculate future cost of education
      const i_inflation = inflationRate / 100;
      const fv_education = currentCost * Math.pow(1 + i_inflation, yearsToInvest);
      setFutureCost(Math.round(fv_education));

      // 2. Calculate required monthly SIP
      const i_sip = expectedReturn / 100 / 12; // monthly interest rate
      const n_sip = yearsToInvest * 12; // number of months

      if (fv_education > 0 && expectedReturn > 0 && yearsToInvest > 0) {
        // Required Monthly SIP = FV / ( {[(1 + i)^n - 1] / i} * (1 + i) )
        const requiredSip = fv_education / (((Math.pow(1 + i_sip, n_sip) - 1) / i_sip) * (1 + i_sip));
        const investedAmount = requiredSip * n_sip;
        const returns = fv_education - investedAmount;

        setMonthlySip(Math.round(requiredSip));
        setTotalInvested(Math.round(investedAmount));
        setEstimatedReturns(Math.round(returns));
      } else {
        setMonthlySip(0);
        setTotalInvested(0);
        setEstimatedReturns(0);
      }
    };

    calculateEducationCost();
  }, [currentCost, childAge, educationAge, inflationRate, expectedReturn, yearsToInvest]);

  const chartData = [
    { name: 'Total Investment', value: totalInvested },
    { name: 'Estimated Returns', value: estimatedReturns > 0 ? estimatedReturns : 0 },
  ];

  const COLORS = ['#0D47A1', '#F9A825']; // Blue, Yellow

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left side: Inputs */}
      <div className="w-full">
        <CalculatorInput label="Current Cost of Education" value={currentCost} onChange={setCurrentCost} min={100000} max={10000000} step={100000} prefix="₹" />
        <CalculatorInput label="Child's Current Age" value={childAge} onChange={setChildAge} min={1} max={17} step={1} suffix="Years" />
        <CalculatorInput label="Age for Higher Education" value={educationAge} onChange={setEducationAge} min={childAge + 1} max={25} step={1} suffix="Years" />
        <CalculatorInput label="Education Inflation Rate" value={inflationRate} onChange={setInflationRate} min={1} max={15} step={0.5} suffix="% p.a." />
        <CalculatorInput label="Expected Return Rate (p.a.)" value={expectedReturn} onChange={setExpectedReturn} min={1} max={20} step={0.5} suffix="%" />
        <CallToActionButtons introText="Ready to plan for your child's future?" containerClassName="mt-4 pt-4" />
      </div>

      {/* Right side: Results and Chart */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="space-y-2 text-center mb-8">
          <p className="text-lg text-gray-600">Future cost of education in {yearsToInvest > 0 ? yearsToInvest : 0} years will be</p>
          <p className="text-4xl font-extrabold text-blue-900">{formatCurrency(futureCost)}</p>
          <p className="text-lg text-gray-600 mt-4">You need to invest</p>
          <p className="text-4xl font-extrabold text-yellow-600">{formatCurrency(monthlySip)}</p>
          <p className="text-lg text-gray-600">per month</p>
        </div>

        <div className="w-full h-64 mb-6">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="text-center bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-600">Total Invested</p><p className="text-xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p></div>
          <div className="text-center bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-600">Est. Returns</p><p className="text-xl font-bold text-gray-900">{formatCurrency(estimatedReturns)}</p></div>
        </div>
      </div>
    </div>
  );
};

export default ChildEducationCalculator;