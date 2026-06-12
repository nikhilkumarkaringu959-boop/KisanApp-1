import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TypeScript Interface
interface Profile {
  language: string;
  name: string;
  age: string;
  gender: string;
  district: string;
  mandal: string;
  village: string;
  state: string;
  landSize: string;
  soilType: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (key: keyof Profile, value: string) => Promise<void>;
  clearProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    language: '',
    name: '',
    age: '',
    gender: '',
    district: '',
    mandal: '',
    village: '',
    state: 'Telangana',
    landSize: '',
    soilType: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('kisanProfile');
      if (data) {
        setProfile(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const updateProfile = async (key: keyof Profile, value: string) => {
    try {
      const newProfile = {...profile, [key]: value };
      setProfile(newProfile);
      await AsyncStorage.setItem('kisanProfile', JSON.stringify(newProfile));
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.removeItem('kisanProfile');
      setProfile({
        language: '',
        name: '',
        age: '',
        gender: '',
        district: '',
        mandal: '',
        village: '',
        state: 'Telangana',
        landSize: '',
        soilType: '',
      });
    } catch (error) {
      console.log('Error clearing profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};
