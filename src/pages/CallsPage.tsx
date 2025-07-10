import React, { useState } from 'react';
import { Phone, Search, Filter, MoreVertical } from 'lucide-react';
import { CallList } from '../components/calls/CallList';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockCalls } from '../utils/mockMessages';

interface CallsPageState {
  calls: typeof mockCalls;
  filter: 'all' | 'missed' | 'incoming' | 'outgoing';
  searchQuery: string;
}

export const CallsPage: React.FC = () => {
  const [state, setState] = useState<CallsPageState>({
    calls: mockCalls,
    filter: 'all',
    searchQuery: ''
  });

  const filteredCalls = state.calls.filter(call => {
    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      const contactName = call.contact?.name.toLowerCase() || '';
      const phoneNumber = call.phoneNumber.toLowerCase();
      
      if (!contactName.includes(query) && !phoneNumber.includes(query)) {
        return false;
      }
    }

    // Apply type filter
    if (state.filter !== 'all') {
      if (state.filter === 'missed') {
        return call.status === 'missed';
      }
      return call.type === state.filter;
    }

    return true;
  });

  const groupedCalls = filteredCalls.reduce((groups, call) => {
    const date = call.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(call);
    return groups;
  }, {} as Record<string, typeof mockCalls>);

  const getGroupTitle = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleCallBack = (phoneNumber: string) => {
    // Add call back functionality
    console.log('Calling back:', phoneNumber);
  };

  const handleDeleteCall = (callId: string) => {
    setState(prev => ({
      ...prev,
      calls: prev.calls.filter(call => call.id !== callId)
    }));
  };

  const handleClearHistory = () => {
    setState(prev => ({
      ...prev,
      calls: []
    }));
  };

  const missedCallsCount = state.calls.filter(call => call.status === 'missed').length;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Calls</h1>
            {missedCallsCount > 0 && (
              <p className="text-sm text-energy-600 font-medium">
                {missedCallsCount} missed call{missedCallsCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ocean"
              size="sm"
              onClick={() => {/* Add new call functionality */}}
              className="flex items-center"
            >
              <Phone className="w-4 h-4 mr-1" />
              New Call
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search calls..."
            value={state.searchQuery}
            onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'missed', label: 'Missed' },
            { key: 'incoming', label: 'Incoming' },
            { key: 'outgoing', label: 'Outgoing' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setState(prev => ({ ...prev, filter: key as any }))}
              className={`
                px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${state.filter === key
                  ? 'bg-ocean-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(groupedCalls).length > 0 ? (
          Object.entries(groupedCalls).map(([dateString, calls]) => (
            <div key={dateString} className="border-b border-gray-100">
              <div className="px-4 py-2 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700">
                  {getGroupTitle(dateString)}
                </h3>
              </div>
              
              <CallList
                calls={calls}
                onCallBack={handleCallBack}
                onDeleteCall={handleDeleteCall}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {state.searchQuery ? 'No calls found' : 'No call history'}
            </h3>
            <p className="text-gray-600 mb-6">
              {state.searchQuery 
                ? 'Try adjusting your search terms'
                : 'Your call history will appear here'
              }
            </p>
            {!state.searchQuery && (
              <Button
                variant="ocean"
                onClick={() => {/* Add new call functionality */}}
                className="flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Make Your First Call
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {state.calls.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredCalls.length} call{filteredCalls.length !== 1 ? 's' : ''} shown
            </span>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {/* Add export functionality */}}
                className="text-sm"
              >
                Export
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                className="text-sm text-energy-600 hover:text-energy-700"
              >
                Clear History
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 