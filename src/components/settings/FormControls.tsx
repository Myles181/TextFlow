import React from 'react';
import clsx from 'clsx';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  onChange,
  disabled = false,
  label,
  description
}) => (
  <div className="flex items-center justify-between">
    {(label || description) && (
      <div className="flex-1">
        {label && <div className="font-medium text-gray-900">{label}</div>}
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>
    )}
    
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        enabled ? 'bg-ocean-500' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  </div>
);

interface SliderControlProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  description?: string;
  unit?: string;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  description,
  unit
}) => (
  <div className="space-y-3">
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      
      <div className="text-sm font-medium text-gray-900 min-w-[60px] text-right">
        {value}{unit}
      </div>
    </div>
  </div>
);

interface TimePickerControlProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
}

export const TimePickerControl: React.FC<TimePickerControlProps> = ({
  value,
  onChange,
  label,
  description
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
    
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
    />
  </div>
);

interface PhoneInputControlProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  description?: string;
}

export const PhoneInputControl: React.FC<PhoneInputControlProps> = ({
  value,
  onChange,
  label,
  placeholder = "+1 (555) 123-4567",
  description
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
    
    <input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
    />
  </div>
);

interface FileUploadControlProps {
  onUpload: (file: File) => void;
  label: string;
  description?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUploadControl: React.FC<FileUploadControlProps> = ({
  onUpload,
  label,
  description,
  accept = "image/*",
  maxSize = 5
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }
      onUpload(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-ocean-600 hover:text-ocean-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ocean-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept={accept}
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            {accept.includes('image') ? 'PNG, JPG, GIF up to' : 'Files up to'} {maxSize}MB
          </p>
        </div>
      </div>
    </div>
  );
};

interface ColorPickerControlProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
}

export const ColorPickerControl: React.FC<ColorPickerControlProps> = ({
  value,
  onChange,
  label,
  description
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
    
    <div className="flex items-center space-x-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 font-mono text-sm"
        placeholder="#000000"
      />
    </div>
  </div>
); 