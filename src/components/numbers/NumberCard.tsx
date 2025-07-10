import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Settings, 
  Trash2, 
  BarChart3, 
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

export interface VirtualNumber {
  id: string;
  phoneNumber: string;
  country: string;
  areaCode: string;
  city: string;
  status: 'active' | 'suspended' | 'pending';
  acquiredDate: Date;
  monthlyUsage: {
    calls: number;
    messages: number;
    cost: number;
  };
  settings: {
    callForwarding: string | null;
    voicemailEnabled: boolean;
    smsForwarding: string | null;
  };
}

interface NumberCardProps {
  number: VirtualNumber;
  onConfigure: (numberId: string) => void;
  onRelease: (numberId: string) => void;
  onViewUsage: (numberId: string) => void;
}

export const NumberCard: React.FC<NumberCardProps> = ({
  number,
  onConfigure,
  onRelease,
  onViewUsage
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusConfig = (status: VirtualNumber['status']) => {
    switch (status) {
      case 'active':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: 'text-success-500',
          bgColor: 'bg-success-50',
          label: 'Active'
        };
      case 'suspended':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: 'text-energy-500',
          bgColor: 'bg-energy-50',
          label: 'Suspended'
        };
      case 'pending':
        return {
          icon: <Clock className="w-4 h-4" />,
          color: 'text-neutral-500',
          bgColor: 'bg-neutral-50',
          label: 'Setting up...'
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          color: 'text-neutral-500',
          bgColor: 'bg-neutral-50',
          label: 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig(number.status);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    // Format as (XXX) XXX-XXXX
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    }
    return phoneNumber;
  };

  const getUsagePercentage = (current: number, limit: number = 1000) => {
    return Math.min((current / limit) * 100, 100);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Phone Number */}
          <h3 className="text-xl font-bold text-gray-900 mb-1 font-mono">
            {formatPhoneNumber(number.phoneNumber)}
          </h3>
          
          {/* Location */}
          <p className="text-sm text-gray-600 mb-2">
            {number.city}, {number.country}
          </p>
          
          {/* Status */}
          <div className={clsx(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
            statusConfig.bgColor,
            statusConfig.color
          )}>
            {statusConfig.icon}
            <span className="ml-1">{statusConfig.label}</span>
          </div>
        </div>
        
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
              <div className="py-1">
                <button
                  onClick={() => {
                    onConfigure(number.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </button>
                
                <button
                  onClick={() => {
                    onViewUsage(number.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Usage
                </button>
                
                <hr className="my-1" />
                
                <button
                  onClick={() => {
                    onRelease(number.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-energy-600 hover:bg-gray-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Release Number
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="space-y-3 mb-4">
        {/* Calls */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600 flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              Calls
            </span>
            <span className="font-medium">{number.monthlyUsage.calls.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-ocean-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getUsagePercentage(number.monthlyUsage.calls)}%` }}
            />
          </div>
        </div>

        {/* Messages */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600 flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              Messages
            </span>
            <span className="font-medium">{number.monthlyUsage.messages.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-energy-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getUsagePercentage(number.monthlyUsage.messages)}%` }}
            />
          </div>
        </div>

        {/* Cost */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600 flex items-center">
              <DollarSign className="w-3 h-3 mr-1" />
              Monthly Cost
            </span>
            <span className="font-medium">${number.monthlyUsage.cost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Settings Status */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Call Forwarding</span>
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs',
            number.settings.callForwarding 
              ? 'bg-success-100 text-success-700' 
              : 'bg-gray-100 text-gray-600'
          )}>
            {number.settings.callForwarding ? 'Active' : 'Disabled'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Voicemail</span>
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs',
            number.settings.voicemailEnabled 
              ? 'bg-success-100 text-success-700' 
              : 'bg-gray-100 text-gray-600'
          )}>
            {number.settings.voicemailEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">SMS Forwarding</span>
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs',
            number.settings.smsForwarding 
              ? 'bg-success-100 text-success-700' 
              : 'bg-gray-100 text-gray-600'
          )}>
            {number.settings.smsForwarding ? 'Active' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Acquired {formatDate(number.acquiredDate)}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onConfigure(number.id)}
            className="text-xs"
          >
            <Settings className="w-3 h-3 mr-1" />
            Configure
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewUsage(number.id)}
            className="text-xs"
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Usage
          </Button>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}; 