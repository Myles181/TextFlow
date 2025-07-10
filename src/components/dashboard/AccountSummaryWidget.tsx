import React from 'react';
import { CreditCard, Calendar, AlertTriangle, CheckCircle, ArrowUpRight, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

interface AccountSummaryProps {
  currentPlan: string;
  billingCycle: string;
  nextBillDate: Date;
  currentBalance: number;
  monthlyUsage: {
    calls: number;
    messages: number;
    cost: number;
  };
  planLimits: {
    calls: number;
    messages: number;
    cost: number;
  };
}

export const AccountSummaryWidget: React.FC<AccountSummaryProps> = ({
  currentPlan,
  billingCycle,
  nextBillDate,
  currentBalance,
  monthlyUsage,
  planLimits
}) => {
  const daysUntilBill = Math.ceil((nextBillDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const callUsagePercentage = (monthlyUsage.calls / planLimits.calls) * 100;
  const messageUsagePercentage = (monthlyUsage.messages / planLimits.messages) * 100;
  const costUsagePercentage = (monthlyUsage.cost / planLimits.cost) * 100;

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-error-700 bg-error-100';
    if (percentage >= 75) return 'text-warning-700 bg-warning-100';
    return 'text-success-700 bg-success-100';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-error-600';
    if (percentage >= 75) return 'bg-warning-600';
    return 'bg-success-600';
  };

  const isLowBalance = currentBalance < 5;
  const isNearLimit = callUsagePercentage >= 75 || messageUsagePercentage >= 75 || costUsagePercentage >= 75;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Account Summary</h3>
          <p className="text-sm text-gray-500 mt-1">Plan details and billing info</p>
        </div>
        <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-ocean-700" />
        </div>
      </div>

      {/* Current Plan */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-ocean-700" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{currentPlan} Plan</h4>
              <p className="text-sm text-gray-500">{billingCycle} billing</p>
            </div>
          </div>
          {currentPlan === 'Free' && (
            <Button variant="ocean" size="sm" className="text-xs">
              Upgrade
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* Balance Warning */}
      {isLowBalance && (
        <div className="mb-6 p-4 bg-error-100 border border-error-300 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-error-700 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-error-800 mb-1">Low Balance</h4>
              <p className="text-sm text-error-700 mb-3">
                Your account balance is low. Add credit to continue using TextFlow.
              </p>
              <Button variant="error" size="sm">
                Add Credit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Next Billing */}
      <div className="mb-6 p-4 bg-gray-100 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-energy-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-energy-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next billing</p>
              <p className="font-medium text-gray-900">
                {nextBillDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">in</p>
            <p className="font-medium text-gray-900">{daysUntilBill} days</p>
          </div>
        </div>
      </div>

      {/* Usage Progress */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-medium text-gray-700">Monthly Usage</h4>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Calls</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${getUsageColor(callUsagePercentage)}`}>
              {monthlyUsage.calls} / {planLimits.calls}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 progress-animate ${getProgressColor(callUsagePercentage)}`}
              style={{ width: `${Math.min(callUsagePercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Messages</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${getUsageColor(messageUsagePercentage)}`}>
              {monthlyUsage.messages} / {planLimits.messages}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 progress-animate ${getProgressColor(messageUsagePercentage)}`}
              style={{ width: `${Math.min(messageUsagePercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Cost</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${getUsageColor(costUsagePercentage)}`}>
              ${monthlyUsage.cost.toFixed(2)} / ${planLimits.cost.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 progress-animate ${getProgressColor(costUsagePercentage)}`}
              style={{ width: `${Math.min(costUsagePercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="flex-1">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button variant="ocean" size="sm" className="flex-1">
          <CreditCard className="w-4 h-4 mr-2" />
          Billing
        </Button>
      </div>
    </div>
  );
}; 