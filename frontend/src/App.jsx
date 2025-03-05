import React from "react";
import Navbar from "./components/Navbar"; // Import the Navbar component
import { Routes, Route, Navigate } from "react-router-dom"; // Import routing components for navigation
import HomePage from "./pages/HomePage"; // Import the HomePage component
import { useEffect } from "react"; // Import useEffect hook for side effects
import SignUpPage from "./pages/SignUpPage"; // Import SignUpPage component for user registration
import LoginPage from "./pages/LoginPage"; // Import LoginPage component for user login
import SettingsPage from "./pages/SettingsPage"; // Import SettingsPage for user settings
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage for user profile display
import { useAuthStore } from "./store/useAuthStore.js"; // Import custom authentication store hook
import { Loader } from 'lucide-react'; // Import a loading spinner component

const App = () => {

  // Destructure values from authentication store
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth(); // Trigger authentication check when component mounts
  }, [checkAuth]);

  // Logging the current authentication state
  console.log({authUser});

  // Return a loading spinner if authentication is being checked
  if (isCheckingAuth) 
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      {/* Render the Navbar component on all pages */}
      <Navbar />

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/home"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
    </div>
  );
};

export default App;s
