import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  label,
  id
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx('flex items-center', className)}>
      <div className="relative">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />
        <label
          htmlFor={checkboxId}
          className={clsx(
            'flex items-center justify-center w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer',
            {
              'bg-ocean-500 border-ocean-500': checked && !disabled,
              'bg-gray-100 border-gray-300': !checked && !disabled,
              'bg-gray-50 border-gray-200 cursor-not-allowed': disabled,
              'hover:border-ocean-400': !checked && !disabled,
              'hover:bg-ocean-600': checked && !disabled
            }
          )}
        >
          {checked && (
            <Check className="w-3 h-3 text-white" />
          )}
        </label>
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={clsx(
            'ml-2 text-sm cursor-pointer',
            {
              'text-gray-900': !disabled,
              'text-gray-400 cursor-not-allowed': disabled
            }
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}; 