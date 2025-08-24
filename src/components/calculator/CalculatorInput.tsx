import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CalculatorInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  icon?: React.ReactNode;
  description?: string;
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
  icon,
  description,
}) => {
  const [inputValue, setInputValue] = useState(value.toLocaleString('en-IN'));
  const [isFocused, setIsFocused] = useState(false);

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
    setIsFocused(false);
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseFloat(e.target.value);
    onChange(numericValue);
    setInputValue(numericValue.toLocaleString('en-IN'));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3 p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            {icon && (
              <div className="p-1.5 bg-accent/10 rounded-lg">
                {icon}
              </div>
            )}
            <label className="font-heading text-sm font-semibold text-primary">{label}</label>
          </div>
          {description && (
            <p className="font-body text-xs text-neutral-600 mb-2">{description}</p>
          )}
        </div>
        
        <div className="relative">
          <div className={`relative bg-neutral-50 rounded-xl border-2 transition-all duration-300 ${
            isFocused ? 'border-accent shadow-glow' : 'border-neutral-200'
          }`}>
            {prefix && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-accent font-semibold text-xs">{prefix}</span>
              </span>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`bg-transparent py-2 text-right font-heading font-semibold text-primary focus:outline-none text-sm ${
                prefix ? 'pl-6 pr-3' : 'pl-3'
              } ${suffix ? 'pr-12' : 'pr-3'} ${
                suffix && suffix.length > 3 ? 'w-44' : 'w-32'
              }`}
            />
            {suffix && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className={`text-neutral-500 font-medium ${
                  suffix.length > 3 ? 'text-xs' : 'text-xs'
                }`}>{suffix}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Premium Slider */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 bg-neutral-200 rounded-full slider-thumb"
            style={{
              background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${percentage}%, #e5e5e5 ${percentage}%, #e5e5e5 100%)`
            }}
          />
        </div>
        
        {/* Range Labels */}
        <div className="flex justify-between text-xs text-neutral-500 font-body">
          <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
          <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorInput;