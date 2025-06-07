import React, { useState } from 'react';
import { User } from '../types';
import Avatar from './ui/Avatar';
import { Menu, Bell, MessageCircle, Search, X, Heart, Users, LogOut, Check, UserPlus, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'connection_request' | 'message' | 'mention' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'connection_request',
    title: 'New Connection Request',
    message: 'Maya Patel wants to connect with you',
    timestamp: new Date('2024-02-20T10:30:00'),
    isRead: false,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Jordan Lee sent you a message',
    timestamp: new Date('2024-02-20T09:15:00'),
    isRead: false,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    type: 'mention',
    title: 'Mentioned in Discussion',
    message: 'You were mentioned in "Managing Social Anxiety"',
    timestamp: new Date('2024-02-19T16:45:00'),
    isRead: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Weekly Progress',
    message: 'Your weekly mood tracking report is ready',
    timestamp: new Date('2024-02-19T08:00:00'),
    isRead: true,
  },
];

interface HeaderProps {
  currentUser?: User;
  onNavToggle: () => void;
  onLogout: () => void;
  firstname : string,
  lastname : string
}

const Header: React.FC<HeaderProps> = ({ currentUser, onNavToggle, onLogout , firstname , lastname}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'connection_request': return <UserPlus className="h-4 w-4 text-primary" />;
      case 'message': return <MessageCircle className="h-4 w-4 text-accent" />;
      case 'mention': return <Users className="h-4 w-4 text-secondary" />;
      case 'system': return <Bell className="h-4 w-4 text-gray-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={onNavToggle}
            className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center">
            <Heart className="h-7 w-7 text-accent" />
            <span className="ml-2 text-xl font-bold text-gray-900">EmpathyHub</span>
          </div>
        </div>

        <div className={`${isSearchActive ? 'flex' : 'hidden'} lg:flex-1 lg:mx-8 lg:flex`}>
          <div className="relative w-full max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources, communities, or topics..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setIsSearchActive(!isSearchActive)}
            className="p-2 text-gray-500 hover:text-gray-700 lg:hidden"
          >
            {isSearchActive ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative ml-2">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-500 hover:text-gray-700"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent"></span>
              )}
            </button>

            {isNotificationOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsNotificationOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-primary hover:text-primary-dark"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`
                            w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0
                            ${!notification.isRead ? 'bg-primary/5' : ''}
                          `}
                        >
                          <div className="flex items-start gap-3">
                            {notification.avatar ? (
                              <Avatar 
                                src={notification.avatar} 
                                alt="" 
                                size="sm" 
                              />
                            ) : (
                              <div className="p-2 bg-gray-100 rounded-full">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                {!notification.isRead && (
                                  <div className="h-2 w-2 bg-primary rounded-full ml-2"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-primary hover:text-primary-dark font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button className="relative ml-2 p-2 text-gray-500 hover:text-gray-700">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </button>

          {currentUser && (
            <div className="ml-4 flex items-center">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size="sm"
                status="online"
              />
              <span className="hidden ml-2 text-sm font-medium md:block">
                {firstname} { lastname }
              </span>
              <button
                onClick={onLogout}
                className="ml-4 p-2 text-gray-500 hover:text-gray-700"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header











