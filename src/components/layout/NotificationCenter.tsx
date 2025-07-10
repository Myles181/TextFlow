import { 
  MessageSquare, 
  Phone, 
  AlertCircle, 
  CheckCircle, 
  X,
  Star
} from 'lucide-react'
import { Badge, Button } from '../ui'
import clsx from 'clsx'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Sarah',
    content: 'Hey! Can you call me back?',
    time: '2 minutes ago',
    unread: true,
    icon: MessageSquare,
    color: 'text-ocean-500'
  },
  {
    id: 2,
    type: 'call',
    title: 'Missed call from Mike',
    content: '+1 (555) 123-4567',
    time: '5 minutes ago',
    unread: true,
    icon: Phone,
    color: 'text-energy-500'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Achievement unlocked!',
    content: 'First 100 messages sent',
    time: '1 hour ago',
    unread: false,
    icon: Star,
    color: 'text-success-500'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Low balance warning',
    content: 'Your account balance is below $10',
    time: '2 hours ago',
    unread: false,
    icon: AlertCircle,
    color: 'text-energy-500'
  }
]

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const unreadCount = notifications.filter(n => n.unread).length

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Notification panel */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-neutral-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="energy" size="sm">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-xs text-ocean-500 hover:text-ocean-700">
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {notifications.map((notification) => {
                const Icon = notification.icon
                
                return (
                  <div
                    key={notification.id}
                    className={clsx(
                      'p-4 hover:bg-neutral-50 transition-colors cursor-pointer',
                      notification.unread && 'bg-ocean-50'
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={clsx(
                        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                        notification.unread ? 'bg-ocean-100' : 'bg-neutral-100'
                      )}>
                        <Icon className={clsx('w-4 h-4', notification.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={clsx(
                            'text-sm font-medium',
                            notification.unread ? 'text-neutral-900' : 'text-neutral-700'
                          )}>
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-ocean-500 rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 mt-1">
                          {notification.content}
                        </p>
                        <p className="text-xs text-neutral-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-neutral-400" />
              </div>
              <p className="text-sm text-neutral-600 mb-2">All caught up!</p>
              <p className="text-xs text-neutral-400">No new notifications</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-neutral-200">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
              onClick={() => {
                // Handle view all notifications
                onClose()
              }}
            >
              View all notifications
            </Button>
          </div>
        )}
      </div>
    </>
  )
} 