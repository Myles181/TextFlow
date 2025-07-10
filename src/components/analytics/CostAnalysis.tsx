import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

interface CostData {
  totalCost: number;
  costBreakdown: {
    calls: number;
    messages: number;
    numbersMonthly: number;
    additionalFeatures: number;
  };
  averageCostPerDay: number;
  mostExpensiveDay: {
    date: Date;
    cost: number;
    reason: string;
  };
}

interface SavingsData {
  vsTraditional: number;
  vsCompetitor: number;
  monthlySavings: number;
  yearlySavings: number;
}

interface CostAnalysisProps {
  currentPeriod: CostData;
  previousPeriod: CostData;
  savingsComparison: SavingsData;
}

export const CostAnalysis: React.FC<CostAnalysisProps> = ({
  currentPeriod,
  previousPeriod,
  savingsComparison
}) => {
  const [selectedBreakdown, setSelectedBreakdown] = useState<string | null>(null);

  const breakdownData = [
    { key: 'calls', label: 'Voice Calls', color: '#0ea5e9', icon: '📞' },
    { key: 'messages', label: 'SMS/MMS', color: '#10b981', icon: '💬' },
    { key: 'numbersMonthly', label: 'Number Fees', color: '#f59e0b', icon: '🔢' },
    { key: 'additionalFeatures', label: 'Features', color: '#8b5cf6', icon: '⚡' }
  ];

  const costChange = ((currentPeriod.totalCost - previousPeriod.totalCost) / previousPeriod.totalCost) * 100;
  const isCostDecreasing = costChange < 0;

  const renderDonutChart = () => {
    const total = Object.values(currentPeriod.costBreakdown).reduce((sum, val) => sum + val, 0);
    const radius = 60;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    
    let currentOffset = 0;
    
    return (
      <div className="relative">
        <svg width="150" height="150" className="transform -rotate-90">
          {breakdownData.map((item, index) => {
            const value = currentPeriod.costBreakdown[item.key as keyof typeof currentPeriod.costBreakdown];
            const percentage = value / total;
            const strokeDasharray = circumference * percentage;
            const strokeDashoffset = circumference - strokeDasharray;
            
            const path = (
              <circle
                key={item.key}
                cx="75"
                cy="75"
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={currentOffset}
                className="transition-all duration-1000 ease-out"
                style={{
                  strokeDashoffset: currentOffset
                }}
                onMouseEnter={() => setSelectedBreakdown(item.key)}
                onMouseLeave={() => setSelectedBreakdown(null)}
              />
            );
            
            currentOffset -= strokeDasharray;
            return path;
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              ${currentPeriod.totalCost.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Total Cost</div>
          </div>
        </div>
      </div>
    );
  };

  const renderBreakdownLegend = () => {
    const total = Object.values(currentPeriod.costBreakdown).reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="space-y-3">
        {breakdownData.map((item) => {
          const value = currentPeriod.costBreakdown[item.key as keyof typeof currentPeriod.costBreakdown];
          const percentage = ((value / total) * 100).toFixed(1);
          const isSelected = selectedBreakdown === item.key;
          
          return (
            <div
              key={item.key}
              className={clsx(
                'flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer',
                isSelected ? 'bg-gray-100 scale-105' : 'hover:bg-gray-50'
              )}
              onMouseEnter={() => setSelectedBreakdown(item.key)}
              onMouseLeave={() => setSelectedBreakdown(null)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  ${value.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCostComparison = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Cost Change</span>
          <div className={clsx(
            'flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium',
            isCostDecreasing 
              ? 'bg-success-100 text-success-700' 
              : 'bg-energy-100 text-energy-700'
          )}>
            {isCostDecreasing ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
            <span>{Math.abs(costChange).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">
              ${currentPeriod.totalCost.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Current Period</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">
              ${previousPeriod.totalCost.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">Previous Period</div>
          </div>
        </div>
      </div>
    );
  };

  const renderSavingsHighlight = () => {
    return (
      <div className="bg-gradient-to-r from-success-50 to-ocean-50 border border-success-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">You're Saving Money!</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">vs Traditional Service:</span>
            <span className="text-lg font-bold text-success-600">
              ${savingsComparison.vsTraditional.toFixed(2)}/month
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Annual Savings:</span>
            <span className="text-lg font-bold text-success-600">
              ${savingsComparison.yearlySavings.toFixed(2)}
            </span>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-success-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">
                ${savingsComparison.monthlySavings.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Monthly Savings</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExpensiveDayAlert = () => {
    return (
      <div className="bg-energy-50 border border-energy-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-energy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle className="w-3 h-3 text-energy-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Most Expensive Day
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              {currentPeriod.mostExpensiveDay.date.toLocaleDateString()}: ${currentPeriod.mostExpensiveDay.cost.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              Reason: {currentPeriod.mostExpensiveDay.reason}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Cost Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
          <p className="text-sm text-gray-600">How your costs are distributed</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            ${currentPeriod.totalCost.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            ${currentPeriod.averageCostPerDay.toFixed(2)}/day average
          </div>
        </div>
      </div>

      {/* Donut Chart and Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center">
          {renderDonutChart()}
        </div>
        <div>
          {renderBreakdownLegend()}
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="border-t border-gray-200 pt-4">
        {renderCostComparison()}
      </div>

      {/* Savings Highlight */}
      <div className="border-t border-gray-200 pt-4">
        {renderSavingsHighlight()}
      </div>

      {/* Expensive Day Alert */}
      <div className="border-t border-gray-200 pt-4">
        {renderExpensiveDayAlert()}
      </div>

      {/* Cost Optimization Tips */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Cost Optimization Tips</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Consider switching to unlimited plans if you exceed 500 minutes monthly
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Remove unused virtual numbers to save $5/month per number
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Enable call forwarding during business hours only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 