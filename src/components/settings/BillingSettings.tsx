import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface SubscriptionPlan {
  name: string;
  price: number;
  features: string[];
  nextBilling: Date;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiry: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  items: Array<{
    description: string;
    amount: number;
  }>;
}

interface UsageData {
  calls: number;
  messages: number;
  data: number;
  limits: {
    calls: number;
    messages: number;
    data: number;
  };
}

export const BillingSettings: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>({
    name: 'Pro',
    price: 29.99,
    features: ['Unlimited calls', 'Unlimited SMS', 'Voicemail', 'Call forwarding'],
    nextBilling: new Date('2024-04-01')
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiry: '12/25',
      isDefault: true
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      date: new Date('2024-03-01'),
      amount: 29.99,
      status: 'paid',
      items: [
        { description: 'Pro Plan - March 2024', amount: 29.99 }
      ]
    },
    {
      id: 'INV-002',
      date: new Date('2024-02-01'),
      amount: 29.99,
      status: 'paid',
      items: [
        { description: 'Pro Plan - February 2024', amount: 29.99 }
      ]
    }
  ]);

  const [usage, setUsage] = useState<UsageData>({
    calls: 156,
    messages: 89,
    data: 2.5,
    limits: {
      calls: 1000,
      messages: 1000,
      data: 10
    }
  });

  const [showAddPayment, setShowAddPayment] = useState(false);

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-success-600 bg-success-100';
      case 'pending':
        return 'text-energy-600 bg-energy-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleUpgradePlan = () => {
    // Handle plan upgrade
    console.log('Upgrade plan');
  };

  const handleAddPaymentMethod = () => {
    setShowAddPayment(true);
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Simulate invoice download
    console.log('Downloading invoice:', invoice.id);
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-ocean-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              <p className="text-gray-600">Manage your subscription and billing</p>
            </div>
          </div>
          
          <Button
            variant="ocean"
            onClick={handleUpgradePlan}
            className="flex items-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
        
        <div className="bg-gradient-to-r from-ocean-50 to-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-gray-900">{currentPlan.name} Plan</h4>
              <p className="text-gray-600">${currentPlan.price}/month</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500">Next billing</div>
              <div className="font-medium text-gray-900">
                {currentPlan.nextBilling.toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success-600" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
              <p className="text-gray-600">Manage your payment options</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleAddPaymentMethod}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {method.brand.toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">
                    •••• •••• •••• {method.last4}
                  </div>
                  <div className="text-sm text-gray-500">
                    Expires {method.expiry}
                  </div>
                </div>
                
                {method.isDefault && (
                  <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefaultPayment(method.id)}
                  >
                    Set Default
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tracking */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Usage This Month</h3>
            <p className="text-gray-600">Track your current usage and limits</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Calls</span>
              <span className="text-sm text-gray-900">
                {usage.calls.toLocaleString()} / {usage.limits.calls.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-ocean-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getUsagePercentage(usage.calls, usage.limits.calls)}%` }}
              />
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3" />
              <span>15% increase from last month</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Messages</span>
              <span className="text-sm text-gray-900">
                {usage.messages.toLocaleString()} / {usage.limits.messages.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-energy-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getUsagePercentage(usage.messages, usage.limits.messages)}%` }}
              />
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <TrendingDown className="w-3 h-3" />
              <span>8% decrease from last month</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Data</span>
              <span className="text-sm text-gray-900">
                {usage.data}GB / {usage.limits.data}GB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getUsagePercentage(usage.data, usage.limits.data)}%` }}
              />
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3" />
              <span>25% increase from last month</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              You're using 25% of your monthly allowance. Consider upgrading if you need more.
            </span>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Invoice History</h3>
            <p className="text-gray-600">Download past invoices and receipts</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                
                <div>
                  <div className="font-medium text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-500">
                    {invoice.date.toLocaleDateString()} • ${invoice.amount.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={clsx(
                  'px-2 py-1 text-xs rounded-full',
                  getStatusColor(invoice.status)
                )}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadInvoice(invoice)}
                  className="flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" className="text-gray-600">
            View All Invoices
          </Button>
        </div>
      </div>

      {/* Billing Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Billing Alerts</h3>
            <p className="text-gray-600">Configure notifications for billing events</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Low Balance Alerts</div>
              <div className="text-sm text-gray-500">
                Get notified when your account balance is low
              </div>
            </div>
            <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Payment Due Reminders</div>
              <div className="text-sm text-gray-500">
                Receive reminders before payment is due
              </div>
            </div>
            <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Usage Threshold Alerts</div>
              <div className="text-sm text-gray-500">
                Get notified when approaching usage limits
              </div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}; 