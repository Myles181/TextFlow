import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MoreHorizontal,
  Keypad
} from 'lucide-react';
import { Contact } from '../messages/ChatInterface';
import { Button } from '../ui/Button';
import clsx from 'clsx';

export interface ActiveCall {
  contact: Contact | null;
  phoneNumber: string;
  status: 'connecting' | 'ringing' | 'active' | 'on-hold';
  duration: number;
  isMuted: boolean;
  isOnHold: boolean;
}

interface CallInterfaceProps {
  call: ActiveCall;
  onHangup: () => void;
  onMute: () => void;
  onHold: () => void;
  onKeypad: () => void;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({
  call,
  onHangup,
  onMute,
  onHold,
  onKeypad
}) => {
  const [showKeypad, setShowKeypad] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusText = (): string => {
    switch (call.status) {
      case 'connecting':
        return 'Connecting...';
      case 'ringing':
        return 'Ringing...';
      case 'active':
        return 'Connected';
      case 'on-hold':
        return 'On Hold';
      default:
        return '';
    }
  };

  const getStatusColor = (): string => {
    switch (call.status) {
      case 'connecting':
      case 'ringing':
        return 'text-warning-500';
      case 'active':
        return 'text-success-500';
      case 'on-hold':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center z-50">
      {/* Contact Info */}
      <div className="text-center mb-8">
        {/* Avatar */}
        <div className="mb-6">
          {call.contact?.avatar ? (
            <img
              src={call.contact.avatar}
              alt={call.contact.name}
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/20"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-ocean-400 to-energy-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto border-4 border-white/20">
              {call.contact ? getInitials(call.contact.name) : '?'}
            </div>
          )}
        </div>

        {/* Name and Number */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {call.contact?.name || call.phoneNumber}
        </h2>
        
        {call.contact && (
          <p className="text-gray-300 mb-4">
            {call.phoneNumber}
          </p>
        )}

        {/* Status and Timer */}
        <div className="space-y-2">
          <p className={clsx('text-lg font-medium', getStatusColor())}>
            {getStatusText()}
          </p>
          
          {call.status === 'active' && (
            <p className="text-gray-400 text-sm">
              {formatDuration(call.duration)}
            </p>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex items-center justify-center space-x-6 mb-8">
        {/* Mute Button */}
        <button
          onClick={onMute}
          className={clsx(
            'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200',
            call.isMuted
              ? 'bg-energy-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          )}
        >
          {call.isMuted ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Hold Button */}
        <button
          onClick={onHold}
          className={clsx(
            'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200',
            call.isOnHold
              ? 'bg-warning-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          )}
        >
          <MoreHorizontal className="w-6 h-6" />
        </button>

        {/* Speaker Button */}
        <button
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          className={clsx(
            'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200',
            isSpeakerOn
              ? 'bg-ocean-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          )}
        >
          {isSpeakerOn ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        {/* Keypad Button */}
        <button
          onClick={() => setShowKeypad(!showKeypad)}
          className={clsx(
            'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200',
            showKeypad
              ? 'bg-ocean-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          )}
        >
          <Keypad className="w-6 h-6" />
        </button>
      </div>

      {/* Hangup Button */}
      <button
        onClick={onHangup}
        className="w-20 h-20 bg-energy-500 text-white rounded-full flex items-center justify-center hover:bg-energy-600 transition-colors duration-200 shadow-lg"
      >
        <PhoneOff className="w-8 h-8" />
      </button>

      {/* Keypad Overlay */}
      {showKeypad && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-6 rounded-t-3xl">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
              <button
                key={key}
                className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center text-xl font-semibold hover:bg-white/30 transition-colors"
                onClick={() => {/* Add DTMF functionality */}}
              >
                {key}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => setShowKeypad(false)}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Hide Keypad
            </button>
          </div>
        </div>
      )}

      {/* Emergency Info */}
      {call.phoneNumber.includes('911') && (
        <div className="absolute top-4 left-4 right-4 bg-energy-500 text-white p-3 rounded-lg text-center">
          <p className="text-sm font-medium">
            Emergency Call - Please stay on the line
          </p>
        </div>
      )}

      {/* Call Quality Indicator */}
      {call.status === 'active' && (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-success-500 rounded-full"></div>
            <div className="w-1 h-4 bg-success-500 rounded-full"></div>
            <div className="w-1 h-4 bg-success-500 rounded-full"></div>
          </div>
          <span className="text-success-500 text-xs">HD</span>
        </div>
      )}
    </div>
  );
}; 