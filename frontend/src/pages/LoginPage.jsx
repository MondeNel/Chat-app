import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';

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
    <div>LoginPage</div>
  )
}

export default LoginPage