import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Clock, 
  Save,
  TestTube,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface NotificationPreferences {
  email: {
    newMessages: boolean;
    missedCalls: boolean;
    accountUpdates: boolean;
    billing: boolean;
    marketing: boolean;
  };
  sms: {
    urgentOnly: boolean;
    lowBalance: boolean;
    systemAlerts: boolean;
  };
  push: {
    messages: boolean;
    calls: boolean;
    quietHours: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
  };
}

export const NotificationSettings: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      newMessages: true,
      missedCalls: true,
      accountUpdates: true,
      billing: true,
      marketing: false
    },
    sms: {
      urgentOnly: true,
      lowBalance: true,
      systemAlerts: false
    },
    push: {
      messages: true,
      calls: true,
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '08:00'
      }
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (path: string, value: boolean) => {
    setPreferences(prev => {
      const newPrefs = { ...prev };
      const keys = path.split('.');
      let current: any = newPrefs;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      setHasChanges(true);
      return newPrefs;
    });
  };

  const handleTimeChange = (path: string, value: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev };
      const keys = path.split('.');
      let current: any = newPrefs;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      setHasChanges(true);
      return newPrefs;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      // Show success feedback
    } catch (error) {
      // Show error feedback
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestNotification = (type: 'email' | 'sms' | 'push') => {
    // Simulate sending test notification
    console.log(`Sending test ${type} notification`);
  };

  const ToggleSwitch: React.FC<{
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
  }> = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        enabled ? 'bg-ocean-500' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
              <p className="text-gray-600">Receive notifications via email</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTestNotification('email')}
            className="flex items-center"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Test Email
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">New Messages</div>
              <div className="text-sm text-gray-500">
                Get notified when you receive new SMS messages
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.email.newMessages}
              onChange={(enabled) => handleToggle('email.newMessages', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Missed Calls</div>
              <div className="text-sm text-gray-500">
                Receive notifications for missed calls
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.email.missedCalls}
              onChange={(enabled) => handleToggle('email.missedCalls', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Account Updates</div>
              <div className="text-sm text-gray-500">
                Important account changes and security alerts
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.email.accountUpdates}
              onChange={(enabled) => handleToggle('email.accountUpdates', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Billing & Invoices</div>
              <div className="text-sm text-gray-500">
                Payment confirmations and billing statements
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.email.billing}
              onChange={(enabled) => handleToggle('email.billing', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Marketing & Updates</div>
              <div className="text-sm text-gray-500">
                Product updates, tips, and promotional offers
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.email.marketing}
              onChange={(enabled) => handleToggle('email.marketing', enabled)}
            />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">SMS Notifications</h3>
              <p className="text-gray-600">Receive urgent notifications via SMS</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTestNotification('sms')}
            className="flex items-center"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Test SMS
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Urgent Alerts Only</div>
              <div className="text-sm text-gray-500">
                Only send SMS for critical notifications
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.sms.urgentOnly}
              onChange={(enabled) => handleToggle('sms.urgentOnly', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Low Balance Alerts</div>
              <div className="text-sm text-gray-500">
                Get notified when your account balance is low
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.sms.lowBalance}
              onChange={(enabled) => handleToggle('sms.lowBalance', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">System Alerts</div>
              <div className="text-sm text-gray-500">
                Important system maintenance and updates
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.sms.systemAlerts}
              onChange={(enabled) => handleToggle('sms.systemAlerts', enabled)}
            />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
              <p className="text-gray-600">In-app and browser notifications</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTestNotification('push')}
            className="flex items-center"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Test Push
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">New Messages</div>
              <div className="text-sm text-gray-500">
                Get notified when you receive new messages
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.push.messages}
              onChange={(enabled) => handleToggle('push.messages', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Incoming Calls</div>
              <div className="text-sm text-gray-500">
                Notify about incoming calls
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.push.calls}
              onChange={(enabled) => handleToggle('push.calls', enabled)}
            />
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-gray-900">Quiet Hours</div>
              <div className="text-sm text-gray-500">
                Pause notifications during specific hours
              </div>
            </div>
            <ToggleSwitch
              enabled={preferences.push.quietHours.enabled}
              onChange={(enabled) => handleToggle('push.quietHours.enabled', enabled)}
            />
          </div>
          
          {preferences.push.quietHours.enabled && (
            <div className="pl-4 border-l-2 border-purple-200 space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={preferences.push.quietHours.startTime}
                    onChange={(e) => handleTimeChange('push.quietHours.startTime', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={preferences.push.quietHours.endTime}
                    onChange={(e) => handleTimeChange('push.quietHours.endTime', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  Notifications will be paused from {preferences.push.quietHours.startTime} to {preferences.push.quietHours.endTime}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Summary */}
      <div className="bg-gradient-to-r from-ocean-50 to-purple-50 rounded-lg border border-ocean-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
            <Bell className="w-4 h-4 text-ocean-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Notification Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
              {Object.values(preferences.email).filter(Boolean).length} email types enabled
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">
              {Object.values(preferences.sms).filter(Boolean).length} SMS types enabled
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-purple-600" />
            <span className="text-gray-700">
              {Object.values(preferences.push).filter(Boolean).length} push types enabled
            </span>
          </div>
        </div>
        
        {preferences.push.quietHours.enabled && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <VolumeX className="w-4 h-4" />
            <span>
              Quiet hours active: {preferences.push.quietHours.startTime} - {preferences.push.quietHours.endTime}
            </span>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="ocean"
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="flex items-center"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  );
}; 