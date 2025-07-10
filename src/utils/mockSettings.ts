export const mockUserSettings = {
  profile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    timezone: 'America/New_York',
    language: 'en'
  },
  notifications: {
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
  },
  privacy: {
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
  },
  billing: {
    currentPlan: {
      name: 'Pro',
      price: 29.99,
      features: ['Unlimited calls', 'Unlimited SMS', 'Voicemail', 'Call forwarding'],
      nextBilling: new Date('2024-04-01')
    },
    paymentMethods: [
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiry: '12/25',
        isDefault: true
      }
    ],
    invoices: [
      {
        id: 'INV-001',
        date: new Date('2024-03-01'),
        amount: 29.99,
        status: 'paid',
        items: [
          { description: 'Pro Plan - March 2024', amount: 29.99 }
        ]
      }
    ],
    usage: {
      calls: 156,
      messages: 89,
      data: 2.5,
      limits: {
        calls: 1000,
        messages: 1000,
        data: 10
      }
    }
  },
  devices: [
    {
      id: '1',
      name: 'Chrome on Windows',
      type: 'web',
      lastActive: new Date('2024-03-15T10:30:00'),
      location: 'New York, NY',
      isCurrent: true
    },
    {
      id: '2',
      name: 'Safari on iPhone',
      type: 'mobile',
      lastActive: new Date('2024-03-14T15:45:00'),
      location: 'San Francisco, CA',
      isCurrent: false
    }
  ],
  api: {
    apiKeys: [
      {
        id: '1',
        name: 'Production API Key',
        key: 'sk_live_...',
        permissions: ['read', 'write'],
        createdDate: new Date('2024-01-01'),
        lastUsed: new Date('2024-03-15T09:00:00'),
        isActive: true
      }
    ],
    webhooks: [
      {
        id: '1',
        url: 'https://api.example.com/webhook',
        events: ['message.received', 'call.completed'],
        isActive: true,
        lastTriggered: new Date('2024-03-15T08:30:00')
      }
    ],
    usage: {
      requests: 1250,
      limit: 10000,
      resetDate: new Date('2024-04-01')
    }
  }
}; 