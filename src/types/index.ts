// Phone number types
export interface PhoneNumber {
  id: string
  number: string
  country: string
  status: 'active' | 'inactive' | 'pending'
  type: 'local' | 'toll-free' | 'international'
  createdAt: string
  monthlyCost: number
}

// Message types
export interface Message {
  id: string
  from: string
  to: string
  content: string
  direction: 'inbound' | 'outbound'
  status: 'sent' | 'delivered' | 'failed' | 'pending'
  timestamp: string
  cost?: number
}

// User types
export interface User {
  id: string
  email: string
  name: string
  company?: string
  plan: 'free' | 'basic' | 'pro' | 'enterprise'
  phoneNumbers: PhoneNumber[]
  balance: number
}

// Dashboard stats
export interface DashboardStats {
  totalNumbers: number
  activeNumbers: number
  messagesThisMonth: number
  totalCost: number
  recentMessages: Message[]
} 