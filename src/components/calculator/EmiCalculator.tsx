import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorInput from './CalculatorInput';

const EmiCalculator: React.FC = () => {
  // Inputs
  const [loanAmount, setLoanAmount] = useState(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // % p.a.
  const [loanTenure, setLoanTenure] = useState(20); // Years

  // Outputs
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const calculateEmi = () => {
      const P = loanAmount;
      const r = interestRate / 12 / 100; // monthly interest rate
      const n = loanTenure * 12; // loan tenure in months

      if (P > 0 && interestRate > 0 && n > 0) {
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalAmountPayable = emi * n;
        const totalInterestPayable = totalAmountPayable - P;

        setMonthlyEmi(Math.round(emi));
        setTotalInterest(Math.round(totalInterestPayable));
        setTotalPayment(Math.round(totalAmountPayable));
      } else {
        setMonthlyEmi(0);
        setTotalInterest(0);
        setTotalPayment(0);
      }
    };

    calculateEmi();
  }, [loanAmount, interestRate, loanTenure]);

  const chartData = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Total Interest', value: totalInterest },
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
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          min={50000}
          max={50000000} // 5 Crores
          step={50000}
          prefix="₹"
        />
        <CalculatorInput
          label="Interest Rate (p.a.)"
          value={interestRate}
          onChange={setInterestRate}
          min={1}
          max={20}
          step={0.1}
          suffix="%"
        />
        <CalculatorInput
          label="Loan Tenure"
          value={loanTenure}
          onChange={setLoanTenure}
          min={1}
          max={30}
          step={1}
          suffix="Years"
        />
      </div>

      {/* Right side: Results and Chart */}
      <div className="w-full flex flex-col items-center text-center">
        <div className="space-y-2 text-center mb-8">
          <p className="text-lg text-gray-600">Your Monthly EMI is</p>
          <p className="text-4xl font-extrabold text-blue-900">{formatCurrency(monthlyEmi)}</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          <div className="text-center bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Principal Amount</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(loanAmount)}</p>
          </div>
          <div className="text-center bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Total Interest</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="text-center bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Total Payment</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(totalPayment)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;