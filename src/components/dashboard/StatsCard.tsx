import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  variant?: 'ocean' | 'success' | 'energy' | 'neutral'
  change?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({ title, value, icon: Icon, variant = 'ocean', change }: StatsCardProps) {
  const variantClasses = {
    ocean: 'bg-ocean-100 text-ocean-700 border-ocean-300',
    success: 'bg-success-100 text-success-700 border-success-300',
    energy: 'bg-energy-100 text-energy-700 border-energy-300',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-300'
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={clsx(
                'text-sm font-medium',
                change.isPositive ? 'text-success-600' : 'text-energy-600'
              )}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-sm text-neutral-600 ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className={clsx(
          'p-3 rounded-lg border',
          variantClasses[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
} 