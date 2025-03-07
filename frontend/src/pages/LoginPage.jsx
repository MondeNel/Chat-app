import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern'; 

const LoginPage = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage form data (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Destructure login function and loading state from useAuthStore
  const { login, isLoggingIn } = useAuthStore();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    await login(formData); // Call the login function with form data
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side: Login Form */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO Section */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-gray-500' stroke='currentColor' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Sign in to your account</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Input */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email Address</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-gray-500' stroke='currentColor' />
                </div>
                <input
                  type='email'
                  className='input input-bordered w-full pl-10'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-gray-500' stroke='currentColor' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input input-bordered w-full pl-10'
                  placeholder='************'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' stroke='currentColor' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' stroke='currentColor' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='btn btn-primary w-full flex items-center justify-center'
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <Loader2 className='size-5 animate-spin' /> // Centered spinner
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Don't have an account?{' '}
              <Link to='/signup' className='link link-primary'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Image or Pattern */}
      <AuthImagePattern
        title='Join our community'
        subtitle='Connect with friends, share moments, and stay in touch with your loved ones.'
      />
    </div>
  );
};

export default LoginPage;