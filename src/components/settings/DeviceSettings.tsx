import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  LogOut, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  MoreVertical,
  Shield
} from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface Device {
  id: string;
  name: string;
  type: 'web' | 'mobile' | 'desktop';
  lastActive: Date;
  location: string;
  isCurrent: boolean;
  browser?: string;
  os?: string;
  ip?: string;
}

export const DeviceSettings: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Chrome on Windows',
      type: 'web',
      lastActive: new Date('2024-03-15T10:30:00'),
      location: 'New York, NY',
      isCurrent: true,
      browser: 'Chrome 120.0',
      os: 'Windows 11',
      ip: '192.168.1.100'
    },
    {
      id: '2',
      name: 'Safari on iPhone',
      type: 'mobile',
      lastActive: new Date('2024-03-14T15:45:00'),
      location: 'San Francisco, CA',
      isCurrent: false,
      browser: 'Safari 17.0',
      os: 'iOS 17.2',
      ip: '10.0.0.50'
    },
    {
      id: '3',
      name: 'Firefox on Mac',
      type: 'desktop',
      lastActive: new Date('2024-03-13T09:15:00'),
      location: 'Chicago, IL',
      isCurrent: false,
      browser: 'Firefox 123.0',
      os: 'macOS 14.0',
      ip: '172.16.0.25'
    }
  ]);

  const [showDeviceDetails, setShowDeviceDetails] = useState<string | null>(null);

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'web':
        return <Monitor className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const getDeviceColor = (type: Device['type']) => {
    switch (type) {
      case 'web':
        return 'bg-blue-100 text-blue-600';
      case 'mobile':
        return 'bg-green-100 text-green-600';
      case 'desktop':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const handleLogoutDevice = (deviceId: string) => {
    if (window.confirm('Are you sure you want to log out this device? This will immediately end the session.')) {
      setDevices(prev => prev.filter(device => device.id !== deviceId));
    }
  };

  const handleLogoutAllDevices = () => {
    if (window.confirm('Are you sure you want to log out all devices except this one? This will immediately end all other sessions.')) {
      setDevices(prev => prev.filter(device => device.isCurrent));
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Session */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-ocean-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Session</h3>
            <p className="text-gray-600">This is your active session</p>
          </div>
        </div>
        
        {devices.filter(d => d.isCurrent).map((device) => (
          <div key={device.id} className="bg-gradient-to-r from-ocean-50 to-blue-50 border border-ocean-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', getDeviceColor(device.type))}>
                  {getDeviceIcon(device.type)}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">{device.name}</h4>
                  <p className="text-sm text-gray-600">{device.location}</p>
                </div>
              </div>
              
              <span className="px-3 py-1 bg-ocean-100 text-ocean-700 text-sm rounded-full font-medium">
                Current Session
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Browser:</span>
                <span className="ml-2 text-gray-900">{device.browser}</span>
              </div>
              <div>
                <span className="text-gray-500">OS:</span>
                <span className="ml-2 text-gray-900">{device.os}</span>
              </div>
              <div>
                <span className="text-gray-500">IP Address:</span>
                <span className="ml-2 text-gray-900">{device.ip}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Active now</span>
            </div>
          </div>
        ))}
      </div>

      {/* Other Devices */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Other Devices</h3>
              <p className="text-gray-600">Manage your other active sessions</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleLogoutAllDevices}
            className="flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout All Others
          </Button>
        </div>
        
        <div className="space-y-4">
          {devices.filter(d => !d.isCurrent).map((device) => (
            <div key={device.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', getDeviceColor(device.type))}>
                    {getDeviceIcon(device.type)}
                  </div>
                  
                  <div>
                    <div className="font-medium text-gray-900">{device.name}</div>
                    <div className="text-sm text-gray-500 flex items-center space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {device.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatLastActive(device.lastActive)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeviceDetails(showDeviceDetails === device.id ? null : device.id)}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLogoutDevice(device.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
              
              {showDeviceDetails === device.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Browser:</span>
                      <span className="ml-2 text-gray-900">{device.browser}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">OS:</span>
                      <span className="ml-2 text-gray-900">{device.os}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">IP Address:</span>
                      <span className="ml-2 text-gray-900">{device.ip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {devices.filter(d => !d.isCurrent).length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Other Active Sessions</h4>
              <p className="text-gray-600">
                You're only signed in on this device
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
            <p className="text-gray-600">Get notified about suspicious activity</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">New Device Login</div>
              <div className="text-sm text-gray-500">
                Get notified when you sign in from a new device
              </div>
            </div>
            <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Unusual Location</div>
              <div className="text-sm text-gray-500">
                Alert when signing in from an unfamiliar location
              </div>
            </div>
            <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Failed Login Attempts</div>
              <div className="text-sm text-gray-500">
                Notify about multiple failed login attempts
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Session Management</h3>
            <p className="text-gray-600">Configure session timeout and security settings</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="240">4 hours</option>
              <option value="1440">24 hours</option>
              <option value="never">Never (until manually logged out)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Automatically log out inactive sessions after this time
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Remember This Device</div>
              <div className="text-sm text-gray-500">
                Stay logged in on this device for 30 days
              </div>
            </div>
            <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Require Re-authentication</div>
              <div className="text-sm text-gray-500">
                Require password for sensitive actions
              </div>
            </div>
            <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Device Summary */}
      <div className="bg-gradient-to-r from-ocean-50 to-purple-50 rounded-lg border border-ocean-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-ocean-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Device Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
              {devices.filter(d => d.type === 'web').length} web sessions
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">
              {devices.filter(d => d.type === 'mobile').length} mobile sessions
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-gray-700">
              {devices.length} total active sessions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 