import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  // Destructure values from authentication store
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Debugging: Verify checkAuth is a function
  useEffect(() => {
    // Trigger authentication check when component mounts
    checkAuth();
  }, []); // ✅ Empty array ensures it only runs once

  // Logging the current authentication state
  console.log({ authUser });

  // Return a loading spinner if authentication is being checked
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Render the Navbar component on all pages */}
      <Navbar />

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        
        {/* Protected Route: Settings (only for authenticated users) */}
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        
        {/* Protected Route: Profile (only for authenticated users) */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
