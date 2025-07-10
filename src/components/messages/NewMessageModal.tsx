import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, Phone, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Contact } from './ChatInterface';
import { mockContacts } from '../../utils/mockMessages';

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (contact: Contact, message: string) => void;
}

interface NewMessageState {
  selectedContact: Contact | null;
  phoneNumber: string;
  messageContent: string;
  step: 'select-contact' | 'compose-message';
  searchQuery: string;
}

export const NewMessageModal: React.FC<NewMessageModalProps> = ({
  isOpen,
  onClose,
  onSendMessage
}) => {
  const [state, setState] = useState<NewMessageState>({
    selectedContact: null,
    phoneNumber: '',
    messageContent: '',
    step: 'select-contact',
    searchQuery: ''
  });

  const [filteredContacts, setFilteredContacts] = useState(mockContacts);

  useEffect(() => {
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      const filtered = mockContacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.phoneNumber.includes(query)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(mockContacts);
    }
  }, [state.searchQuery]);

  const handleContactSelect = (contact: Contact) => {
    setState(prev => ({
      ...prev,
      selectedContact: contact,
      phoneNumber: contact.phoneNumber,
      step: 'compose-message'
    }));
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    // Basic phone number formatting
    const cleaned = phoneNumber.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length > 0) {
      if (cleaned.startsWith('1') && cleaned.length > 1) {
        formatted = `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
      } else if (cleaned.length >= 10) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    }

    setState(prev => ({
      ...prev,
      phoneNumber: formatted
    }));
  };

  const handleManualNumberSubmit = () => {
    const cleaned = state.phoneNumber.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      const newContact: Contact = {
        name: `+${cleaned}`,
        phoneNumber: state.phoneNumber
      };
      
      setState(prev => ({
        ...prev,
        selectedContact: newContact,
        step: 'compose-message'
      }));
    }
  };

  const handleSendMessage = () => {
    if (state.selectedContact && state.messageContent.trim()) {
      onSendMessage(state.selectedContact, state.messageContent.trim());
      handleClose();
    }
  };

  const handleClose = () => {
    setState({
      selectedContact: null,
      phoneNumber: '',
      messageContent: '',
      step: 'select-contact',
      searchQuery: ''
    });
    onClose();
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isPhoneNumberValid = () => {
    const cleaned = state.phoneNumber.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const canSend = state.selectedContact && state.messageContent.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {state.step === 'select-contact' ? 'New Message' : 'Compose Message'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {state.step === 'select-contact' ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={state.searchQuery}
                  onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="pl-10"
                />
              </div>

              {/* Manual Phone Number Entry */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Or enter a phone number
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="(555) 123-4567"
                    value={state.phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ocean"
                    size="sm"
                    onClick={handleManualNumberSubmit}
                    disabled={!isPhoneNumberValid()}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Contact List */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Recent Contacts
                </h3>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.phoneNumber}
                      onClick={() => handleContactSelect(contact)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
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
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {contact.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.phoneNumber}
                        </p>
                      </div>
                    </button>
                  ))}
                  
                  {filteredContacts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <UserPlus className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No contacts found</p>
                      <p className="text-sm">Try entering a phone number above</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selected Contact */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {state.selectedContact?.avatar ? (
                  <img
                    src={state.selectedContact.avatar}
                    alt={state.selectedContact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-ocean-400 to-energy-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {state.selectedContact && getInitials(state.selectedContact.name)}
                  </div>
                )}
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {state.selectedContact?.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {state.selectedContact?.phoneNumber}
                  </p>
                </div>
                
                <button
                  onClick={() => setState(prev => ({ ...prev, step: 'select-contact' }))}
                  className="text-ocean-600 hover:text-ocean-700 text-sm font-medium"
                >
                  Change
                </button>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={state.messageContent}
                  onChange={(e) => setState(prev => ({ ...prev, messageContent: e.target.value }))}
                  placeholder="Type your message..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  maxLength={160}
                />
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Enter to send, Shift+Enter for new line</span>
                  <span>{state.messageContent.length}/160</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={handleClose}
          >
            Cancel
          </Button>
          
          {state.step === 'compose-message' && (
            <Button
              variant="ocean"
              onClick={handleSendMessage}
              disabled={!canSend}
              className="flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 