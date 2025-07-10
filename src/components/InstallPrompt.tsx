import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Zap, Shield } from 'lucide-react';
import { useHapticFeedback } from './hooks/useGestures';
import clsx from 'clsx';

interface InstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  triggerReason?: 'first-visit' | 'return-visit' | 'feature-discovery' | 'offline-benefit';
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({
  onInstall,
  onDismiss,
  triggerReason = 'return-visit'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const haptic = useHapticFeedback();

  useEffect(() => {
    // Check if app is already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                       (window.navigator as any).standalone === true;
    
    if (isInstalled) {
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt based on trigger reason
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if we should show prompt based on user behavior
    const shouldShowPrompt = checkShouldShowPrompt(triggerReason);
    if (shouldShowPrompt && !deferredPrompt) {
      setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [triggerReason]);

  const checkShouldShowPrompt = (reason: string) => {
    const visitCount = parseInt(localStorage.getItem('textflow-visit-count') || '0');
    const lastDismissed = localStorage.getItem('textflow-install-dismissed');
    const lastDismissedTime = lastDismissed ? new Date(lastDismissed).getTime() : 0;
    const now = Date.now();
    const daysSinceDismissed = (now - lastDismissedTime) / (1000 * 60 * 60 * 24);

    // Don't show if dismissed recently (within 7 days)
    if (daysSinceDismissed < 7) {
      return false;
    }

    switch (reason) {
      case 'first-visit':
        return visitCount === 1;
      case 'return-visit':
        return visitCount >= 3;
      case 'feature-discovery':
        return true; // Show immediately for feature discovery
      case 'offline-benefit':
        return !navigator.onLine; // Show when offline
      default:
        return visitCount >= 2;
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      haptic.impact('medium');
      
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          haptic.notification('success');
          onInstall?.();
          setIsVisible(false);
        } else {
          haptic.notification('error');
        }
      } catch (error) {
        console.error('Installation failed:', error);
        haptic.notification('error');
      } finally {
        setIsInstalling(false);
        setDeferredPrompt(null);
      }
    } else {
      // Fallback for browsers without beforeinstallprompt
      haptic.impact('medium');
      onInstall?.();
    }
  };

  const handleDismiss = () => {
    haptic.impact('light');
    setIsVisible(false);
    onDismiss?.();
    
    // Remember dismissal
    localStorage.setItem('textflow-install-dismissed', new Date().toISOString());
  };

  const getPromptContent = () => {
    switch (triggerReason) {
      case 'first-visit':
        return {
          title: 'Welcome to TextFlow!',
          subtitle: 'Install our app for the best experience',
          benefits: [
            'Quick access to your virtual numbers',
            'Send messages and make calls instantly',
            'Offline access to your data'
          ]
        };
      case 'return-visit':
        return {
          title: 'You\'re back!',
          subtitle: 'Install TextFlow for faster access',
          benefits: [
            'Skip the browser - launch directly',
            'Faster loading and better performance',
            'Native app experience'
          ]
        };
      case 'feature-discovery':
        return {
          title: 'Love this feature?',
          subtitle: 'Install TextFlow to use it anytime',
          benefits: [
            'Access all features offline',
            'Push notifications for new messages',
            'Better battery life'
          ]
        };
      case 'offline-benefit':
        return {
          title: 'Stay connected offline',
          subtitle: 'Install TextFlow for offline access',
          benefits: [
            'View messages and calls offline',
            'Compose messages (send when online)',
            'Access your data without internet'
          ]
        };
      default:
        return {
          title: 'Install TextFlow',
          subtitle: 'Get the best experience',
          benefits: [
            'Faster access to your numbers',
            'Better performance and reliability',
            'Native app features'
          ]
        };
    }
  };

  const content = getPromptContent();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleDismiss}
      />
      
      {/* Prompt card */}
      <div 
        className="bg-white rounded-t-xl p-6 mx-4 mb-4 shadow-xl"
        style={{ marginBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-ocean-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {content.title}
              </h3>
              <p className="text-sm text-gray-600">
                {content.subtitle}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          {content.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3 text-success-600" />
              </div>
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="flex items-center space-x-2 mb-6 p-3 bg-gray-50 rounded-lg">
          <Shield className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-600">
            Your data stays secure and private
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
          
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className={clsx(
              'flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2',
              isInstalling
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-ocean-500 text-white hover:bg-ocean-600'
            )}
          >
            {isInstalling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Installing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Install App</span>
              </>
            )}
          </button>
        </div>

        {/* Platform-specific instructions */}
        {!deferredPrompt && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              💡 Tip: Look for the "Add to Home Screen" option in your browser menu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 