import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import avatar from '../../public/avatar.png'; 
import { Camera, Mail, User } from 'lucide-react';
import { toast } from 'react-hot-toast'; // Ensure the toast import is correct

const ProfilePage = () => {
  // Access authentication state and update function from the store
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Corrected file reference from 'file[0]' to 'files[0]'
    if (!file) return;

    const reader = new FileReader(); // Initialize file reader
    reader.readAsDataURL(file); // Read file as Data URL (base64 encoding)

    reader.onload = async () => {
      const base64Image = reader.result; // On successful load, get base64 encoded image
      setSelectedImage(base64Image);

      try {
        // Attempt to update the profile with new image
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error("Profile update failed: " + error?.response?.data?.message || error.message);
        // Check if the error is related to auth issues
        if (error?.response?.status === 401) {
          // Optional: Log out the user if unauthorized
          toast.error("Session expired. Please log in again.");
          logout(); // Call the logout function to clear auth state
        }
      }
    };
  };

  return (
    <div className='h-screen mt-90 pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          {/* Profile Header */}
          <div className='text-center'>
            <h1 className='text-2xl font-semi-bold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              {/* Profile Picture */}
              <img src={selectedImage || authUser.profilePic || '/avatar.png'} alt="Profile" 
                className='size-32 rounded-full object-cover border-4'/>

              {/* Upload Button */}
              <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}>
                <Camera className='w-5 h-5 text-base-200'/>

                {/* Hidden File Input */}
                <input type="file" 
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile} // Disable button while uploading
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
                {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          {/* Display User Information */}
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='w-4 h-4'/>
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='w-4 h-4'/>
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Member Since</span>
                <span>{authUser.createdAt?.split('T')[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
