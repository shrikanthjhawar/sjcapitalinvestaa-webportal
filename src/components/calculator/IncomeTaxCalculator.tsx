import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import usePersistentState from '../../hooks/usePersistentState';
import CalculatorInput from './CalculatorInput';
import { formatIndianCurrency } from '../../utils/formatCurrency';
import CallToActionButtons from '../CallToActionButtons';

type AgeGroup = '<60' | '60-80' | '>80';

interface TaxDetails {
  taxableIncome: number;
  incomeTax: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  totalDeductions: number;
}

const oldRegimeSlabs: Record<AgeGroup, { limit: number; rate: number }[]> = {
  '<60': [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
  '60-80': [
    { limit: 300000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
  '>80': [
    { limit: 500000, rate: 0 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
};

const newRegimeSlabs: { limit: number; rate: number }[] = [
  { limit: 300000, rate: 0 },
  { limit: 600000, rate: 0.05 },
  { limit: 900000, rate: 0.10 },
  { limit: 1200000, rate: 0.15 },
  { limit: 1500000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

const calculateTaxDetails = (
  taxableIncome: number,
  slabs: { limit: number; rate: number }[],
  isNewRegime: boolean,
  totalDeductions: number
): TaxDetails => {
  if ((isNewRegime && taxableIncome <= 700000) || (!isNewRegime && taxableIncome <= 500000)) {
    return { taxableIncome, incomeTax: 0, surcharge: 0, cess: 0, totalTax: 0, totalDeductions };
  }

  let tax = 0;
  let income = taxableIncome;
  let lastLimit = 0;

  for (const slab of slabs) {
    if (income > lastLimit) {
      const taxableInSlab = Math.min(income, slab.limit) - lastLimit;
      tax += taxableInSlab * slab.rate;
    }
    lastLimit = slab.limit;
    if (income <= slab.limit) break;
  }

  let surcharge = 0;
  let surchargeRate = 0;
  if (taxableIncome > 5000000) {
    if (taxableIncome <= 10000000) surchargeRate = 0.10;
    else if (taxableIncome <= 20000000) surchargeRate = 0.15;
    else if (taxableIncome <= 50000000) surchargeRate = 0.25;
    else surchargeRate = isNewRegime ? 0.25 : 0.37;
  }
  surcharge = tax * surchargeRate;

  const cess = (tax + surcharge) * 0.04;
  const totalTax = tax + surcharge + cess;

  return {
    taxableIncome: Math.round(taxableIncome),
    incomeTax: Math.round(tax),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    totalDeductions: Math.round(totalDeductions),
  };
};

const IncomeTaxCalculator: React.FC = () => {
  const [grossIncome, setGrossIncome] = usePersistentState<number>('tax_grossIncome', 1200000);
  const [deductions80c, setDeductions80c] = usePersistentState<number>('tax_deductions80c', 150000);
  const [deductions80d, setDeductions80d] = usePersistentState<number>('tax_deductions80d', 25000);
  const [hraExemption, setHraExemption] = usePersistentState<number>('tax_hraExemption', 0);
  const [otherDeductions, setOtherDeductions] = usePersistentState<number>('tax_otherDeductions', 0);
  const [isSalaried, setIsSalaried] = usePersistentState<boolean>('tax_isSalaried', true);
  const [ageGroup, setAgeGroup] = usePersistentState<AgeGroup>('tax_ageGroup', '<60');

  const [result, setResult] = useState<{ oldRegime: TaxDetails; newRegime: TaxDetails; } | null>(null);

  const STANDARD_DEDUCTION = 50000;

  useEffect(() => {
    const standardDeductionAmount = isSalaried ? STANDARD_DEDUCTION : 0;

    // Old Regime Calculation
    const oldRegimeTotalDeductions = standardDeductionAmount + deductions80c + deductions80d + hraExemption + otherDeductions;
    const oldRegimeTaxableIncome = Math.max(0, grossIncome - oldRegimeTotalDeductions);
    const oldRegimeResult = calculateTaxDetails(oldRegimeTaxableIncome, oldRegimeSlabs[ageGroup], false, oldRegimeTotalDeductions);

    // New Regime Calculation
    const newRegimeTotalDeductions = standardDeductionAmount;
    const newRegimeTaxableIncome = Math.max(0, grossIncome - newRegimeTotalDeductions);
    const newRegimeResult = calculateTaxDetails(newRegimeTaxableIncome, newRegimeSlabs, true, newRegimeTotalDeductions);

    setResult({
      oldRegime: oldRegimeResult,
      newRegime: newRegimeResult,
    });
  }, [grossIncome, deductions80c, deductions80d, hraExemption, otherDeductions, isSalaried, ageGroup]);

  const recommendedRegime = result && result.newRegime.totalTax < result.oldRegime.totalTax ? 'New' : 'Old';
  const taxSavings = result ? Math.abs(result.newRegime.totalTax - result.oldRegime.totalTax) : 0;

  const renderComparisonRow = (label: string, oldVal: number | string, newVal: number | string, isBold = false, isTotal = false, isDeduction = false) => {
    const oldValueFormatted = typeof oldVal === 'number' ? formatIndianCurrency(oldVal) : oldVal;
    const newValueFormatted = typeof newVal === 'number' ? formatIndianCurrency(newVal) : newVal;

    return (
      <tr className={`border-b border-gray-200 last:border-b-0 ${isTotal ? 'bg-gray-100 font-bold' : ''}`}>
        <td className={`py-3 px-4 text-sm ${isBold ? 'font-semibold text-gray-800' : 'text-gray-600'} ${isDeduction ? 'pl-8' : ''}`}>{label}</td>
        <td className={`py-3 px-4 text-right font-mono text-sm ${isBold ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>{oldValueFormatted}</td>
        <td className={`py-3 px-4 text-right font-mono text-sm ${isBold ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>{newValueFormatted}</td>
      </tr>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Controls */}
      <div className="lg:col-span-1 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Age Group</label>
              <div className="grid grid-cols-3 gap-2">
                {(['<60', '60-80', '>80'] as AgeGroup[]).map(age => (
                  <button key={age} onClick={() => setAgeGroup(age)} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${ageGroup === age ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}>{age}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-md border">
              <label htmlFor="isSalaried" className="text-sm font-medium text-gray-700">Are you Salaried?</label>
              <button
                id="isSalaried"
                onClick={() => setIsSalaried(!isSalaried)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSalaried ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSalaried ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold border-t pt-6 mb-3">Your Income</h3>
          <CalculatorInput label="Gross Annual Income" value={grossIncome} onChange={setGrossIncome} min={0} max={100000000} step={10000} prefix="₹" />
        </div>

        <div>
          <h3 className="text-lg font-semibold border-t pt-6 mb-3">Deductions (for Old Regime)</h3>
          <CalculatorInput label="80C (EPF, PPF, etc.)" value={deductions80c} onChange={setDeductions80c} min={0} max={150000} step={1000} prefix="₹" />
          <CalculatorInput label="80D (Medical Insurance)" value={deductions80d} onChange={setDeductions80d} min={0} max={100000} step={1000} prefix="₹" />
          <CalculatorInput label="HRA Exemption" value={hraExemption} onChange={setHraExemption} min={0} max={500000} step={1000} prefix="₹" />
          <CalculatorInput label="Other Deductions" value={otherDeductions} onChange={setOtherDeductions} min={0} max={200000} step={1000} prefix="₹" />
        </div>
        
        <CallToActionButtons introText="Need help with tax planning?" containerClassName="mt-8 pt-6 border-t border-gray-200" />
      </div>

      {/* Results & Comparison Table */}
      <div className="lg:col-span-2 bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        {result ? (
          <div className="space-y-6">
            {/* Recommendation Section */}
            <div className={`p-4 rounded-lg text-center ${recommendedRegime === 'New' ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300'} border`}>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className={`w-8 h-8 ${recommendedRegime === 'New' ? 'text-green-600' : 'text-blue-600'}`} />
                <h3 className="text-xl font-bold">
                  {recommendedRegime} Regime is Recommended
                </h3>
              </div>
              {taxSavings > 0 && (
                <p className="mt-2 text-lg">
                  You could save <span className="font-bold">{formatIndianCurrency(taxSavings)}</span>
                </p>
              )}
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Particulars</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase">Old Regime</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 uppercase">New Regime</th>
                  </tr>
                </thead>
                <tbody>
                  {renderComparisonRow('Gross Total Income', grossIncome, grossIncome, true)}
                  {renderComparisonRow('Total Deductions', result.oldRegime.totalDeductions, result.newRegime.totalDeductions, true)}
                  {isSalaried && renderComparisonRow('Standard Deduction', STANDARD_DEDUCTION, STANDARD_DEDUCTION, false, false, true)}
                  {renderComparisonRow('80C, 80D, HRA, etc.', result.oldRegime.totalDeductions - (isSalaried ? STANDARD_DEDUCTION : 0), 'N/A', false, false, true)}
                  {renderComparisonRow('Taxable Income', result.oldRegime.taxableIncome, result.newRegime.taxableIncome, true)}
                  {renderComparisonRow('Income Tax', result.oldRegime.incomeTax, result.newRegime.incomeTax)}
                  {renderComparisonRow('Surcharge', result.oldRegime.surcharge, result.newRegime.surcharge)}
                  {renderComparisonRow('Health & Education Cess (4%)', result.oldRegime.cess, result.newRegime.cess)}
                  {renderComparisonRow('Total Tax Liability', result.oldRegime.totalTax, result.newRegime.totalTax, true, true)}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 text-center p-2 bg-gray-100 rounded-md">
              <p>Calculations are based on the tax slabs for FY 2023-24 (AY 2024-25). This is for illustrative purposes only. Please consult a tax advisor for accurate calculations.</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 flex items-center justify-center h-full">
            <p className="text-lg">Enter your income and deductions to see the tax calculation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;


              