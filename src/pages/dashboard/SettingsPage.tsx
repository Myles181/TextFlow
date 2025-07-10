import { MainContent } from '../../components/layout/MainContent'
import { Card } from '../../components/ui'
import { Settings } from 'lucide-react'

export function SettingsPage() {
  return (
    <MainContent
      title="Settings"
      subtitle="Configure your account preferences and system settings"
    >
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-ocean-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Settings Coming Soon
          </h2>
          <p className="text-neutral-600">
            This page will show your account settings, preferences, and system configuration options.
          </p>
        </div>
      </Card>
    </MainContent>
  )
} 