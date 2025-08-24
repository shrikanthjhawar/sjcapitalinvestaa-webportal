import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InputWithSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  description?: string;
}

const InputWithSlider: React.FC<InputWithSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix = '',
  suffix = '',
  icon,
  description,
}) => {
  const [inputValue, setInputValue] = useState(value.toLocaleString('en-IN'));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const parsedLocal = parseFloat(inputValue.replace(/[^0-9.]/g, ''));
    if (parsedLocal !== value) {
      setInputValue(value.toLocaleString('en-IN'));
    }
  }, [value, inputValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextBlur = () => {
    setIsFocused(false);
    const numericString = inputValue.replace(/[^0-9.]/g, '');
    let numValue = parseFloat(numericString);

    if (isNaN(numValue)) {
      numValue = min;
    }

    const clampedValue = Math.max(min, Math.min(max, numValue));
    onChange(clampedValue);
    setInputValue(clampedValue.toLocaleString('en-IN'));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
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
            <label className="text-sm font-semibold text-primary">{label}</label>
          </div>
          {description && (
            <p className="text-xs text-neutral-600 mb-2">{description}</p>
          )}
        </div>

        <div className="relative">
          <div className={`relative bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl border-2 transition-all duration-300 ${
            isFocused ? 'border-accent shadow-glow from-accent-50 to-accent-100' : 'border-neutral-200'
          }`}>
            {prefix && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-accent font-bold text-xs">{prefix}</span>
              </span>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onFocus={handleFocus}
              className={`w-32 bg-transparent py-2 text-right font-bold text-primary focus:outline-none text-sm ${
                prefix ? 'pl-6 pr-3' : 'pl-3'
              } ${suffix ? 'pr-10' : 'pr-3'}`}
            />
            {suffix && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-neutral-500 font-medium text-xs">{suffix}</span>
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
        <div className="flex justify-between text-xs text-neutral-500">
          <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
          <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InputWithSlider;