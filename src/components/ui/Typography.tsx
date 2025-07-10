import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function Heading1({ children, className }: TypographyProps) {
  return (
    <h1 className={clsx(
      'text-[28px] font-bold text-neutral-900 leading-[1.2]',
      className
    )}>
      {children}
    </h1>
  )
}

export function Heading2({ children, className }: TypographyProps) {
  return (
    <h2 className={clsx(
      'text-[20px] font-semibold text-ocean-900 leading-[1.2]',
      className
    )}>
      {children}
    </h2>
  )
}

export function Heading3({ children, className }: TypographyProps) {
  return (
    <h3 className={clsx(
      'text-[16px] font-medium text-neutral-900 leading-[1.2]',
      className
    )}>
      {children}
    </h3>
  )
}

export function BodyText({ children, className }: TypographyProps) {
  return (
    <p className={clsx(
      'text-[14px] font-normal text-neutral-600 leading-[1.5]',
      className
    )}>
      {children}
    </p>
  )
}

export function SmallText({ children, className }: TypographyProps) {
  return (
    <p className={clsx(
      'text-[12px] font-normal text-neutral-400 leading-[1.5]',
      className
    )}>
      {children}
    </p>
  )
} 