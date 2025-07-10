import type { ReactNode } from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  icon?: ReactNode
}

export function Input({ 
  label, 
  error, 
  success = false, 
  icon, 
  className, 
  id,
  ...props 
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = 'w-full px-4 py-3 border rounded-md transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-0'
  
  const stateClasses = error 
    ? 'border-energy-500 focus:border-energy-500 focus:ring-energy-500' 
    : success 
    ? 'border-success-500 focus:border-success-500 focus:ring-success-500' 
    : 'border-neutral-300 focus:border-ocean-500 focus:ring-ocean-500'

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-900">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-neutral-400 w-5 h-5">
              {icon}
            </span>
          </div>
        )}
        
        <input
          id={inputId}
          className={clsx(
            baseClasses,
            stateClasses,
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-energy-500">
          {error}
        </p>
      )}
    </div>
  )
} 