import React, { useState } from 'react';
import { 
  MoreVertical, 
  Pin, 
  Archive, 
  Trash2, 
  Phone, 
  Video,
  Check,
  CheckCheck
} from 'lucide-react';
import { Conversation } from '../../pages/MessagesPage';
import clsx from 'clsx';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onArchiveConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onPinConversation: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onArchiveConversation,
  onDeleteConversation,
  onPinConversation
}) => {
  const [contextMenuId, setContextMenuId] = useState<string | null>(null);

  const formatTimestamp = (timestamp: Date): string => {
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

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleContextMenu = (e: React.MouseEvent, conversationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuId(contextMenuId === conversationId ? null : conversationId);
  };

  const handleClickOutside = () => {
    setContextMenuId(null);
  };

  const ConversationItem: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const isActive = conversation.id === activeConversationId;
    const isContextMenuOpen = contextMenuId === conversation.id;

    return (
      <div
        className={clsx(
          'relative group cursor-pointer transition-colors duration-200',
          'hover:bg-gray-50 border-l-4',
          {
            'bg-ocean-50 border-ocean-500': isActive,
            'border-transparent': !isActive
          }
        )}
        onClick={() => onSelectConversation(conversation.id)}
      >
        <div className="flex items-center p-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {conversation.contact.avatar ? (
              <img
                src={conversation.contact.avatar}
                alt={conversation.contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-ocean-400 to-energy-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(conversation.contact.name)}
              </div>
            )}
            
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 ml-3">
            <div className="flex items-center justify-between">
              <h3 className={clsx(
                'font-medium truncate',
                conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
              )}>
                {conversation.contact.name}
              </h3>
              
              <div className="flex items-center space-x-2">
                {/* Pin indicator */}
                {conversation.isPinned && (
                  <Pin className="w-4 h-4 text-ocean-500 fill-current" />
                )}
                
                {/* Timestamp */}
                <span className={clsx(
                  'text-xs',
                  conversation.unreadCount > 0 ? 'text-ocean-600' : 'text-gray-500'
                )}>
                  {formatTimestamp(conversation.lastMessage.timestamp)}
                </span>
                
                {/* Context menu button */}
                <button
                  onClick={(e) => handleContextMenu(e, conversation.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center flex-1 min-w-0">
                {/* Message status indicator */}
                {conversation.lastMessage.isFromMe && (
                  <div className="flex-shrink-0 mr-2">
                    {conversation.lastMessage.type === 'text' ? (
                      <CheckCheck className="w-4 h-4 text-ocean-500" />
                    ) : (
                      <Check className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                )}
                
                {/* Message preview */}
                <p className={clsx(
                  'text-sm truncate',
                  conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                )}>
                  {conversation.lastMessage.isFromMe && 'You: '}
                  {conversation.lastMessage.content}
                </p>
              </div>

              {/* Unread badge */}
              {conversation.unreadCount > 0 && (
                <div className="flex-shrink-0 ml-2">
                  <span className="bg-energy-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                    {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Context Menu */}
        {isContextMenuOpen && (
          <div className="absolute right-2 top-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
            <div className="py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPinConversation(conversation.id);
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pin className="w-4 h-4 mr-2" />
                {conversation.isPinned ? 'Unpin' : 'Pin'}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add call functionality here
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Add video call functionality here
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </button>
              
              <hr className="my-1" />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchiveConversation(conversation.id);
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                  setContextMenuId(null);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-energy-600 hover:bg-gray-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
      
      {/* Click outside to close context menu */}
      {contextMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={handleClickOutside}
        />
      )}
    </div>
  );
}; 