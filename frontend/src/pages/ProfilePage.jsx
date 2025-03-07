import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updatProfile } = useAuthStore();

  const handleImageUpload = async (e) => {};


  return (
    <div className='h-screen pt20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semi-bold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage