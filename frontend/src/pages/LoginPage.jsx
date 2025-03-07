import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = usestate({
    email: '',
    password: '',
  });
  
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }



  return (
    <div className='w-full max-w-md space-y-8'>
      {/* Logo */}
      <div className='text-center mb-8'>
        <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors'>
          <MessageSquare className='w-6 h-6 text-primary' />
        </div>
        <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
        <p className='text-base-content/60'>Sign in to your account</p>
      </div>
    </div>

    
  )
}

export default LoginPage