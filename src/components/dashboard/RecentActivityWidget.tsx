import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, MessageSquare, Clock, User } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'call' | 'message';
  contact: string;
  phoneNumber: string;
  timestamp: Date;
  duration?: number; // for calls
  preview?: string; // for messages
  status: 'completed' | 'missed' | 'failed' | 'sent' | 'delivered' | 'read';
}

interface RecentActivityWidgetProps {
  activities: ActivityItem[];
}

const getStatusColor = (status: ActivityItem['status']) => {
  switch (status) {
    case 'completed':
    case 'delivered':
    case 'read':
      return 'text-success-600 bg-success-50';
    case 'missed':
    case 'failed':
      return 'text-error-600 bg-error-50';
    case 'sent':
      return 'text-ocean-600 bg-ocean-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getStatusText = (status: ActivityItem['status']) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'missed':
      return 'Missed';
    case 'failed':
      return 'Failed';
    case 'sent':
      return 'Sent';
    case 'delivered':
      return 'Delivered';
    case 'read':
      return 'Read';
    default:
      return 'Unknown';
  }
};

const getCallIcon = (type: 'call', status: ActivityItem['status']) => {
  if (status === 'missed') return PhoneMissed;
  if (status === 'completed') return PhoneOutgoing;
  return PhoneIncoming;
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500 mt-1">Your latest calls and messages</p>
        </div>
        <div className="w-8 h-8 bg-ocean-50 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-ocean-600" />
        </div>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No recent activity</p>
            <p className="text-gray-400 text-xs mt-1">Start by making a call or sending a message</p>
          </div>
        ) : (
          activities.map((activity, index) => {
            const IconComponent = activity.type === 'call' 
              ? getCallIcon(activity.type, activity.status)
              : MessageSquare;

            return (
              <div
                key={activity.id}
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer activity-item"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'call' 
                    ? 'bg-ocean-50 text-ocean-600' 
                    : 'bg-energy-50 text-energy-600'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">
                        {activity.contact || 'Unknown'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {getStatusText(activity.status)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {formatRelativeTime(activity.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="truncate">{activity.phoneNumber}</span>
                      {activity.type === 'call' && activity.duration && (
                        <span className="text-xs text-gray-400">
                          {formatDuration(activity.duration)}
                        </span>
                      )}
                    </div>
                  </div>

                  {activity.type === 'message' && activity.preview && (
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {activity.preview.length > 50 
                        ? `${activity.preview.substring(0, 50)}...` 
                        : activity.preview
                      }
                    </p>
                  )}
                </div>

                {/* Hover indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2 h-2 bg-ocean-500 rounded-full"></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View all link */}
      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-sm text-ocean-600 hover:text-ocean-700 font-medium transition-colors duration-200">
            View all activity →
          </button>
        </div>
      )}
    </div>
  );
}; 