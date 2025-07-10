import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Star, 
  MapPin, 
  Phone,
  MessageSquare,
  Video,
  FileText,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import clsx from 'clsx';

export interface AvailableNumber {
  phoneNumber: string;
  monthlyPrice: number;
  setupFee: number;
  features: ('sms' | 'voice' | 'mms' | 'fax')[];
  isPopular: boolean;
  isPremium: boolean;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  basePrice: number;
  popular: boolean;
}

interface NumberSelectionState {
  step: 'country' | 'area-code' | 'number' | 'confirm' | 'success';
  selectedCountry: Country | null;
  selectedAreaCode: string;
  selectedNumber: AvailableNumber | null;
  preferences: {
    numberType: 'local' | 'toll-free' | 'mobile';
    features: string[];
  };
}

interface NumberSelectionFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onNumberSelected: (number: AvailableNumber) => void;
}

const mockCountries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', basePrice: 1.00, popular: true },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', basePrice: 1.50, popular: true },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', basePrice: 2.00, popular: true },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', basePrice: 2.50, popular: false },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', basePrice: 2.00, popular: false },
  { code: 'FR', name: 'France', flag: '🇫🇷', basePrice: 2.00, popular: false },
];

const mockAreaCodes = [
  { code: '212', city: 'New York, NY', price: 1.00 },
  { code: '415', city: 'San Francisco, CA', price: 1.25 },
  { code: '312', city: 'Chicago, IL', price: 1.00 },
  { code: '305', city: 'Miami, FL', price: 1.50 },
  { code: '702', city: 'Las Vegas, NV', price: 1.75 },
  { code: '404', city: 'Atlanta, GA', price: 1.00 },
];

const mockAvailableNumbers: AvailableNumber[] = [
  {
    phoneNumber: '+12125551234',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: true,
    isPremium: false
  },
  {
    phoneNumber: '+12125555678',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125559999',
    monthlyPrice: 5.00,
    setupFee: 10,
    features: ['sms', 'voice', 'mms'],
    isPopular: true,
    isPremium: true
  },
  {
    phoneNumber: '+12125551111',
    monthlyPrice: 3.00,
    setupFee: 5,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: true
  },
  {
    phoneNumber: '+12125552222',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125553333',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
];

export const NumberSelectionFlow: React.FC<NumberSelectionFlowProps> = ({
  isOpen,
  onClose,
  onNumberSelected
}) => {
  const [state, setState] = useState<NumberSelectionState>({
    step: 'country',
    selectedCountry: null,
    selectedAreaCode: '',
    selectedNumber: null,
    preferences: {
      numberType: 'local',
      features: []
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    switch (state.step) {
      case 'country':
        if (state.selectedCountry) {
          setState(prev => ({ ...prev, step: 'area-code' }));
        }
        break;
      case 'area-code':
        if (state.selectedAreaCode) {
          setState(prev => ({ ...prev, step: 'number' }));
        }
        break;
      case 'number':
        if (state.selectedNumber) {
          setState(prev => ({ ...prev, step: 'confirm' }));
        }
        break;
      case 'confirm':
        if (state.selectedNumber) {
          setState(prev => ({ ...prev, step: 'success' }));
          setTimeout(() => {
            onNumberSelected(state.selectedNumber!);
            handleClose();
          }, 2000);
        }
        break;
    }
  };

  const handleBack = () => {
    switch (state.step) {
      case 'area-code':
        setState(prev => ({ ...prev, step: 'country' }));
        break;
      case 'number':
        setState(prev => ({ ...prev, step: 'area-code' }));
        break;
      case 'confirm':
        setState(prev => ({ ...prev, step: 'number' }));
        break;
    }
  };

  const handleClose = () => {
    setState({
      step: 'country',
      selectedCountry: null,
      selectedAreaCode: '',
      selectedNumber: null,
      preferences: {
        numberType: 'local',
        features: []
      }
    });
    setSearchQuery('');
    onClose();
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    }
    return phoneNumber;
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'voice':
        return <Phone className="w-4 h-4" />;
      case 'mms':
        return <Video className="w-4 h-4" />;
      case 'fax':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 'country':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Country</h3>
              <p className="text-gray-600">Choose the country for your virtual phone number</p>
            </div>
            
            <div className="relative">
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
            </div>
            
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {mockCountries
                .filter(country => 
                  country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  country.code.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setState(prev => ({ ...prev, selectedCountry: country }))}
                    className={clsx(
                      'flex items-center justify-between p-4 rounded-lg border transition-all',
                      state.selectedCountry?.code === country.code
                        ? 'border-ocean-500 bg-ocean-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{country.name}</div>
                        <div className="text-sm text-gray-500">${country.basePrice}/month</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {country.popular && (
                        <span className="px-2 py-1 bg-ocean-100 text-ocean-700 text-xs rounded-full">
                          Popular
                        </span>
                      )}
                      {state.selectedCountry?.code === country.code && (
                        <Check className="w-5 h-5 text-ocean-600" />
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        );

      case 'area-code':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Area Code</h3>
              <p className="text-gray-600">Choose an area code for your {state.selectedCountry?.name} number</p>
            </div>
            
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {mockAreaCodes.map((areaCode) => (
                <button
                  key={areaCode.code}
                  onClick={() => setState(prev => ({ ...prev, selectedAreaCode: areaCode.code }))}
                  className={clsx(
                    'flex items-center justify-between p-4 rounded-lg border transition-all',
                    state.selectedAreaCode === areaCode.code
                      ? 'border-ocean-500 bg-ocean-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">({areaCode.code})</div>
                      <div className="text-sm text-gray-500">{areaCode.city}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      +${areaCode.price}/month
                    </span>
                    {state.selectedAreaCode === areaCode.code && (
                      <Check className="w-5 h-5 text-ocean-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'number':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Number</h3>
              <p className="text-gray-600">Select from available numbers in the {state.selectedAreaCode} area code</p>
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {mockAvailableNumbers.map((number) => (
                <button
                  key={number.phoneNumber}
                  onClick={() => setState(prev => ({ ...prev, selectedNumber: number }))}
                  className={clsx(
                    'p-4 rounded-lg border transition-all text-left',
                    state.selectedNumber?.phoneNumber === number.phoneNumber
                      ? 'border-ocean-500 bg-ocean-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-mono text-lg font-bold text-gray-900">
                      {formatPhoneNumber(number.phoneNumber)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {number.isPopular && (
                        <span className="px-2 py-1 bg-energy-100 text-energy-700 text-xs rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </span>
                      )}
                      {number.isPremium && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {number.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-600">
                          {getFeatureIcon(feature)}
                          <span className="ml-1 capitalize">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${number.monthlyPrice}/month</div>
                      {number.setupFee > 0 && (
                        <div className="text-sm text-gray-500">+${number.setupFee} setup</div>
                      )}
                    </div>
                  </div>
                  
                  {state.selectedNumber?.phoneNumber === number.phoneNumber && (
                    <div className="absolute top-4 right-4">
                      <Check className="w-5 h-5 text-ocean-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Your Selection</h3>
              <p className="text-gray-600">Review your number details before proceeding</p>
            </div>
            
            {state.selectedNumber && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <div className="font-mono text-2xl font-bold text-gray-900 mb-2">
                    {formatPhoneNumber(state.selectedNumber.phoneNumber)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {state.selectedCountry?.name} • {state.selectedAreaCode} area code
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Monthly fee</span>
                    <span className="font-medium">${state.selectedNumber.monthlyPrice}</span>
                  </div>
                  {state.selectedNumber.setupFee > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Setup fee</span>
                      <span className="font-medium">${state.selectedNumber.setupFee}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-900">Total first month</span>
                    <span className="font-bold text-lg text-gray-900">
                      ${(state.selectedNumber.monthlyPrice + state.selectedNumber.setupFee).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">Included features:</div>
                  <div className="flex flex-wrap gap-2">
                    {state.selectedNumber.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2 py-1 bg-ocean-100 text-ocean-700 text-xs rounded-full"
                      >
                        {getFeatureIcon(feature)}
                        <span className="ml-1 capitalize">{feature}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-success-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your new number is ready!
              </h3>
              <p className="text-gray-600">
                {state.selectedNumber && formatPhoneNumber(state.selectedNumber.phoneNumber)} is now active
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-ocean-50 to-success-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                You'll receive a confirmation email with setup instructions and next steps.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (state.step) {
      case 'country':
        return !!state.selectedCountry;
      case 'area-code':
        return !!state.selectedAreaCode;
      case 'number':
        return !!state.selectedNumber;
      case 'confirm':
        return !!state.selectedNumber;
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (state.step) {
      case 'country':
        return 'Select Country';
      case 'area-code':
        return 'Select Area Code';
      case 'number':
        return 'Choose Number';
      case 'confirm':
        return 'Confirm Selection';
      case 'success':
        return 'Success!';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {state.step !== 'country' && (
              <button
                onClick={handleBack}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
              <div className="flex items-center space-x-2 mt-1">
                {['country', 'area-code', 'number', 'confirm', 'success'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={clsx(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                      state.step === step
                        ? 'bg-ocean-500 text-white'
                        : index < ['country', 'area-code', 'number', 'confirm', 'success'].indexOf(state.step)
                        ? 'bg-success-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    )}>
                      {index < ['country', 'area-code', 'number', 'confirm', 'success'].indexOf(state.step) ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 4 && (
                      <div className={clsx(
                        'w-8 h-0.5 mx-2',
                        index < ['country', 'area-code', 'number', 'confirm', 'success'].indexOf(state.step)
                          ? 'bg-success-500'
                          : 'bg-gray-200'
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        {state.step !== 'success' && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {state.step === 'confirm' && state.selectedNumber && (
                <span>
                  Monthly: ${state.selectedNumber.monthlyPrice} • 
                  Setup: ${state.selectedNumber.setupFee}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              
              <Button
                variant="ocean"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center"
              >
                {state.step === 'confirm' ? 'Get Number' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 