import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, ZoomIn, ZoomOut } from 'lucide-react';
import clsx from 'clsx';

interface UsageDataPoint {
  date: string;
  calls: number;
  messages: number;
  cost: number;
  callDuration: number;
}

interface UsageTrendsChartProps {
  data: UsageDataPoint[];
  timeRange: string;
  comparisonMode: string;
}

interface ChartPoint {
  x: number;
  y: number;
  value: number;
  date: string;
}

export const UsageTrendsChart: React.FC<UsageTrendsChartProps> = ({
  data,
  timeRange,
  comparisonMode
}) => {
  const [visibleMetrics, setVisibleMetrics] = useState({
    calls: true,
    messages: true,
    cost: true
  });
  
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const chartHeight = 300;
  const chartPadding = { top: 20, right: 40, bottom: 40, left: 60 };

  const metrics = [
    { key: 'calls', label: 'Calls', color: '#0ea5e9', icon: '📞' },
    { key: 'messages', label: 'Messages', color: '#10b981', icon: '💬' },
    { key: 'cost', label: 'Cost', color: '#f59e0b', icon: '💰' }
  ];

  const toggleMetric = (metric: string) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric as keyof typeof prev]
    }));
  };

  const processData = (): ChartPoint[][] => {
    if (!data.length) return [];

    const chartWidth = chartRef.current?.clientWidth || 800;
    const availableWidth = chartWidth - chartPadding.left - chartPadding.right;
    const availableHeight = chartHeight - chartPadding.top - chartPadding.bottom;

    return metrics.map(metric => {
      const values = data.map(d => d[metric.key as keyof UsageDataPoint] as number);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);

      return data.map((point, index) => {
        const value = point[metric.key as keyof UsageDataPoint] as number;
        const x = chartPadding.left + (index / (data.length - 1)) * availableWidth;
        const y = chartPadding.top + availableHeight - 
          ((value - minValue) / (maxValue - minValue)) * availableHeight;

        return {
          x,
          y,
          value,
          date: point.date
        };
      });
    });
  };

  const chartData = processData();

  const formatValue = (value: number, metric: string) => {
    if (metric === 'cost') {
      return `$${value.toFixed(2)}`;
    } else if (metric === 'calls') {
      return `${value} calls`;
    } else {
      return `${value} messages`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    switch (timeRange) {
      case 'week':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case 'month':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'quarter':
        return date.toLocaleDateString('en-US', { month: 'short' });
      case 'year':
        return date.toLocaleDateString('en-US', { month: 'short' });
      default:
        return date.toLocaleDateString();
    }
  };

  const renderLine = (points: ChartPoint[], color: string, metricKey: string) => {
    if (points.length < 2) return null;

    const pathData = points
      .map((point, index) => {
        if (index === 0) return `M ${point.x} ${point.y}`;
        return `L ${point.x} ${point.y}`;
      })
      .join(' ');

    return (
      <g key={metricKey}>
        {/* Gradient fill */}
        <defs>
          <linearGradient id={`gradient-${metricKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <path
          d={`${pathData} L ${points[points.length - 1].x} ${chartHeight - chartPadding.bottom} L ${points[0].x} ${chartHeight - chartPadding.bottom} Z`}
          fill={`url(#gradient-${metricKey})`}
          className="transition-opacity duration-300"
        />
        
        {/* Line */}
        <path
          d={pathData}
          stroke={color}
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={color}
            className="transition-all duration-200 hover:r-6 cursor-pointer"
            onMouseEnter={() => setHoveredPoint({ ...point, metricKey })}
            onMouseLeave={() => setHoveredPoint(null)}
          />
        ))}
      </g>
    );
  };

  const renderGrid = () => {
    const chartWidth = chartRef.current?.clientWidth || 800;
    const availableWidth = chartWidth - chartPadding.left - chartPadding.right;
    const availableHeight = chartHeight - chartPadding.top - chartPadding.bottom;

    const gridLines = [];
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = chartPadding.top + (i / 5) * availableHeight;
      gridLines.push(
        <line
          key={`h-${i}`}
          x1={chartPadding.left}
          y1={y}
          x2={chartWidth - chartPadding.right}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      );
    }

    // Vertical grid lines
    for (let i = 0; i < data.length; i++) {
      const x = chartPadding.left + (i / (data.length - 1)) * availableWidth;
      gridLines.push(
        <line
          key={`v-${i}`}
          x1={x}
          y1={chartPadding.top}
          x2={x}
          y2={chartHeight - chartPadding.bottom}
          stroke="#e5e7eb"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      );
    }

    return gridLines;
  };

  const renderAxis = () => {
    const chartWidth = chartRef.current?.clientWidth || 800;
    
    return (
      <g>
        {/* X-axis */}
        <line
          x1={chartPadding.left}
          y1={chartHeight - chartPadding.bottom}
          x2={chartWidth - chartPadding.right}
          y2={chartHeight - chartPadding.bottom}
          stroke="#9ca3af"
          strokeWidth="1"
        />
        
        {/* Y-axis */}
        <line
          x1={chartPadding.left}
          y1={chartPadding.top}
          x2={chartPadding.left}
          y2={chartHeight - chartPadding.bottom}
          stroke="#9ca3af"
          strokeWidth="1"
        />
        
        {/* X-axis labels */}
        {data.map((point, index) => {
          const x = chartPadding.left + (index / (data.length - 1)) * 
            (chartWidth - chartPadding.left - chartPadding.right);
          
          return (
            <text
              key={`x-${index}`}
              x={x}
              y={chartHeight - chartPadding.bottom + 20}
              textAnchor="middle"
              className="text-xs text-gray-500"
            >
              {formatDate(point.date)}
            </text>
          );
        })}
      </g>
    );
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Show metrics:</span>
          <div className="flex space-x-2">
            {metrics.map(metric => (
              <button
                key={metric.key}
                onClick={() => toggleMetric(metric.key)}
                className={clsx(
                  'flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  visibleMetrics[metric.key as keyof typeof visibleMetrics]
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <span>{metric.icon}</span>
                <span>{metric.label}</span>
                {visibleMetrics[metric.key as keyof typeof visibleMetrics] ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div 
        ref={chartRef}
        className={clsx(
          'bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300',
          isZoomed ? 'scale-105' : 'scale-100'
        )}
      >
        <svg
          width="100%"
          height={chartHeight}
          className="overflow-visible"
        >
          {/* Grid */}
          {renderGrid()}
          
          {/* Axis */}
          {renderAxis()}
          
          {/* Chart lines */}
          {chartData.map((points, index) => {
            const metric = metrics[index];
            if (!visibleMetrics[metric.key as keyof typeof visibleMetrics]) return null;
            return renderLine(points, metric.color, metric.key);
          })}
        </svg>
      </div>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg z-10"
          style={{
            left: hoveredPoint.x + 10,
            top: hoveredPoint.y - 40,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-medium">
            {formatDate(hoveredPoint.date)}
          </div>
          <div className="text-gray-300">
            {formatValue(hoveredPoint.value, hoveredPoint.metricKey)}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        {metrics.map(metric => (
          <div key={metric.key} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: metric.color }}
            />
            <span className="text-sm text-gray-600">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(metric => {
          const values = data.map(d => d[metric.key as keyof UsageDataPoint] as number);
          const total = values.reduce((sum, val) => sum + val, 0);
          const average = total / values.length;
          
          return (
            <div key={metric.key} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {formatValue(total, metric.key)}
              </div>
              <div className="text-sm text-gray-600">Total {metric.label}</div>
              <div className="text-xs text-gray-500">
                Avg: {formatValue(average, metric.key)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 