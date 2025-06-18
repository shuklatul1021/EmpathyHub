// MessageThread.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import Avatar from './ui/Avatar';
import Card from './ui/Card';
import { ChatMessage } from '../types/chat';

interface MessageThreadProps {
  messages: ChatMessage[];
  currentUserId: string;
  participants: Array<{ id: string; name: string; avatar?: string }>;
  onSendMessage: (message: ChatMessage) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUserId,
  participants,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const receiver = participants.find(p => p.id !== currentUserId);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const socket = new WebSocket(`ws://localhost:8080?token=${token}`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      if (incomingMessage.receiverId === currentUserId) {
        onSendMessage(incomingMessage);
      }
    };

    return () => {
      socket.close();
    };
  }, [currentUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !receiver) return;

    const message = {
      senderId: currentUserId,
      receiverId: receiver.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.send(JSON.stringify(message));
    onSendMessage(message);
    setNewMessage('');
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="flex h-full flex-col" padding="none">
      <div className="border-b border-gray-200 p-4 flex items-center">
        <Avatar
          src={receiver?.avatar || ''}
          alt={receiver?.name || ''}
          status="online"
        />
        <div className="ml-3">
          <h3 className="font-medium">{receiver?.name}</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === currentUserId;
          const showAvatar =
            index === 0 ||
            messages[index - 1]?.senderId !== message.senderId;

          return (
            <div
              key={index}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%]`}
              >
                {showAvatar && (
                  <Avatar
                    src={
                      participants.find(p => p.id === message.senderId)?.avatar || ''
                    }
                    alt={message.senderName}
                    size="sm"
                    className={isCurrentUser ? 'ml-2' : 'mr-2'}
                  />
                )}
                <div
                  className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </Card>
  );
};

export default MessageThread;
