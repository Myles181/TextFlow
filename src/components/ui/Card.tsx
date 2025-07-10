import type { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ 
  children, 
  className, 
  hoverable = false, 
  padding = 'md' 
}: CardProps) {
  const baseClasses = 'bg-white border border-neutral-200 rounded-lg transition-all duration-200 ease-out'
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverClasses = hoverable 
    ? 'hover:shadow-md hover:border-neutral-300 cursor-pointer' 
    : 'shadow-sm'

  return (
    <div className={clsx(baseClasses, paddingClasses[padding], hoverClasses, className)}>
      {children}
    </div>
  )
} 