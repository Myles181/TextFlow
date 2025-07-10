import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Phone, 
  Hash, 
  Settings,
  BarChart3
} from 'lucide-react';
import clsx from 'clsx';

interface MobileNavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const mobileNavItems = [
  { 
    id: 'dashboard', 
    label: 'Home', 
    icon: Home, 
    route: '/dashboard',
    badge: 0
  },
  { 
    id: 'messages', 
    label: 'Messages', 
    icon: MessageSquare, 
    route: '/dashboard/messages',
    badge: 3
  },
  { 
    id: 'calls', 
    label: 'Calls', 
    icon: Phone, 
    route: '/dashboard/calls',
    badge: 0
  },
  { 
    id: 'numbers', 
    label: 'Numbers', 
    icon: Hash, 
    route: '/dashboard/numbers',
    badge: 0
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: BarChart3, 
    route: '/dashboard/analytics',
    badge: 0
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: Settings, 
    route: '/dashboard/settings',
    badge: 0
  }
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentRoute,
  onNavigate
}) => {
  const isActive = (route: string) => {
    if (route === '/dashboard') {
      return currentRoute === '/dashboard' || currentRoute === '/dashboard/overview';
    }
    return currentRoute.startsWith(route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      {/* Safe area padding for devices with home indicator */}
      <div 
        className="flex items-center justify-around px-2 py-2"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
      >
        {mobileNavItems.map((item) => {
          const active = isActive(item.route);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className={clsx(
                'flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200',
                'hover:bg-gray-50 active:bg-gray-100',
                active && 'bg-ocean-50'
              )}
            >
              <div className="relative">
                <Icon 
                  className={clsx(
                    'w-6 h-6 transition-all duration-200',
                    active 
                      ? 'text-ocean-600 scale-110' 
                      : 'text-gray-500'
                  )} 
                />
                
                {/* Badge */}
                {item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-energy-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              
              <span 
                className={clsx(
                  'text-xs font-medium mt-1 transition-all duration-200 truncate w-full text-center',
                  active 
                    ? 'text-ocean-600' 
                    : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
              
              {/* Active indicator */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-ocean-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}; 