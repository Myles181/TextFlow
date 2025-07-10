import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface MessageComposerProps {
  onSend: (message: string) => void;
  placeholder?: string;
  isTyping?: boolean;
  disabled?: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  placeholder = 'Type a message...',
  isTyping = false,
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxLength = 160; // SMS character limit
  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;
  const canSend = message.trim().length > 0 && !isOverLimit && !disabled;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120; // Max 4 lines
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (canSend) {
      onSend(message);
      setMessage('');
      setIsComposing(false);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const getCharacterCountColor = () => {
    if (isOverLimit) return 'text-energy-500';
    if (isNearLimit) return 'text-warning-500';
    return 'text-gray-400';
  };

  return (
    <div className="relative">
      {/* Character Counter */}
      {characterCount > 0 && (
        <div className="absolute -top-6 right-0 text-xs">
          <span className={getCharacterCountColor()}>
            {characterCount}/{maxLength}
          </span>
        </div>
      )}

      <div className="flex items-end space-x-2">
        {/* Attachment Button */}
        <button
          type="button"
          disabled={disabled}
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          onClick={() => {/* Add attachment functionality */}}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              'w-full resize-none rounded-lg border-2 px-4 py-3 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent',
              'transition-all duration-200',
              'min-h-[44px] max-h-[120px]',
              {
                'border-ocean-500 bg-ocean-50': isComposing && !disabled,
                'border-gray-300 hover:border-gray-400': !isComposing && !disabled,
                'border-gray-200 bg-gray-50': disabled,
                'border-energy-500': isOverLimit
              }
            )}
            style={{ lineHeight: '1.4' }}
          />
        </div>

        {/* Emoji Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={clsx(
            'p-2 rounded-lg transition-colors',
            'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            {
              'text-ocean-500 bg-ocean-50': showEmojiPicker
            }
          )}
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <Button
          variant={canSend ? 'ocean' : 'ghost'}
          size="sm"
          onClick={handleSend}
          disabled={!canSend}
          className={clsx(
            'p-2 transition-all duration-200',
            {
              'scale-110': canSend,
              'opacity-50': !canSend
            }
          )}
        >
          {isTyping ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>

        {/* Voice Message Button (Alternative) */}
        {!canSend && (
          <button
            type="button"
            disabled={disabled}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            onClick={() => {/* Add voice message functionality */}}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Emoji Picker (Placeholder) */}
      {showEmojiPicker && (
        <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
          <div className="text-sm text-gray-500 p-2">
            Emoji picker coming soon...
          </div>
        </div>
      )}

      {/* SMS Counter Warning */}
      {isNearLimit && !isOverLimit && (
        <div className="mt-2 text-xs text-warning-600">
          Approaching SMS character limit
        </div>
      )}

      {isOverLimit && (
        <div className="mt-2 text-xs text-energy-600">
          Message too long for SMS
        </div>
      )}
    </div>
  );
}; 