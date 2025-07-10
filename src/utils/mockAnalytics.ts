import { Phone, MessageSquare, DollarSign, Clock } from 'lucide-react';

// Generate realistic usage data with trends and patterns
const generateUsageData = (timeRange: string) => {
  const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : timeRange === 'quarter' ? 90 : 365;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    // Add some realistic patterns
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isHoliday = date.getMonth() === 11 && date.getDate() > 20; // Christmas period
    const baseMultiplier = isWeekend ? 0.7 : isHoliday ? 0.5 : 1;
    
    const calls = Math.floor((Math.random() * 20 + 10) * baseMultiplier);
    const messages = Math.floor((Math.random() * 30 + 15) * baseMultiplier);
    const cost = (calls * 0.02) + (messages * 0.01) + (Math.random() * 2);
    const callDuration = Math.random() * 5 + 2; // 2-7 minutes average
    
    data.push({
      date: date.toISOString().split('T')[0],
      calls,
      messages,
      cost: parseFloat(cost.toFixed(2)),
      callDuration: parseFloat(callDuration.toFixed(1))
    });
  }
  
  return data;
};

// Generate cost data with breakdown
const generateCostData = (timeRange: string) => {
  const currentPeriod = {
    totalCost: 45.60,
    costBreakdown: {
      calls: 28.40,
      messages: 8.92,
      numbersMonthly: 5.00,
      additionalFeatures: 3.28
    },
    averageCostPerDay: 1.52,
    mostExpensiveDay: {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      cost: 3.85,
      reason: 'High international call volume'
    }
  };
  
  const previousPeriod = {
    totalCost: 53.80,
    costBreakdown: {
      calls: 32.10,
      messages: 10.20,
      numbersMonthly: 5.00,
      additionalFeatures: 6.50
    },
    averageCostPerDay: 1.79,
    mostExpensiveDay: {
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      cost: 4.20,
      reason: 'Premium feature usage'
    }
  };
  
  const savingsComparison = {
    vsTraditional: 67.40,
    vsCompetitor: 45.20,
    monthlySavings: 21.90,
    yearlySavings: 262.80
  };
  
  return {
    current: currentPeriod,
    previous: previousPeriod,
    savings: savingsComparison
  };
};

// Generate communication patterns
const generatePatternData = (timeRange: string) => {
  // Generate hourly usage patterns (7 days x 24 hours)
  const callHourlyUsage = Array.from({ length: 7 }, () => 
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 5))
  );
  
  const messageHourlyUsage = Array.from({ length: 7 }, () => 
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 8))
  );
  
  // Add peak hours
  callHourlyUsage.forEach(day => {
    day[14] = Math.floor(Math.random() * 10) + 8; // 2 PM peak
    day[10] = Math.floor(Math.random() * 8) + 5;  // 10 AM peak
  });
  
  messageHourlyUsage.forEach(day => {
    day[20] = Math.floor(Math.random() * 15) + 10; // 8 PM peak
    day[12] = Math.floor(Math.random() * 12) + 8;  // 12 PM peak
  });
  
  const callPatterns = {
    hourlyUsage: callHourlyUsage,
    peakHours: [
      { hour: 14, count: 12 },
      { hour: 10, count: 9 },
      { hour: 16, count: 8 },
      { hour: 11, count: 7 },
      { hour: 15, count: 6 }
    ],
    averageCallDuration: 3.75,
    totalCalls: 1247,
    uniqueNumbers: 45,
    domesticVsInternational: { domestic: 1180, international: 67 }
  };
  
  const messagePatterns = {
    hourlyUsage: messageHourlyUsage,
    averageLength: 28,
    totalMessages: 892,
    uniqueNumbers: 52,
    responseTime: 4.2
  };
  
  return {
    calls: callPatterns,
    messages: messagePatterns
  };
};

// Generate performance data
const generatePerformanceData = (timeRange: string) => {
  const callQuality = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    callQuality: 4.2 + (Math.random() * 0.6),
    connectionTime: 1.2 + (Math.random() * 0.8),
    dropRate: 0.3 + (Math.random() * 0.4)
  }));
  
  const deliveryRates = {
    smsDeliveryRate: 99.2,
    mmsDeliveryRate: 98.7,
    averageDeliveryTime: 2.1
  };
  
  const uptime = {
    currentUptime: 99.97,
    lastDowntime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    averageResponseTime: 145,
    totalIncidents: 2
  };
  
  return {
    callQuality,
    deliveryRates,
    uptime
  };
};

// Generate geographic usage data
const generateGeographicData = () => {
  const countries = [
    { code: 'US', name: 'United States', calls: 980, messages: 720, cost: 28.40 },
    { code: 'CA', name: 'Canada', calls: 45, messages: 38, cost: 2.10 },
    { code: 'GB', name: 'United Kingdom', calls: 32, messages: 28, cost: 1.85 },
    { code: 'DE', name: 'Germany', calls: 28, messages: 25, cost: 1.65 },
    { code: 'AU', name: 'Australia', calls: 25, messages: 22, cost: 1.45 },
    { code: 'FR', name: 'France', calls: 18, messages: 15, cost: 1.20 },
    { code: 'JP', name: 'Japan', calls: 15, messages: 12, cost: 1.05 },
    { code: 'MX', name: 'Mexico', calls: 12, messages: 10, cost: 0.85 },
    { code: 'BR', name: 'Brazil', calls: 10, messages: 8, cost: 0.75 },
    { code: 'IN', name: 'India', calls: 8, messages: 6, cost: 0.65 }
  ];
  
  return countries.map(country => ({
    countryCode: country.code,
    countryName: country.name,
    callCount: country.calls,
    messageCount: country.messages,
    totalCost: country.cost,
    coordinates: [0, 0] // Would be actual coordinates in real implementation
  }));
};

// Generate insights
const generateInsights = () => {
  return [
    {
      title: "Peak Usage Time",
      description: "Your busiest calling hour is 2 PM with 12 calls on average"
    },
    {
      title: "Cost Optimization",
      description: "You saved 15% this month by using TextFlow's international rates"
    },
    {
      title: "Message Patterns",
      description: "You send 28% more messages on weekends than weekdays"
    },
    {
      title: "Quality Improvement",
      description: "Call quality improved by 8% compared to last month"
    },
    {
      title: "Geographic Reach",
      description: "You communicate with 10 different countries monthly"
    },
    {
      title: "Savings Milestone",
      description: "You've saved $262.80 annually vs traditional carriers"
    }
  ];
};

// Generate key metrics
const generateMetrics = () => {
  return [
    {
      title: 'Total Minutes Used',
      value: 1247,
      unit: 'min',
      trend: { direction: 'up', percentage: 12, period: 'vs last month' },
      icon: Phone,
      color: 'ocean',
      description: 'Voice call minutes'
    },
    {
      title: 'Messages Sent',
      value: 892,
      unit: 'messages',
      trend: { direction: 'up', percentage: 8, period: 'vs last month' },
      icon: MessageSquare,
      color: 'success',
      description: 'SMS and MMS'
    },
    {
      title: 'Total Cost',
      value: '$45.60',
      trend: { direction: 'down', percentage: 15, period: 'vs last month' },
      icon: DollarSign,
      color: 'energy',
      description: 'Monthly spending'
    },
    {
      title: 'Cost Per Minute',
      value: '$0.037',
      trend: { direction: 'down', percentage: 3, period: 'vs last month' },
      icon: Clock,
      color: 'success',
      description: 'Average rate'
    }
  ];
};

export const generateMockAnalytics = (timeRange: string) => {
  return {
    usage: generateUsageData(timeRange),
    costs: generateCostData(timeRange),
    patterns: generatePatternData(timeRange),
    performance: generatePerformanceData(timeRange),
    geographic: generateGeographicData(),
    insights: generateInsights(),
    metrics: generateMetrics()
  };
}; 