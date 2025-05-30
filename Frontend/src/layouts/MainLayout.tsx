import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { mockUsers } from '../data/mockData';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  
  // Use the first user as the current user for the demo
  const currentUser = mockUsers[0];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onNavToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onNavigate={handleNavigation}
          currentPath={currentPath}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;