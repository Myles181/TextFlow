import React, { useState } from 'react';
import { Phone, MessageSquare, CreditCard, Copy, Check, Wifi, WifiOff } from 'lucide-react';
import { Button } from '../ui/Button';

interface ActiveNumberWidgetProps {
  phoneNumber: string;
  signalStrength: number; // 1-5
  accountBalance: number;
  isOnline?: boolean;
}

export const ActiveNumberWidget: React.FC<ActiveNumberWidgetProps> = ({
  phoneNumber,
  signalStrength,
  accountBalance,
  isOnline = true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy number:', err);
    }
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 10) return 'text-success-600';
    if (balance > 5) return 'text-warning-600';
    return 'text-error-600';
  };

  const getBalanceBgColor = (balance: number) => {
    if (balance > 10) return 'bg-success-100 border-success-300';
    if (balance > 5) return 'bg-warning-100 border-warning-300';
    return 'bg-error-100 border-error-300';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ocean-50 via-white to-energy-50 border border-ocean-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-ocean-500 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-energy-500 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 ${isOnline ? 'text-success-500' : 'text-gray-400'}`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          
          {/* Signal Strength */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-1 h-3 rounded-full transition-all duration-200 signal-bar ${
                  i < signalStrength ? 'bg-success-500' : 'bg-gray-200'
                }`}
                style={{ height: `${(i + 1) * 3}px` }}
              />
            ))}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 font-['SF_Pro_Display'] tracking-tight">
              {phoneNumber}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyNumber}
              className={`text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 ${copied ? 'copy-success' : ''}`}
            >
              {copied ? (
                <Check className="w-4 h-4 text-success-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Your active number</p>
        </div>

        {/* Account Balance */}
        <div className={`rounded-xl p-4 mb-6 border ${getBalanceBgColor(accountBalance)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Account Balance</p>
              <p className={`text-2xl font-bold ${getBalanceColor(accountBalance)}`}>
                ${accountBalance.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">USD</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="ocean"
            size="sm"
            className="flex flex-col items-center gap-1 py-3 h-auto"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs">Call</span>
          </Button>
          
          <Button
            variant="ocean"
            size="sm"
            className="flex flex-col items-center gap-1 py-3 h-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">Message</span>
          </Button>
          
          <Button
            variant="energy"
            size="sm"
            className="flex flex-col items-center gap-1 py-3 h-auto"
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-xs">Add Credit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}; 