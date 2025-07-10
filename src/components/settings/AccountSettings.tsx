import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Camera, 
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
  Clock,
  MapPin,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import clsx from 'clsx';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  timezone: string;
  language: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AccountSettingsProps {
  user?: any;
  onUpdateProfile?: (data: ProfileData) => void;
  onChangePassword?: (data: PasswordData) => void;
}

const mockProfile: ProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '',
  timezone: 'America/New_York',
  language: 'en'
};

const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEDT)' }
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' }
];

export const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const [profile, setProfile] = useState<ProfileData>(mockProfile);
  const [password, setPassword] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'sessions'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPassword(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
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

  const handleChangePassword = async () => {
    if (password.newPassword !== password.confirmPassword) {
      // Show error: passwords don't match
      return;
    }
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      // Show success feedback
    } catch (error) {
      // Show error feedback
    } finally {
      setIsSaving(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-ocean-400 to-ocean-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center text-white hover:bg-ocean-600 transition-colors">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              Upload a new profile picture. We support JPG, PNG, and GIF files up to 5MB.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Upload Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="pl-10"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="pl-10"
                placeholder="Enter your email address"
                type="email"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This email is used for account notifications and recovery
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="pl-10"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Used for account recovery and SMS notifications
            </p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={profile.timezone}
                onChange={(e) => handleProfileChange('timezone', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              >
                {timezones.map(tz => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={profile.language}
                onChange={(e) => handleProfileChange('language', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="ocean"
          onClick={handleSaveProfile}
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
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="pl-10 pr-10"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              className="pl-10"
              placeholder="Enter new password"
            />
            <p className="text-sm text-gray-500 mt-1">
              Must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              className="pl-10"
              placeholder="Confirm new password"
            />
          </div>
          
          <Button
            variant="ocean"
            onClick={handleChangePassword}
            disabled={!password.currentPassword || !password.newPassword || !password.confirmPassword || isSaving}
            className="flex items-center"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Changing Password...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">SMS Authentication</div>
            <div className="text-sm text-gray-500">
              Receive a code via SMS when signing in
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Not enabled</span>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Login Activity</h3>
        
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'New York, NY', time: '2 hours ago', current: true },
            { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '1 day ago', current: false },
            { device: 'Firefox on Mac', location: 'Chicago, IL', time: '3 days ago', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-ocean-600" />
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">{session.device}</div>
                  <div className="text-sm text-gray-500">
                    {session.location} • {session.time}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {session.current && (
                  <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                    Current
                  </span>
                )}
                <Button variant="ghost" size="sm" className="text-gray-500">
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSessionsTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-ocean-50 border border-ocean-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-ocean-600" />
              </div>
              
              <div>
                <div className="font-medium text-gray-900">Chrome on Windows</div>
                <div className="text-sm text-gray-500">
                  New York, NY • Last active 2 hours ago
                </div>
              </div>
            </div>
            
            <span className="px-2 py-1 bg-ocean-100 text-ocean-700 text-xs rounded-full">
              Current Session
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              
              <div>
                <div className="font-medium text-gray-900">Safari on iPhone</div>
                <div className="text-sm text-gray-500">
                  San Francisco, CA • Last active 1 day ago
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { key: 'profile', label: 'Profile', icon: User },
            { key: 'security', label: 'Security', icon: Shield },
            { key: 'sessions', label: 'Sessions', icon: Clock }
          ].map(({ key, label, icon: Icon }) => (
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

      {/* Tab Content */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'security' && renderSecurityTab()}
      {activeTab === 'sessions' && renderSessionsTab()}
    </div>
  );
}; 