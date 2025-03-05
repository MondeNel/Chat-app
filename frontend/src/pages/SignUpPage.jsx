import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '', // Fixed from 'passwrd' to 'password'
  });

  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData); // Call the signup function with form data
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO Section */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-gray-500' stroke='currentColor' />
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
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-gray-500' stroke='currentColor' />
                </div>
                <input
                  type='text'
                  className='input input-bordered w-full pl-10'
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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
              <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                {isSigningUp ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;