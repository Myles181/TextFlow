import { MainContent } from '../../components/layout/MainContent'
import { Card } from '../../components/ui'
import { Hash } from 'lucide-react'

export function NumbersPage() {
  return (
    <MainContent
      title="Phone Numbers"
      subtitle="Manage your virtual phone numbers and their settings"
    >
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-ocean-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Numbers Coming Soon
          </h2>
          <p className="text-neutral-600">
            This page will show your virtual phone numbers, their status, and configuration options.
          </p>
        </div>
      </Card>
    </MainContent>
  )
} 