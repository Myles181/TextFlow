import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  DollarSign,
  Clock,
  MapPin,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { MetricsCards } from '../components/analytics/MetricsCards';
import { UsageTrendsChart } from '../components/analytics/UsageTrendsChart';
import { CostAnalysis } from '../components/analytics/CostAnalysis';
import { CommunicationPatterns } from '../components/analytics/CommunicationPatterns';
import { GeographicMap } from '../components/analytics/GeographicMap';
import { PerformanceMetrics } from '../components/analytics/PerformanceMetrics';
import { SavingsCalculator } from '../components/analytics/SavingsCalculator';
import { Button } from '../components/ui/Button';
import { generateMockAnalytics } from '../utils/mockAnalytics';

interface AnalyticsPageState {
  timeRange: 'week' | 'month' | 'quarter' | 'year';
  selectedMetric: 'usage' | 'cost' | 'performance' | 'trends';
  dateRange: {
    start: Date;
    end: Date;
  };
  comparisonMode: 'none' | 'previous-period' | 'year-over-year';
  isLoading: boolean;
}

export const AnalyticsPage: React.FC = () => {
  const [state, setState] = useState<AnalyticsPageState>({
    timeRange: 'month',
    selectedMetric: 'usage',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    },
    comparisonMode: 'previous-period',
    isLoading: false
  });

  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    loadAnalyticsData();
  }, [state.timeRange, state.dateRange]);

  const loadAnalyticsData = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = generateMockAnalytics(state.timeRange);
    setAnalyticsData(data);
    setState(prev => ({ ...prev, isLoading: false }));
  };

  const handleTimeRangeChange = (range: AnalyticsPageState['timeRange']) => {
    setState(prev => ({ ...prev, timeRange: range }));
  };

  const handleMetricChange = (metric: AnalyticsPageState['selectedMetric']) => {
    setState(prev => ({ ...prev, selectedMetric: metric }));
  };

  const handleExportData = () => {
    // Export analytics data
    console.log('Exporting analytics data...');
  };

  const handleShareInsights = () => {
    // Share insights functionality
    console.log('Sharing insights...');
  };

  const getTimeRangeLabel = () => {
    switch (state.timeRange) {
      case 'week':
        return 'Last 7 Days';
      case 'month':
        return 'Last 30 Days';
      case 'quarter':
        return 'Last 3 Months';
      case 'year':
        return 'Last 12 Months';
      default:
        return 'Custom Range';
    }
  };

  const getMetricLabel = () => {
    switch (state.selectedMetric) {
      case 'usage':
        return 'Usage Analytics';
      case 'cost':
        return 'Cost Analysis';
      case 'performance':
        return 'Performance Metrics';
      case 'trends':
        return 'Trend Analysis';
      default:
        return 'Analytics';
    }
  };

  if (state.isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {getMetricLabel()} • {getTimeRangeLabel()}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShareInsights}
              className="flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Time Range:</span>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${state.timeRange === range
                    ? 'bg-white text-ocean-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Category Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {([
            { key: 'usage', label: 'Usage', icon: BarChart3 },
            { key: 'cost', label: 'Cost', icon: DollarSign },
            { key: 'performance', label: 'Performance', icon: Zap },
            { key: 'trends', label: 'Trends', icon: TrendingUp }
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleMetricChange(key)}
              className={`
                flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${state.selectedMetric === key
                  ? 'bg-white text-ocean-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {analyticsData && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <MetricsCards 
              data={analyticsData.metrics}
              timeRange={state.timeRange}
              comparisonMode={state.comparisonMode}
            />

            {/* Main Chart Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Usage Trends</h2>
                  <p className="text-gray-600">Your communication activity over time</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Compare:</span>
                  <select
                    value={state.comparisonMode}
                    onChange={(e) => setState(prev => ({ 
                      ...prev, 
                      comparisonMode: e.target.value as any 
                    }))}
                    className="text-sm border border-gray-300 rounded-md px-3 py-1"
                  >
                    <option value="none">No comparison</option>
                    <option value="previous-period">Previous period</option>
                    <option value="year-over-year">Year over year</option>
                  </select>
                </div>
              </div>
              
              <UsageTrendsChart
                data={analyticsData.usage}
                timeRange={state.timeRange}
                comparisonMode={state.comparisonMode}
              />
            </div>

            {/* Cost Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-energy-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-energy-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Cost Analysis</h2>
                    <p className="text-gray-600">Breakdown of your spending</p>
                  </div>
                </div>
                
                <CostAnalysis
                  currentPeriod={analyticsData.costs.current}
                  previousPeriod={analyticsData.costs.previous}
                  savingsComparison={analyticsData.costs.savings}
                />
              </div>

              {/* Communication Patterns */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-ocean-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Communication Patterns</h2>
                    <p className="text-gray-600">When and how you communicate</p>
                  </div>
                </div>
                
                <CommunicationPatterns
                  callPatterns={analyticsData.patterns.calls}
                  messagePatterns={analyticsData.patterns.messages}
                  timeRange={state.timeRange}
                />
              </div>
            </div>

            {/* Geographic Usage */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Geographic Usage</h2>
                  <p className="text-gray-600">Where your communications reach</p>
                </div>
              </div>
              
              <GeographicMap
                usageData={analyticsData.geographic}
                mapType="calls"
              />
            </div>

            {/* Performance & Savings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
                    <p className="text-gray-600">Service quality and reliability</p>
                  </div>
                </div>
                
                <PerformanceMetrics
                  callQuality={analyticsData.performance.callQuality}
                  deliveryRates={analyticsData.performance.deliveryRates}
                  uptime={analyticsData.performance.uptime}
                />
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Savings Calculator</h2>
                    <p className="text-gray-600">See how much you're saving</p>
                  </div>
                </div>
                
                <SavingsCalculator
                  currentUsage={analyticsData.usage}
                  onComparisonUpdate={(comparison) => {
                    console.log('Savings comparison updated:', comparison);
                  }}
                />
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-gradient-to-r from-ocean-50 to-success-50 rounded-xl border border-ocean-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-ocean-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analyticsData.insights?.map((insight: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-ocean-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-ocean-600 text-xs font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {insight.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 