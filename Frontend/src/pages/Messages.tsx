import React, { useEffect, useState } from 'react';
import MessageThread from '../components/MessageThread';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import { Search, Plus } from 'lucide-react';
import { BACKEND_URL } from '../config';

const Messages: React.FC = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}'); // assume user info is stored locally

  // Fetch all connected users
  const getAllConnectedUsers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/messages/getchatuser`, {
        method: 'GET',
        headers: {
          token: localStorage.getItem('token') || ''
        }
      });
      const data = await res.json();
      if (res.ok) {
        setAllUsers(data.users);
      } else {
        alert('Error fetching users');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  // Fetch messages for selected user
  const loadMessages = async (user: any) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/messages/${user.id}`, {
        method: 'GET',
        headers: {
          token: localStorage.getItem('token') || ''
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
        setActiveUser(user);
      } else {
        alert('Error fetching messages');
      }
    } catch (err) {
      alert('Error loading messages');
    }
  };

  useEffect(() => {
    getAllConnectedUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = allUsers.filter(user =>
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl h-[calc(100vh-10rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-gray-600">
          Connect with your peer supporters through private conversations
        </p>
      </div>

      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sidebar with users */}
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
                  onChange={handleSearch}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => loadMessages(user)}
                    className={`w-full border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50 ${
                      activeUser?.id === user.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <Avatar src={user.avatar} alt={user.firstname} status="online" />
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">
                            {user.firstname} {user.lastname}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No conversations found</div>
              )}
            </div>
          </Card>
        </div>

        {/* Chat box */}
        <div className="md:col-span-2 h-full">
          {activeUser ? (
            <div className="h-full animate-fade-in">
              <MessageThread
                messages={messages}
                currentUserId={currentUser.id}
                participants={[activeUser, currentUser]}
                onSendMessage={newMessage => {
                  setMessages(prev => [...prev, newMessage]);
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
