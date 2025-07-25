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
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 py-1">
          {prefix && <span className="text-gray-600 mr-1">{prefix}</span>}
          <input
            type="text"
            value={formatValue(value)}
            onChange={handleInputChange}
            className="w-28 text-right font-semibold bg-transparent focus:outline-none"
          />
          {suffix && <span className="text-gray-600 ml-1">{suffix}</span>}
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