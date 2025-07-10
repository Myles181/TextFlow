import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  MessageSquare,
  Settings,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { NumberCard } from '../components/numbers/NumberCard';
import { NumberSelectionFlow } from '../components/numbers/NumberSelectionFlow';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockVirtualNumbers, mockAvailableNumbers } from '../utils/mockNumbers';

interface NumbersPageState {
  ownedNumbers: typeof mockVirtualNumbers;
  availableNumbers: typeof mockAvailableNumbers;
  searchQuery: string;
  selectedCountry: string;
  selectedAreaCode: string;
  view: 'owned' | 'available' | 'ported';
  isSelectionOpen: boolean;
}

export const NumbersPage: React.FC = () => {
  const [state, setState] = useState<NumbersPageState>({
    ownedNumbers: mockVirtualNumbers,
    availableNumbers: mockAvailableNumbers,
    searchQuery: '',
    selectedCountry: 'US',
    selectedAreaCode: '',
    view: 'owned',
    isSelectionOpen: false
  });

  const filteredNumbers = state.ownedNumbers.filter(number => {
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      return (
        number.phoneNumber.includes(query) ||
        number.city.toLowerCase().includes(query) ||
        number.country.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalUsage = state.ownedNumbers.reduce((total, number) => ({
    calls: total.calls + number.monthlyUsage.calls,
    messages: total.messages + number.monthlyUsage.messages,
    cost: total.cost + number.monthlyUsage.cost
  }), { calls: 0, messages: 0, cost: 0 });

  const activeNumbers = state.ownedNumbers.filter(n => n.status === 'active').length;
  const totalNumbers = state.ownedNumbers.length;

  const handleGetNewNumber = () => {
    setState(prev => ({ ...prev, isSelectionOpen: true }));
  };

  const handleCloseSelection = () => {
    setState(prev => ({ ...prev, isSelectionOpen: false }));
  };

  const handleConfigureNumber = (numberId: string) => {
    // Navigate to number configuration
    console.log('Configure number:', numberId);
  };

  const handleReleaseNumber = (numberId: string) => {
    if (window.confirm('Are you sure you want to release this number? This action cannot be undone.')) {
      setState(prev => ({
        ...prev,
        ownedNumbers: prev.ownedNumbers.filter(n => n.id !== numberId)
      }));
    }
  };

  const handleViewUsage = (numberId: string) => {
    // Navigate to usage analytics
    console.log('View usage for number:', numberId);
  };

  const handleBulkAction = (action: 'release' | 'configure' | 'export') => {
    // Handle bulk actions
    console.log('Bulk action:', action);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Phone Numbers</h1>
            <p className="text-gray-600 mt-1">
              Manage your virtual phone numbers and get new ones
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => handleBulkAction('export')}
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="ocean"
              onClick={handleGetNewNumber}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Get New Number
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-ocean-50 to-ocean-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ocean-700">Active Numbers</p>
                <p className="text-2xl font-bold text-ocean-900">{activeNumbers}</p>
              </div>
              <Phone className="w-8 h-8 text-ocean-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-success-50 to-success-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success-700">Total Calls</p>
                <p className="text-2xl font-bold text-success-900">{totalUsage.calls.toLocaleString()}</p>
              </div>
              <Phone className="w-8 h-8 text-success-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-energy-50 to-energy-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-energy-700">Total Messages</p>
                <p className="text-2xl font-bold text-energy-900">{totalUsage.messages.toLocaleString()}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-energy-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-700">Monthly Cost</p>
                <p className="text-2xl font-bold text-neutral-900">${totalUsage.cost.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                <span className="text-neutral-600 font-bold">$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search numbers, cities, or countries..."
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { key: 'owned', label: 'My Numbers', count: totalNumbers },
              { key: 'available', label: 'Available Numbers', count: state.availableNumbers.length },
              { key: 'ported', label: 'Port Number', count: 0 }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setState(prev => ({ ...prev, view: key as any }))}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${state.view === key
                    ? 'border-ocean-500 text-ocean-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {label}
                {count > 0 && (
                  <span className={`
                    ml-2 px-2 py-1 text-xs rounded-full
                    ${state.view === key
                      ? 'bg-ocean-100 text-ocean-600'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {state.view === 'owned' && (
          <div>
            {filteredNumbers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNumbers.map((number) => (
                  <NumberCard
                    key={number.id}
                    number={number}
                    onConfigure={handleConfigureNumber}
                    onRelease={handleReleaseNumber}
                    onViewUsage={handleViewUsage}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {state.searchQuery ? 'No numbers found' : 'No phone numbers yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {state.searchQuery 
                    ? 'Try adjusting your search terms'
                    : 'Get your first virtual phone number to start communicating'
                  }
                </p>
                {!state.searchQuery && (
                  <Button
                    variant="ocean"
                    onClick={handleGetNewNumber}
                    className="flex items-center mx-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Get Your First Number
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {state.view === 'available' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Browse Available Numbers
            </h3>
            <p className="text-gray-600 mb-6">
              Search for available numbers in your preferred location
            </p>
            <Button
              variant="ocean"
              onClick={handleGetNewNumber}
              className="flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Search Numbers
            </Button>
          </div>
        )}

        {state.view === 'ported' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Port Your Existing Number
            </h3>
            <p className="text-gray-600 mb-6">
              Bring your existing phone number to TextFlow
            </p>
            <Button
              variant="ocean"
              onClick={() => {/* Add port number functionality */}}
              className="flex items-center mx-auto"
            >
              <Upload className="w-4 h-4 mr-2" />
              Start Port Process
            </Button>
          </div>
        )}
      </div>

      {/* Number Selection Modal */}
      <NumberSelectionFlow
        isOpen={state.isSelectionOpen}
        onClose={handleCloseSelection}
        onNumberSelected={(number) => {
          // Add the new number to owned numbers
          const newNumber = {
            id: Date.now().toString(),
            phoneNumber: number.phoneNumber,
            country: 'US',
            areaCode: number.phoneNumber.slice(2, 5),
            city: 'New York',
            status: 'active' as const,
            acquiredDate: new Date(),
            monthlyUsage: {
              calls: 0,
              messages: 0,
              cost: number.monthlyPrice
            },
            settings: {
              callForwarding: null,
              voicemailEnabled: true,
              smsForwarding: null
            }
          };

          setState(prev => ({
            ...prev,
            ownedNumbers: [newNumber, ...prev.ownedNumbers],
            isSelectionOpen: false
          }));
        }}
      />
    </div>
  );
}; 