import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Clock, Wifi, Signal, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface QualityData {
  date: string;
  callQuality: number; // 1-5 scale
  connectionTime: number; // seconds
  dropRate: number; // percentage
}

interface DeliveryData {
  smsDeliveryRate: number; // percentage
  mmsDeliveryRate: number; // percentage
  averageDeliveryTime: number; // seconds
}

interface UptimeData {
  currentUptime: number; // percentage
  lastDowntime: Date;
  averageResponseTime: number; // milliseconds
  totalIncidents: number;
}

interface PerformanceMetricsProps {
  callQuality: QualityData[];
  deliveryRates: DeliveryData;
  uptime: UptimeData;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  callQuality,
  deliveryRates,
  uptime
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'quality' | 'delivery' | 'uptime'>('quality');

  const renderGaugeChart = (value: number, maxValue: number, label: string, color: string) => {
    const percentage = (value / maxValue) * 100;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = (percentage / 100) * circumference;
    
    return (
      <div className="text-center">
        <div className="relative inline-block">
          <svg width="100" height="100" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={circumference - strokeDasharray}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-lg font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQualityMetrics = () => {
    const latestQuality = callQuality[callQuality.length - 1];
    const averageQuality = callQuality.reduce((sum, q) => sum + q.callQuality, 0) / callQuality.length;
    const averageConnectionTime = callQuality.reduce((sum, q) => sum + q.connectionTime, 0) / callQuality.length;
    const averageDropRate = callQuality.reduce((sum, q) => sum + q.dropRate, 0) / callQuality.length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Call Quality */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                <Signal className="w-4 h-4 text-ocean-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Call Quality</h4>
                <p className="text-xs text-gray-500">Average rating</p>
              </div>
            </div>
            
            {renderGaugeChart(averageQuality, 5, 'out of 5', '#0ea5e9')}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {averageQuality.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Current: {latestQuality.callQuality.toFixed(1)}</div>
            </div>
          </div>

          {/* Connection Time */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-success-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Connection Time</h4>
                <p className="text-xs text-gray-500">Average seconds</p>
              </div>
            </div>
            
            {renderGaugeChart(100 - averageConnectionTime, 100, 'seconds', '#10b981')}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {averageConnectionTime.toFixed(1)}s
              </div>
              <div className="text-xs text-gray-500">Target: &lt;2s</div>
            </div>
          </div>

          {/* Drop Rate */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-energy-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-energy-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Drop Rate</h4>
                <p className="text-xs text-gray-500">Percentage</p>
              </div>
            </div>
            
            {renderGaugeChart(100 - averageDropRate, 100, '%', '#f59e0b')}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {averageDropRate.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">Target: &lt;1%</div>
            </div>
          </div>
        </div>

        {/* Quality Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Quality Trend (Last 7 Days)</h4>
          <div className="flex items-end space-x-2 h-20">
            {callQuality.slice(-7).map((quality, index) => {
              const height = (quality.callQuality / 5) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-ocean-500 rounded-t transition-all duration-300 hover:bg-ocean-600"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(quality.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderDeliveryMetrics = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SMS Delivery Rate */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">SMS Delivery Rate</h4>
                <p className="text-xs text-gray-500">Success percentage</p>
              </div>
            </div>
            
            {renderGaugeChart(deliveryRates.smsDeliveryRate, 100, '%', '#10b981')}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {deliveryRates.smsDeliveryRate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">Industry avg: 98.5%</div>
            </div>
          </div>

          {/* MMS Delivery Rate */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-4 h-4 text-ocean-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">MMS Delivery Rate</h4>
                <p className="text-xs text-gray-500">Success percentage</p>
              </div>
            </div>
            
            {renderGaugeChart(deliveryRates.mmsDeliveryRate, 100, '%', '#0ea5e9')}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {deliveryRates.mmsDeliveryRate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500">Industry avg: 95.2%</div>
            </div>
          </div>
        </div>

        {/* Delivery Performance */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Delivery Performance</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Delivery Time</span>
              <span className="text-sm font-medium text-gray-900">
                {deliveryRates.averageDeliveryTime.toFixed(1)}s
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-success-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, (deliveryRates.averageDeliveryTime / 5) * 100)}%` 
                }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Fast (&lt;1s)</span>
              <span>Slow (&gt;5s)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUptimeMetrics = () => {
    const getUptimeColor = (uptime: number) => {
      if (uptime >= 99.9) return '#10b981';
      if (uptime >= 99.5) return '#f59e0b';
      return '#ef4444';
    };

    const getUptimeStatus = (uptime: number) => {
      if (uptime >= 99.9) return 'Excellent';
      if (uptime >= 99.5) return 'Good';
      return 'Needs Attention';
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Uptime */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Service Uptime</h4>
                <p className="text-xs text-gray-500">Current status</p>
              </div>
            </div>
            
            {renderGaugeChart(uptime.currentUptime, 100, '%', getUptimeColor(uptime.currentUptime))}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {uptime.currentUptime.toFixed(3)}%
              </div>
              <div className="text-xs text-gray-500">{getUptimeStatus(uptime.currentUptime)}</div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-ocean-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Response Time</h4>
                <p className="text-xs text-gray-500">Average milliseconds</p>
              </div>
            </div>
            
            {renderGaugeChart(1000 - uptime.averageResponseTime, 1000, 'ms', '#0ea5e9')}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {uptime.averageResponseTime.toFixed(0)}ms
              </div>
              <div className="text-xs text-gray-500">Target: &lt;200ms</div>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Service Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Downtime</span>
              <span className="text-sm font-medium text-gray-900">
                {uptime.lastDowntime.toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Incidents</span>
              <span className="text-sm font-medium text-gray-900">
                {uptime.totalIncidents} this month
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm font-medium text-success-600">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Metric Selector */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {([
          { key: 'quality', label: 'Call Quality', icon: Signal },
          { key: 'delivery', label: 'Message Delivery', icon: CheckCircle },
          { key: 'uptime', label: 'Service Uptime', icon: Wifi }
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={clsx(
              'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
              selectedMetric === key
                ? 'bg-white text-ocean-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Selected Metric Content */}
      {selectedMetric === 'quality' && renderQualityMetrics()}
      {selectedMetric === 'delivery' && renderDeliveryMetrics()}
      {selectedMetric === 'uptime' && renderUptimeMetrics()}

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-ocean-50 to-success-50 border border-ocean-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-ocean-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Performance Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ocean-600">
              {callQuality.reduce((sum, q) => sum + q.callQuality, 0) / callQuality.length > 4 ? 'Excellent' : 'Good'}
            </div>
            <div className="text-sm text-gray-600">Overall Quality</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">
              {deliveryRates.smsDeliveryRate > 98 ? 'High' : 'Standard'}
            </div>
            <div className="text-sm text-gray-600">Delivery Reliability</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {uptime.currentUptime > 99.9 ? '99.9%+' : uptime.currentUptime.toFixed(1) + '%'}
            </div>
            <div className="text-sm text-gray-600">Service Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 