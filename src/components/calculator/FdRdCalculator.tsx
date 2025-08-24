import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import usePersistentState from '../../hooks/usePersistentState';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';
import CallToActionButtons from '../CallToActionButtons';

type CompoundingFrequency = 'annually' | 'half-yearly' | 'quarterly' | 'monthly';

const FdRdCalculator: React.FC = () => {
  const [mode, setMode] = usePersistentState<'fd' | 'rd'>('fdrd_mode', 'fd');

  // FD Inputs
  const [principal, setPrincipal] = usePersistentState<number>('fd_principal', 100000);
  const [compounding, setCompounding] = usePersistentState<CompoundingFrequency>('fd_compounding', 'quarterly');

  // RD Inputs
  const [monthlyDeposit, setMonthlyDeposit] = usePersistentState<number>('rd_deposit', 5000);

  // Common Inputs
  const [interestRate, setInterestRate] = usePersistentState<number>('fdrd_interestRate', 7.5);
  const [timePeriod, setTimePeriod] = usePersistentState<number>('fdrd_timePeriod', 5);

  // Results
  const [result, setResult] = useState<{
    maturityValue: number;
    investedAmount: number;
    interestEarned: number;
  } | null>(null);

  const compoundingFactors: Record<CompoundingFrequency, number> = {
    annually: 1,
    'half-yearly': 2,
    quarterly: 4,
    monthly: 12,
  };

  useEffect(() => {
    if (mode === 'fd') {
      const P = principal;
      const r = interestRate / 100;
      const n = compoundingFactors[compounding];
      const t = timePeriod;

      if (P > 0 && r > 0 && t > 0) {
        // A = P * (1 + r/n)^(n*t)
        const maturityValue = P * Math.pow(1 + r / n, n * t);
        const interestEarned = maturityValue - P;
        setResult({
          maturityValue: Math.round(maturityValue),
          investedAmount: P,
          interestEarned: Math.round(interestEarned),
        });
      } else {
        setResult(null);
      }
    } else { // RD Calculation
      const P = monthlyDeposit;
      const i = interestRate / 100 / 12; // monthly interest rate
      const n = timePeriod * 12; // number of months

      if (P > 0 && i > 0 && n > 0) {
        // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
        const maturityValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const investedAmount = P * n;
        const interestEarned = maturityValue - investedAmount;
        setResult({
          maturityValue: Math.round(maturityValue),
          investedAmount: Math.round(investedAmount),
          interestEarned: Math.round(interestEarned),
        });
      } else {
        setResult(null);
      }
    }
  }, [mode, principal, compounding, monthlyDeposit, interestRate, timePeriod]);

  const chartData = result ? [
    { name: 'Invested Amount', value: result.investedAmount },
    { name: 'Interest Earned', value: result.interestEarned },
  ] : [];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Controls */}
      <div className="space-y-4">
        <div className="flex justify-center mb-3 border-b border-gray-200">
          <button onClick={() => setMode('fd')} className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${mode === 'fd' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Fixed Deposit (FD)</button>
          <button onClick={() => setMode('rd')} className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${mode === 'rd' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Recurring Deposit (RD)</button>
        </div>

        {mode === 'fd' ? (
          <CalculatorInput label="Principal Amount" value={principal} onChange={setPrincipal} min={5000} max={10000000} step={5000} prefix="₹" />
        ) : (
          <CalculatorInput label="Monthly Deposit" value={monthlyDeposit} onChange={setMonthlyDeposit} min={500} max={100000} step={500} prefix="₹" />
        )}

        <CalculatorInput label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={15} step={0.1} suffix="% p.a." />
        <CalculatorInput label="Time Period" value={timePeriod} onChange={setTimePeriod} min={1} max={30} step={1} suffix="Years" />
        
        {mode === 'fd' && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Compounding Frequency</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['annually', 'half-yearly', 'quarterly', 'monthly'] as CompoundingFrequency[]).map(freq => (
                <button key={freq} onClick={() => setCompounding(freq)} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors capitalize ${compounding === freq ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}>{freq.replace('-', ' ')}</button>
              ))}
            </div>
          </div>
        )}
        
        <CallToActionButtons introText="Looking for secure investment options?" containerClassName="mt-4 pt-4 border-t border-gray-200" />
      </div>

      {/* Results & Chart */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center min-h-[400px]">
        {result ? (
          <div className="w-full">
            <p className="text-base text-gray-600">Maturity Value</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-700 my-1">{formatIndianCurrency(result.maturityValue)}</p>
            <div className="w-full h-48 my-4"><ResponsiveContainer><PieChart><Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">{chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip formatter={(value: number) => formatIndianCurrency(value)} /><Legend iconType="circle" /></PieChart></ResponsiveContainer></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Invested Amount</p><p className="font-bold text-base text-gray-800">{formatIndianCurrency(result.investedAmount)}</p></div>
              <div className="bg-white p-2.5 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Interest Earned</p><p className="font-bold text-base text-green-600">{formatIndianCurrency(result.interestEarned)}</p></div>
              <div className="bg-white p-2.5 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Maturity Value</p><p className="font-bold text-base text-blue-700">{formatIndianCurrency(result.maturityValue)}</p></div>
            </div>
          </div>
        ) : (<p className="text-sm">Enter valid details to see the calculation.</p>)}
      </div>
    </div>
  );
};

export default FdRdCalculator;