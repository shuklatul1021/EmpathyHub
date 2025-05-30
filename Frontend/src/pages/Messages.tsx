import React, { useState } from 'react';
import MessageThread from '../components/MessageThread';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { mockUsers, mockMessageThreads } from '../data/mockData';
import { Search, Plus } from 'lucide-react';

const Messages: React.FC = () => {
  const [activeThreadId, setActiveThreadId] = useState(mockMessageThreads[0]?.id);
  const [searchTerm, setSearchTerm] = useState('');

  // Get current user (first user for the demo)
  const currentUser = mockUsers[0];
  
  // Get active thread
  const activeThread = mockMessageThreads.find(thread => thread.id === activeThreadId);
  
  // Get participants for the active thread
  const threadParticipants = activeThread 
    ? mockUsers.filter(user => activeThread.participants.includes(user.id))
    : [];

  // Filter message threads by search
  const filteredThreads = mockMessageThreads.filter(thread => {
    // Get the other participant (not current user)
    const otherParticipants = thread.participants.filter(id => id !== currentUser.id);
    
    // Get users for those participants
    const users = mockUsers.filter(user => otherParticipants.includes(user.id));
    
    // Check if any user name matches search term
    return users.some(user => 
      searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Format date for display
  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // If today, show time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this week, show day
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mx-auto max-w-7xl h-[calc(100vh-10rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-gray-600">
          Connect with your peer supporters through private conversations
        </p>
      </div>

      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1 h-full">
          <Card className="flex h-full flex-col animate-fade-in" padding="none">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <button className="text-primary hover:text-primary-dark">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length > 0 ? (
                filteredThreads.map(thread => {
                  // Get other participants (not current user)
                  const otherParticipantIds = thread.participants.filter(id => id !== currentUser.id);
                  const otherUsers = mockUsers.filter(user => otherParticipantIds.includes(user.id));
                  
                  // Get last message
                  const lastMessage = thread.messages[thread.messages.length - 1];
                  
                  // Check if thread is active
                  const isActive = thread.id === activeThreadId;
                  
                  return (
                    <button
                      key={thread.id}
                      onClick={() => setActiveThreadId(thread.id)}
                      className={`
                        w-full border-b border-gray-100 p-4 text-left transition-colors
                        ${isActive ? 'bg-primary/5' : 'hover:bg-gray-50'}
                      `}
                    >
                      <div className="flex items-start">
                        <Avatar
                          src={otherUsers[0]?.avatar || ''}
                          alt={otherUsers[0]?.name || ''}
                          status="online"
                        />
                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">
                              {otherUsers.map(u => u.name).join(', ')}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(lastMessage.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                            {lastMessage.content}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2 h-full">
          {activeThread ? (
            <div className="h-full animate-fade-in">
              <MessageThread 
                messages={activeThread.messages}
                currentUserId={currentUser.id}
                participants={threadParticipants}
                onSendMessage={(content) => {
                  console.log('Sending message:', content);
                }}
              />
            </div>
          ) : (
            <Card className="flex h-full items-center justify-center animate-fade-in">
              <div className="text-center">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;