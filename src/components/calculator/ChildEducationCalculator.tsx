import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, BarChart3, Copy, Check } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const ChildEducationCalculator: React.FC = () => {
  const [currentCost, setCurrentCost] = usePersistentState<number>('child_currentCost', 2000000);
  const [childAge, setChildAge] = usePersistentState<number>('child_childAge', 5);
  const [educationAge, setEducationAge] = usePersistentState<number>('child_educationAge', 18);
  const [inflationRate, setInflationRate] = usePersistentState<number>('child_inflationRate', 8);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('child_expectedReturn', 12);

  const [result, setResult] = useState<{
    futureCost: number;
    monthlySip: number;
    totalInvestment: number;
    estimatedReturns: number;
    yearlyData: { year: number; totalInvestment: number; futureValue: number; estimatedReturns: number; }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, copy] = useCopyToClipboard();

  const yearsToInvest = educationAge - childAge;

  useEffect(() => {
    if (currentCost <= 0 || childAge <= 0 || educationAge <= 0 || inflationRate < 0 || expectedReturn <= 0 || yearsToInvest <= 0) {
      setError('Invalid input. Please ensure all values are positive and education age is greater than child\'s age.');
      setResult(null);
      return;
    }
    setError(null);

    const i_inflation = inflationRate / 100;
    const fv_education = currentCost * Math.pow(1 + i_inflation, yearsToInvest);

    const i_sip = expectedReturn / 100 / 12;
    const n_sip = yearsToInvest * 12;

    const requiredSip = fv_education / (((Math.pow(1 + i_sip, n_sip) - 1) / i_sip) * (1 + i_sip));
    const totalInvestment = requiredSip * n_sip;
    const estimatedReturns = fv_education - totalInvestment;

    let yearlyData: { year: number; totalInvestment: number; futureValue: number; estimatedReturns: number }[] = [];
    let cumulativeInvestment = 0;
    for (let year = 1; year <= yearsToInvest; year++) {
        const n_months = year * 12;
        const futureValueForYear = requiredSip * ((Math.pow(1 + i_sip, n_months) - 1) / i_sip) * (1 + i_sip);
        cumulativeInvestment = requiredSip * n_months;
        const estimatedReturnsForYear = futureValueForYear - cumulativeInvestment;

        yearlyData.push({
            year: year,
            totalInvestment: Math.round(cumulativeInvestment),
            futureValue: Math.round(futureValueForYear),
            estimatedReturns: Math.round(estimatedReturnsForYear),
        });
    }

    setResult({
      futureCost: Math.round(fv_education),
      monthlySip: Math.round(requiredSip),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      yearlyData: yearlyData,
    });

  }, [currentCost, childAge, educationAge, inflationRate, expectedReturn, yearsToInvest]);

  const formatAxisY = (tick: number) => {
    if (tick >= 10000000) return `${(tick / 10000000).toFixed(1)} Cr`;
    if (tick >= 100000) return `${(tick / 100000).toFixed(1)} L`;
    if (tick >= 1000) return `${(tick / 1000).toFixed(0)}k`;
    return tick;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg text-sm space-y-1">
          <p className="font-bold text-base mb-2">{`End of Year ${label}`}</p>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Total Investment:</span>
            <span className="font-semibold" style={{color: '#F9A825'}}>{formatIndianCurrency(data.totalInvestment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Wealth Gained:</span>
            <span className="font-semibold" style={{color: '#0D47A1'}}>{formatIndianCurrency(data.estimatedReturns)}</span>
          </div>
          <div className="flex justify-between border-t pt-1 mt-1"><span className="text-gray-600 font-bold">Total Value:</span><span className="font-bold text-primary">{formatIndianCurrency(data.futureValue)}</span></div>
        </div>
      );
    }
    return null;
  };

  const handleCopy = () => {
    if (!result) return;
    let textToCopy = `
Child Education Calculation Results:
- Current Cost of Education: ${formatIndianCurrency(currentCost)}
- Child's Current Age: ${childAge} Years
- Age for Higher Education: ${educationAge} Years
- Education Inflation Rate: ${inflationRate}%
- Expected Annual Return: ${expectedReturn}%
- Future Cost of Education: ${formatIndianCurrency(result.futureCost)}
- Required Monthly SIP: ${formatIndianCurrency(result.monthlySip)}
- Total Investment: ${formatIndianCurrency(result.totalInvestment)}
- Wealth Gained: ${formatIndianCurrency(result.estimatedReturns)}

Year-wise Projection:
Year | Total Investment | Wealth Gained | Future Value
-----------------------------------------------------------------------------
`;
    result.yearlyData.forEach(data => {
      textToCopy += `${data.year.toString().padEnd(5)}| ${formatIndianCurrency(data.totalInvestment).padEnd(17)}| ${formatIndianCurrency(data.estimatedReturns).padEnd(14)}| ${formatIndianCurrency(data.futureValue)}
`;
    });
    copy(textToCopy.trim());
  };

  const THEME_COLORS = {
    investment: '#F9A825', // Accent - Golden/Yellow
    returns: '#0D47A1',    // Primary - Dark Blue
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
            <CalculatorInput label="Current Cost of Education" value={currentCost} onChange={setCurrentCost} min={100000} max={10000000} step={100000} prefix="₹" />
            <CalculatorInput label="Child's Current Age" value={childAge} onChange={setChildAge} min={1} max={17} step={1} suffix="Years" />
            <CalculatorInput label="Age for Higher Education" value={educationAge} onChange={setEducationAge} min={childAge + 1} max={25} step={1} suffix="Years" />
            <CalculatorInput label="Education Inflation Rate" value={inflationRate} onChange={setInflationRate} min={1} max={15} step={0.5} suffix="% p.a." />
            <CalculatorInput label="Expected Return Rate (p.a.)" value={expectedReturn} onChange={setExpectedReturn} min={1} max={20} step={0.5} suffix="%" />
            <CallToActionButtons introText="Ready to plan for your child's future?" containerClassName="mt-4 pt-4" />
        </div>

        {/* Results & Chart */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 min-h-[500px]">
          {error && (
            <div className="text-center text-red-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">{error}</p>
            </div>
          )}
          {result && !error && (
            <div className="w-full text-center">
              <p className="text-lg text-gray-600">Future cost of education in {yearsToInvest > 0 ? yearsToInvest : 0} years</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-4xl sm:text-5xl font-extrabold text-primary my-2">{formatIndianCurrency(result.futureCost)}</p>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  title="Copy results to clipboard"
                >
                  {copyStatus === 'copied' ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="w-full h-80 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.yearlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} unit=" Yr" padding={{ left: 20, right: 20 }} />
                    <YAxis tickFormatter={formatAxisY} tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="totalInvestment" stackId="1" stroke={THEME_COLORS.investment} fill={THEME_COLORS.investment} name="Total Investment" />
                    <Area type="monotone" dataKey="estimatedReturns" stackId="1" stroke={THEME_COLORS.returns} fill={THEME_COLORS.returns} name="Wealth Gained" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Required Monthly SIP</p><p className="font-bold text-lg text-accent">{formatIndianCurrency(result.monthlySip)}</p></div>
                <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Total Investment</p><p className="font-bold text-lg text-green-600">{formatIndianCurrency(result.totalInvestment)}</p></div>
                <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Wealth Gained</p><p className="font-bold text-lg text-primary">{formatIndianCurrency(result.estimatedReturns)}</p></div>
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

export default ChildEducationCalculator;