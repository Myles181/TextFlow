import React, { useState, useRef } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Phone, 
  BarChart3, 
  Settings,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { MobileLayout } from './MobileLayout';
import { TouchableArea } from './TouchComponents';
import { useSwipeGestures } from '../../hooks/useGestures';
import { useHapticFeedback } from '../../hooks/useGestures';
import clsx from 'clsx';

interface DashboardWidget {
  id: string;
  type: 'quick-actions' | 'stats' | 'recent-activity' | 'quick-message' | 'quick-call';
  title: string;
  content: React.ReactNode;
  priority: number;
}

interface MobileDashboardProps {
  widgets: DashboardWidget[];
  onWidgetReorder?: (widgets: DashboardWidget[]) => void;
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({
  widgets,
  onWidgetReorder
}) => {
  const [currentWidgetIndex, setCurrentWidgetIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const haptic = useHapticFeedback();
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe between widget categories
  const { onSwipeLeft, onSwipeRight } = useSwipeGestures({
    onSwipeLeft: () => {
      setCurrentWidgetIndex(prev => Math.min(prev + 1, widgets.length - 1));
      haptic.impact('light');
    },
    onSwipeRight: () => {
      setCurrentWidgetIndex(prev => Math.max(prev - 1, 0));
      haptic.impact('light');
    }
  });

  const quickActions = [
    {
      id: 'new-message',
      label: 'New Message',
      icon: MessageSquare,
      color: 'ocean',
      action: () => {
        haptic.impact('medium');
        // Navigate to new message
      }
    },
    {
      id: 'new-call',
      label: 'Make Call',
      icon: Phone,
      color: 'success',
      action: () => {
        haptic.impact('medium');
        // Navigate to new call
      }
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'energy',
      action: () => {
        haptic.impact('medium');
        // Navigate to analytics
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'neutral',
      action: () => {
        haptic.impact('medium');
        // Navigate to settings
      }
    }
  ];

  const QuickActionsWidget = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <TouchableArea onTap={() => setIsEditing(!isEditing)}>
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </TouchableArea>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <TouchableArea
              key={action.id}
              onTap={action.action}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-ocean-300 transition-colors"
            >
              <div className={clsx(
                'w-12 h-12 rounded-full flex items-center justify-center mb-2',
                action.color === 'ocean' && 'bg-ocean-100 text-ocean-600',
                action.color === 'success' && 'bg-success-100 text-success-600',
                action.color === 'energy' && 'bg-energy-100 text-energy-600',
                action.color === 'neutral' && 'bg-gray-100 text-gray-600'
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {action.label}
              </span>
            </TouchableArea>
          );
        })}
      </div>
    </div>
  );

  const StatsWidget = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Stats</h3>
        <TouchableArea onTap={() => {}}>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </TouchableArea>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-ocean-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-ocean-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Messages</p>
              <p className="text-lg font-semibold text-gray-900">24</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-success-600">+12%</p>
            <p className="text-xs text-gray-500">vs yesterday</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Calls</p>
              <p className="text-lg font-semibold text-gray-900">8</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-success-600">+25%</p>
            <p className="text-xs text-gray-500">vs yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );

  const RecentActivityWidget = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <TouchableArea onTap={() => {}}>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </TouchableArea>
      </div>
      
      <div className="space-y-3">
        {[
          { type: 'message', content: 'Message sent to +1 (555) 123-4567', time: '2 min ago', icon: MessageSquare, color: 'ocean' },
          { type: 'call', content: 'Call with +1 (555) 987-6543', time: '15 min ago', icon: Phone, color: 'success' },
          { type: 'message', content: 'Message received from +1 (555) 456-7890', time: '1 hour ago', icon: MessageSquare, color: 'ocean' }
        ].map((activity, index) => {
          const Icon = activity.icon;
          return (
            <TouchableArea
              key={index}
              onTap={() => {}}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center',
                activity.color === 'ocean' && 'bg-ocean-100',
                activity.color === 'success' && 'bg-success-100'
              )}>
                <Icon className={clsx(
                  'w-4 h-4',
                  activity.color === 'ocean' && 'text-ocean-600',
                  activity.color === 'success' && 'text-success-600'
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{activity.content}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </TouchableArea>
          );
        })}
      </div>
    </div>
  );

  const QuickMessageWidget = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Message</h3>
      
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
        <textarea
          placeholder="Type your message..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
        />
        <TouchableArea
          onTap={() => haptic.impact('medium')}
          className="w-full bg-ocean-500 text-white py-3 rounded-lg text-center font-medium hover:bg-ocean-600 transition-colors"
        >
          Send Message
        </TouchableArea>
      </div>
    </div>
  );

  const QuickCallWidget = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Call</h3>
      
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
        <TouchableArea
          onTap={() => haptic.impact('medium')}
          className="w-full bg-success-500 text-white py-3 rounded-lg text-center font-medium hover:bg-success-600 transition-colors"
        >
          Make Call
        </TouchableArea>
      </div>
    </div>
  );

  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'quick-actions':
        return <QuickActionsWidget />;
      case 'stats':
        return <StatsWidget />;
      case 'recent-activity':
        return <RecentActivityWidget />;
      case 'quick-message':
        return <QuickMessageWidget />;
      case 'quick-call':
        return <QuickCallWidget />;
      default:
        return widget.content;
    }
  };

  return (
    <MobileLayout
      title="Dashboard"
      showMenuButton={true}
      showBottomNav={true}
    >
      <div className="p-4 space-y-4">
        {/* Widget carousel */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          {...onSwipeLeft}
          {...onSwipeRight}
        >
          <div className="flex transition-transform duration-300 ease-out">
            {widgets.map((widget, index) => (
              <div
                key={widget.id}
                className="w-full flex-shrink-0"
                style={{ transform: `translateX(-${currentWidgetIndex * 100}%)` }}
              >
                {renderWidget(widget)}
              </div>
            ))}
          </div>
          
          {/* Widget indicators */}
          {widgets.length > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              {widgets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentWidgetIndex(index);
                    haptic.impact('light');
                  }}
                  className={clsx(
                    'w-2 h-2 rounded-full transition-colors',
                    index === currentWidgetIndex
                      ? 'bg-ocean-500'
                      : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating action button */}
        <TouchableArea
          onTap={() => haptic.impact('medium')}
          className="fixed bottom-20 right-4 w-14 h-14 bg-ocean-500 rounded-full shadow-lg flex items-center justify-center z-30"
          style={{ bottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}
        >
          <Plus className="w-6 h-6 text-white" />
        </TouchableArea>
      </div>
    </MobileLayout>
  );
}; 