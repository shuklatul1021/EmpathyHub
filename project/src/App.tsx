import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FindSupport from './pages/FindSupport';
import Messages from './pages/Messages';
import Community from './pages/Community';
import Resources from './pages/Resources';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    // Public routes
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <Login />;
        case 'signup':
          return <Signup />;
        default:
          return <Landing />;
      }
    }

    // Protected routes (require authentication)
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'find-support':
        return <FindSupport />;
      case 'messages':
        return <Messages />;
      case 'community':
        return <Community />;
      case 'resources':
        return <Resources />;
      default:
        return <Dashboard />;
    }
  };

  // If authenticated, wrap in MainLayout, otherwise render directly
  return isAuthenticated ? (
    <MainLayout>
      {renderPage()}
    </MainLayout>
  ) : (
    renderPage()
  );
}

export default App;