import React, { useState, useEffect } from 'react';
import { AlertCircle, BarChart3, Copy, Check } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';
import CallToActionButtons from '../CallToActionButtons';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const SwpCalculator: React.FC = () => {
  const [calculationMode, setCalculationMode] = usePersistentState<'projection' | 'withdrawal'>('swp_mode', 'projection');
  const [totalInvestment, setTotalInvestment] = usePersistentState<number>('swp_totalInvestment', 10000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = usePersistentState<number>('swp_monthlyWithdrawal', 50000);
  const [expectedReturn, setExpectedReturn] = usePersistentState<number>('swp_expectedReturn', 8);
  const [timePeriod, setTimePeriod] = usePersistentState<number>('swp_timePeriod', 10);

  const [result, setResult] = useState<{
    finalValue: number;
    totalWithdrawn: number;
    totalInterest: number;
    yearlyData: {
      year: number;
      openingBalance: number;
      withdrawal: number;
      interestEarned: number;
      closingBalance: number;
    }[];
    calculatedMonthlyWithdrawal?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, copy] = useCopyToClipboard();

  useEffect(() => {
    // Common validation for both modes
    if (totalInvestment <= 0 || expectedReturn <= 0 || timePeriod <= 0) {
      setError('All values must be greater than zero.');
      setResult(null);
      return;
    }

    let finalMonthlyWithdrawal: number;

    if (calculationMode === 'withdrawal') {
      // Calculate the sustainable monthly withdrawal
      const r_annual = expectedReturn / 100;
      const N_years = timePeriod;
      
      if (r_annual <= 0) {
        // If no return, withdrawal is just total investment spread over the period
        finalMonthlyWithdrawal = totalInvestment / N_years / 12;
      } else {
        // Annuity payment formula to find the withdrawal amount that depletes the corpus to zero
        const W_annual = (totalInvestment * Math.pow(1 + r_annual, N_years) * r_annual) / (Math.pow(1 + r_annual, N_years) - 1);
        finalMonthlyWithdrawal = W_annual / 12;
      }
    } else {
      // Projection mode validation
      if (monthlyWithdrawal <= 0) {
        setError('All values must be greater than zero.');
        setResult(null);
        return;
      }
      finalMonthlyWithdrawal = monthlyWithdrawal;
    }

    setError(null);

    // Now run the projection with the determined monthly withdrawal
    const P = totalInvestment;
    const W_annual = finalMonthlyWithdrawal * 12;
    const r = expectedReturn / 100; // annual rate
    const N_years = timePeriod;

    let currentBalance = P;
    const yearlyData = [];

    for (let year = 1; year <= N_years; year++) {
      if (currentBalance <= 0) {
        // Stop if balance is depleted
        currentBalance = 0;
        yearlyData.push({
          year,
          openingBalance: 0,
          withdrawal: 0,
          interestEarned: 0,
          closingBalance: 0,
        });
        continue;
      }

      const openingBalance = currentBalance;
      const interestEarned = currentBalance * r;
      currentBalance += interestEarned;
      
      const withdrawalForYear = Math.min(currentBalance, W_annual);
      currentBalance -= withdrawalForYear;

      yearlyData.push({
        year,
        openingBalance: Math.round(openingBalance),
        withdrawal: Math.round(withdrawalForYear),
        interestEarned: Math.round(interestEarned),
        closingBalance: Math.round(currentBalance),
      });
    }

    const totalWithdrawn = yearlyData.reduce((acc, data) => acc + data.withdrawal, 0);
    const totalInterest = yearlyData.reduce((acc, data) => acc + data.interestEarned, 0);

    setResult({
      finalValue: Math.round(currentBalance),
      totalWithdrawn,
      totalInterest,
      yearlyData,
      calculatedMonthlyWithdrawal: calculationMode === 'withdrawal' ? Math.round(finalMonthlyWithdrawal) : undefined,
    });
  }, [totalInvestment, monthlyWithdrawal, expectedReturn, timePeriod, calculationMode]);

  const handleCopy = () => {
    if (!result) return;
    let textToCopy = `
SWP Calculation Results:
- Total Investment: ${formatIndianCurrency(totalInvestment)}
- Expected Annual Return: ${expectedReturn}%
- Time Period: ${timePeriod} Years
`;
    if (calculationMode === 'projection') {
      textToCopy += `- Monthly Withdrawal: ${formatIndianCurrency(monthlyWithdrawal)}\n`;
    } else if (result.calculatedMonthlyWithdrawal) {
      textToCopy += `- Calculated Monthly Withdrawal: ${formatIndianCurrency(result.calculatedMonthlyWithdrawal)}\n`;
    }
    textToCopy += `
- Final Value: ${formatIndianCurrency(result.finalValue)}
- Total Withdrawn: ${formatIndianCurrency(result.totalWithdrawn)}
- Total Interest Earned: ${formatIndianCurrency(result.totalInterest)}

Year-wise Projection:
Year | Opening Balance | Total Withdrawal | Interest Earned | Closing Balance
-----------------------------------------------------------------------------
`;
    result.yearlyData.forEach(data => {
      textToCopy += `${data.year.toString().padEnd(5)}| ${formatIndianCurrency(data.openingBalance).padEnd(16)}| ${formatIndianCurrency(data.withdrawal).padEnd(17)}| ${formatIndianCurrency(data.interestEarned).padEnd(16)}| ${formatIndianCurrency(data.closingBalance)}\n`;
    });
    copy(textToCopy.trim());
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="space-y-4">
          <div className="flex justify-center mb-3 border-b border-gray-200">
            <button
              onClick={() => setCalculationMode('projection')}
              className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${
                calculationMode === 'projection'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Corpus Projection
            </button>
            <button
              onClick={() => setCalculationMode('withdrawal')}
              className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${
                calculationMode === 'withdrawal'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Monthly Withdrawal
            </button>
          </div>
          <CalculatorInput
            label="Total Investment"
            value={totalInvestment}
            onChange={setTotalInvestment}
            min={100000}
            max={50000000}
            step={100000}
            prefix="₹"
          />
          {calculationMode === 'projection' ? (
            <CalculatorInput
              label="Withdrawal per Month"
              value={monthlyWithdrawal}
              onChange={setMonthlyWithdrawal}
              min={1000}
              max={500000}
              step={1000}
              prefix="₹"
            />
          ) : (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-xs text-blue-800">The sustainable monthly withdrawal amount will be calculated based on your inputs.</p>
            </div>
          )}
          <CalculatorInput
            label="Expected Annual Return"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={1}
            max={20}
            step={0.5}
            suffix="% p.a."
          />
          <CalculatorInput
            label="Time Period (Years)"
            value={timePeriod}
            onChange={setTimePeriod}
            min={1}
            max={30}
            step={1}
            suffix="Years"
          />
          <CallToActionButtons introText="Ready to plan your regular income?" containerClassName="mt-4 pt-4 border-t border-gray-200" />
        </div>

        {/* Results & Chart */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          {error && <div className="text-center text-red-600"><AlertCircle className="w-10 h-10 mx-auto mb-2" /><p className="font-semibold text-sm">{error}</p></div>}

          {result && !error && (
            <div className="space-y-6">
              {calculationMode === 'withdrawal' && result.calculatedMonthlyWithdrawal != null && (
                <div className="text-center bg-white p-3 rounded-lg shadow-sm border border-blue-200">
                  <p className="text-base text-gray-600">You can withdraw</p>
                  <p className="text-3xl font-extrabold text-blue-700 my-1">
                    {formatIndianCurrency(result.calculatedMonthlyWithdrawal)}
                  </p>
                  <p className="text-base text-gray-600">per month</p>
                </div>
              )}
              {/* Summary Section */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-center">Projection</h3>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  title="Copy results to clipboard"
                >
                  {copyStatus === 'copied' ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
                <div className="bg-white p-2.5 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Total Withdrawn</p><p className="font-bold text-base text-gray-800">{formatIndianCurrency(result.totalWithdrawn)}</p></div>
                <div className="bg-white p-2.5 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Final Value</p><p className="font-bold text-base text-blue-700">{formatIndianCurrency(result.finalValue)}</p></div>
              </div>

              {/* Yearly Breakdown Table */}
              <div>
                <h3 className="text-lg font-bold text-center mb-3">Year-wise Projection</h3>
                <div className="overflow-x-auto max-h-80">
                  <table className="min-w-full bg-white border border-gray-200 text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="py-2 px-3 text-right font-semibold text-gray-600">Year</th>
                        <th className="py-2 px-3 text-right font-semibold text-gray-600">Opening Balance</th>
                        <th className="py-2 px-3 text-right font-semibold text-gray-600">Total Withdrawal</th>
                        <th className="py-2 px-3 text-right font-semibold text-gray-600">Interest Earned</th>
                        <th className="py-2 px-3 text-right font-semibold text-gray-600">Closing Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((data) => (
                        <tr key={data.year} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 px-3 text-right font-medium text-gray-800">{data.year}</td>
                          <td className="py-2 px-3 text-right text-gray-600">{formatIndianCurrency(data.openingBalance)}</td>
                          <td className="py-2 px-3 text-right text-red-600">{formatIndianCurrency(data.withdrawal)}</td>
                          <td className="py-2 px-3 text-right text-green-600">{formatIndianCurrency(data.interestEarned)}</td>
                          <td className="py-2 px-3 text-right font-bold text-gray-800">{formatIndianCurrency(data.closingBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {!result && !error && <div className="text-center text-gray-500"><BarChart3 className="w-10 h-10 mx-auto mb-2" /><p className="text-sm">Adjust the sliders to see your results.</p></div>}
        </div>
      </div>
  );
};

export default SwpCalculator;