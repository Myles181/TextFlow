import { MainContent } from '../../components/layout/MainContent'
import { Card } from '../../components/ui'
import { Phone } from 'lucide-react'

export function CallsPage() {
  return (
    <MainContent
      title="Calls"
      subtitle="View call history and manage your voice communications"
    >
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-ocean-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Calls Coming Soon
          </h2>
          <p className="text-neutral-600">
            This page will show your call history, voice messages, and call management features.
          </p>
        </div>
      </Card>
    </MainContent>
  )
} 