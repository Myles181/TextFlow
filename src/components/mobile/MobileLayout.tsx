import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MoreVertical, 
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
import { MobileNavigation } from './MobileNavigation';
import { useSwipeGestures } from '../../hooks/useGestures';
import { useHapticFeedback } from '../../hooks/useGestures';
import clsx from 'clsx';

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  headerActions?: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showMenuButton?: boolean;
  onMenuToggle?: () => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  showBottomNav = true,
  headerActions,
  title,
  showBackButton = false,
  onBack,
  showMenuButton = false,
  onMenuToggle
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pullToRefreshState, setPullToRefreshState] = useState<'idle' | 'pulling' | 'refreshing'>('idle');
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const haptic = useHapticFeedback();
  const navigate = useNavigate();
  const location = useLocation();

  // Swipe gestures for sidebar
  const { onSwipeRight } = useSwipeGestures({
    onSwipeRight: () => {
      if (showMenuButton) {
        setIsSidebarOpen(true);
        haptic.impact('light');
      }
    }
  });

  // Pull to refresh functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0].clientY > 100) return; // Only at top of screen
    
    const startY = e.touches[0].clientY;
    const startScrollY = window.scrollY;
    
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (startScrollY === 0 && deltaY > 0) {
        e.preventDefault();
        const pullDistance = Math.min(deltaY * 0.5, 150);
        setPullDistance(pullDistance);
        
        if (pullDistance > 80) {
          setPullToRefreshState('pulling');
        } else {
          setPullToRefreshState('idle');
        }
      }
    };
    
    const handleTouchEnd = () => {
      if (pullToRefreshState === 'pulling') {
        setPullToRefreshState('refreshing');
        haptic.impact('medium');
        
        // Simulate refresh
        setTimeout(() => {
          setPullToRefreshState('idle');
          setPullDistance(0);
          haptic.notification('success');
        }, 1500);
      } else {
        setPullDistance(0);
        setPullToRefreshState('idle');
      }
      
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Handle back navigation
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
    haptic.impact('light');
  };

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onMenuToggle?.();
    haptic.impact('light');
  };

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status bar spacer for iOS */}
      <div className="h-0 bg-ocean-500" style={{ paddingTop: 'env(safe-area-inset-top)' }} />
      
      {/* Header */}
      <header 
        className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 12px)' }}
      >
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {showMenuButton && (
            <button
              onClick={handleMenuToggle}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {title && (
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {title}
            </h1>
          )}
        </div>
        
        {headerActions && (
          <div className="flex items-center space-x-2">
            {headerActions}
          </div>
        )}
      </header>

      {/* Main content area */}
      <main 
        ref={containerRef}
        className="flex-1 overflow-y-auto relative"
        onTouchStart={handleTouchStart}
        {...onSwipeRight}
      >
        {/* Pull to refresh indicator */}
        {pullToRefreshState !== 'idle' && (
          <div 
            className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-30"
            style={{ 
              transform: `translateY(${pullDistance}px)`,
              transition: pullToRefreshState === 'refreshing' ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            <div className="flex items-center space-x-2 text-ocean-600">
              {pullToRefreshState === 'refreshing' ? (
                <>
                  <div className="w-5 h-5 border-2 border-ocean-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Refreshing...</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 border-2 border-ocean-600 border-t-transparent rounded-full" />
                  <span className="text-sm font-medium">Pull to refresh</span>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="min-h-full">
          {children}
        </div>
      </main>

      {/* Bottom navigation */}
      {showBottomNav && (
        <MobileNavigation 
          currentRoute={location.pathname}
          onNavigate={(route) => {
            navigate(route);
            haptic.impact('light');
          }}
        />
      )}

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div 
            className={clsx(
              'fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out',
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            {/* Sidebar content */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-4">
              {/* Sidebar navigation items */}
              <nav className="space-y-2">
                {[
                  { name: 'Dashboard', route: '/dashboard', icon: '🏠' },
                  { name: 'Messages', route: '/dashboard/messages', icon: '💬' },
                  { name: 'Calls', route: '/dashboard/calls', icon: '📞' },
                  { name: 'Numbers', route: '/dashboard/numbers', icon: '🔢' },
                  { name: 'Analytics', route: '/dashboard/analytics', icon: '📊' },
                  { name: 'Settings', route: '/dashboard/settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.route}
                    onClick={() => {
                      navigate(item.route);
                      setIsSidebarOpen(false);
                    }}
                    className={clsx(
                      'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors',
                      location.pathname === item.route
                        ? 'bg-ocean-50 text-ocean-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Bottom safe area spacer for devices with home indicator */}
      <div className="h-0 bg-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  );
}; 