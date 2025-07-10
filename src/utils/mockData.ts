import { Phone, MessageSquare, Calendar, Globe, Zap, Star, Award, Users } from 'lucide-react';

// Activity types for recent activity
export interface ActivityItem {
  id: string;
  type: 'call' | 'message';
  contact: string;
  phoneNumber: string;
  timestamp: Date;
  duration?: number;
  preview?: string;
  status: 'completed' | 'missed' | 'failed' | 'sent' | 'delivered' | 'read';
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  progress?: number;
  unlockedDate?: Date;
  isNew?: boolean;
}

// Main dashboard data
export const mockDashboardData = {
  // Active number data
  activeNumber: '+1 (555) 123-4567',
  signalStrength: 4,
  accountBalance: 25.50,
  isOnline: true,

  // Recent activity data
  recentActivity: [
    {
      id: '1',
      type: 'call' as const,
      contact: 'John Smith',
      phoneNumber: '+1 (555) 987-6543',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      duration: 325, // 5:25
      status: 'completed' as const
    },
    {
      id: '2',
      type: 'message' as const,
      contact: 'Sarah Johnson',
      phoneNumber: '+1 (555) 456-7890',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      preview: 'Thanks for the update! I\'ll get back to you soon.',
      status: 'read' as const
    },
    {
      id: '3',
      type: 'call' as const,
      contact: 'Unknown',
      phoneNumber: '+1 (555) 111-2222',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      status: 'missed' as const
    },
    {
      id: '4',
      type: 'message' as const,
      contact: 'Mike Wilson',
      phoneNumber: '+1 (555) 333-4444',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      preview: 'Can we schedule a meeting for tomorrow?',
      status: 'delivered' as const
    },
    {
      id: '5',
      type: 'call' as const,
      contact: 'Lisa Brown',
      phoneNumber: '+1 (555) 555-6666',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      duration: 180, // 3:00
      status: 'completed' as const
    },
    {
      id: '6',
      type: 'message' as const,
      contact: 'David Lee',
      phoneNumber: '+1 (555) 777-8888',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      preview: 'The project is ready for review.',
      status: 'sent' as const
    },
    {
      id: '7',
      type: 'call' as const,
      contact: 'Unknown',
      phoneNumber: '+1 (555) 999-0000',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: 'failed' as const
    },
    {
      id: '8',
      type: 'message' as const,
      contact: 'Emma Davis',
      phoneNumber: '+1 (555) 123-4567',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      preview: 'Happy birthday! 🎉',
      status: 'read' as const
    },
    {
      id: '9',
      type: 'call' as const,
      contact: 'Robert Taylor',
      phoneNumber: '+1 (555) 234-5678',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      duration: 420, // 7:00
      status: 'completed' as const
    },
    {
      id: '10',
      type: 'message' as const,
      contact: 'Jennifer White',
      phoneNumber: '+1 (555) 345-6789',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      preview: 'I\'ll send you the documents by EOD.',
      status: 'delivered' as const
    }
  ] as ActivityItem[],

  // Usage data
  usageData: {
    callMinutes: 127,
    messagesSent: 89,
    dataUsed: 2.4,
    period: 'week' as const
  },

  // Weekly trend data (last 7 days)
  weeklyTrend: [12, 18, 15, 22, 19, 25, 16],

  // Monthly comparison
  monthlyComparison: {
    calls: 156,
    messages: 234
  },

  // Cost savings
  costSavings: 45.75,

  // Account summary data
  accountSummary: {
    currentPlan: 'Pro',
    billingCycle: 'Monthly',
    nextBillDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // 18 days from now
    currentBalance: 25.50,
    monthlyUsage: {
      calls: 156,
      messages: 234,
      cost: 34.50
    },
    planLimits: {
      calls: 500,
      messages: 1000,
      cost: 50.00
    }
  },

  // Achievements data
  achievements: [
    {
      id: 'first-call',
      title: 'First Call',
      description: 'Made your first call',
      icon: Phone,
      unlocked: true,
      unlockedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      isNew: false
    },
    {
      id: 'chatterbox',
      title: 'Chatterbox',
      description: 'Sent 100 messages',
      icon: MessageSquare,
      unlocked: true,
      unlockedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      isNew: false
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: '7 days active',
      icon: Calendar,
      unlocked: true,
      unlockedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isNew: true
    },
    {
      id: 'international',
      title: 'International',
      description: 'Called 3 countries',
      icon: Globe,
      unlocked: false,
      progress: 67 // 2 out of 3 countries
    },
    {
      id: 'power-user',
      title: 'Power User',
      description: 'Used all features',
      icon: Zap,
      unlocked: false,
      progress: 80
    },
    {
      id: 'social-butterfly',
      title: 'Social Butterfly',
      description: 'Contacted 50 people',
      icon: Users,
      unlocked: false,
      progress: 45 // 22 out of 50 people
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Made calls before 9 AM',
      icon: Star,
      unlocked: false,
      progress: 30
    },
    {
      id: 'loyal-customer',
      title: 'Loyal Customer',
      description: '30 days of service',
      icon: Award,
      unlocked: false,
      progress: 60 // 18 out of 30 days
    }
  ] as Achievement[]
};

// Helper function to get recent activity (last 10 items)
export const getRecentActivity = () => {
  return mockDashboardData.recentActivity.slice(0, 10);
};

// Helper function to get achievements
export const getAchievements = () => {
  return mockDashboardData.achievements;
};

// Helper function to get usage data
export const getUsageData = () => {
  return mockDashboardData.usageData;
};

// Helper function to get account summary
export const getAccountSummary = () => {
  return mockDashboardData.accountSummary;
}; 