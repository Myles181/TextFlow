import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Phone, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface PhoneVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onResend: () => void;
  onBack?: () => void;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  phoneNumber,
  onVerified,
  onResend,
  onBack
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if code is complete
    if (newCode.every(digit => digit !== '') && index === 5) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (verificationCode: string) => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock verification - accept any 6-digit code
      if (verificationCode === '123456' || verificationCode.length === 6) {
        setIsVerified(true);
        setTimeout(() => {
          onVerified();
        }, 1500);
      } else {
        setError('Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setCountdown(30);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    setError('');
    onResend();
    inputRefs.current[0]?.focus();
  };

  const formatPhoneNumber = (phone: string) => {
    // Simple formatting for display
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  if (isVerified) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-success-600" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Phone Verified!</h3>
          <p className="text-gray-600">
            Your phone number has been successfully verified.
          </p>
        </div>

        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 text-success-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{formatPhoneNumber(phoneNumber)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-ocean-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your phone</h2>
        <p className="text-gray-600 mb-4">
          We've sent a 6-digit code to
        </p>
        <p className="text-lg font-semibold text-gray-900">
          {formatPhoneNumber(phoneNumber)}
        </p>
      </div>

      {/* Verification Code Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Enter verification code
        </label>
        
        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`
                w-12 h-12 text-center text-xl font-bold border-2 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent
                transition-all duration-200
                ${digit 
                  ? 'border-ocean-500 bg-ocean-50 text-ocean-700' 
                  : 'border-gray-300 hover:border-gray-400'
                }
                ${error ? 'border-error-500' : ''}
              `}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-error-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Resend Code */}
      <div className="text-center space-y-4">
        <div className="text-sm text-gray-600">
          Didn't receive the code?{' '}
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-ocean-600 hover:text-ocean-700 font-medium"
            >
              Resend code
            </button>
          ) : (
            <span>
              Resend in{' '}
              <span className="font-mono font-medium text-ocean-600">
                {countdown}s
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span>SMS</span>
          </div>
          <span>•</span>
          <button className="text-ocean-600 hover:text-ocean-700">
            Call instead
          </button>
        </div>
      </div>

      {/* Manual Verification Button */}
      <div className="space-y-4">
        <Button
          variant="ocean"
          onClick={() => handleVerify(code.join(''))}
          loading={isLoading}
          disabled={code.some(digit => digit === '')}
          className="w-full flex items-center justify-center"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            Back
          </Button>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-medium">Having trouble?</p>
          <ul className="space-y-1">
            <li>• Check your spam folder</li>
            <li>• Make sure your phone number is correct</li>
            <li>• Try requesting a call instead of SMS</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 