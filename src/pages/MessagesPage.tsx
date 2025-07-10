import React, { useState, useEffect } from 'react';
import { Plus, Search, Archive, Trash2, MoreVertical } from 'lucide-react';
import { ConversationList } from '../components/messages/ConversationList';
import { ChatInterface } from '../components/messages/ChatInterface';
import { NewMessageModal } from '../components/messages/NewMessageModal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockConversations } from '../utils/mockMessages';

interface MessagesPageState {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchQuery: string;
  isComposing: boolean;
  isNewMessageOpen: boolean;
}

export interface Conversation {
  id: string;
  contact: {
    name: string;
    phoneNumber: string;
    avatar?: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isFromMe: boolean;
    type: 'text' | 'media' | 'system';
  };
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
}

export const MessagesPage: React.FC = () => {
  const [state, setState] = useState<MessagesPageState>({
    conversations: mockConversations,
    activeConversationId: null,
    searchQuery: '',
    isComposing: false,
    isNewMessageOpen: false
  });

  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredConversations = state.conversations.filter(conversation => {
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      return (
        conversation.contact.name.toLowerCase().includes(query) ||
        conversation.contact.phoneNumber.includes(query) ||
        conversation.lastMessage.content.toLowerCase().includes(query)
      );
    }
    return !conversation.isArchived;
  });

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    // Pinned conversations first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then by timestamp
    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
  });

  const activeConversation = state.conversations.find(
    conv => conv.id === state.activeConversationId
  );

  const handleConversationSelect = (conversationId: string) => {
    setState(prev => ({
      ...prev,
      activeConversationId: conversationId
    }));

    // Mark messages as read
    setState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    }));
  };

  const handleNewMessage = () => {
    setState(prev => ({ ...prev, isNewMessageOpen: true }));
  };

  const handleCloseNewMessage = () => {
    setState(prev => ({ ...prev, isNewMessageOpen: false }));
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage = {
      content,
      timestamp: new Date(),
      isFromMe: true,
      type: 'text' as const
    };

    setState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              unreadCount: 0
            }
          : conv
      )
    }));
  };

  const handleArchiveConversation = (conversationId: string) => {
    setState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv =>
        conv.id === conversationId ? { ...conv, isArchived: true } : conv
      ),
      activeConversationId: prev.activeConversationId === conversationId ? null : prev.activeConversationId
    }));
  };

  const handleDeleteConversation = (conversationId: string) => {
    setState(prev => ({
      ...prev,
      conversations: prev.conversations.filter(conv => conv.id !== conversationId),
      activeConversationId: prev.activeConversationId === conversationId ? null : prev.activeConversationId
    }));
  };

  const handlePinConversation = (conversationId: string) => {
    setState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv =>
        conv.id === conversationId ? { ...conv, isPinned: !conv.isPinned } : conv
      )
    }));
  };

  const unreadCount = state.conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  return (
    <div className="h-full flex bg-white">
      {/* Conversation List Sidebar */}
      <div className={`
        ${isMobile && state.activeConversationId ? 'hidden' : 'flex'}
        ${!isMobile ? 'w-80 border-r border-gray-200' : 'w-full'}
        flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <Button
              variant="ocean"
              size="sm"
              onClick={handleNewMessage}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {sortedConversations.length > 0 ? (
            <ConversationList
              conversations={sortedConversations}
              activeConversationId={state.activeConversationId}
              onSelectConversation={handleConversationSelect}
              onArchiveConversation={handleArchiveConversation}
              onDeleteConversation={handleDeleteConversation}
              onPinConversation={handlePinConversation}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {state.searchQuery ? 'No conversations found' : 'No conversations yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {state.searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Start your first conversation to begin messaging'
                }
              </p>
              {!state.searchQuery && (
                <Button
                  variant="ocean"
                  onClick={handleNewMessage}
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Start Conversation
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Footer with unread count */}
        {unreadCount > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Unread messages</span>
              <span className="bg-energy-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {unreadCount}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className={`
        ${isMobile && !state.activeConversationId ? 'hidden' : 'flex'}
        flex-1 flex-col
      `}>
        {activeConversation ? (
          <ChatInterface
            conversationId={activeConversation.id}
            contact={activeConversation.contact}
            onSendMessage={(content) => handleSendMessage(activeConversation.id, content)}
            onBack={isMobile ? () => setState(prev => ({ ...prev, activeConversationId: null })) : undefined}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 mb-6">
                Choose a conversation from the list to start messaging
              </p>
              <Button
                variant="ocean"
                onClick={handleNewMessage}
                className="flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      <NewMessageModal
        isOpen={state.isNewMessageOpen}
        onClose={handleCloseNewMessage}
        onSendMessage={(contact, message) => {
          // Create new conversation
          const newConversation: Conversation = {
            id: Date.now().toString(),
            contact,
            lastMessage: {
              content: message,
              timestamp: new Date(),
              isFromMe: true,
              type: 'text'
            },
            unreadCount: 0,
            isPinned: false,
            isArchived: false
          };

          setState(prev => ({
            ...prev,
            conversations: [newConversation, ...prev.conversations],
            activeConversationId: newConversation.id,
            isNewMessageOpen: false
          }));
        }}
      />
    </div>
  );
}; 