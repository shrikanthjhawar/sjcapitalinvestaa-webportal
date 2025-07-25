import React, { useState, useEffect } from 'react';
import CalculatorInput from './CalculatorInput';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetirementCalculator: React.FC = () => {
  // Inputs
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [existingCorpus, setExistingCorpus] = useState(1000000);
  const [expectedReturnPre, setExpectedReturnPre] = useState(12); // Pre-retirement
  const [expectedReturnPost, setExpectedReturnPost] = useState(7); // Post-retirement
  const [inflationRate, setInflationRate] = useState(6);

  // Outputs
  const [retirementCorpus, setRetirementCorpus] = useState(0);
  const [requiredSip, setRequiredSip] = useState(0);
  const [futureValueOfExisting, setFutureValueOfExisting] = useState(0);
  const [corpusFromSip, setCorpusFromSip] = useState(0);
  const [monthlyExpensesAtRetirement, setMonthlyExpensesAtRetirement] = useState(0);

  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) {
      setRetirementCorpus(0);
      setRequiredSip(0);
      setFutureValueOfExisting(0);
      setCorpusFromSip(0);
      setMonthlyExpensesAtRetirement(0);
      return;
    }

    const i_inflation = inflationRate / 100;
    const expensesAtRetirement = monthlyExpenses * Math.pow(1 + i_inflation, yearsToRetirement);
    setMonthlyExpensesAtRetirement(Math.round(expensesAtRetirement));

    const r_post = expectedReturnPost / 100;
    const realReturnRatePost = r_post - i_inflation;

    let totalCorpusNeeded = 0;
    if (realReturnRatePost > 0) {
      totalCorpusNeeded = (expensesAtRetirement * 12) / realReturnRatePost;
    } else {
      setRetirementCorpus(0);
      setRequiredSip(0);
      setFutureValueOfExisting(0);
      setCorpusFromSip(0);
      return;
    }
    setRetirementCorpus(Math.round(totalCorpusNeeded));

    const r_pre = expectedReturnPre / 100;
    const fvOfExisting = existingCorpus * Math.pow(1 + r_pre, yearsToRetirement);
    setFutureValueOfExisting(Math.round(fvOfExisting));

    const shortfall = totalCorpusNeeded - fvOfExisting;

    if (shortfall > 0) {
      const i_pre_monthly = expectedReturnPre / 100 / 12;
      const n_months = yearsToRetirement * 12;
      const sip = shortfall / (((Math.pow(1 + i_pre_monthly, n_months) - 1) / i_pre_monthly));
      setRequiredSip(Math.round(sip));
      setCorpusFromSip(Math.round(shortfall));
    } else {
      setRequiredSip(0);
      setCorpusFromSip(0);
    }
  }, [currentAge, retirementAge, monthlyExpenses, existingCorpus, expectedReturnPre, expectedReturnPost, inflationRate]);

  const chartData = [
    { name: 'Existing Corpus (Future Value)', value: futureValueOfExisting },
    { name: 'Corpus from New SIPs', value: corpusFromSip > 0 ? corpusFromSip : 0 },
  ];

  const COLORS = ['#0D47A1', '#F9A825'];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lakh`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatFullCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <CalculatorInput label="Your Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={99} step={1} suffix="Years" />
        <CalculatorInput label="Your Retirement Age" value={retirementAge} onChange={setRetirementAge} min={currentAge + 1} max={100} step={1} suffix="Years" />
        <CalculatorInput label="Current Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} min={5000} max={500000} step={1000} prefix="₹" />
        <CalculatorInput label="Existing Retirement Corpus" value={existingCorpus} onChange={setExistingCorpus} min={0} max={100000000} step={10000} prefix="₹" />
        <CalculatorInput label="Return Rate (Pre-Retirement)" value={expectedReturnPre} onChange={setExpectedReturnPre} min={1} max={30} step={0.5} suffix="% p.a." />
        <CalculatorInput label="Return Rate (Post-Retirement)" value={expectedReturnPost} onChange={setExpectedReturnPost} min={1} max={20} step={0.5} suffix="% p.a." />
        <div className="md:col-span-2">
          <CalculatorInput label="Expected Inflation Rate" value={inflationRate} onChange={setInflationRate} min={1} max={15} step={0.5} suffix="% p.a." />
        </div>
      </div>

      <div className="w-full flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg border">
        <div className="space-y-2 text-center mb-6">
          <p className="text-lg text-gray-600">You will need a retirement corpus of</p>
          <p className="text-4xl font-extrabold text-blue-900" title={formatFullCurrency(retirementCorpus)}>{formatCurrency(retirementCorpus)}</p>
        </div>
        
        <div className="space-y-2 text-center mb-8">
          <p className="text-lg text-gray-600">You need to invest</p>
          <p className="text-4xl font-extrabold text-yellow-600">{formatFullCurrency(requiredSip)}</p>
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
              <Tooltip formatter={(value: number) => formatFullCurrency(value)} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full max-w-md text-left text-sm space-y-2">
            <div className="flex justify-between">
                <span className="text-gray-600">Years to Retirement:</span>
                <span className="font-semibold text-gray-800">{retirementAge - currentAge > 0 ? `${retirementAge - currentAge} years` : '-'}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Monthly expenses at retirement:</span>
                <span className="font-semibold text-gray-800">{formatFullCurrency(monthlyExpensesAtRetirement)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Future value of existing corpus:</span>
                <span className="font-semibold text-gray-800">{formatFullCurrency(futureValueOfExisting)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Corpus to be built via SIP:</span>
                <span className="font-semibold text-gray-800">{formatFullCurrency(corpusFromSip > 0 ? corpusFromSip : 0)}</span>
            </div>
        </div>

        {expectedReturnPost <= inflationRate && (
            <div className="mt-4 text-xs text-red-600 bg-red-50 p-3 rounded-lg">
                Warning: Your post-retirement returns do not beat inflation. This plan may not be sustainable.
            </div>
        )}
      </div>
    </div>
  );
};

export default RetirementCalculator;