import React, { useState } from 'react';
import { Clock, Calendar, TrendingUp, Users, Globe } from 'lucide-react';
import clsx from 'clsx';

interface CallPatternData {
  hourlyUsage: number[][]; // 7 days x 24 hours
  peakHours: { hour: number; count: number }[];
  averageCallDuration: number;
  totalCalls: number;
  uniqueNumbers: number;
  domesticVsInternational: { domestic: number; international: number };
}

interface MessagePatternData {
  hourlyUsage: number[][]; // 7 days x 24 hours
  averageLength: number;
  totalMessages: number;
  uniqueNumbers: number;
  responseTime: number; // average in minutes
}

interface CommunicationPatternsProps {
  callPatterns: CallPatternData;
  messagePatterns: MessagePatternData;
  timeRange: string;
}

export const CommunicationPatterns: React.FC<CommunicationPatternsProps> = ({
  callPatterns,
  messagePatterns,
  timeRange
}) => {
  const [selectedView, setSelectedView] = useState<'calls' | 'messages'>('calls');
  const [hoveredCell, setHoveredCell] = useState<{ day: number; hour: number; value: number } | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const renderHeatmap = () => {
    const data = selectedView === 'calls' ? callPatterns.hourlyUsage : messagePatterns.hourlyUsage;
    const maxValue = Math.max(...data.flat());
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">
            {selectedView === 'calls' ? 'Call' : 'Message'} Activity Heatmap
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Low</span>
            <div className="flex space-x-1">
              {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
                <div
                  key={intensity}
                  className="w-4 h-2 rounded"
                  style={{
                    backgroundColor: `rgba(14, 165, 233, ${intensity * 0.8})`
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">High</span>
          </div>
        </div>
        
        <div className="grid grid-cols-25 gap-1">
          {/* Hour labels */}
          <div className="text-xs text-gray-500 text-center py-2"></div>
          {hours.map(hour => (
            <div key={hour} className="text-xs text-gray-500 text-center py-2">
              {hour === 0 ? '12a' : hour === 12 ? '12p' : hour > 12 ? `${hour - 12}p` : `${hour}a`}
            </div>
          ))}
          
          {/* Day rows */}
          {days.map((day, dayIndex) => (
            <React.Fragment key={day}>
              <div className="text-xs text-gray-500 text-right pr-2 py-1 flex items-center">
                {day}
              </div>
              {hours.map(hour => {
                const value = data[dayIndex][hour];
                const intensity = maxValue > 0 ? value / maxValue : 0;
                
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className={clsx(
                      'w-6 h-6 rounded-sm cursor-pointer transition-all duration-200',
                      'hover:scale-125 hover:z-10 relative'
                    )}
                    style={{
                      backgroundColor: `rgba(14, 165, 233, ${intensity * 0.8})`
                    }}
                    onMouseEnter={() => setHoveredCell({ day: dayIndex, hour, value })}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
        
        {/* Tooltip */}
        {hoveredCell && (
          <div className="absolute bg-gray-900 text-white px-2 py-1 rounded text-xs shadow-lg z-20">
            {days[hoveredCell.day]} {hoveredCell.hour}:00 - {hoveredCell.value} {selectedView}
          </div>
        )}
      </div>
    );
  };

  const renderPeakHours = () => {
    const peakData = selectedView === 'calls' ? callPatterns.peakHours : [];
    
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Peak Hours</h4>
        <div className="space-y-2">
          {peakData.slice(0, 5).map((peak, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-ocean-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  {peak.hour === 0 ? '12 AM' : 
                   peak.hour === 12 ? '12 PM' : 
                   peak.hour > 12 ? `${peak.hour - 12} PM` : `${peak.hour} AM`}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {peak.count} {selectedView}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUsageStats = () => {
    const stats = selectedView === 'calls' ? {
      total: callPatterns.totalCalls,
      unique: callPatterns.uniqueNumbers,
      average: callPatterns.averageCallDuration,
      unit: 'min',
      icon: '📞'
    } : {
      total: messagePatterns.totalMessages,
      unique: messagePatterns.uniqueNumbers,
      average: messagePatterns.averageLength,
      unit: 'chars',
      icon: '💬'
    };

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-1">{stats.icon}</div>
          <div className="text-lg font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Total {selectedView}</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-1">👥</div>
          <div className="text-lg font-bold text-gray-900">{stats.unique}</div>
          <div className="text-xs text-gray-500">Unique numbers</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2">
          <div className="text-2xl mb-1">⏱️</div>
          <div className="text-lg font-bold text-gray-900">
            {selectedView === 'calls' ? `${stats.average} min` : `${stats.average} chars`}
          </div>
          <div className="text-xs text-gray-500">
            Average {selectedView === 'calls' ? 'call duration' : 'message length'}
          </div>
        </div>
      </div>
    );
  };

  const renderGeographicSplit = () => {
    const data = callPatterns.domesticVsInternational;
    const total = data.domestic + data.international;
    const domesticPercent = ((data.domestic / total) * 100).toFixed(1);
    const internationalPercent = ((data.international / total) * 100).toFixed(1);

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Geographic Distribution</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-ocean-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Domestic</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{data.domestic}</div>
              <div className="text-xs text-gray-500">{domesticPercent}%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-700">International</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{data.international}</div>
              <div className="text-xs text-gray-500">{internationalPercent}%</div>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-ocean-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${domesticPercent}%` }}
          />
        </div>
      </div>
    );
  };

  const renderInsights = () => {
    const insights = selectedView === 'calls' ? [
      `Your busiest calling hour is ${callPatterns.peakHours[0]?.hour === 0 ? '12 AM' : 
        callPatterns.peakHours[0]?.hour === 12 ? '12 PM' : 
        callPatterns.peakHours[0]?.hour > 12 ? `${callPatterns.peakHours[0].hour - 12} PM` : `${callPatterns.peakHours[0].hour} AM`}`,
      `Average call duration: ${Math.floor(callPatterns.averageCallDuration)}m ${Math.round((callPatterns.averageCallDuration % 1) * 60)}s`,
      `You contact ${callPatterns.uniqueNumbers} unique numbers`,
      `${((callPatterns.domesticVsInternational.domestic / (callPatterns.domesticVsInternational.domestic + callPatterns.domesticVsInternational.international)) * 100).toFixed(1)}% of your calls are domestic`
    ] : [
      `Average message length: ${messagePatterns.averageLength} characters`,
      `Average response time: ${messagePatterns.responseTime} minutes`,
      `You message ${messagePatterns.uniqueNumbers} unique numbers`,
      `Most active messaging day: ${days[messagePatterns.hourlyUsage.reduce((maxDay, day, index) => 
        day.reduce((sum, hour) => sum + hour, 0) > maxDay.total ? { day: index, total: day.reduce((sum, hour) => sum + hour, 0) } : maxDay, 
        { day: 0, total: 0 }).day]}`
    ];

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Key Insights</h4>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-gray-600">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {(['calls', 'messages'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setSelectedView(view)}
            className={clsx(
              'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
              selectedView === view
                ? 'bg-white text-ocean-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <span>{view === 'calls' ? '📞' : '💬'}</span>
            <span className="capitalize">{view}</span>
          </button>
        ))}
      </div>

      {/* Heatmap */}
      <div className="bg-gray-50 rounded-lg p-4">
        {renderHeatmap()}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {renderUsageStats()}
        </div>
        
        <div className="space-y-6">
          {renderPeakHours()}
          {selectedView === 'calls' && renderGeographicSplit()}
        </div>
      </div>

      {/* Insights */}
      <div className="border-t border-gray-200 pt-4">
        {renderInsights()}
      </div>

      {/* Pattern Recommendations */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Optimization Tips</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Schedule important calls during your peak hours for better availability
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Consider international calling plans if you frequently call abroad
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              Use messaging for quick updates to reduce call costs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 