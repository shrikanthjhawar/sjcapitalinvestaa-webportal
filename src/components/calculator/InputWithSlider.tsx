import React, { useState, useEffect } from 'react';

interface InputWithSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
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
}) => {
  // Local state to allow for free-form typing in the text input
  const [inputValue, setInputValue] = useState(value.toLocaleString('en-IN'));

  // Sync local input state when the parent's value changes (e.g., from slider)
  useEffect(() => {
    // Only update if the parsed local value is different from the prop value
    // to avoid interrupting user typing.
    const parsedLocal = parseFloat(inputValue.replace(/[^0-9.]/g, ''));
    if (parsedLocal !== value) {
      setInputValue(value.toLocaleString('en-IN'));
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextBlur = () => {
    const numericString = inputValue.replace(/[^0-9.]/g, '');
    let numValue = parseFloat(numericString);

    if (isNaN(numValue)) {
      numValue = min; // Default to min value if input is invalid
    }

    // Clamp the value within the allowed range and notify the parent
    const clampedValue = Math.max(min, Math.min(max, numValue));
    onChange(clampedValue);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
         <div className="flex items-center w-40 rounded-lg bg-gray-100">
          {prefix && <span className="pl-3 text-gray-500">{prefix}</span>}
          <input
            type="text"
            value={inputValue}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            className="w-full border-0 bg-transparent p-2 text-right font-semibold text-gray-900 focus:ring-0 sm:text-sm"
          />
          {suffix && <span className="pr-3 text-gray-500">{suffix}</span>}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
    </div>
  );
};

export default InputWithSlider;