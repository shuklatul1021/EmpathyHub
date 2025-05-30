import React, { useState } from 'react';
import { Message, User } from '../types';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import { Send } from 'lucide-react';

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  participants: User[];
  onSendMessage?: (content: string) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUserId,
  participants,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const getUserById = (userId: string) => {
    return participants.find(user => user.id === userId);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          {participants
            .filter(user => user.id !== currentUserId)
            .map(user => (
              <div key={user.id} className="flex items-center">
                <Avatar src={user.avatar} alt={user.name} status="online" />
                <div className="ml-3">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => {
          const isCurrentUser = message.senderId === currentUserId;
          const user = getUserById(message.senderId);

          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[75%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                {!isCurrentUser && (
                  <Avatar
                    src={user?.avatar || ''}
                    alt={user?.name || ''}
                    size="sm"
                    className="mt-1 mr-2"
                  />
                )}
                <div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <p className={`mt-1 text-xs text-gray-500 ${isCurrentUser ? 'text-right' : ''}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full"
            rightIcon={<Send className="h-4 w-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;