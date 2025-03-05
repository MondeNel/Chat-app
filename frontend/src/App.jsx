import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';

const App = () => {
  // Destructure values from authentication store
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Debugging: Verify checkAuth is a function
  console.log('checkAuth:', checkAuth);

  // Trigger authentication check when component mounts
  useEffect(() => {
    if (checkAuth) {
      checkAuth();
    } else {
      console.error('checkAuth is not a function');
    }
  }, [checkAuth]);

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
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;