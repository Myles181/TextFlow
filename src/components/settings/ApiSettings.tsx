import React, { useState } from 'react';
import { 
  Key, 
  Webhook, 
  Code, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  ExternalLink,
  BarChart3,
  Shield,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdDate: Date;
  lastUsed: Date | null;
  isActive: boolean;
}

interface Webhook {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
  lastTriggered: Date | null;
}

interface ApiUsage {
  requests: number;
  limit: number;
  resetDate: Date;
}

export const ApiSettings: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef',
      permissions: ['read', 'write'],
      createdDate: new Date('2024-01-01'),
      lastUsed: new Date('2024-03-15T09:00:00'),
      isActive: true
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_test_abcdef1234567890',
      permissions: ['read'],
      createdDate: new Date('2024-02-15'),
      lastUsed: new Date('2024-03-14T16:30:00'),
      isActive: true
    }
  ]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      url: 'https://api.example.com/webhook',
      events: ['message.received', 'call.completed'],
      isActive: true,
      lastTriggered: new Date('2024-03-15T08:30:00')
    }
  ]);

  const [usage, setUsage] = useState<ApiUsage>({
    requests: 1250,
    limit: 10000,
    resetDate: new Date('2024-04-01')
  });

  const [showKey, setShowKey] = useState<string | null>(null);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [showCreateWebhook, setShowCreateWebhook] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const maskApiKey = (key: string) => {
    return key.slice(0, 7) + '...' + key.slice(-4);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show success feedback
  };

  const handleCreateApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: 'sk_live_' + Math.random().toString(36).substr(2, 9),
      permissions: ['read'],
      createdDate: new Date(),
      lastUsed: null,
      isActive: true
    };
    setApiKeys(prev => [newKey, ...prev]);
    setShowCreateKey(false);
  };

  const handleDeleteApiKey = (id: string) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(prev => prev.filter(key => key.id !== id));
    }
  };

  const handleCreateWebhook = () => {
    const newWebhook: Webhook = {
      id: Date.now().toString(),
      url: 'https://your-domain.com/webhook',
      events: ['message.received'],
      isActive: true,
      lastTriggered: null
    };
    setWebhooks(prev => [newWebhook, ...prev]);
    setShowCreateWebhook(false);
  };

  const handleDeleteWebhook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this webhook? This action cannot be undone.')) {
      setWebhooks(prev => prev.filter(webhook => webhook.id !== id));
    }
  };

  const getUsagePercentage = () => {
    return Math.min((usage.requests / usage.limit) * 100, 100);
  };

  return (
    <div className="space-y-8">
      {/* API Usage */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">API Usage</h3>
            <p className="text-gray-600">Monitor your API request usage and limits</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{usage.requests.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Requests This Month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{usage.limit.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Monthly Limit</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatDate(usage.resetDate)}
            </div>
            <div className="text-sm text-gray-500">Resets On</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Usage Progress</span>
            <span className="text-gray-900">{getUsagePercentage().toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                getUsagePercentage() > 80 ? 'bg-red-500' : 'bg-ocean-500'
              )}
              style={{ width: `${getUsagePercentage()}%` }}
            />
          </div>
        </div>
        
        {getUsagePercentage() > 80 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>You're approaching your API limit. Consider upgrading your plan.</span>
            </div>
          </div>
        )}
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
              <p className="text-gray-600">Manage your API keys for authentication</p>
            </div>
          </div>
          
          <Button
            variant="ocean"
            onClick={() => setShowCreateKey(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </Button>
        </div>
        
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{apiKey.name}</div>
                  <div className="text-sm text-gray-500">
                    Created {formatDate(apiKey.createdDate)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={clsx(
                    'px-2 py-1 text-xs rounded-full',
                    apiKey.isActive 
                      ? 'bg-success-100 text-success-700' 
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {apiKey.isActive ? 'Active' : 'Inactive'}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                  >
                    {showKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(apiKey.key)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteApiKey(apiKey.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">API Key:</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {showKey === apiKey.id ? apiKey.key : maskApiKey(apiKey.key)}
                  </code>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <span className="text-gray-500">Permissions:</span>
                    <span className="ml-1 text-gray-900">
                      {apiKey.permissions.join(', ')}
                    </span>
                  </div>
                  
                  {apiKey.lastUsed && (
                    <div>
                      <span className="text-gray-500">Last used:</span>
                      <span className="ml-1 text-gray-900">
                        {formatDate(apiKey.lastUsed)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Webhook className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
              <p className="text-gray-600">Configure webhooks to receive real-time events</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowCreateWebhook(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Webhook
          </Button>
        </div>
        
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{webhook.url}</div>
                  <div className="text-sm text-gray-500">
                    {webhook.events.length} events configured
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={clsx(
                    'px-2 py-1 text-xs rounded-full',
                    webhook.isActive 
                      ? 'bg-success-100 text-success-700' 
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {webhook.isActive ? 'Active' : 'Inactive'}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteWebhook(webhook.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event) => (
                    <span
                      key={event}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {event}
                    </span>
                  ))}
                </div>
                
                {webhook.lastTriggered && (
                  <div className="text-sm text-gray-500">
                    Last triggered: {formatDate(webhook.lastTriggered)}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {webhooks.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Webhook className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Webhooks Configured</h4>
              <p className="text-gray-600 mb-4">
                Set up webhooks to receive real-time notifications about events
              </p>
              <Button
                variant="outline"
                onClick={() => setShowCreateWebhook(true)}
                className="flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Webhook
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Developer Resources</h3>
            <p className="text-gray-600">Documentation, examples, and tools</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <ExternalLink className="w-5 h-5 text-ocean-600" />
              <h4 className="font-medium text-gray-900">API Documentation</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Complete API reference with examples and best practices
            </p>
            <Button variant="outline" size="sm">
              View Docs
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-5 h-5 text-energy-600" />
              <h4 className="font-medium text-gray-900">SDKs & Libraries</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Official SDKs for popular programming languages
            </p>
            <Button variant="outline" size="sm">
              Browse SDKs
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-success-600" />
              <h4 className="font-medium text-gray-900">Security Guide</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Best practices for securing your API integrations
            </p>
            <Button variant="outline" size="sm">
              Security Guide
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-gray-900">API Explorer</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Interactive tool to test API endpoints
            </p>
            <Button variant="outline" size="sm">
              Open Explorer
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-ocean-50 to-purple-50 rounded-lg border border-ocean-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-ocean-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => setShowCreateKey(true)}
            className="flex items-center justify-center"
          >
            <Key className="w-4 h-4 mr-2" />
            Generate API Key
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowCreateWebhook(true)}
            className="flex items-center justify-center"
          >
            <Webhook className="w-4 h-4 mr-2" />
            Add Webhook
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}; 