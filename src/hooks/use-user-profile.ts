import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  profilePicture: string;
  initials: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedName = localStorage.getItem('userName') || 'Alice Caller';
    const savedPicture = localStorage.getItem('userProfilePicture') || '';
    
    return {
      name: savedName,
      profilePicture: savedPicture,
      initials: getInitials(savedName)
    };
  });

  const updateProfilePicture = (pictureUrl: string) => {
    localStorage.setItem('userProfilePicture', pictureUrl);
    setProfile(prev => ({ ...prev, profilePicture: pictureUrl }));
  };

  const updateName = (newName: string) => {
    localStorage.setItem('userName', newName);
    setProfile(prev => ({ 
      ...prev, 
      name: newName,
      initials: getInitials(newName)
    }));
  };

  // Export current user profile for use in components
  const getCurrentUserProfile = () => ({
    id: 'current-user',
    name: profile.name,
    username: '@you',
    profilePicture: profile.profilePicture,
    initials: profile.initials,
    isCurrentUser: true
  });

  return {
    profile,
    updateProfilePicture,
    updateName,
    getCurrentUserProfile
  };
};

function getInitials(name: string): string {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
}