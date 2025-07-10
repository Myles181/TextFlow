export const mockOnboardingData = {
  availableCountries: [
    { code: 'US', name: 'United States', flag: '🇺🇸', popular: true },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', popular: true },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', popular: true },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', popular: true },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', popular: false },
    { code: 'FR', name: 'France', flag: '🇫🇷', popular: false },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', popular: false },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', popular: false },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', popular: false },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', popular: false },
    { code: 'IN', name: 'India', flag: '🇮🇳', popular: false },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', popular: false }
  ],

  availableAreaCodes: {
    US: [
      { code: '212', city: 'New York, NY', available: true },
      { code: '415', city: 'San Francisco, CA', available: true },
      { code: '310', city: 'Los Angeles, CA', available: true },
      { code: '305', city: 'Miami, FL', available: true },
      { code: '312', city: 'Chicago, IL', available: true },
      { code: '404', city: 'Atlanta, GA', available: true },
      { code: '713', city: 'Houston, TX', available: true },
      { code: '602', city: 'Phoenix, AZ', available: true },
      { code: '206', city: 'Seattle, WA', available: false },
      { code: '617', city: 'Boston, MA', available: false }
    ],
    CA: [
      { code: '416', city: 'Toronto, ON', available: true },
      { code: '604', city: 'Vancouver, BC', available: true },
      { code: '514', city: 'Montreal, QC', available: true },
      { code: '403', city: 'Calgary, AB', available: true },
      { code: '780', city: 'Edmonton, AB', available: true },
      { code: '905', city: 'Mississauga, ON', available: true },
      { code: '613', city: 'Ottawa, ON', available: true },
      { code: '819', city: 'Gatineau, QC', available: true }
    ],
    GB: [
      { code: '20', city: 'London', available: true },
      { code: '161', city: 'Manchester', available: true },
      { code: '121', city: 'Birmingham', available: true },
      { code: '141', city: 'Glasgow', available: true },
      { code: '191', city: 'Newcastle', available: true },
      { code: '113', city: 'Leeds', available: true },
      { code: '114', city: 'Sheffield', available: true },
      { code: '115', city: 'Nottingham', available: true }
    ],
    AU: [
      { code: '2', city: 'Sydney, NSW', available: true },
      { code: '3', city: 'Melbourne, VIC', available: true },
      { code: '7', city: 'Brisbane, QLD', available: true },
      { code: '8', city: 'Perth, WA', available: true },
      { code: '4', city: 'Adelaide, SA', available: true },
      { code: '5', city: 'Hobart, TAS', available: true },
      { code: '6', city: 'Canberra, ACT', available: true },
      { code: '9', city: 'Darwin, NT', available: true }
    ]
  },

  phoneNumbers: [
    { number: '+1 (212) 555-0123', country: 'US', areaCode: '212', available: true },
    { number: '+1 (415) 555-0456', country: 'US', areaCode: '415', available: true },
    { number: '+1 (310) 555-0789', country: 'US', areaCode: '310', available: true },
    { number: '+1 (305) 555-0321', country: 'US', areaCode: '305', available: true },
    { number: '+1 (312) 555-0654', country: 'US', areaCode: '312', available: true },
    { number: '+1 (404) 555-0987', country: 'US', areaCode: '404', available: true },
    { number: '+1 (416) 555-0123', country: 'CA', areaCode: '416', available: true },
    { number: '+1 (604) 555-0456', country: 'CA', areaCode: '604', available: true },
    { number: '+44 20 7123 4567', country: 'GB', areaCode: '20', available: true },
    { number: '+44 161 123 4567', country: 'GB', areaCode: '161', available: true },
    { number: '+61 2 9123 4567', country: 'AU', areaCode: '2', available: true },
    { number: '+61 3 9123 4567', country: 'AU', areaCode: '3', available: true }
  ],

  achievements: [
    {
      id: 'quick-learner',
      title: 'Quick Learner',
      description: 'Completed the TextFlow tutorial',
      icon: '🎓',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'first-message',
      title: 'First Message',
      description: 'Sent your first message',
      icon: '💬',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'first-call',
      title: 'First Call',
      description: 'Made your first call',
      icon: '📞',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'contact-master',
      title: 'Contact Master',
      description: 'Added 10 contacts',
      icon: '👥',
      unlocked: false,
      progress: 0,
      maxProgress: 10
    },
    {
      id: 'power-user',
      title: 'Power User',
      description: 'Used TextFlow for 7 days',
      icon: '⚡',
      unlocked: false,
      progress: 0,
      maxProgress: 7
    },
    {
      id: 'international',
      title: 'International',
      description: 'Called 5 different countries',
      icon: '🌍',
      unlocked: false,
      progress: 0,
      maxProgress: 5
    }
  ],

  useCases: [
    {
      id: 'personal',
      title: 'Personal',
      description: 'Privacy and second number',
      icon: '👤',
      features: [
        'Keep personal number private',
        'Second number for dating apps',
        'Family communication',
        'Online shopping safety'
      ],
      benefits: [
        'Separate personal and work life',
        'Protect your privacy',
        'Easy number management'
      ]
    },
    {
      id: 'business',
      title: 'Business',
      description: 'Professional communication',
      icon: '💼',
      features: [
        'Separate work and personal',
        'Professional voicemail',
        'Call forwarding',
        'Business analytics'
      ],
      benefits: [
        'Professional image',
        'Better work-life balance',
        'Business insights'
      ]
    },
    {
      id: 'international',
      title: 'International',
      description: 'Travel and global connections',
      icon: '🌍',
      features: [
        'Local numbers worldwide',
        'Avoid roaming charges',
        'International calling',
        'Travel notifications'
      ],
      benefits: [
        'Save on international fees',
        'Stay connected globally',
        'Local presence anywhere'
      ]
    }
  ],

  testimonials: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Business Owner',
      company: 'TechStart Inc.',
      content: 'TextFlow has transformed how I communicate with international clients. The cost savings are incredible!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Digital Nomad',
      company: 'Freelance Developer',
      content: 'Having local numbers wherever I travel has made staying connected so much easier.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    {
      id: '3',
      name: 'Emma Davis',
      role: 'Freelancer',
      company: 'Creative Consultant',
      content: 'The privacy features are amazing. I can keep my personal and work communications separate.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    {
      id: '4',
      name: 'David Rodriguez',
      role: 'Sales Manager',
      company: 'Global Corp',
      content: 'Perfect for managing multiple territories. Our team productivity increased by 30%.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true
    }
  ],

  pricingPlans: [
    {
      id: 'starter',
      name: 'Starter',
      price: 9.99,
      period: 'month',
      description: 'Perfect for personal use',
      features: [
        '1 virtual phone number',
        'Unlimited SMS',
        '100 minutes/month',
        'Basic voicemail',
        'Email support'
      ],
      popular: false,
      savings: null
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 19.99,
      period: 'month',
      description: 'Great for small businesses',
      features: [
        '3 virtual phone numbers',
        'Unlimited SMS',
        '500 minutes/month',
        'Advanced voicemail',
        'Call forwarding',
        'Priority support',
        'Business analytics'
      ],
      popular: true,
      savings: 'Save 20%'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      period: 'month',
      description: 'For growing teams',
      features: [
        '10 virtual phone numbers',
        'Unlimited SMS',
        'Unlimited minutes',
        'Advanced voicemail',
        'Call forwarding',
        '24/7 support',
        'Advanced analytics',
        'API access',
        'Custom integrations'
      ],
      popular: false,
      savings: 'Save 30%'
    }
  ],

  features: [
    {
      id: 'privacy',
      title: 'Privacy First',
      description: 'Keep your personal number private with a dedicated virtual number',
      icon: '🔒',
      benefits: [
        'Separate personal and work communications',
        'Protect your privacy online',
        'Easy number management'
      ]
    },
    {
      id: 'global',
      title: 'Global Access',
      description: 'Get local numbers from 50+ countries for international connections',
      icon: '🌍',
      benefits: [
        'Local presence worldwide',
        'Avoid international fees',
        'Stay connected globally'
      ]
    },
    {
      id: 'savings',
      title: 'Cost Savings',
      description: 'Save up to 80% on international calls and messaging',
      icon: '💰',
      benefits: [
        'Reduced international fees',
        'No roaming charges',
        'Predictable monthly costs'
      ]
    },
    {
      id: 'analytics',
      title: 'Smart Analytics',
      description: 'Track your communication patterns and optimize costs',
      icon: '📊',
      benefits: [
        'Usage insights',
        'Cost optimization',
        'Performance tracking'
      ]
    }
  ]
};

export const mockUserData = {
  currentUser: {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1 (555) 123-4567',
    isPhoneVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastLoginAt: '2024-01-20T14:45:00Z',
    plan: 'professional',
    usage: {
      calls: 127,
      messages: 89,
      data: 2.3
    },
    achievements: ['quick-learner', 'first-message'],
    preferences: {
      notifications: {
        sms: true,
        email: true,
        push: true
      },
      language: 'en',
      timezone: 'America/New_York'
    }
  },

  recentActivity: [
    {
      id: '1',
      type: 'call',
      direction: 'outgoing',
      number: '+1 (555) 987-6543',
      duration: 245,
      timestamp: '2024-01-20T14:30:00Z',
      status: 'completed'
    },
    {
      id: '2',
      type: 'message',
      direction: 'outgoing',
      number: '+1 (555) 987-6543',
      content: 'Thanks for the call!',
      timestamp: '2024-01-20T14:25:00Z',
      status: 'delivered'
    },
    {
      id: '3',
      type: 'call',
      direction: 'incoming',
      number: '+1 (555) 456-7890',
      duration: 180,
      timestamp: '2024-01-20T13:15:00Z',
      status: 'completed'
    }
  ]
}; 