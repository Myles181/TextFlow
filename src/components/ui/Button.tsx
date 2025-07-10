import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'energy' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-ocean-500 text-white hover:bg-ocean-900 focus:ring-ocean-500 active:bg-ocean-900 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 focus:ring-ocean-500 active:bg-neutral-100 shadow-sm hover:shadow-md',
    success: 'bg-success-500 text-white hover:bg-success-900 focus:ring-success-500 active:bg-success-900 shadow-sm hover:shadow-md',
    energy: 'bg-energy-500 text-white hover:bg-energy-900 focus:ring-energy-500 active:bg-energy-900 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-ocean-500 active:bg-neutral-200'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3 text-base min-h-[48px]'
  }
  
  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className={clsx('animate-spin', iconClasses[size], 'mr-2')} />
      ) : icon ? (
        <span className={clsx(iconClasses[size], 'mr-2')}>
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  )
} 