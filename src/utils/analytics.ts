// Analytics utility functions

export interface RawUsageData {
  date: string;
  calls: number;
  messages: number;
  cost: number;
  callDuration: number;
}

export interface ChartData {
  date: string;
  value: number;
  label: string;
}

export interface TrendData {
  direction: 'up' | 'down' | 'neutral';
  percentage: number;
  period: string;
}

export interface Insight {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
}

export const analyticsUtils = {
  // Process raw usage data into chart-friendly format
  processUsageData: (rawData: RawUsageData[], timeRange: string): ChartData[] => {
    return rawData.map(item => ({
      date: item.date,
      value: item.calls + item.messages,
      label: `${item.calls} calls, ${item.messages} messages`
    }));
  },
  
  // Calculate trends and percentage changes
  calculateTrend: (current: number, previous: number): TrendData => {
    if (previous === 0) {
      return { direction: 'neutral', percentage: 0, period: 'vs previous period' };
    }
    
    const change = ((current - previous) / previous) * 100;
    const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
    
    return {
      direction,
      percentage: Math.abs(change),
      period: 'vs previous period'
    };
  },
  
  // Group data by time periods
  groupByTimePeriod: (data: any[], period: 'hour' | 'day' | 'week' | 'month') => {
    const groups: { [key: string]: any[] } = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      let key = '';
      
      switch (period) {
        case 'hour':
          key = date.toISOString().slice(0, 13);
          break;
        case 'day':
          key = date.toISOString().slice(0, 10);
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().slice(0, 10);
          break;
        case 'month':
          key = date.toISOString().slice(0, 7);
          break;
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    
    return Object.entries(groups).map(([key, items]) => ({
      period: key,
      data: items,
      total: items.reduce((sum: number, item: any) => sum + (item.value || 0), 0)
    }));
  },
  
  // Format numbers for display
  formatMetric: (value: number, type: 'currency' | 'duration' | 'count'): string => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      
      case 'duration':
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}m ${seconds}s`;
      
      case 'count':
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
      
      default:
        return value.toString();
    }
  },
  
  // Generate insights from data patterns
  generateInsights: (data: RawUsageData[]): Insight[] => {
    const insights: Insight[] = [];
    
    // Calculate averages
    const avgCalls = data.reduce((sum, item) => sum + item.calls, 0) / data.length;
    const avgMessages = data.reduce((sum, item) => sum + item.messages, 0) / data.length;
    const avgCost = data.reduce((sum, item) => sum + item.cost, 0) / data.length;
    
    // Peak usage analysis
    const peakDay = data.reduce((max, item) => 
      (item.calls + item.messages) > (max.calls + max.messages) ? item : max
    );
    
    // Cost analysis
    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    const costTrend = analyticsUtils.calculateTrend(
      data.slice(-7).reduce((sum, item) => sum + item.cost, 0),
      data.slice(-14, -7).reduce((sum, item) => sum + item.cost, 0)
    );
    
    // Add insights based on patterns
    if (avgCalls > 20) {
      insights.push({
        title: 'High Call Volume',
        description: `You average ${Math.round(avgCalls)} calls per day`,
        type: 'positive',
        impact: 'medium'
      });
    }
    
    if (costTrend.direction === 'down') {
      insights.push({
        title: 'Cost Optimization',
        description: `Your costs decreased by ${costTrend.percentage.toFixed(1)}%`,
        type: 'positive',
        impact: 'high'
      });
    }
    
    if (avgCost > 3) {
      insights.push({
        title: 'High Daily Spending',
        description: `Average daily cost is $${avgCost.toFixed(2)}`,
        type: 'negative',
        impact: 'medium'
      });
    }
    
    return insights;
  },
  
  // Export data to CSV/JSON
  exportData: (data: any[], format: 'csv' | 'json'): string => {
    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }
    
    // CSV export
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  },
  
  // Calculate percentage change
  percentageChange: (oldValue: number, newValue: number): number => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  },
  
  // Format date for display
  formatDate: (dateString: string, format: 'short' | 'long' = 'short'): string => {
    const date = new Date(dateString);
    
    if (format === 'long') {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  },
  
  // Get color for trend direction
  getTrendColor: (direction: 'up' | 'down' | 'neutral'): string => {
    switch (direction) {
      case 'up':
        return '#10b981'; // success-500
      case 'down':
        return '#f59e0b'; // energy-500
      default:
        return '#6b7280'; // gray-500
    }
  },
  
  // Calculate moving average
  movingAverage: (data: number[], window: number): number[] => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - window + 1);
      const values = data.slice(start, i + 1);
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      result.push(average);
    }
    return result;
  }
}; 