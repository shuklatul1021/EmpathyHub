import React, { useState } from 'react';
import { User } from '../types';
import Avatar from './ui/Avatar';
import { Menu, Bell, MessageCircle, Search, X, Heart } from 'lucide-react';

interface HeaderProps {
  currentUser?: User;
  onNavToggle: () => void;
  firstname : string,
  latname : string
}

const Header: React.FC<HeaderProps> = ({ currentUser, onNavToggle , firstname , latname }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

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

          <button className="relative ml-2 p-2 text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent"></span>
          </button>

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
              <span className="hidden ml-2 text-sm font-medium md:block  flex">
                <div className='gap-x-4'>{firstname}{latname}</div>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;