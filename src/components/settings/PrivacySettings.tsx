import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Download, 
  Trash2, 
  Save,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  FileText,
  Database
} from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface PrivacySettings {
  dataSharing: {
    analytics: boolean;
    marketing: boolean;
    thirdParty: boolean;
  };
  callRecording: {
    enabled: boolean;
    retention: number;
    transcription: boolean;
  };
  visibility: {
    showOnlineStatus: boolean;
    readReceipts: boolean;
    typingIndicators: boolean;
  };
  dataExport: {
    includeMessages: boolean;
    includeCallLogs: boolean;
    includeContacts: boolean;
  };
}

export const PrivacySettings: React.FC = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    dataSharing: {
      analytics: true,
      marketing: false,
      thirdParty: false
    },
    callRecording: {
      enabled: false,
      retention: 30,
      transcription: false
    },
    visibility: {
      showOnlineStatus: true,
      readReceipts: true,
      typingIndicators: true
    },
    dataExport: {
      includeMessages: true,
      includeCallLogs: true,
      includeContacts: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleToggle = (path: string, value: boolean) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleRetentionChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      callRecording: { ...prev.callRecording, retention: value }
    }));
    setHasChanges(true);
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

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Trigger download
      console.log('Exporting data with settings:', settings.dataExport);
    } catch (error) {
      // Show error feedback
    } finally {
      setIsExporting(false);
    }
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
      {/* Data Sharing */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Data Sharing</h3>
            <p className="text-gray-600">Control how your data is used to improve our services</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Analytics & Performance</div>
              <div className="text-sm text-gray-500">
                Help us improve TextFlow by sharing anonymous usage data
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.dataSharing.analytics}
              onChange={(enabled) => handleToggle('dataSharing.analytics', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Marketing Communications</div>
              <div className="text-sm text-gray-500">
                Receive personalized offers and product updates
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.dataSharing.marketing}
              onChange={(enabled) => handleToggle('dataSharing.marketing', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Third-Party Services</div>
              <div className="text-sm text-gray-500">
                Allow data sharing with trusted third-party partners
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.dataSharing.thirdParty}
              onChange={(enabled) => handleToggle('dataSharing.thirdParty', enabled)}
            />
          </div>
        </div>
      </div>

      {/* Call Recording */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Call Recording</h3>
            <p className="text-gray-600">Manage call recording and transcription settings</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Enable Call Recording</div>
              <div className="text-sm text-gray-500">
                Record incoming and outgoing calls for quality assurance
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.callRecording.enabled}
              onChange={(enabled) => handleToggle('callRecording.enabled', enabled)}
            />
          </div>
          
          {settings.callRecording.enabled && (
            <div className="pl-4 border-l-2 border-red-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retention Period (days)
                </label>
                <select
                  value={settings.callRecording.retention}
                  onChange={(e) => handleRetentionChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={365}>1 year</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Recordings will be automatically deleted after this period
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Voice-to-Text Transcription</div>
                  <div className="text-sm text-gray-500">
                    Automatically transcribe recorded calls to text
                  </div>
                </div>
                <ToggleSwitch
                  enabled={settings.callRecording.transcription}
                  onChange={(enabled) => handleToggle('callRecording.transcription', enabled)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Visibility & Privacy</h3>
            <p className="text-gray-600">Control what others can see about your activity</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Show Online Status</div>
              <div className="text-sm text-gray-500">
                Let others see when you're active in TextFlow
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.visibility.showOnlineStatus}
              onChange={(enabled) => handleToggle('visibility.showOnlineStatus', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Read Receipts</div>
              <div className="text-sm text-gray-500">
                Show when you've read messages from others
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.visibility.readReceipts}
              onChange={(enabled) => handleToggle('visibility.readReceipts', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Typing Indicators</div>
              <div className="text-sm text-gray-500">
                Show when you're typing a message
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.visibility.typingIndicators}
              onChange={(enabled) => handleToggle('visibility.typingIndicators', enabled)}
            />
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Data Export</h3>
              <p className="text-gray-600">Download your data or request deletion</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleExportData}
            disabled={isExporting}
            className="flex items-center"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </>
            )}
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Include Messages</div>
              <div className="text-sm text-gray-500">
                Export all SMS and MMS conversations
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.dataExport.includeMessages}
              onChange={(enabled) => handleToggle('dataExport.includeMessages', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Include Call Logs</div>
              <div className="text-sm text-gray-500">
                Export call history and recordings
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.dataExport.includeCallLogs}
              onChange={(enabled) => handleToggle('dataExport.includeCallLogs', enabled)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Include Contacts</div>
              <div className="text-sm text-gray-500">
                Export your contact list and address book
              </div>
            </div>
            <ToggleSwitch
              enabled={settings.dataExport.includeContacts}
              onChange={(enabled) => handleToggle('dataExport.includeContacts', enabled)}
            />
          </div>
        </div>
      </div>

      {/* Data Deletion */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Data Deletion</h3>
            <p className="text-gray-600">Permanently delete your account and all data</p>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <div className="font-medium text-red-900">Warning</div>
              <div className="text-sm text-red-700 mt-1">
                This action cannot be undone. All your data, including messages, call logs, and account information will be permanently deleted.
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
              Request Deletion
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Privacy Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
              {Object.values(settings.dataSharing).filter(Boolean).length}/3 data sharing options enabled
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-red-600" />
            <span className="text-gray-700">
              Call recording {settings.callRecording.enabled ? 'enabled' : 'disabled'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">
              {Object.values(settings.visibility).filter(Boolean).length}/3 visibility options enabled
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-purple-600" />
            <span className="text-gray-700">
              {Object.values(settings.dataExport).filter(Boolean).length}/3 export options selected
            </span>
          </div>
        </div>
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
              Save Privacy Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}; 