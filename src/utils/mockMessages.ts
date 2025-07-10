import { Conversation } from '../pages/MessagesPage';
import { Contact } from '../components/messages/ChatInterface';

export const mockContacts: Contact[] = [
  {
    name: 'John Doe',
    phoneNumber: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Sarah Wilson',
    phoneNumber: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Mike Johnson',
    phoneNumber: '+1 (555) 345-6789'
  },
  {
    name: 'Emily Davis',
    phoneNumber: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'David Brown',
    phoneNumber: '+1 (555) 567-8901'
  },
  {
    name: 'Lisa Anderson',
    phoneNumber: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Robert Taylor',
    phoneNumber: '+1 (555) 789-0123'
  },
  {
    name: 'Jennifer Garcia',
    phoneNumber: '+1 (555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    contact: mockContacts[0],
    lastMessage: {
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isFromMe: false,
      type: 'text'
    },
    unreadCount: 2,
    isPinned: true,
    isArchived: false
  },
  {
    id: '2',
    contact: mockContacts[1],
    lastMessage: {
      content: 'I\'m doing great! Just finished setting up my new TextFlow number.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      isFromMe: true,
      type: 'text'
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false
  },
  {
    id: '3',
    contact: mockContacts[2],
    lastMessage: {
      content: 'That\'s awesome! How do you like it so far?',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      isFromMe: false,
      type: 'text'
    },
    unreadCount: 1,
    isPinned: false,
    isArchived: false
  },
  {
    id: '4',
    contact: mockContacts[3],
    lastMessage: {
      content: 'It\'s been really helpful for keeping my personal and work communications separate.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isFromMe: true,
      type: 'text'
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false
  },
  {
    id: '5',
    contact: mockContacts[4],
    lastMessage: {
      content: 'Thanks for the update!',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      isFromMe: false,
      type: 'text'
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false
  },
  {
    id: '6',
    contact: mockContacts[5],
    lastMessage: {
      content: 'Can you send me the meeting notes?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isFromMe: false,
      type: 'text'
    },
    unreadCount: 3,
    isPinned: false,
    isArchived: false
  },
  {
    id: '7',
    contact: mockContacts[6],
    lastMessage: {
      content: 'Sure, I\'ll send them over right away.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      isFromMe: true,
      type: 'text'
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false
  },
  {
    id: '8',
    contact: mockContacts[7],
    lastMessage: {
      content: 'Perfect, thanks!',
      timestamp: new Date(Date.now() - 1000 * 30), // 30 seconds ago
      isFromMe: false,
      type: 'text'
    },
    unreadCount: 1,
    isPinned: false,
    isArchived: false
  }
];

export interface Call {
  id: string;
  contact: Contact | null;
  phoneNumber: string;
  type: 'incoming' | 'outgoing' | 'missed';
  timestamp: Date;
  duration: number | null; // null for missed calls
  status: 'completed' | 'missed' | 'failed' | 'busy';
}

export const mockCalls: Call[] = [
  {
    id: '1',
    contact: mockContacts[0],
    phoneNumber: '+1 (555) 123-4567',
    type: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    duration: 180, // 3 minutes
    status: 'completed'
  },
  {
    id: '2',
    contact: mockContacts[1],
    phoneNumber: '+1 (555) 234-5678',
    type: 'incoming',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    duration: 240, // 4 minutes
    status: 'completed'
  },
  {
    id: '3',
    contact: null,
    phoneNumber: '+1 (555) 999-8888',
    type: 'missed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    duration: null,
    status: 'missed'
  },
  {
    id: '4',
    contact: mockContacts[2],
    phoneNumber: '+1 (555) 345-6789',
    type: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    duration: 120, // 2 minutes
    status: 'completed'
  },
  {
    id: '5',
    contact: mockContacts[3],
    phoneNumber: '+1 (555) 456-7890',
    type: 'incoming',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    duration: null,
    status: 'missed'
  },
  {
    id: '6',
    contact: null,
    phoneNumber: '+1 (555) 777-6666',
    type: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    duration: null,
    status: 'failed'
  },
  {
    id: '7',
    contact: mockContacts[4],
    phoneNumber: '+1 (555) 567-8901',
    type: 'incoming',
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    duration: 300, // 5 minutes
    status: 'completed'
  },
  {
    id: '8',
    contact: mockContacts[5],
    phoneNumber: '+1 (555) 678-9012',
    type: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    duration: null,
    status: 'busy'
  }
];

export const formatCallDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
};

export const formatCallTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInHours * 60);
    return diffInMinutes === 0 ? 'now' : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return timestamp.toLocaleDateString();
  }
};

export const getCallIcon = (type: Call['type'], status: Call['status']) => {
  if (type === 'missed' || status === 'missed') {
    return '📞❌';
  } else if (type === 'incoming') {
    return '📞⬇️';
  } else {
    return '📞⬆️';
  }
}; 