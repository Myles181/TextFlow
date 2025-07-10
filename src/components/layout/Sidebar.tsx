import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  MessageSquare, 
  Phone, 
  Hash, 
  Users, 
  Settings,
  BarChart3,
  X
} from 'lucide-react'
import { Badge } from '../ui'
import clsx from 'clsx'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: 3 },
  { name: 'Calls', href: '/dashboard/calls', icon: Phone },
  { name: 'Numbers', href: '/dashboard/numbers', icon: Hash },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings }
]

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed left-0 top-0 h-full bg-white border-r border-neutral-200 z-50 transition-all duration-300 ease-out',
        'lg:relative lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        isCollapsed ? 'w-16' : 'w-64'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-ocean-900">TextFlow</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <X className={clsx('w-4 h-4 transition-transform', isCollapsed && 'rotate-180')} />
            </button>
            
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-out group',
                  'hover:bg-neutral-50 hover:text-neutral-900',
                  active 
                    ? 'bg-ocean-50 text-ocean-700 border-r-2 border-ocean-500' 
                    : 'text-neutral-600'
                )}
                onClick={onClose}
              >
                <div className={clsx(
                  'flex-shrink-0 transition-colors',
                  active ? 'text-ocean-500' : 'text-neutral-400 group-hover:text-neutral-600'
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium">{item.name}</span>
                    {item.badge && (
                      <Badge variant="energy" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-neutral-200">
            <div className="bg-ocean-50 rounded-lg p-3">
              <div className="text-sm font-medium text-ocean-900 mb-1">
                Account Balance
              </div>
              <div className="text-lg font-bold text-ocean-700">
                $89.50
              </div>
              <div className="text-xs text-ocean-600 mt-1">
                Next billing: Dec 15
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 