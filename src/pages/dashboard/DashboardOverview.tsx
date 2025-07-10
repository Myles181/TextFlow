import React, { useEffect, useState } from 'react';
import { 
  ActiveNumberWidget, 
  QuickActionsWidget, 
  RecentActivityWidget, 
  UsageOverviewWidget, 
  AccountSummaryWidget, 
  AchievementsWidget 
} from '../../components/dashboard';
import { 
  mockDashboardData, 
  getRecentActivity, 
  getAchievements, 
  getUsageData, 
  getAccountSummary 
} from '../../utils/mockData';

export const DashboardOverview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your TextFlow account today.
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Active Number Widget - Large */}
        <div className="lg:col-span-1 dashboard-widget widget-hover">
          <ActiveNumberWidget
            phoneNumber={mockDashboardData.activeNumber}
            signalStrength={mockDashboardData.signalStrength}
            accountBalance={mockDashboardData.accountBalance}
            isOnline={mockDashboardData.isOnline}
          />
        </div>

        {/* Quick Actions Widget - Medium */}
        <div className="lg:col-span-1 dashboard-widget widget-hover">
          <QuickActionsWidget />
        </div>

        {/* Recent Activity Widget - Medium */}
        <div className="lg:col-span-1 dashboard-widget widget-hover">
          <RecentActivityWidget activities={getRecentActivity()} />
        </div>

        {/* Usage Overview Widget - Large */}
        <div className="lg:col-span-2 dashboard-widget widget-hover">
          <UsageOverviewWidget
            usageData={getUsageData()}
            weeklyTrend={mockDashboardData.weeklyTrend}
            monthlyComparison={mockDashboardData.monthlyComparison}
            costSavings={mockDashboardData.costSavings}
          />
        </div>

        {/* Account Summary Widget - Medium */}
        <div className="lg:col-span-1 dashboard-widget widget-hover">
          <AccountSummaryWidget
            currentPlan={getAccountSummary().currentPlan}
            billingCycle={getAccountSummary().billingCycle}
            nextBillDate={getAccountSummary().nextBillDate}
            currentBalance={getAccountSummary().currentBalance}
            monthlyUsage={getAccountSummary().monthlyUsage}
            planLimits={getAccountSummary().planLimits}
          />
        </div>

        {/* Achievements Widget - Large */}
        <div className="lg:col-span-2 dashboard-widget widget-hover">
          <AchievementsWidget achievements={getAchievements()} />
        </div>
      </div>
    </div>
  );
}; 