import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Smartphone, 
  Settings,
  Search,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AccountSettings } from '../components/settings/AccountSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { PrivacySettings } from '../components/settings/PrivacySettings';
import { BillingSettings } from '../components/settings/BillingSettings';
import { DeviceSettings } from '../components/settings/DeviceSettings';
import { ApiSettings } from '../components/settings/ApiSettings';
import { Input } from '../components/ui/Input';
import { mockUserSettings } from '../utils/mockSettings';

interface SettingsPageState {
  activeSection: 'account' | 'notifications' | 'privacy' | 'billing' | 'devices' | 'advanced';
  searchQuery: string;
}

const settingsSections = [
  {
    key: 'account',
    label: 'Account',
    icon: User,
    description: 'Profile, password, and account settings'
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Email, SMS, and push notification preferences'
  },
  {
    key: 'privacy',
    label: 'Privacy & Security',
    icon: Shield,
    description: 'Data sharing, call recording, and privacy controls'
  },
  {
    key: 'billing',
    label: 'Billing & Usage',
    icon: CreditCard,
    description: 'Payment methods, invoices, and usage tracking'
  },
  {
    key: 'devices',
    label: 'Devices & Sessions',
    icon: Smartphone,
    description: 'Connected devices and session management'
  },
  {
    key: 'advanced',
    label: 'Advanced',
    icon: Settings,
    description: 'API keys, integrations, and developer tools'
  }
];

export const SettingsPage: React.FC = () => {
  const [state, setState] = useState<SettingsPageState>({
    activeSection: 'account',
    searchQuery: ''
  });

  const filteredSections = settingsSections.filter(section =>
    section.label.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const renderActiveSection = () => {
    switch (state.activeSection) {
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'devices':
        return <DeviceSettings />;
      case 'advanced':
        return <ApiSettings />;
      default:
        return <AccountSettings />;
    }
  };

  const getSectionIcon = (sectionKey: string) => {
    const section = settingsSections.find(s => s.key === sectionKey);
    return section ? section.icon : Settings;
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and configuration
          </p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search settings..."
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              const isActive = state.activeSection === section.key;
              
              return (
                <button
                  key={section.key}
                  onClick={() => setState(prev => ({ ...prev, activeSection: section.key as any }))}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors
                    ${isActive
                      ? 'bg-ocean-50 border border-ocean-200'
                      : 'hover:bg-gray-50 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${isActive ? 'bg-ocean-500 text-white' : 'bg-gray-100 text-gray-600'}
                    `}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div>
                      <div className={`
                        font-medium
                        ${isActive ? 'text-ocean-700' : 'text-gray-900'}
                      `}>
                        {section.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {section.description}
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className={`
                    w-4 h-4 transition-colors
                    ${isActive ? 'text-ocean-500' : 'text-gray-400'}
                  `} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <div className="flex items-center justify-between mb-2">
              <span>Account Status</span>
              <div className="flex items-center text-success-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Verified</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Updated</span>
              <span>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-ocean-100 flex items-center justify-center">
              {React.createElement(getSectionIcon(state.activeSection), { 
                className: "w-5 h-5 text-ocean-600" 
              })}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {settingsSections.find(s => s.key === state.activeSection)?.label}
              </h2>
              <p className="text-gray-600">
                {settingsSections.find(s => s.key === state.activeSection)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}; 