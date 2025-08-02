import React, { useState, useEffect, useCallback } from 'react';

interface CalculatorInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  value,
  min,
  max,
  onChange,
  prefix,
  suffix,
  step = 1,
}) => {
  const [inputValue, setInputValue] = useState(value.toLocaleString('en-IN'));

  useEffect(() => {
    const currentNumericValue = parseFloat(inputValue.replace(/,/g, ''));
    if (currentNumericValue !== value) {
      setInputValue(value.toLocaleString('en-IN'));
    }
  }, [value, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    const numericString = rawValue.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(numericString);

    if (!isNaN(numericValue)) {
      onChange(Math.min(max, Math.max(min, numericValue)));
    } else if (rawValue === '') {
      onChange(min);
    }
  };

  const handleBlur = () => {
    const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(max, Math.max(min, numericValue));
      setInputValue(clampedValue.toLocaleString('en-IN'));
      if (clampedValue !== value) {
        onChange(clampedValue);
      }
    } else {
      setInputValue(value.toLocaleString('en-IN'));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseFloat(e.target.value);
    onChange(numericValue);
    setInputValue(numericValue.toLocaleString('en-IN'));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative w-36">
          {prefix && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">{prefix}</span>
            </span>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`block w-full rounded-md border border-gray-300 py-1.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-semibold text-right ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-12' : 'pr-3'}`}
          />
          {suffix && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm">{suffix}</span>
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
};

export default CalculatorInput;