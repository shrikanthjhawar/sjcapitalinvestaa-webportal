import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CallToActionButtons from '../CallToActionButtons';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';

interface MonthlyAmortizationDetail {
  month: number;
  principal: number;
  interest: number;
  totalPayment: number;
  endingBalance: number;
}

interface YearlyAmortizationDetail {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPayment: number;
  endingBalance: number;
  monthlyDetails: MonthlyAmortizationDetail[];
}

const EmiCalculator: React.FC = () => {
  // Inputs
  const [loanAmount, setLoanAmount] = usePersistentState<number>('emi_loanAmount', 2500000);
  const [interestRate, setInterestRate] = usePersistentState<number>('emi_interestRate', 8.5);
  const [loanTenure, setLoanTenure] = usePersistentState<number>('emi_loanTenure', 20);

  // UI State
  const [activeTab, setActiveTab] = useState<'summary' | 'amortization'>('summary');
  const [expandedYear, setExpandedYear] = useState<number | null>(1);

  // Outputs
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationData, setAmortizationData] = useState<YearlyAmortizationDetail[]>([]);

  useEffect(() => {
    const P = loanAmount;
    const r_monthly = interestRate / 12 / 100;
    const n_months = loanTenure * 12;

    if (P > 0 && interestRate > 0 && n_months > 0) {
      const emi = (P * r_monthly * Math.pow(1 + r_monthly, n_months)) / (Math.pow(1 + r_monthly, n_months) - 1);
      const totalAmountPayable = emi * n_months;
      const totalInterestPayable = totalAmountPayable - P;

      setMonthlyEmi(Math.round(emi));
      setTotalInterest(Math.round(totalInterestPayable));
      setTotalPayment(Math.round(totalAmountPayable));

      // Calculate Amortization Schedule
      let balance = P;
      const yearlyData: YearlyAmortizationDetail[] = [];
      let monthCounter = 1;

      for (let year = 1; year <= loanTenure; year++) {
        let yearlyInterestPaid = 0;
        let yearlyPrincipalPaid = 0;
        const monthlyDetails: MonthlyAmortizationDetail[] = [];

        for (let month = 1; month <= 12; month++) {
          if (balance <= 0) break;

          const interestForMonth = balance * r_monthly;
          const principalForMonth = emi - interestForMonth;
          balance -= principalForMonth;
          yearlyInterestPaid += interestForMonth;
          yearlyPrincipalPaid += principalForMonth;

          monthlyDetails.push({
            month: monthCounter,
            principal: Math.round(principalForMonth),
            interest: Math.round(interestForMonth),
            totalPayment: Math.round(emi),
            endingBalance: Math.round(balance > 0 ? balance : 0),
          });
          monthCounter++;
        }
        
        if (monthlyDetails.length > 0) {
            yearlyData.push({
                year: year,
                principalPaid: Math.round(yearlyPrincipalPaid),
                interestPaid: Math.round(yearlyInterestPaid),
                totalPayment: Math.round(yearlyPrincipalPaid + yearlyInterestPaid),
                endingBalance: Math.round(balance > 0 ? balance : 0),
                monthlyDetails: monthlyDetails,
            });
        }

        if (balance <= 0) break;
      }
      setAmortizationData(yearlyData);

    } else {
      setMonthlyEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setAmortizationData([]);
    }
  }, [loanAmount, interestRate, loanTenure]);

  const summaryChartData = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Total Interest', value: totalInterest },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  const renderAmortizationTable = () => (
    <div className="overflow-x-auto max-h-[550px] mt-4 border border-gray-200 rounded-lg">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider w-1/5">Year</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-600 uppercase tracking-wider">Principal Paid</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-600 uppercase tracking-wider">Interest Paid</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-600 uppercase tracking-wider">Total Payment</th>
            <th className="py-3 px-4 text-right font-semibold text-gray-600 uppercase tracking-wider">Ending Balance</th>
          </tr>
        </thead>
        {amortizationData.map((data) => (
          <tbody key={data.year}>
            <tr
              className="border-b border-gray-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
              onClick={() => setExpandedYear(expandedYear === data.year ? null : data.year)}
            >
              <td className="py-3 px-4 font-bold text-gray-800 flex items-center justify-between">
                {data.year}
                {expandedYear === data.year ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </td>
              <td className="py-3 px-4 text-right font-semibold text-green-700">{formatIndianCurrency(data.principalPaid)}</td>
              <td className="py-3 px-4 text-right font-semibold text-red-700">{formatIndianCurrency(data.interestPaid)}</td>
              <td className="py-3 px-4 text-right font-semibold text-gray-800">{formatIndianCurrency(data.totalPayment)}</td>
              <td className="py-3 px-4 text-right font-bold text-blue-800">{formatIndianCurrency(data.endingBalance)}</td>
            </tr>
            {expandedYear === data.year && (
              <>
                <tr className="bg-slate-100 text-slate-600 font-medium"><th className="py-2 px-4 text-left text-xs">Month</th><th className="py-2 px-4 text-right text-xs">Principal</th><th className="py-2 px-4 text-right text-xs">Interest</th><th className="py-2 px-4 text-right text-xs">Total Payment</th><th className="py-2 px-4 text-right text-xs">Balance</th></tr>
                {data.monthlyDetails.map((monthData) => (
                  <tr key={monthData.month} className="border-b border-gray-100 bg-white hover:bg-gray-50"><td className="py-2 px-4 text-left text-gray-700">{monthData.month}</td><td className="py-2 px-4 text-right text-green-600">{formatIndianCurrency(monthData.principal)}</td><td className="py-2 px-4 text-right text-red-600">{formatIndianCurrency(monthData.interest)}</td><td className="py-2 px-4 text-right text-gray-700">{formatIndianCurrency(monthData.totalPayment)}</td><td className="py-2 px-4 text-right font-medium text-gray-800">{formatIndianCurrency(monthData.endingBalance)}</td></tr>
                ))}
              </>
            )}
          </tbody>
        ))}
      </table>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left side: Inputs */}
      <div className="lg:col-span-2 w-full space-y-6">
        <CalculatorInput
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          min={0}
          max={50000000}
          step={100000}
          prefix="₹"
        />
        <CalculatorInput
          label="Interest Rate"
          value={interestRate}
          onChange={setInterestRate}
          min={1}
          max={20}
          step={0.1}
          suffix="% p.a."
        />
        <CalculatorInput
          label="Loan Tenure"
          value={loanTenure}
          onChange={setLoanTenure}
          min={1}
          max={40}
          step={1}
          suffix="Years"
        />
        <CallToActionButtons introText="Need help with your loan?" showInvestButton={false} containerClassName="mt-4 pt-4 border-t" />
      </div>

      {/* Right side: Results and Charts */}
      <div className="lg:col-span-3 w-full bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600">Your Monthly EMI</p>
          <p className="text-4xl font-extrabold text-blue-700">{formatIndianCurrency(monthlyEmi)}</p>
        </div>

        <div className="flex justify-center mb-4 border-b border-gray-200">
          <button onClick={() => setActiveTab('summary')} className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors ${activeTab === 'summary' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Summary</button>
          <button onClick={() => setActiveTab('amortization')} className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors ${activeTab === 'amortization' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Amortization Schedule</button>
        </div>

        {activeTab === 'summary' && (
          <div className="text-center">
            <div className="w-full h-64 mb-6">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={summaryChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name">
                    {summaryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatIndianCurrency(value)} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Principal Amount</p><p className="text-lg font-bold text-gray-800">{formatIndianCurrency(loanAmount)}</p></div>
              <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Total Interest</p><p className="text-lg font-bold text-red-600">{formatIndianCurrency(totalInterest)}</p></div>
              <div className="bg-white p-3 rounded-lg shadow-sm border"><p className="text-xs text-gray-500">Total Payment</p><p className="text-lg font-bold text-blue-700">{formatIndianCurrency(totalPayment)}</p></div>
            </div>
          </div>
        )}

        {activeTab === 'amortization' && (
          <div>
            {renderAmortizationTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmiCalculator;
