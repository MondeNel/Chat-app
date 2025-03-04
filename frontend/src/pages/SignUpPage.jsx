import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore'; 
import { MessageSquare, User } from 'lucide-react'; 

const SignUpPage = () => {

  // State for toggling password visibility (not yet used in this code)
  const [showPassword, setShowPassword] = useState(false);

  // State to manage the form input values for Full Name, Email, and Password
  const [formData, setFormData] = useState({
    fullName: '', // Full name input field
    email: '', // Email input field
    passwrd: '', // Password input field
  });

  // Destructuring signup and isSigningUp functions from the authentication store
  const { signup, isSigningUp } = useAuthStore();

  // Placeholder for form validation logic (currently empty)
  const validateForm = () => {}; 

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can add form validation and call the signup function here
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side container */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div className='w-full max-w-md space-y-8'>
          {/* LOGO Section */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                  {/* Message icon from lucide-react */}
                  <MessageSquare className='size-6 text-primary '/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Full Name Input */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                {/* User Icon */}
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40'/>
                </div>
                {/* Full Name Input Field */}
                <input 
                  type="text"
                  className={`input input-bordered w-full pl-10`} // Add padding for the icon
                  placeholder='John Doe' 
                  value={formData.fullName} 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default SignUpPage; // Export the SignUpPage component
