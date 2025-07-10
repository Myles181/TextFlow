import React, { useState, useEffect } from 'react';
import { Phone, ArrowLeft, User, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { mockContacts } from '../../utils/mockMessages';
import clsx from 'clsx';

interface DialerProps {
  onCall: (number: string) => void;
  initialNumber?: string;
  onBack?: () => void;
}

export const Dialer: React.FC<DialerProps> = ({
  onCall,
  initialNumber = '',
  onBack
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [suggestions, setSuggestions] = useState<typeof mockContacts>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const keypadButtons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['*', 0, '#']
  ];

  useEffect(() => {
    if (phoneNumber.length > 0) {
      const filtered = mockContacts.filter(contact =>
        contact.name.toLowerCase().includes(phoneNumber.toLowerCase()) ||
        contact.phoneNumber.includes(phoneNumber)
      );
      setSuggestions(filtered.slice(0, 3));
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [phoneNumber]);

  const formatPhoneNumber = (number: string): string => {
    const cleaned = number.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 0) {
      if (cleaned.startsWith('1') && cleaned.length > 1) {
        formatted = `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
      } else if (cleaned.length >= 10) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    }
    
    return formatted;
  };

  const handleNumberInput = (digit: string | number) => {
    const currentNumber = phoneNumber.replace(/\D/g, '');
    const newNumber = currentNumber + digit.toString();
    
    if (newNumber.length <= 15) { // Reasonable limit
      setPhoneNumber(formatPhoneNumber(newNumber));
    }
  };

  const handleDelete = () => {
    const currentNumber = phoneNumber.replace(/\D/g, '');
    const newNumber = currentNumber.slice(0, -1);
    setPhoneNumber(formatPhoneNumber(newNumber));
  };

  const handleClear = () => {
    setPhoneNumber('');
  };

  const handleCall = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      onCall(phoneNumber);
    }
  };

  const handleSuggestionClick = (contact: typeof mockContacts[0]) => {
    setPhoneNumber(contact.phoneNumber);
    setShowSuggestions(false);
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isNumberValid = phoneNumber.replace(/\D/g, '').length >= 10;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          
          <h1 className="text-xl font-bold text-gray-900">Dialer</h1>
        </div>
      </div>

      {/* Phone Number Display */}
      <div className="p-6 text-center">
        <div className="mb-4">
          <div className="text-3xl font-mono font-bold text-gray-900 mb-2">
            {phoneNumber || 'Enter number'}
          </div>
          
          {phoneNumber && (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>{phoneNumber.replace(/\D/g, '').length} digits</span>
              {isNumberValid && (
                <span className="text-success-500">✓ Valid</span>
              )}
            </div>
          )}
        </div>

        {/* Contact Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="mb-4">
            <div className="text-left">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h3>
              <div className="space-y-2">
                {suggestions.map((contact) => (
                  <button
                    key={contact.phoneNumber}
                    onClick={() => handleSuggestionClick(contact)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    {contact.avatar ? (
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-ocean-400 to-energy-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {getInitials(contact.name)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {contact.name}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {contact.phoneNumber}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keypad */}
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-4">
          {keypadButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-4">
              {row.map((button) => (
                <button
                  key={button}
                  onClick={() => handleNumberInput(button)}
                  className="w-16 h-16 rounded-full bg-gray-100 text-gray-900 text-xl font-semibold hover:bg-gray-200 active:bg-gray-300 transition-colors flex items-center justify-center"
                >
                  {button}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleClear}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          >
            Clear
          </button>
          
          <button
            onClick={handleDelete}
            disabled={phoneNumber.length === 0}
            className={clsx(
              'px-6 py-3 font-medium transition-colors',
              phoneNumber.length > 0
                ? 'text-gray-600 hover:text-gray-900'
                : 'text-gray-400 cursor-not-allowed'
            )}
          >
            Delete
          </button>
        </div>

        {/* Call Button */}
        <div className="mt-8">
          <Button
            variant={isNumberValid ? 'ocean' : 'ghost'}
            size="lg"
            onClick={handleCall}
            disabled={!isNumberValid}
            className="w-full h-16 text-lg font-semibold flex items-center justify-center"
          >
            <Phone className="w-6 h-6 mr-2" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}; 