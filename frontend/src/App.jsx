import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import SignUpPage from "./pages/SignUpPage"; // Import SignUpPage
import LoginPage from "./pages/LoginPage"; // Import LoginPage
import SettingsPage from "./pages/SettingsPage"; // Import SettingsPage
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage
import { useAuthStore } from "./store/useAuthStore.js";

const App = () => {

  const { authUser, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  return (
    <div>
      {/* Navbar component */}
      <Navbar />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;