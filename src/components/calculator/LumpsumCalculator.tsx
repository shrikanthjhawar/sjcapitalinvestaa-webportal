import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, BarChart3, Copy, Check } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const LumpsumCalculator: React.FC = () => {
  const [totalInvestment, setTotalInvestment] = usePersistentState<number>('lumpsum_totalInvestment', 100000);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('lumpsum_expectedReturn', 12);
  const [timePeriod, setTimePeriod] = usePersistentState<number>('lumpsum_timePeriod', 10);

  const [result, setResult] = useState<{
    futureValue: number;
    totalInvestment: number;
    estimatedReturns: number;
    yearlyData: { year: number; totalInvestment: number; futureValue: number; estimatedReturns: number; }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, copy] = useCopyToClipboard();

  useEffect(() => {
    if (totalInvestment <= 0 || expectedReturn <= 0 || timePeriod <= 0) {
      setError('All values must be greater than zero.');
      setResult(null);
      return;
    }
    setError(null);

    const P = totalInvestment;
    const r = expectedReturn / 100; // annual interest rate
    const N_years = timePeriod;

    let yearlyData: { year: number; totalInvestment: number; futureValue: number; estimatedReturns: number }[] = [];

    for (let year = 1; year <= N_years; year++) {
      const futureValueForYear = P * Math.pow(1 + r, year);
      const estimatedReturnsForYear = futureValueForYear - P;
      yearlyData.push({
        year: year,
        totalInvestment: P,
        futureValue: Math.round(futureValueForYear),
        estimatedReturns: Math.round(estimatedReturnsForYear),
      });
    }

    const finalResult = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1] : { futureValue: 0, totalInvestment: 0 };
    const estimatedReturns = finalResult.futureValue - finalResult.totalInvestment;

    setResult({
      futureValue: finalResult.futureValue,
      totalInvestment: finalResult.totalInvestment,
      estimatedReturns: Math.round(estimatedReturns),
      yearlyData: yearlyData,
    });
  }, [totalInvestment, expectedReturn, timePeriod]);

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
Lumpsum Calculation Results:
- Total Investment: ${formatIndianCurrency(totalInvestment)}
- Expected Annual Return: ${expectedReturn}%
- Investment Period: ${timePeriod} Years
- Estimated Future Value: ${formatIndianCurrency(result.futureValue)}
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
          <CalculatorInput
            label="Total Investment"
            value={totalInvestment}
            onChange={setTotalInvestment}
            min={1000}
            max={10000000}
            step={1000}
            prefix="₹"
          />
          <CalculatorInput
            label="Expected Annual Return"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={1}
            max={30}
            step={0.5}
            suffix="% p.a."
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
          <CallToActionButtons introText="Ready to make a lumpsum investment?" containerClassName="mt-4 pt-4" />
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
              <p className="text-lg text-gray-600">Estimated Future Value</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-4xl sm:text-5xl font-extrabold text-primary my-2">{formatIndianCurrency(result.futureValue)}</p>
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
                <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Total Investment</p><p className="font-bold text-lg text-accent">{formatIndianCurrency(result.totalInvestment)}</p></div>
                <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Wealth Gained</p><p className="font-bold text-lg text-green-600">{formatIndianCurrency(result.estimatedReturns)}</p></div>
                <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Future Value</p><p className="font-bold text-lg text-primary">{formatIndianCurrency(result.futureValue)}</p></div>
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

export default LumpsumCalculator;
