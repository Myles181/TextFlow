import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calculator, Share2, Award } from 'lucide-react';
import clsx from 'clsx';

interface UsageData {
  calls: number;
  messages: number;
  internationalCalls: number;
  dataUsage: number; // GB
}

interface ComparisonData {
  textflowCost: number;
  traditionalCarrierCost: number;
  competitorCosts: { name: string; cost: number }[];
  monthlySavings: number;
  yearlySavings: number;
}

interface SavingsCalculatorProps {
  currentUsage: UsageData;
  onComparisonUpdate: (comparison: ComparisonData) => void;
}

const carriers = [
  { name: 'Verizon', baseCost: 80, perMinute: 0.25, perMessage: 0.20 },
  { name: 'AT&T', baseCost: 75, perMinute: 0.30, perMessage: 0.25 },
  { name: 'T-Mobile', baseCost: 70, perMinute: 0.20, perMessage: 0.15 },
  { name: 'Sprint', baseCost: 65, perMinute: 0.22, perMessage: 0.18 }
];

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  currentUsage,
  onComparisonUpdate
}) => {
  const [usage, setUsage] = useState<UsageData>(currentUsage);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const calculateTextflowCost = (usage: UsageData): number => {
    // TextFlow pricing model
    const baseCost = 25; // Base plan
    const callCost = usage.calls * 0.02; // $0.02 per minute
    const messageCost = usage.messages * 0.01; // $0.01 per message
    const internationalCost = usage.internationalCalls * 0.05; // $0.05 per minute
    const dataCost = usage.dataUsage * 5; // $5 per GB
    
    return baseCost + callCost + messageCost + internationalCost + dataCost;
  };

  const calculateTraditionalCost = (usage: UsageData): number => {
    // Average traditional carrier cost
    const baseCost = 72.5; // Average base cost
    const callCost = usage.calls * 0.24; // Average per minute
    const messageCost = usage.messages * 0.20; // Average per message
    const internationalCost = usage.internationalCalls * 0.15; // Higher international rates
    const dataCost = usage.dataUsage * 10; // Higher data costs
    
    return baseCost + callCost + messageCost + internationalCost + dataCost;
  };

  const calculateCompetitorCosts = (usage: UsageData) => {
    return carriers.map(carrier => ({
      name: carrier.name,
      cost: carrier.baseCost + 
            (usage.calls * carrier.perMinute) + 
            (usage.messages * carrier.perMessage) +
            (usage.internationalCalls * 0.15) +
            (usage.dataUsage * 10)
    }));
  };

  const textflowCost = calculateTextflowCost(usage);
  const traditionalCost = calculateTraditionalCost(usage);
  const competitorCosts = calculateCompetitorCosts(usage);
  const monthlySavings = traditionalCost - textflowCost;
  const yearlySavings = monthlySavings * 12;

  useEffect(() => {
    // Animate savings counter
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentSavings = monthlySavings * easeOutQuart;
      
      setAnimatedSavings(currentSavings);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Show celebration when animation completes
        if (monthlySavings > 20) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    };
    
    requestAnimationFrame(animate);
  }, [monthlySavings]);

  useEffect(() => {
    // Update parent component
    onComparisonUpdate({
      textflowCost,
      traditionalCarrierCost: traditionalCost,
      competitorCosts,
      monthlySavings,
      yearlySavings
    });
  }, [textflowCost, traditionalCost, competitorCosts, monthlySavings, yearlySavings, onComparisonUpdate]);

  const handleUsageChange = (field: keyof UsageData, value: number) => {
    setUsage(prev => ({
      ...prev,
      [field]: Math.max(0, value)
    }));
  };

  const renderSavingsHighlight = () => {
    return (
      <div className="relative bg-gradient-to-r from-success-50 to-ocean-50 border border-success-200 rounded-lg p-6">
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">You're Saving Money!</h3>
          </div>
          
          <div className="text-4xl font-bold text-success-600 mb-2">
            ${animatedSavings.toFixed(2)}
          </div>
          <div className="text-lg text-gray-600 mb-4">per month</div>
          
          <div className="text-2xl font-bold text-success-600 mb-2">
            ${yearlySavings.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 mb-4">per year</div>
          
          <div className="bg-white rounded-lg p-3 border border-success-200">
            <div className="text-sm text-gray-600">
              vs traditional carriers
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUsageInputs = () => {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Adjust Your Usage</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Minutes
            </label>
            <input
              type="number"
              value={usage.calls}
              onChange={(e) => handleUsageChange('calls', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Messages
            </label>
            <input
              type="number"
              value={usage.messages}
              onChange={(e) => handleUsageChange('messages', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              International Minutes
            </label>
            <input
              type="number"
              value={usage.internationalCalls}
              onChange={(e) => handleUsageChange('internationalCalls', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Usage (GB)
            </label>
            <input
              type="number"
              value={usage.dataUsage}
              onChange={(e) => handleUsageChange('dataUsage', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCostComparison = () => {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Cost Comparison</h4>
        
        <div className="space-y-3">
          {/* TextFlow Cost */}
          <div className="flex items-center justify-between p-3 bg-ocean-50 rounded-lg border border-ocean-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-ocean-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">TextFlow</div>
                <div className="text-xs text-gray-500">Your current plan</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-ocean-600">${textflowCost.toFixed(2)}</div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
          </div>
          
          {/* Traditional Carrier Cost */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Traditional Carrier</div>
                <div className="text-xs text-gray-500">Average cost</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">${traditionalCost.toFixed(2)}</div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
          </div>
        </div>
        
        {/* Savings Bar */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Savings</span>
            <span className="text-sm font-bold text-success-600">${monthlySavings.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-success-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, (monthlySavings / traditionalCost) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCompetitorComparison = () => {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">vs Major Carriers</h4>
        
        <div className="space-y-2">
          {competitorCosts.map((carrier) => {
            const savings = carrier.cost - textflowCost;
            const savingsPercent = ((savings / carrier.cost) * 100);
            
            return (
              <div key={carrier.name} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">{carrier.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{carrier.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">${carrier.cost.toFixed(2)}</div>
                  <div className="text-xs text-success-600">
                    Save ${savings.toFixed(2)} ({savingsPercent.toFixed(0)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleShareSavings = () => {
    const message = `I'm saving $${monthlySavings.toFixed(2)}/month with TextFlow! Check it out: textflow.com`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My TextFlow Savings',
        text: message,
        url: 'https://textflow.com'
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(message);
      alert('Savings copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Savings Highlight */}
      {renderSavingsHighlight()}

      {/* Usage Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {renderUsageInputs()}
      </div>

      {/* Cost Comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {renderCostComparison()}
      </div>

      {/* Competitor Comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {renderCompetitorComparison()}
      </div>

      {/* Share Button */}
      <div className="text-center">
        <button
          onClick={handleShareSavings}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Your Savings</span>
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">💡 Pro Tips</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              International calls are 70% cheaper with TextFlow
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              No hidden fees or overage charges
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Unlimited messaging included in all plans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 