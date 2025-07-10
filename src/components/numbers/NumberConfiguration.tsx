import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Voicemail, 
  Clock, 
  Settings, 
  Save,
  X,
  Check,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { VirtualNumber } from './NumberCard';
import clsx from 'clsx';

export interface NumberConfig {
  displayName: string;
  callForwarding: {
    enabled: boolean;
    forwardTo: string;
    conditions: 'always' | 'busy' | 'no-answer' | 'unreachable';
  };
  voicemail: {
    enabled: boolean;
    greeting: 'default' | 'custom';
    customGreeting?: string;
    emailNotifications: boolean;
    transcription: boolean;
  };
  sms: {
    forwardToEmail: boolean;
    forwardToPhone: string | null;
    autoReply: {
      enabled: boolean;
      message: string;
      conditions: string[];
    };
  };
  business: {
    businessHours: BusinessHours;
    afterHoursMessage: string;
    holidayMessage: string;
  };
}

interface BusinessHours {
  enabled: boolean;
  timezone: string;
  schedule: {
    [key: string]: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
}

interface NumberConfigurationProps {
  number: VirtualNumber;
  onSave: (config: NumberConfig) => void;
  onClose: () => void;
}

const defaultConfig: NumberConfig = {
  displayName: '',
  callForwarding: {
    enabled: false,
    forwardTo: '',
    conditions: 'always'
  },
  voicemail: {
    enabled: true,
    greeting: 'default',
    emailNotifications: false,
    transcription: false
  },
  sms: {
    forwardToEmail: false,
    forwardToPhone: null,
    autoReply: {
      enabled: false,
      message: '',
      conditions: []
    }
  },
  business: {
    businessHours: {
      enabled: false,
      timezone: 'America/New_York',
      schedule: {
        monday: { enabled: true, start: '09:00', end: '17:00' },
        tuesday: { enabled: true, start: '09:00', end: '17:00' },
        wednesday: { enabled: true, start: '09:00', end: '17:00' },
        thursday: { enabled: true, start: '09:00', end: '17:00' },
        friday: { enabled: true, start: '09:00', end: '17:00' },
        saturday: { enabled: false, start: '09:00', end: '17:00' },
        sunday: { enabled: false, start: '09:00', end: '17:00' }
      }
    },
    afterHoursMessage: 'Thank you for calling. Our business hours are Monday through Friday, 9 AM to 5 PM. Please leave a message and we\'ll get back to you.',
    holidayMessage: 'Thank you for calling. We are currently closed for the holiday. Please leave a message and we\'ll get back to you when we reopen.'
  }
};

export const NumberConfiguration: React.FC<NumberConfigurationProps> = ({
  number,
  onSave,
  onClose
}) => {
  const [config, setConfig] = useState<NumberConfig>({
    ...defaultConfig,
    displayName: number.phoneNumber
  });
  const [activeTab, setActiveTab] = useState<'basic' | 'calls' | 'voicemail' | 'sms' | 'business'>('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleConfigChange = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current: any = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      setHasChanges(true);
      return newConfig;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(config);
      setHasChanges(false);
      // Show success feedback
    } catch (error) {
      // Show error feedback
    } finally {
      setIsSaving(false);
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    }
    return phoneNumber;
  };

  const tabs = [
    { key: 'basic', label: 'Basic Info', icon: Settings },
    { key: 'calls', label: 'Call Settings', icon: Phone },
    { key: 'voicemail', label: 'Voicemail', icon: Voicemail },
    { key: 'sms', label: 'SMS Settings', icon: MessageSquare },
    { key: 'business', label: 'Business Hours', icon: Clock }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <Input
                    value={config.displayName}
                    onChange={(e) => handleConfigChange('displayName', e.target.value)}
                    placeholder="Enter a friendly name for this number"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This name will be displayed in your dashboard and call logs
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Phone Number</div>
                  <div className="font-mono text-lg font-semibold text-gray-900">
                    {formatPhoneNumber(number.phoneNumber)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {number.city}, {number.country} • {number.areaCode} area code
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'calls':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Forwarding</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Enable Call Forwarding</div>
                    <div className="text-sm text-gray-500">
                      Forward incoming calls to another phone number
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfigChange('callForwarding.enabled', !config.callForwarding.enabled)}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      config.callForwarding.enabled ? 'bg-ocean-500' : 'bg-gray-200'
                    )}
                  >
                    <span
                      className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        config.callForwarding.enabled ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                {config.callForwarding.enabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-ocean-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Forward to Number
                      </label>
                      <Input
                        value={config.callForwarding.forwardTo}
                        onChange={(e) => handleConfigChange('callForwarding.forwardTo', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Forwarding Conditions
                      </label>
                      <select
                        value={config.callForwarding.conditions}
                        onChange={(e) => handleConfigChange('callForwarding.conditions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                      >
                        <option value="always">Always forward</option>
                        <option value="busy">When busy</option>
                        <option value="no-answer">When no answer</option>
                        <option value="unreachable">When unreachable</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'voicemail':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Voicemail Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Enable Voicemail</div>
                    <div className="text-sm text-gray-500">
                      Allow callers to leave voice messages
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfigChange('voicemail.enabled', !config.voicemail.enabled)}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      config.voicemail.enabled ? 'bg-ocean-500' : 'bg-gray-200'
                    )}
                  >
                    <span
                      className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        config.voicemail.enabled ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                {config.voicemail.enabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-ocean-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Greeting Type
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="greeting"
                            value="default"
                            checked={config.voicemail.greeting === 'default'}
                            onChange={(e) => handleConfigChange('voicemail.greeting', e.target.value)}
                            className="mr-2"
                          />
                          <span>Use default greeting</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="greeting"
                            value="custom"
                            checked={config.voicemail.greeting === 'custom'}
                            onChange={(e) => handleConfigChange('voicemail.greeting', e.target.value)}
                            className="mr-2"
                          />
                          <span>Use custom greeting</span>
                        </label>
                      </div>
                    </div>
                    
                    {config.voicemail.greeting === 'custom' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Greeting
                        </label>
                        <textarea
                          value={config.voicemail.customGreeting || ''}
                          onChange={(e) => handleConfigChange('voicemail.customGreeting', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                          placeholder="Record your custom voicemail greeting..."
                        />
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Record
                          </Button>
                          <Button variant="outline" size="sm">
                            <Pause className="w-4 h-4 mr-1" />
                            Stop
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Email Notifications</div>
                          <div className="text-sm text-gray-500">
                            Send voicemail transcriptions to your email
                          </div>
                        </div>
                        <button
                          onClick={() => handleConfigChange('voicemail.emailNotifications', !config.voicemail.emailNotifications)}
                          className={clsx(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                            config.voicemail.emailNotifications ? 'bg-ocean-500' : 'bg-gray-200'
                          )}
                        >
                          <span
                            className={clsx(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              config.voicemail.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Voice-to-Text</div>
                          <div className="text-sm text-gray-500">
                            Transcribe voicemails to text
                          </div>
                        </div>
                        <button
                          onClick={() => handleConfigChange('voicemail.transcription', !config.voicemail.transcription)}
                          className={clsx(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                            config.voicemail.transcription ? 'bg-ocean-500' : 'bg-gray-200'
                          )}
                        >
                          <span
                            className={clsx(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              config.voicemail.transcription ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Forward SMS to Email</div>
                    <div className="text-sm text-gray-500">
                      Send incoming SMS messages to your email
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfigChange('sms.forwardToEmail', !config.sms.forwardToEmail)}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      config.sms.forwardToEmail ? 'bg-ocean-500' : 'bg-gray-200'
                    )}
                  >
                    <span
                      className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        config.sms.forwardToEmail ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forward SMS to Phone Number
                  </label>
                  <Input
                    value={config.sms.forwardToPhone || ''}
                    onChange={(e) => handleConfigChange('sms.forwardToPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567 (optional)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave blank to disable SMS forwarding to phone
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-gray-900">Auto-Reply</div>
                      <div className="text-sm text-gray-500">
                        Automatically reply to incoming SMS messages
                      </div>
                    </div>
                    <button
                      onClick={() => handleConfigChange('sms.autoReply.enabled', !config.sms.autoReply.enabled)}
                      className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        config.sms.autoReply.enabled ? 'bg-ocean-500' : 'bg-gray-200'
                      )}
                    >
                      <span
                        className={clsx(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                          config.sms.autoReply.enabled ? 'translate-x-6' : 'translate-x-1'
                        )}
                      />
                    </button>
                  </div>
                  
                  {config.sms.autoReply.enabled && (
                    <div className="space-y-4 pl-4 border-l-2 border-ocean-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auto-Reply Message
                        </label>
                        <textarea
                          value={config.sms.autoReply.message}
                          onChange={(e) => handleConfigChange('sms.autoReply.message', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                          placeholder="Thank you for your message. We'll get back to you soon."
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Enable Business Hours</div>
                    <div className="text-sm text-gray-500">
                      Set specific hours when calls are handled differently
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfigChange('business.businessHours.enabled', !config.business.businessHours.enabled)}
                    className={clsx(
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                      config.business.businessHours.enabled ? 'bg-ocean-500' : 'bg-gray-200'
                    )}
                  >
                    <span
                      className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        config.business.businessHours.enabled ? 'translate-x-6' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
                
                {config.business.businessHours.enabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-ocean-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={config.business.businessHours.timezone}
                        onChange={(e) => handleConfigChange('business.businessHours.timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Weekly Schedule
                      </label>
                      <div className="space-y-3">
                        {Object.entries(config.business.businessHours.schedule).map(([day, schedule]) => (
                          <div key={day} className="flex items-center space-x-4">
                            <div className="w-20">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={schedule.enabled}
                                  onChange={(e) => handleConfigChange(`business.businessHours.schedule.${day}.enabled`, e.target.checked)}
                                  className="mr-2"
                                />
                                <span className="capitalize">{day}</span>
                              </label>
                            </div>
                            
                            {schedule.enabled && (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={schedule.start}
                                  onChange={(e) => handleConfigChange(`business.businessHours.schedule.${day}.start`, e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded"
                                />
                                <span>to</span>
                                <input
                                  type="time"
                                  value={schedule.end}
                                  onChange={(e) => handleConfigChange(`business.businessHours.schedule.${day}.end`, e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        After Hours Message
                      </label>
                      <textarea
                        value={config.business.afterHoursMessage}
                        onChange={(e) => handleConfigChange('business.afterHoursMessage', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        placeholder="Message to play when outside business hours..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Holiday Message
                      </label>
                      <textarea
                        value={config.business.holidayMessage}
                        onChange={(e) => handleConfigChange('business.holidayMessage', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        placeholder="Message to play on holidays..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Configure Number</h2>
            <p className="text-gray-600 mt-1">
              {formatPhoneNumber(number.phoneNumber)}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <div className="flex items-center text-sm text-energy-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                Unsaved changes
              </div>
            )}
            
            <Button
              variant="outline"
              onClick={onClose}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            
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
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={clsx(
                  'flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === key
                    ? 'border-ocean-500 text-ocean-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}; 