import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  User, 
  Building, 
  Globe, 
  Bell, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Zap,
  Star,
  Award,
  MessageSquare,
  Mail
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface OnboardingState {
  currentStep: number;
  selectedUseCase: 'personal' | 'business' | 'international';
  selectedCountry: string;
  selectedAreaCode: string;
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
}

const useCases = [
  {
    id: 'personal',
    title: 'Personal',
    description: 'Privacy and second number',
    icon: User,
    features: ['Keep personal number private', 'Second number for dating apps', 'Family communication'],
    color: 'ocean'
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Professional communication',
    icon: Building,
    features: ['Separate work and personal', 'Professional voicemail', 'Call forwarding'],
    color: 'energy'
  },
  {
    id: 'international',
    title: 'International',
    description: 'Travel and global connections',
    icon: Globe,
    features: ['Local numbers worldwide', 'Avoid roaming charges', 'International calling'],
    color: 'success'
  }
];

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' }
];

const areaCodes = {
  US: ['212', '415', '310', '305', '312', '404', '713', '602'],
  CA: ['416', '604', '514', '403', '780', '905', '613', '819'],
  GB: ['20', '161', '121', '141', '191', '113', '114', '115'],
  AU: ['2', '3', '7', '8', '4', '5', '6', '9']
};

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    selectedUseCase: 'personal',
    selectedCountry: 'US',
    selectedAreaCode: '212',
    notifications: {
      sms: true,
      email: true,
      push: true
    }
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleUseCaseSelect = (useCase: 'personal' | 'business' | 'international') => {
    setState(prev => ({ ...prev, selectedUseCase: useCase }));
  };

  const handleCountrySelect = (country: string) => {
    setState(prev => ({ 
      ...prev, 
      selectedCountry: country,
      selectedAreaCode: areaCodes[country as keyof typeof areaCodes]?.[0] || ''
    }));
  };

  const handleAreaCodeSelect = (areaCode: string) => {
    setState(prev => ({ ...prev, selectedAreaCode: areaCode }));
  };

  const handleNotificationToggle = (type: keyof OnboardingState['notifications']) => {
    setState(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'ocean':
        return 'border-ocean-200 bg-ocean-50 text-ocean-700';
      case 'energy':
        return 'border-energy-200 bg-energy-50 text-energy-700';
      case 'success':
        return 'border-success-200 bg-success-50 text-success-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How will you use TextFlow?
              </h2>
              <p className="text-xl text-gray-600">
                Choose your primary use case to get personalized recommendations
              </p>
            </div>

            <div className="grid gap-6">
              {useCases.map((useCase) => {
                const IconComponent = useCase.icon;
                const isSelected = state.selectedUseCase === useCase.id;
                
                return (
                  <button
                    key={useCase.id}
                    onClick={() => handleUseCaseSelect(useCase.id as any)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      isSelected 
                        ? `${getColorClasses(useCase.color)} ring-2 ring-ocean-500 ring-opacity-50` 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white' : 'bg-gray-100'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                        <p className="text-gray-600 mb-4">{useCase.description}</p>
                        
                        <ul className="space-y-2">
                          {useCase.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-ocean-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose your first number
              </h2>
              <p className="text-xl text-gray-600">
                Select a country and area code for your virtual phone number
              </p>
            </div>

            <div className="space-y-6">
              {/* Country Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Select Country
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                        state.selectedCountry === country.code
                          ? 'border-ocean-500 bg-ocean-50 ring-2 ring-ocean-500 ring-opacity-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{country.flag}</div>
                      <div className="text-sm font-medium">{country.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Code Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Select Area Code
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                  {areaCodes[state.selectedCountry as keyof typeof areaCodes]?.map((areaCode) => (
                    <button
                      key={areaCode}
                      onClick={() => handleAreaCodeSelect(areaCode)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                        state.selectedAreaCode === areaCode
                          ? 'border-ocean-500 bg-ocean-50 text-ocean-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {areaCode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Preview */}
              <div className="bg-gradient-to-r from-ocean-50 to-energy-50 rounded-2xl p-6 border border-ocean-200">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your number will be:</h3>
                  <div className="text-3xl font-bold text-ocean-600 mb-2">
                    +1 ({state.selectedAreaCode}) XXX-XXXX
                  </div>
                  <p className="text-gray-600">This number will be yours in just a moment!</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay in the loop
              </h2>
              <p className="text-xl text-gray-600">
                Choose how you'd like to receive notifications
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-ocean-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Get instant alerts for calls and messages</p>
                    </div>
                  </div>
                  <Button
                    variant={state.notifications.push ? 'ocean' : 'outline'}
                    size="sm"
                    onClick={() => handleNotificationToggle('push')}
                  >
                    {state.notifications.push ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-energy-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-energy-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">SMS Alerts</h3>
                      <p className="text-sm text-gray-600">Receive text notifications for important updates</p>
                    </div>
                  </div>
                  <Button
                    variant={state.notifications.sms ? 'energy' : 'outline'}
                    size="sm"
                    onClick={() => handleNotificationToggle('sms')}
                  >
                    {state.notifications.sms ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-success-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Updates</h3>
                      <p className="text-sm text-gray-600">Get weekly summaries and account updates</p>
                    </div>
                  </div>
                  <Button
                    variant={state.notifications.email ? 'success' : 'outline'}
                    size="sm"
                    onClick={() => handleNotificationToggle('email')}
                  >
                    {state.notifications.email ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-ocean-500 to-energy-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to TextFlow! 🎉
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your virtual phone number is ready to use
              </p>
            </div>

            <div className="bg-gradient-to-r from-ocean-50 to-energy-50 rounded-2xl p-8 border border-ocean-200">
              <div className="text-3xl font-bold text-ocean-600 mb-2">
                +1 ({state.selectedAreaCode}) 123-4567
              </div>
              <p className="text-gray-600 mb-6">Your new TextFlow number</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-5 h-5 text-energy-600" />
                    <span className="font-semibold">Ready to use</span>
                  </div>
                  <p className="text-sm text-gray-600">Start making calls and sending messages immediately</p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-success-600" />
                    <span className="font-semibold">Free trial active</span>
                  </div>
                  <p className="text-sm text-gray-600">7 days free, then $9.99/month</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">What's next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-4 h-4 text-ocean-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Make your first call</h4>
                  <p className="text-sm text-gray-600">Test your new number</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="w-8 h-8 bg-energy-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-4 h-4 text-energy-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Send a message</h4>
                  <p className="text-sm text-gray-600">Try text messaging</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="w-4 h-4 text-success-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Explore features</h4>
                  <p className="text-sm text-gray-600">Discover all capabilities</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-energy-50">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TextFlow</span>
            </div>
            
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-ocean-500 to-energy-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isLoading}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            <div className="flex-1" />
            
            {currentStep < totalSteps ? (
              <Button
                variant="ocean"
                onClick={handleNext}
                disabled={isLoading}
                className="flex items-center"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="energy"
                onClick={handleNext}
                loading={isLoading}
                className="flex items-center"
              >
                {isLoading ? 'Setting up your account...' : 'Get Started'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 