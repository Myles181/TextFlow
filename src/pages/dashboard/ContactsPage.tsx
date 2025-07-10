import { MainContent } from '../../components/layout/MainContent'
import { Card } from '../../components/ui'
import { Users } from 'lucide-react'

export function ContactsPage() {
  return (
    <MainContent
      title="Contacts"
      subtitle="Manage your contact list and communication preferences"
    >
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-ocean-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Contacts Coming Soon
          </h2>
          <p className="text-neutral-600">
            This page will show your contact list, groups, and communication preferences.
          </p>
        </div>
      </Card>
    </MainContent>
  )
} 