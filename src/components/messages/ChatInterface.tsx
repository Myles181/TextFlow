import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  AlertCircle,
  Smile
} from 'lucide-react';
import { MessageComposer } from './MessageComposer';
import { Button } from '../ui/Button';
import clsx from 'clsx';

export interface Contact {
  name: string;
  phoneNumber: string;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isFromMe: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'media' | 'system';
}

interface ChatInterfaceProps {
  conversationId: string;
  contact: Contact;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  contact,
  onSendMessage,
  onBack
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isFromMe: false,
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      content: 'I\'m doing great! Just finished setting up my new TextFlow number.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      isFromMe: true,
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      content: 'That\'s awesome! How do you like it so far?',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      isFromMe: false,
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      content: 'It\'s been really helpful for keeping my personal and work communications separate.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isFromMe: true,
      status: 'delivered',
      type: 'text'
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      timestamp: new Date(),
      isFromMe: true,
      status: 'sending',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    onSendMessage(content);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 2000);

    // Simulate typing indicator from contact
    setTimeout(() => {
      setIsTyping(true);
    }, 3000);

    setTimeout(() => {
      setIsTyping(false);
      // Simulate reply
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for the update!',
        timestamp: new Date(),
        isFromMe: false,
        status: 'read',
        type: 'text'
      };
      setMessages(prev => [...prev, reply]);
    }, 5000);
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <div className="w-4 h-4 border-2 border-gray-300 border-t-ocean-500 rounded-full animate-spin" />;
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-ocean-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-energy-500" />;
      default:
        return null;
    }
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isSystem = message.type === 'system';
    
    if (isSystem) {
      return (
        <div className="flex justify-center my-2">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            {message.content}
          </span>
        </div>
      );
    }

    return (
      <div className={clsx(
        'flex mb-4',
        message.isFromMe ? 'justify-end' : 'justify-start'
      )}>
        <div className={clsx(
          'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl',
          'animate-fade-in-up',
          message.isFromMe 
            ? 'bg-ocean-500 text-white rounded-br-md' 
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        )}>
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
          
          <div className={clsx(
            'flex items-center justify-end mt-1 space-x-1',
            message.isFromMe ? 'text-ocean-100' : 'text-gray-500'
          )}>
            <span className="text-xs">
              {formatTime(message.timestamp)}
            </span>
            {message.isFromMe && (
              <span className="ml-1">
                {getStatusIcon(message.status)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {onBack && (
              <button
                onClick={onBack}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            {/* Contact Avatar */}
            <div className="relative">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-400 to-energy-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(contact.name)}
                </div>
              )}
              
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-sm text-gray-500">{contact.phoneNumber}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Add call functionality */}}
              className="p-2"
            >
              <Phone className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Add video call functionality */}}
              className="p-2"
            >
              <Video className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Add more options */}}
              className="p-2"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Composer */}
      <div className="bg-white border-t border-gray-200 p-4">
        <MessageComposer
          onSend={handleSendMessage}
          placeholder={`Message ${contact.name}...`}
          isTyping={isComposing}
        />
      </div>
    </div>
  );
}; 