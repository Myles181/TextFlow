import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Phone, 
  MessageSquare, 
  Settings,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector for highlighting
  action: 'click' | 'view' | 'input';
  completionMessage: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface InteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to TextFlow!',
    description: 'Let\'s take a quick tour of your new virtual phone number dashboard.',
    target: '.active-number-widget',
    action: 'view',
    completionMessage: 'Great! This is your active phone number.',
    position: 'bottom'
  },
  {
    id: 'send-message',
    title: 'Send your first message',
    description: 'Click the compose button to send a test message to yourself.',
    target: '.compose-button',
    action: 'click',
    completionMessage: 'Perfect! You\'ve sent your first message.',
    position: 'top'
  },
  {
    id: 'check-usage',
    title: 'Monitor your usage',
    description: 'Keep track of your calls and messages with the usage widget.',
    target: '.usage-widget',
    action: 'view',
    completionMessage: 'Excellent! You can monitor your usage here.',
    position: 'left'
  },
  {
    id: 'add-contacts',
    title: 'Manage contacts',
    description: 'Add and organize your contacts for easy communication.',
    target: '.contacts-section',
    action: 'view',
    completionMessage: 'Great! You can manage all your contacts here.',
    position: 'right'
  },
  {
    id: 'customize-settings',
    title: 'Customize settings',
    description: 'Personalize your TextFlow experience with custom settings.',
    target: '.settings-menu',
    action: 'view',
    completionMessage: 'Perfect! You can customize everything here.',
    position: 'top'
  }
];

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = tutorialSteps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / tutorialSteps.length) * 100;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      highlightCurrentElement();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentStepIndex]);

  const highlightCurrentElement = () => {
    const targetElement = document.querySelector(currentStep.target);
    if (targetElement && overlayRef.current) {
      const rect = targetElement.getBoundingClientRect();
      const overlay = overlayRef.current;
      
      // Create spotlight effect
      overlay.style.setProperty('--spotlight-x', `${rect.left + rect.width / 2}px`);
      overlay.style.setProperty('--spotlight-y', `${rect.top + rect.height / 2}px`);
      overlay.style.setProperty('--spotlight-size', `${Math.max(rect.width, rect.height) + 20}px`);
      
      // Position tooltip
      if (tooltipRef.current) {
        const tooltip = tooltipRef.current;
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top + rect.height + 10;
        
        // Adjust position based on step position preference
        switch (currentStep.position) {
          case 'top':
            top = rect.top - tooltipRect.height - 10;
            break;
          case 'left':
            left = rect.left - tooltipRect.width - 10;
            top = rect.top + rect.height / 2 - tooltipRect.height / 2;
            break;
          case 'right':
            left = rect.right + 10;
            top = rect.top + rect.height / 2 - tooltipRect.height / 2;
            break;
        }
        
        // Ensure tooltip stays within viewport
        left = Math.max(20, Math.min(left, window.innerWidth - tooltipRect.width - 20));
        top = Math.max(20, Math.min(top, window.innerHeight - tooltipRect.height - 20));
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
      }
    }
  };

  const handleNext = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setShowAchievement(true);
    
    setTimeout(() => {
      setShowAchievement(false);
      onComplete();
    }, 3000);
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  if (isCompleted && showAchievement) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
          <div className="w-16 h-16 bg-gradient-to-r from-ocean-500 to-energy-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Learner!</h3>
          <p className="text-gray-600 mb-4">
            You've completed the TextFlow tutorial and earned your first achievement.
          </p>
          
          <div className="bg-gradient-to-r from-ocean-50 to-energy-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-gray-900">Quick Learner Badge</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Overlay with spotlight */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black bg-opacity-60"
        style={{
          background: `
            radial-gradient(
              circle var(--spotlight-size) at var(--spotlight-x) var(--spotlight-y),
              transparent 0%,
              rgba(0, 0, 0, 0.6) 100%
            )
          `
        }}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 bg-white rounded-xl shadow-2xl p-6 max-w-sm animate-fade-in"
        style={{
          '--spotlight-x': '50%',
          '--spotlight-y': '50%',
          '--spotlight-size': '100px'
        } as React.CSSProperties}
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ocean-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-ocean-600">
                {currentStepIndex + 1}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {tutorialSteps.length}
            </span>
          </div>
          
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-ocean-500 to-energy-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            {currentStep.title}
          </h3>
          
          <p className="text-gray-600">
            {currentStep.description}
          </p>

          {/* Action-specific content */}
          {currentStep.action === 'click' && (
            <div className="bg-ocean-50 border border-ocean-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-ocean-700">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Click the highlighted element</span>
              </div>
            </div>
          )}

          {currentStep.action === 'view' && (
            <div className="bg-energy-50 border border-energy-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-energy-700">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Take a look at this feature</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="ocean"
            onClick={handleNext}
            className="flex items-center"
          >
            {currentStepIndex === tutorialSteps.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-4 right-4 z-50 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 shadow-lg transition-colors"
      >
        Skip tutorial
      </button>
    </>
  );
}; 