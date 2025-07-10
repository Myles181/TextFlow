import type { ReactNode } from 'react'
import { Heading1, Heading2, BodyText } from '../ui'

interface MainContentProps {
  children: ReactNode
  title?: string
  subtitle?: string
  action?: ReactNode
}

export function MainContent({ children, title, subtitle, action }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto bg-neutral-50">
      <div className="p-6 lg:p-8">
        {/* Page header */}
        {(title || subtitle || action) && (
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && <Heading1 className="mb-2">{title}</Heading1>}
                {subtitle && <BodyText className="text-neutral-600">{subtitle}</BodyText>}
              </div>
              {action && (
                <div className="flex-shrink-0 ml-4">
                  {action}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </main>
  )
} 