import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useHapticFeedback } from '../../hooks/useGestures';
import clsx from 'clsx';

interface OfflineIndicatorProps {
  isOnline: boolean;
  lastSyncTime?: Date;
  pendingActions?: number;
  onRetry?: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  lastSyncTime,
  pendingActions = 0,
  onRetry
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const haptic = useHapticFeedback();

  const handleRetry = async () => {
    if (onRetry) {
      setIsRetrying(true);
      haptic.impact('medium');
      
      try {
        await onRetry();
        haptic.notification('success');
      } catch (error) {
        haptic.notification('error');
      } finally {
        setIsRetrying(false);
      }
    }
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (isOnline && pendingActions === 0) {
    return null; // Don't show indicator when online and synced
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main indicator bar */}
      <div 
        className={clsx(
          'px-4 py-2 flex items-center justify-between transition-all duration-300',
          isOnline 
            ? 'bg-ocean-500 text-white' 
            : 'bg-energy-500 text-white'
        )}
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 8px)' }}
      >
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )}
          
          <span className="text-sm font-medium">
            {isOnline ? 'Online' : 'Offline'}
          </span>
          
          {pendingActions > 0 && (
            <div className="flex items-center space-x-1">
              <RefreshCw className={clsx(
                'w-3 h-3',
                isRetrying && 'animate-spin'
              )} />
              <span className="text-xs">
                {pendingActions} pending
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {onRetry && (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={clsx(
                'w-4 h-4',
                isRetrying && 'animate-spin'
              )} />
            </button>
          )}
          
          <button
            onClick={() => {
              setShowDetails(!showDetails);
              haptic.impact('light');
            }}
            className="p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <span className="text-xs">•••</span>
          </button>
        </div>
      </div>

      {/* Details panel */}
      {showDetails && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="space-y-3">
            {/* Connection status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Connection</span>
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    <span className="text-sm font-medium text-success-600">Connected</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-energy-500" />
                    <span className="text-sm font-medium text-energy-600">Disconnected</span>
                  </>
                )}
              </div>
            </div>

            {/* Last sync */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last sync</span>
              <span className="text-sm text-gray-900">
                {formatLastSync(lastSyncTime)}
              </span>
            </div>

            {/* Pending actions */}
            {pendingActions > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending actions</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {pendingActions}
                  </span>
                  {onRetry && (
                    <button
                      onClick={handleRetry}
                      disabled={isRetrying}
                      className="px-3 py-1 bg-ocean-500 text-white text-xs rounded-lg hover:bg-ocean-600 transition-colors disabled:opacity-50"
                    >
                      {isRetrying ? 'Syncing...' : 'Sync Now'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Offline features */}
            {!isOnline && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Available offline:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• View recent messages and calls</li>
                  <li>• Compose new messages (will send when online)</li>
                  <li>• Access saved contacts</li>
                  <li>• View analytics data</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 