import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

interface MetricCard {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'success' | 'energy' | 'ocean' | 'purple' | 'neutral';
  description?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    percentage: number;
    period: string;
  };
}

interface MetricsCardsProps {
  data: MetricCard[];
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ data }) => {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    // Animate values on mount
    data.forEach((metric) => {
      if (typeof metric.value === 'number') {
        const startValue = 0;
        const endValue = metric.value;
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = startValue + (endValue - startValue) * easeOutQuart;

          setAnimatedValues(prev => ({
            ...prev,
            [metric.title]: Math.round(currentValue)
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      }
    });
  }, [data]);

  const getColorClasses = (color: MetricCard['color']) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success-100',
          icon: 'text-success-700',
          border: 'border-success-300',
          trend: 'text-success-700',
          trendBg: 'bg-success-200'
        };
      case 'energy':
        return {
          bg: 'bg-energy-100',
          icon: 'text-energy-700',
          border: 'border-energy-300',
          trend: 'text-energy-700',
          trendBg: 'bg-energy-200'
        };
      case 'ocean':
        return {
          bg: 'bg-ocean-100',
          icon: 'text-ocean-700',
          border: 'border-ocean-300',
          trend: 'text-ocean-700',
          trendBg: 'bg-ocean-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          icon: 'text-purple-700',
          border: 'border-purple-300',
          trend: 'text-purple-700',
          trendBg: 'bg-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-100',
          icon: 'text-gray-700',
          border: 'border-gray-300',
          trend: 'text-gray-700',
          trendBg: 'bg-gray-200'
        };
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const formatValue = (value: number | string, unit?: string) => {
    if (typeof value === 'string') return value;
    
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ''}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${unit ? ` ${unit}` : ''}`;
    } else {
      return `${value}${unit ? ` ${unit}` : ''}`;
    }
  };

  const getDisplayValue = (metric: MetricCard) => {
    if (typeof metric.value === 'string') return metric.value;
    
    const animatedValue = animatedValues[metric.title];
    if (animatedValue !== undefined) {
      return formatValue(animatedValue, metric.unit);
    }
    
    return formatValue(metric.value, metric.unit);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((metric, index) => {
        const colors = getColorClasses(metric.color);
        const Icon = metric.icon;
        
        return (
          <div
            key={metric.title}
            className={clsx(
              'bg-white border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 relative',
              colors.border
            )}
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={clsx(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                colors.bg
              )}>
                <Icon className={clsx('w-6 h-6', colors.icon)} />
              </div>
              
              {metric.trend && (
                <div className={clsx(
                  'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
                  colors.trendBg,
                  colors.trend
                )}>
                  {getTrendIcon(metric.trend.direction)}
                  <span>{Math.abs(metric.trend.percentage)}%</span>
                </div>
              )}
            </div>
            
            {/* Value */}
            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900">
                {getDisplayValue(metric)}
              </div>
              <div className="text-sm text-gray-600">
                {metric.title}
              </div>
            </div>
            
            {/* Description */}
            {metric.description && (
              <p className="text-xs text-gray-500 mb-3">
                {metric.description}
              </p>
            )}
            
            {/* Trend Details */}
            {metric.trend && (
              <div className="flex items-center justify-between text-xs">
                <span className={clsx(
                  'flex items-center space-x-1',
                  metric.trend.direction === 'up' ? 'text-success-600' : 
                  metric.trend.direction === 'down' ? 'text-energy-600' : 'text-gray-500'
                )}>
                  {getTrendIcon(metric.trend.direction)}
                  <span>
                    {metric.trend.direction === 'up' ? '+' : ''}
                    {metric.trend.percentage}%
                  </span>
                </span>
                <span className="text-gray-400">
                  {metric.trend.period}
                </span>
              </div>
            )}
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl" />
          </div>
        );
      })}
    </div>
  );
}; 