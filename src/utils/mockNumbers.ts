import { VirtualNumber, AvailableNumber } from '../components/numbers/NumberCard';

export const mockVirtualNumbers: VirtualNumber[] = [
  {
    id: '1',
    phoneNumber: '+12125551234',
    country: 'US',
    areaCode: '212',
    city: 'New York',
    status: 'active',
    acquiredDate: new Date('2024-01-15'),
    monthlyUsage: {
      calls: 156,
      messages: 89,
      cost: 1.00
    },
    settings: {
      callForwarding: '+1234567890',
      voicemailEnabled: true,
      smsForwarding: '+1234567890'
    }
  },
  {
    id: '2',
    phoneNumber: '+14155556789',
    country: 'US',
    areaCode: '415',
    city: 'San Francisco',
    status: 'active',
    acquiredDate: new Date('2024-02-01'),
    monthlyUsage: {
      calls: 234,
      messages: 156,
      cost: 1.25
    },
    settings: {
      callForwarding: null,
      voicemailEnabled: true,
      smsForwarding: null
    }
  },
  {
    id: '3',
    phoneNumber: '+13125559999',
    country: 'US',
    areaCode: '312',
    city: 'Chicago',
    status: 'suspended',
    acquiredDate: new Date('2024-01-20'),
    monthlyUsage: {
      calls: 45,
      messages: 23,
      cost: 1.00
    },
    settings: {
      callForwarding: '+1234567890',
      voicemailEnabled: false,
      smsForwarding: null
    }
  },
  {
    id: '4',
    phoneNumber: '+13055551111',
    country: 'US',
    areaCode: '305',
    city: 'Miami',
    status: 'pending',
    acquiredDate: new Date('2024-03-01'),
    monthlyUsage: {
      calls: 0,
      messages: 0,
      cost: 1.50
    },
    settings: {
      callForwarding: null,
      voicemailEnabled: true,
      smsForwarding: null
    }
  },
  {
    id: '5',
    phoneNumber: '+17025552222',
    country: 'US',
    areaCode: '702',
    city: 'Las Vegas',
    status: 'active',
    acquiredDate: new Date('2024-02-15'),
    monthlyUsage: {
      calls: 89,
      messages: 67,
      cost: 1.75
    },
    settings: {
      callForwarding: '+1234567890',
      voicemailEnabled: true,
      smsForwarding: '+1234567890'
    }
  },
  {
    id: '6',
    phoneNumber: '+14045553333',
    country: 'US',
    areaCode: '404',
    city: 'Atlanta',
    status: 'active',
    acquiredDate: new Date('2024-01-10'),
    monthlyUsage: {
      calls: 312,
      messages: 198,
      cost: 1.00
    },
    settings: {
      callForwarding: null,
      voicemailEnabled: true,
      smsForwarding: null
    }
  }
];

export const mockAvailableNumbers: AvailableNumber[] = [
  {
    phoneNumber: '+12125551234',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: true,
    isPremium: false
  },
  {
    phoneNumber: '+12125555678',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125559999',
    monthlyPrice: 5.00,
    setupFee: 10,
    features: ['sms', 'voice', 'mms'],
    isPopular: true,
    isPremium: true
  },
  {
    phoneNumber: '+12125551111',
    monthlyPrice: 3.00,
    setupFee: 5,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: true
  },
  {
    phoneNumber: '+12125552222',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125553333',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125554444',
    monthlyPrice: 2.00,
    setupFee: 0,
    features: ['sms', 'voice', 'mms'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125555555',
    monthlyPrice: 8.00,
    setupFee: 15,
    features: ['sms', 'voice', 'mms', 'fax'],
    isPopular: true,
    isPremium: true
  },
  {
    phoneNumber: '+12125556666',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125557777',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  },
  {
    phoneNumber: '+12125558888',
    monthlyPrice: 4.00,
    setupFee: 8,
    features: ['sms', 'voice', 'mms'],
    isPopular: false,
    isPremium: true
  },
  {
    phoneNumber: '+12125550000',
    monthlyPrice: 1.00,
    setupFee: 0,
    features: ['sms', 'voice'],
    isPopular: false,
    isPremium: false
  }
]; 