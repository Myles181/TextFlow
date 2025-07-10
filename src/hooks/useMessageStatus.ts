import { useState, useEffect, useCallback } from 'react';

export interface MessageStatus {
  messageId: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: Date;
}

export interface TypingIndicator {
  conversationId: string;
  contactId: string;
  isTyping: boolean;
  timestamp: Date;
}

export const useMessageStatus = () => {
  const [messageStatuses, setMessageStatuses] = useState<Record<string, MessageStatus>>({});
  const [typingIndicators, setTypingIndicators] = useState<Record<string, TypingIndicator>>({});

  // Simulate WebSocket connection
  useEffect(() => {
    const simulateWebSocket = () => {
      // Simulate incoming status updates
      const interval = setInterval(() => {
        setMessageStatuses(prev => {
          const updated = { ...prev };
          
          // Find messages that are still in 'sending' or 'sent' state
          Object.keys(updated).forEach(messageId => {
            const status = updated[messageId];
            
            if (status.status === 'sending') {
              // Simulate network delay and update to 'sent'
              if (Date.now() - status.timestamp.getTime() > 1000) {
                updated[messageId] = {
                  ...status,
                  status: 'sent',
                  timestamp: new Date()
                };
              }
            } else if (status.status === 'sent') {
              // Simulate delivery confirmation
              if (Date.now() - status.timestamp.getTime() > 2000) {
                updated[messageId] = {
                  ...status,
                  status: 'delivered',
                  timestamp: new Date()
                };
              }
            } else if (status.status === 'delivered') {
              // Simulate read receipt (random chance)
              if (Date.now() - status.timestamp.getTime() > 5000 && Math.random() > 0.7) {
                updated[messageId] = {
                  ...status,
                  status: 'read',
                  timestamp: new Date()
                };
              }
            }
          });
          
          return updated;
        });
      }, 1000);

      return () => clearInterval(interval);
    };

    const cleanup = simulateWebSocket();
    return cleanup;
  }, []);

  const updateMessageStatus = useCallback((messageId: string, status: MessageStatus['status']) => {
    setMessageStatuses(prev => ({
      ...prev,
      [messageId]: {
        messageId,
        status,
        timestamp: new Date()
      }
    }));
  }, []);

  const addMessage = useCallback((messageId: string) => {
    updateMessageStatus(messageId, 'sending');
  }, [updateMessageStatus]);

  const markMessageAsRead = useCallback((messageId: string) => {
    updateMessageStatus(messageId, 'read');
  }, [updateMessageStatus]);

  const retryFailedMessage = useCallback((messageId: string) => {
    updateMessageStatus(messageId, 'sending');
  }, [updateMessageStatus]);

  const setTypingStatus = useCallback((conversationId: string, contactId: string, isTyping: boolean) => {
    setTypingIndicators(prev => {
      const key = `${conversationId}-${contactId}`;
      
      if (isTyping) {
        return {
          ...prev,
          [key]: {
            conversationId,
            contactId,
            isTyping: true,
            timestamp: new Date()
          }
        };
      } else {
        const { [key]: removed, ...rest } = prev;
        return rest;
      }
    });
  }, []);

  const getMessageStatus = useCallback((messageId: string): MessageStatus | null => {
    return messageStatuses[messageId] || null;
  }, [messageStatuses]);

  const isTyping = useCallback((conversationId: string, contactId: string): boolean => {
    const key = `${conversationId}-${contactId}`;
    const indicator = typingIndicators[key];
    
    if (!indicator) return false;
    
    // Auto-clear typing indicator after 5 seconds
    if (Date.now() - indicator.timestamp.getTime() > 5000) {
      setTypingIndicators(prev => {
        const { [key]: removed, ...rest } = prev;
        return rest;
      });
      return false;
    }
    
    return indicator.isTyping;
  }, [typingIndicators]);

  const getStatusIcon = useCallback((status: MessageStatus['status']) => {
    switch (status) {
      case 'sending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      case 'failed':
        return '❌';
      default:
        return '';
    }
  }, []);

  const getStatusColor = useCallback((status: MessageStatus['status']) => {
    switch (status) {
      case 'sending':
        return 'text-gray-400';
      case 'sent':
        return 'text-gray-400';
      case 'delivered':
        return 'text-gray-400';
      case 'read':
        return 'text-ocean-500';
      case 'failed':
        return 'text-energy-500';
      default:
        return 'text-gray-400';
    }
  }, []);

  return {
    messageStatuses,
    typingIndicators,
    addMessage,
    updateMessageStatus,
    markMessageAsRead,
    retryFailedMessage,
    setTypingStatus,
    getMessageStatus,
    isTyping,
    getStatusIcon,
    getStatusColor
  };
}; 