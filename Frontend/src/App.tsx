import { BrowserRouter , Navigate, Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Messages from './pages/Messages';
import Community from './pages/Community';
import FindSupport from './pages/FindSupport';
import Resources from './pages/Resources';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Users from './pages/Users';
import { IsAuthicated } from './State/ComponetState';
import Help from './pages/Help';
import Journal from './pages/Journal';
import Settings from './pages/Settings';
import UserDetail from './pages/UserDetails';
import ConnectionRequests from './pages/ConnectionRequests';
import MoodTrackerPage from './pages/MoodTracker';

interface RouteProps {
  children: React.ReactNode;
}

// Protected Route Component
const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuth = useRecoilValue(IsAuthicated);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuth = useRecoilValue(IsAuthicated);
  return !isAuth ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

// Layout wrapper for protected routes
const ProtectedLayout: React.FC<RouteProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <MainLayout>
        {children}
      </MainLayout>
    </ProtectedRoute>
  );
};

// App Routes Component (inside RecoilRoot)
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/messages" element={<ProtectedLayout><Messages /></ProtectedLayout>} />
        <Route path="/community" element={<ProtectedLayout><Community /></ProtectedLayout>} />
        <Route path="/find-support" element={<ProtectedLayout><FindSupport /></ProtectedLayout>} />
        <Route path="/resources" element={<ProtectedLayout><Resources /></ProtectedLayout>} />
        <Route path="/users" element={<ProtectedLayout><Users /></ProtectedLayout>} />
        <Route path="/help" element={<ProtectedLayout><Help/></ProtectedLayout>} />
        <Route path="/you/*" element={<ProtectedLayout><UserDetail/></ProtectedLayout>} />
        <Route path="/journal" element={<ProtectedLayout><Journal></Journal></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><Settings></Settings></ProtectedLayout>} />
        <Route path="/mood-tracker" element={<ProtectedLayout><MoodTrackerPage></MoodTrackerPage></ProtectedLayout>} />
        <Route path="/connection-requests" element={<ProtectedLayout><ConnectionRequests></ConnectionRequests></ProtectedLayout>} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <AppRoutes />
    </RecoilRoot>
  );
};

export default App;