import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';

/**
 * LoginPage Component
 * 
 * Renders the login page where users can enter their credentials to sign in.
 * It includes email and password fields, a toggle for password visibility,
 * and a loading state while logging in.
 * 
 * @component
 * @returns {JSX.Element} The rendered LoginPage component.
 */
const LoginPage = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage login form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Destructure login function and loading state from the authentication store
  const { login, isLoggingIn } = useAuthStore();

  /**
   * Handles the login form submission.
   * Prevents default form submission behavior and triggers the login function.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left Side: Login Form Section */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo and Title Section */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-gray-500' stroke='currentColor' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Sign in to your account</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Input Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email Address</span>
              </label>
              <div className='relative'>
                {/* Email Icon */}
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

            {/* Password Input Field */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                {/* Lock Icon */}
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
                {/* Toggle Password Visibility */}
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
                  <Loader2 className='size-5 animate-spin' /> // Centered loading spinner
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

      {/* Right Side: Illustration or Pattern */}
      <AuthImagePattern
        title='Join our community'
        subtitle='Connect with friends, share moments, and stay in touch with your loved ones.'
      />
    </div>
  );
};

export default LoginPage;
