import React from 'react';

interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/,/g, '');
    const newValue = parseInt(numericValue, 10);
    if (!isNaN(newValue)) {
      onChange(Math.max(min, Math.min(max, newValue)));
    } else if (e.target.value === '') {
      onChange(min);
    }
  };

  const formatValue = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative w-40">
          {prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">{prefix}</span>}
          <input
            type="text"
            value={formatValue(value)}
            onChange={handleInputChange}
            className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-right font-semibold sm:text-sm ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-12' : 'pr-3'}`}
          />
          {suffix && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 text-sm">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
};

export default CalculatorInput;