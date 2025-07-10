import React, { useState } from 'react';
import { 
  Phone, 
  PhoneOff, 
  PhoneIncoming, 
  PhoneOutgoing, 
  MoreVertical,
  Trash2,
  MessageSquare
} from 'lucide-react';
import { Call, formatCallDuration, formatCallTime, getCallIcon } from '../../utils/mockMessages';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface CallListProps {
  calls: Call[];
  onCallBack: (phoneNumber: string) => void;
  onDeleteCall: (callId: string) => void;
}

export const CallList: React.FC<CallListProps> = ({
  calls,
  onCallBack,
  onDeleteCall
}) => {
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCallIcon = (call: Call) => {
    const iconClass = 'w-5 h-5';
    
    if (call.status === 'missed') {
      return <PhoneOff className={clsx(iconClass, 'text-energy-500')} />;
    }
    
    switch (call.type) {
      case 'incoming':
        return <PhoneIncoming className={clsx(iconClass, 'text-success-500')} />;
      case 'outgoing':
        return <PhoneOutgoing className={clsx(iconClass, 'text-ocean-500')} />;
      default:
        return <Phone className={clsx(iconClass, 'text-gray-400')} />;
    }
  };

  const getCallStatusText = (call: Call): string => {
    if (call.status === 'missed') {
      return 'Missed call';
    }
    
    switch (call.type) {
      case 'incoming':
        return 'Incoming call';
      case 'outgoing':
        return 'Outgoing call';
      default:
        return 'Call';
    }
  };

  const handleContextMenu = (e: React.MouseEvent, callId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuId(contextMenuId === callId ? null : callId);
  };

  const handleClickOutside = () => {
    setContextMenuId(null);
  };

  const CallItem: React.FC<{ call: Call }> = ({ call }) => {
    const isContextMenuOpen = contextMenuId === call.id;
    const isMissed = call.status === 'missed';

    return (
      <div className="relative group">
        <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
          {/* Call Icon */}
          <div className="flex-shrink-0 mr-3">
            {getCallIcon(call)}
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              {call.contact?.avatar ? (
                <img
                  src={call.contact.avatar}
                  alt={call.contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-400 to-energy-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {call.contact ? getInitials(call.contact.name) : '?'}
                </div>
              )}

              {/* Contact Details */}
              <div className="flex-1 min-w-0">
                <h3 className={clsx(
                  'font-medium truncate',
                  isMissed ? 'text-energy-600' : 'text-gray-900'
                )}>
                  {call.contact?.name || call.phoneNumber}
                </h3>
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className={clsx(
                    isMissed ? 'text-energy-600' : 'text-gray-500'
                  )}>
                    {getCallStatusText(call)}
                  </span>
                  
                  {call.duration && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">
                        {formatCallDuration(call.duration)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Time and Actions */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {formatCallTime(call.timestamp)}
            </span>
            
            {/* Call Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCallBack(call.phoneNumber)}
              className="p-2 text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50"
            >
              <Phone className="w-4 h-4" />
            </Button>
            
            {/* Context Menu Button */}
            <button
              onClick={(e) => handleContextMenu(e, call.id)}
              className="opacity-0 group-hover:opacity-100 p-2 rounded hover:bg-gray-200 transition-opacity"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Context Menu */}
        {isContextMenuOpen && (
          <div className="absolute right-2 top-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
            <div className="py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCallBack(call.phoneNumber);
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Back
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add message functionality
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </button>
              
              <hr className="my-1" />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCall(call.id);
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-energy-600 hover:bg-gray-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="divide-y divide-gray-100">
      {calls.map((call) => (
        <CallItem key={call.id} call={call} />
      ))}
      
      {/* Click outside to close context menu */}
      {contextMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={handleClickOutside}
        />
      )}
    </div>
  );
}; 