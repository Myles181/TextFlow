// Service Worker registration and PWA utilities

interface ServiceWorkerRegistration {
  installing?: ServiceWorker;
  waiting?: ServiceWorker;
  active?: ServiceWorker;
  scope: string;
  updateViaCache: 'all' | 'imports' | 'none';
  onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
  oncontrollerchange: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
  onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
  update(): Promise<void>;
  unregister(): Promise<boolean>;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Register service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              showUpdateNotification();
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Unregister service worker
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      return await registration.unregister();
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }
  return false;
};

// Check if app is installed
export const isAppInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Check if app can be installed
export const canInstallApp = (): boolean => {
  return 'BeforeInstallPromptEvent' in window;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'default') {
    return await Notification.requestPermission();
  }

  return Notification.permission;
};

// Subscribe to push notifications
export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    if (!('PushManager' in window)) {
      console.log('Push messaging is not supported');
      return null;
    }

    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY || '')
    });

    console.log('Push notification subscription:', subscription);
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
};

// Unsubscribe from push notifications
export const unsubscribeFromPushNotifications = async (): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unregister();
      console.log('Unsubscribed from push notifications');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    return false;
  }
};

// Send push notification
export const sendPushNotification = async (
  title: string,
  options: NotificationOptions = {}
): Promise<void> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      vibrate: [100, 50, 100],
      ...options
    });
  } catch (error) {
    console.error('Failed to send push notification:', error);
  }
};

// Background sync registration
export const registerBackgroundSync = async (tag: string): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    
    if ('sync' in registration) {
      await (registration as any).sync.register(tag);
      console.log('Background sync registered:', tag);
      return true;
    } else {
      console.log('Background sync not supported');
      return false;
    }
  } catch (error) {
    console.error('Failed to register background sync:', error);
    return false;
  }
};

// Check network status
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for network status changes
export const onNetworkStatusChange = (callback: (isOnline: boolean) => void): (() => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Cache management
export const clearAllCaches = async (): Promise<void> => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }
};

export const getCacheSize = async (): Promise<number> => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  }
  return 0;
};

// Utility functions
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Show update notification
const showUpdateNotification = () => {
  // You can implement a custom update notification here
  if (confirm('New version available! Reload to update?')) {
    window.location.reload();
  }
};

// PWA installation prompt handling
let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const setupInstallPrompt = (onPromptAvailable: (prompt: BeforeInstallPromptEvent) => void) => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    onPromptAvailable(deferredPrompt);
  });
};

export const showInstallPrompt = async (): Promise<boolean> => {
  if (!deferredPrompt) {
    return false;
  }

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    return outcome === 'accepted';
  } catch (error) {
    console.error('Install prompt failed:', error);
    return false;
  }
};

// Performance monitoring
export const measureAppLoadTime = (): number => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation.loadEventEnd - navigation.loadEventStart;
  }
  return 0;
};

export const measureServiceWorkerStartup = async (): Promise<number> => {
  if ('serviceWorker' in navigator) {
    const start = performance.now();
    await navigator.serviceWorker.ready;
    return performance.now() - start;
  }
  return 0;
};

// Analytics for PWA metrics
export const trackPWAEvent = (event: string, data?: any) => {
  // Send to analytics service
  console.log('PWA Event:', event, data);
  
  // You can integrate with Google Analytics, Mixpanel, etc.
  if (typeof gtag !== 'undefined') {
    gtag('event', event, data);
  }
};

// Export PWA utilities
export const pwaUtils = {
  registerServiceWorker,
  unregisterServiceWorker,
  isAppInstalled,
  canInstallApp,
  requestNotificationPermission,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  sendPushNotification,
  registerBackgroundSync,
  isOnline,
  onNetworkStatusChange,
  clearAllCaches,
  getCacheSize,
  setupInstallPrompt,
  showInstallPrompt,
  measureAppLoadTime,
  measureServiceWorkerStartup,
  trackPWAEvent
}; 