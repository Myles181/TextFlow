import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Phone, 
  Menu, 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  MessageSquare,
  Plus,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react'
import { Button, Badge, Input } from '../ui'
import { NotificationCenter } from './NotificationCenter'
import { useAuth } from '../../hooks/useAuth'
import clsx from 'clsx'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-neutral-200 h-16 flex items-center px-4 lg:px-6">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Menu button and search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search contacts, messages..."
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center space-x-4">
          {/* Quick actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" size="sm" icon={<MessageSquare className="w-4 h-4" />}>
              New Message
            </Button>
            <Button variant="primary" size="sm" icon={<Phone className="w-4 h-4" />}>
              Make Call
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <Badge 
                variant="energy" 
                size="sm" 
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </button>
            
            <NotificationCenter 
              isOpen={isNotificationOpen} 
              onClose={() => setIsNotificationOpen(false)} 
            />
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <div className="w-8 h-8 bg-ocean-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-ocean-600" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-neutral-900">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </div>
                <div className="text-xs text-neutral-500">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
              <ChevronDown className={clsx(
                'w-4 h-4 transition-transform',
                isUserMenuOpen && 'rotate-180'
              )} />
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button 
                    onClick={() => navigate('/dashboard/settings')}
                    className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/settings')}
                    className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-energy-600 hover:bg-neutral-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 