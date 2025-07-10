import React, { useState, useRef, useEffect } from 'react';
import { useHapticFeedback } from '../../hooks/useGestures';
import clsx from 'clsx';

interface SwipeAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: 'success' | 'energy' | 'ocean' | 'neutral';
  action: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipe?: (direction: 'left' | 'right', action: string) => void;
  className?: string;
}

interface TouchableAreaProps {
  onTap?: () => void;
  onLongPress?: () => void;
  onSwipe?: (direction: string) => void;
  hapticFeedback?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface SwipeToDeleteProps {
  children: React.ReactNode;
  onDelete: () => void;
  confirmDelete?: boolean;
  deleteThreshold?: number;
  className?: string;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  onSwipe,
  className
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const haptic = useHapticFeedback();

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    const maxSwipe = Math.max(leftActions.length * 80, rightActions.length * 80);
    
    setSwipeOffset(Math.max(-maxSwipe, Math.min(maxSwipe, deltaX)));
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    
    if (Math.abs(swipeOffset) > 60) {
      const direction = swipeOffset > 0 ? 'right' : 'left';
      const actions = direction === 'right' ? leftActions : rightActions;
      const actionIndex = Math.floor(Math.abs(swipeOffset) / 80);
      
      if (actions[actionIndex]) {
        haptic.impact('medium');
        actions[actionIndex].action();
        onSwipe?.(direction, actions[actionIndex].id);
      }
    }
    
    setSwipeOffset(0);
  };

  const getActionBackground = (direction: 'left' | 'right') => {
    const actions = direction === 'left' ? leftActions : rightActions;
    if (actions.length === 0) return '';
    
    const actionIndex = Math.floor(Math.abs(swipeOffset) / 80);
    const action = actions[actionIndex];
    
    if (!action) return '';
    
    const colorMap = {
      success: 'bg-success-500',
      energy: 'bg-energy-500',
      ocean: 'bg-ocean-500',
      neutral: 'bg-gray-500'
    };
    
    return colorMap[action.color];
  };

  return (
    <div className="relative overflow-hidden">
      {/* Action backgrounds */}
      <div className="absolute inset-0 flex">
        {/* Left actions */}
        <div className="flex">
          {leftActions.map((action, index) => (
            <div
              key={action.id}
              className={clsx(
                'flex items-center justify-center w-20 h-full',
                action.color === 'success' && 'bg-success-500',
                action.color === 'energy' && 'bg-energy-500',
                action.color === 'ocean' && 'bg-ocean-500',
                action.color === 'neutral' && 'bg-gray-500'
              )}
            >
              <div className="text-white text-center">
                {action.icon}
                <div className="text-xs font-medium">{action.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right actions */}
        <div className="flex ml-auto">
          {rightActions.map((action, index) => (
            <div
              key={action.id}
              className={clsx(
                'flex items-center justify-center w-20 h-full',
                action.color === 'success' && 'bg-success-500',
                action.color === 'energy' && 'bg-energy-500',
                action.color === 'ocean' && 'bg-ocean-500',
                action.color === 'neutral' && 'bg-gray-500'
              )}
            >
              <div className="text-white text-center">
                {action.icon}
                <div className="text-xs font-medium">{action.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Card content */}
      <div
        ref={cardRef}
        className={clsx(
          'bg-white relative z-10 transition-transform duration-200 ease-out',
          className
        )}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export const TouchableArea: React.FC<TouchableAreaProps> = ({
  onTap,
  onLongPress,
  onSwipe,
  hapticFeedback = true,
  children,
  className,
  disabled = false
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const haptic = useHapticFeedback();

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    setIsPressed(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    
    if (onLongPress) {
      const timer = setTimeout(() => {
        if (hapticFeedback) haptic.impact('medium');
        onLongPress();
      }, 500);
      setLongPressTimer(timer);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled) return;
    
    const deltaX = Math.abs(e.touches[0].clientX - startX);
    const deltaY = Math.abs(e.touches[0].clientY - startY);
    
    // Cancel long press if user moves finger
    if (deltaX > 10 || deltaY > 10) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        setLongPressTimer(null);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled) return;
    
    setIsPressed(false);
    
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    const deltaX = e.changedTouches[0].clientX - startX;
    const deltaY = e.changedTouches[0].clientY - startY;
    
    // Determine if it's a tap or swipe
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      if (onTap) {
        if (hapticFeedback) haptic.impact('light');
        onTap();
      }
    } else if (onSwipe) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY) 
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up');
      
      if (hapticFeedback) haptic.impact('light');
      onSwipe(direction);
    }
  };

  return (
    <div
      className={clsx(
        'transition-all duration-150 ease-out',
        'active:scale-95',
        isPressed && 'scale-98',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export const SwipeToDelete: React.FC<SwipeToDeleteProps> = ({
  children,
  onDelete,
  confirmDelete = true,
  deleteThreshold = 100,
  className
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const haptic = useHapticFeedback();

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const deltaX = startX - currentX;
    
    if (deltaX > 0) {
      setSwipeOffset(Math.min(deltaX, deleteThreshold));
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset > deleteThreshold * 0.7) {
      if (confirmDelete) {
        setShowConfirm(true);
        haptic.impact('medium');
      } else {
        haptic.impact('heavy');
        onDelete();
      }
    }
    setSwipeOffset(0);
  };

  const handleConfirmDelete = () => {
    haptic.impact('heavy');
    onDelete();
    setShowConfirm(false);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Delete background */}
      <div className="absolute inset-0 bg-energy-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-lg">🗑️</div>
          <div className="text-xs font-medium">Delete</div>
        </div>
      </div>
      
      {/* Content */}
      <div
        className={clsx(
          'bg-white relative z-10 transition-transform duration-200 ease-out',
          className
        )}
        style={{ transform: `translateX(-${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
      
      {/* Confirm delete modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this item?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-energy-500 text-white rounded-lg hover:bg-energy-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 