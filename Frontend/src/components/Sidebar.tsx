import React from 'react';
import { 
  Home, 
  Users, 
  Heart, 
  MessageCircle, 
  BarChart, 
  BookOpen,
  Calendar,
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  isActive?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPath,
}) => {
  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: <Home />, path: '/' },
    { label: 'Find Support', icon: <Users />, path: '/find-support' },
    { label: 'Messages', icon: <MessageCircle />, path: '/messages' },
    { label: 'Community', icon: <Heart />, path: '/community' },
    { label: 'Mood Tracker', icon: <BarChart />, path: '/mood-tracker' },
    { label: 'Resources', icon: <BookOpen />, path: '/resources' },
    { label: 'Journal', icon: <Calendar />, path: '/journal' },
    { label: 'Settings', icon: <Settings />, path: '/settings' },
    { label: 'Help & Support', icon: <HelpCircle />, path: '/help' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-white px-2 py-4 transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-center">
          <Heart className="h-8 w-8 text-accent" />
          <span className="ml-2 text-2xl font-bold text-gray-900">EmpathyHub</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.path);
                  if (isOpen) onClose();
                }}
                className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : ''}`}>
                  {item.icon}
                </span>
                {item.label}
                {item.label === 'Messages' && (
                  <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                    2
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 rounded-lg bg-primary/5 p-4">
          <h4 className="mb-2 font-medium text-primary">Support Score</h4>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">Level 3: Empathic Listener</span>
                <span className="text-sm font-medium text-primary">87/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-primary" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            Keep supporting others to unlock new badges and features!
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;