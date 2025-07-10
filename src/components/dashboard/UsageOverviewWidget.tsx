import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface UsageData {
  callMinutes: number;
  messagesSent: number;
  dataUsed: number;
  period: 'week' | 'month';
}

interface UsageOverviewWidgetProps {
  usageData: UsageData;
  weeklyTrend: number[];
  monthlyComparison: { calls: number; messages: number };
  costSavings: number;
}

export const UsageOverviewWidget: React.FC<UsageOverviewWidgetProps> = ({
  usageData,
  weeklyTrend,
  monthlyComparison,
  costSavings
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const maxTrendValue = Math.max(...weeklyTrend);
  const totalUsage = usageData.callMinutes + usageData.messagesSent;
  const callPercentage = totalUsage > 0 ? (usageData.callMinutes / totalUsage) * 100 : 0;
  const messagePercentage = totalUsage > 0 ? (usageData.messagesSent / totalUsage) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Usage Overview</h3>
          <p className="text-sm text-gray-500 mt-1">Your communication statistics</p>
        </div>
        <div className="w-8 h-8 bg-ocean-50 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-ocean-600" />
        </div>
      </div>

      {/* Period Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedPeriod === 'week'
              ? 'bg-white text-ocean-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedPeriod === 'month'
              ? 'bg-white text-ocean-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          This Month
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-ocean-50 rounded-xl">
          <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-ocean-600" />
          </div>
          <p className="text-2xl font-bold text-ocean-600">{usageData.callMinutes}</p>
          <p className="text-xs text-ocean-600 font-medium">Call Minutes</p>
        </div>

        <div className="text-center p-4 bg-energy-50 rounded-xl">
          <div className="w-8 h-8 bg-energy-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BarChart3 className="w-4 h-4 text-energy-600" />
          </div>
          <p className="text-2xl font-bold text-energy-600">{usageData.messagesSent}</p>
          <p className="text-xs text-energy-600 font-medium">Messages</p>
        </div>

        <div className="text-center p-4 bg-success-50 rounded-xl">
          <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <DollarSign className="w-4 h-4 text-success-600" />
          </div>
          <p className="text-2xl font-bold text-success-600">${costSavings}</p>
          <p className="text-xs text-success-600 font-medium">Saved</p>
        </div>
      </div>

      {/* Weekly Trend Chart */}
      {selectedPeriod === 'week' && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Trend</h4>
          <div className="flex items-end justify-between h-24 gap-1">
            {weeklyTrend.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center chart-bar">
                <div
                  className="w-full bg-gradient-to-t from-ocean-500 to-ocean-400 rounded-t-sm transition-all duration-300 hover:from-ocean-600 hover:to-ocean-500 cursor-pointer group relative"
                  style={{ height: `${(value / maxTrendValue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {value} activities
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Distribution Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Distribution</h4>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray={`${callPercentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">{Math.round(callPercentage)}%</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-ocean-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Calls</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{usageData.callMinutes} min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-energy-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Messages</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{usageData.messagesSent} sent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Comparison */}
      {selectedPeriod === 'month' && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Monthly Comparison</h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Calls</span>
                <span className="text-sm font-medium text-gray-900">{monthlyComparison.calls}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-ocean-500 h-2 rounded-full transition-all duration-500 progress-animate"
                  style={{ width: `${Math.min((monthlyComparison.calls / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Messages</span>
                <span className="text-sm font-medium text-gray-900">{monthlyComparison.messages}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-energy-500 h-2 rounded-full transition-all duration-500 progress-animate"
                  style={{ width: `${Math.min((monthlyComparison.messages / 200) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 