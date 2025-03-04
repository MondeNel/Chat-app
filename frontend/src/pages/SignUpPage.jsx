import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const SignUpPage = () => {

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage form data input values
  const [formData, setFormData] = useState({
    fullName: '', // User's full name
    email: '', // User's email address
    passwrd: '', // User's password
  });

  // Destructuring the `signup` function and `isSigningUp` state from the authentication store
  const { signup, isSigningUp } = useAuthStore();

  // Placeholder for form validation logic (currently empty)
  const validateForm = () => {}; 

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Logic to handle form submission (e.g., validation and calling the signup function)
  };

  return (
    <div>SignUpPage</div> // Placeholder text for the SignUpPage component UI
  );
};

export default SignUpPage; // Export the SignUpPage component
