import React from 'react';
import { Phone, MessageSquare, CreditCard, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'ocean' | 'energy' | 'success' | 'warning';
  href: string;
  description?: string;
}

const quickActions: QuickAction[] = [
  {
    label: 'Make Call',
    icon: Phone,
    color: 'ocean',
    href: '/dashboard/calls/new',
    description: 'Start a new call'
  },
  {
    label: 'Send SMS',
    icon: MessageSquare,
    color: 'ocean',
    href: '/dashboard/messages/new',
    description: 'Send a text message'
  },
  {
    label: 'Add Credit',
    icon: CreditCard,
    color: 'energy',
    href: '/dashboard/billing/credits',
    description: 'Top up your account'
  },
  {
    label: 'Get Number',
    icon: Plus,
    color: 'success',
    href: '/dashboard/numbers/new',
    description: 'Get a new phone number'
  }
];

export const QuickActionsWidget: React.FC = () => {
  const getColorClasses = (color: QuickAction['color']) => {
    switch (color) {
      case 'ocean':
        return 'bg-ocean-100 border-ocean-300 text-ocean-800 hover:bg-ocean-200 hover:border-ocean-400';
      case 'energy':
        return 'bg-energy-100 border-energy-300 text-energy-800 hover:bg-energy-200 hover:border-energy-400';
      case 'success':
        return 'bg-success-100 border-success-300 text-success-800 hover:bg-success-200 hover:border-success-400';
      case 'warning':
        return 'bg-warning-100 border-warning-300 text-warning-800 hover:bg-warning-200 hover:border-warning-400';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400';
    }
  };

  const getIconColor = (color: QuickAction['color']) => {
    switch (color) {
      case 'ocean':
        return 'text-ocean-700';
      case 'energy':
        return 'text-energy-700';
      case 'success':
        return 'text-success-700';
      case 'warning':
        return 'text-warning-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-500 mt-1">Common tasks and shortcuts</p>
        </div>
        <div className="w-8 h-8 bg-ocean-50 rounded-lg flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-ocean-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.label}
              className={`
                group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 quick-action
                ${getColorClasses(action.color)}
                hover:scale-105 hover:shadow-lg active:scale-95
                min-h-[88px] flex flex-col justify-between
              `}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-current rounded-full -translate-y-8 translate-x-8"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center ${getIconColor(action.color)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-1">{action.label}</h4>
                  {action.description && (
                    <p className="text-xs opacity-75">{action.description}</p>
                  )}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          );
        })}
      </div>

      {/* View all actions link */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-ocean-600 hover:text-ocean-700 font-medium transition-colors duration-200">
          View all actions →
        </button>
      </div>
    </div>
  );
}; 