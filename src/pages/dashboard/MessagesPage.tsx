import { MainContent } from '../../components/layout/MainContent'
import { Card } from '../../components/ui'
import { MessageSquare } from 'lucide-react'

export function MessagesPage() {
  return (
    <MainContent
      title="Messages"
      subtitle="Manage your SMS conversations and message history"
    >
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-ocean-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Messages Coming Soon
          </h2>
          <p className="text-neutral-600">
            This page will show your message history, conversations, and SMS management tools.
          </p>
        </div>
      </Card>
    </MainContent>
  )
} 