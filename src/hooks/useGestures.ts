import { useState, useEffect, useRef, useCallback } from 'react';

interface GestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
}

interface GestureOptions {
  threshold?: number;
  velocity?: number;
  preventDefault?: boolean;
}

interface HapticFeedback {
  impact: (style: 'light' | 'medium' | 'heavy') => void;
  notification: (type: 'success' | 'warning' | 'error') => void;
  selection: () => void;
}

// Swipe gesture detection
export const useSwipeGestures = (
  handlers: GestureHandlers, 
  options: GestureOptions = {}
) => {
  const { threshold = 50, velocity = 0.3, preventDefault = false } = options;
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (preventDefault) e.preventDefault();
    
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setStartTime(Date.now());
    setIsTracking(true);
  }, [preventDefault]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTracking) return;
    
    if (preventDefault) e.preventDefault();
  }, [isTracking, preventDefault]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isTracking) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const endTime = Date.now();
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = endTime - startTime;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / deltaTime;
    
    if (distance > threshold && speed > velocity) {
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      
      if (isHorizontal) {
        if (deltaX > 0 && handlers.onSwipeRight) {
          handlers.onSwipeRight();
        } else if (deltaX < 0 && handlers.onSwipeLeft) {
          handlers.onSwipeLeft();
        }
      } else {
        if (deltaY > 0 && handlers.onSwipeDown) {
          handlers.onSwipeDown();
        } else if (deltaY < 0 && handlers.onSwipeUp) {
          handlers.onSwipeUp();
        }
      }
    }
    
    setIsTracking(false);
  }, [isTracking, startX, startY, startTime, threshold, velocity, handlers]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onSwipeRight: handlers.onSwipeRight ? { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd } : {}
  };
};

// Pull to refresh functionality
export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    
    if (deltaY > 0 && window.scrollY === 0) {
      e.preventDefault();
      const distance = Math.min(deltaY * 0.5, 150);
      setPullDistance(distance);
    }
  }, [isPulling, startY]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    if (pullDistance > 80) {
      setIsRefreshing(true);
      setPullDistance(0);
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    } else {
      setPullDistance(0);
    }
    
    setIsPulling(false);
  }, [isPulling, pullDistance, onRefresh]);

  return {
    isRefreshing,
    pullDistance,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};

// Haptic feedback wrapper
export const useHapticFeedback = (): HapticFeedback => {
  const isSupported = 'vibrate' in navigator;

  const impact = useCallback((style: 'light' | 'medium' | 'heavy') => {
    if (!isSupported) return;
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    };
    
    navigator.vibrate(patterns[style]);
  }, [isSupported]);

  const notification = useCallback((type: 'success' | 'warning' | 'error') => {
    if (!isSupported) return;
    
    const patterns = {
      success: [10, 50, 10],
      warning: [20, 50, 20],
      error: [30, 100, 30]
    };
    
    navigator.vibrate(patterns[type]);
  }, [isSupported]);

  const selection = useCallback(() => {
    if (!isSupported) return;
    navigator.vibrate([5]);
  }, [isSupported]);

  return { impact, notification, selection };
};

// Long press detection
export const useLongPress = (
  callback: () => void,
  delay: number = 500,
  options: { preventDefault?: boolean } = {}
) => {
  const { preventDefault = false } = options;
  const [isLongPress, setIsLongPress] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const start = useCallback((e: React.TouchEvent) => {
    if (preventDefault) e.preventDefault();
    
    setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setIsLongPress(false);
    
    timeoutRef.current = setTimeout(() => {
      setIsLongPress(true);
      callback();
    }, delay);
  }, [callback, delay, preventDefault]);

  const move = useCallback((e: React.TouchEvent) => {
    if (!timeoutRef.current) return;
    
    const deltaX = Math.abs(e.touches[0].clientX - startPos.x);
    const deltaY = Math.abs(e.touches[0].clientY - startPos.y);
    
    // Cancel if moved more than 10px
    if (deltaX > 10 || deltaY > 10) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsLongPress(false);
    }
  }, [startPos]);

  const end = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLongPress(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isLongPress,
    handlers: {
      onTouchStart: start,
      onTouchMove: move,
      onTouchEnd: end
    }
  };
};

// Double tap detection
export const useDoubleTap = (
  callback: () => void,
  delay: number = 300
) => {
  const [lastTap, setLastTap] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    const timeDiff = now - lastTap;
    
    if (timeDiff < delay && timeDiff > 0) {
      // Double tap detected
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      callback();
    } else {
      // Single tap - wait for potential double tap
      timeoutRef.current = setTimeout(() => {
        // Single tap confirmed
      }, delay);
    }
    
    setLastTap(now);
  }, [callback, delay, lastTap]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { handleTap };
};

// Pinch gesture detection
export const usePinchGesture = (callback: (scale: number) => void) => {
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);

  const getDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialDistance;
      callback(scale);
    }
  }, [initialDistance, callback]);

  const handleTouchEnd = useCallback(() => {
    setInitialDistance(0);
  }, []);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
}; 