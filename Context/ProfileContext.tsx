import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ TypeScript Interface - crop add chesa
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
  crop: string; // ✅ ADD CHESA
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (key: keyof Profile, value: string) => Promise<void>;
  saveFullProfile: (newProfile: Partial<Profile>) => Promise<boolean>; // ✅ ADD
  clearProfile: () => Promise<void>;
  isProfileComplete: () => boolean; // ✅ ADD
  loading: boolean; // ✅ ADD
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
    crop: '', // ✅ ADD CHESA
  });
  const [loading, setLoading] = useState(true); // ✅ ADD CHESA

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // ✅ KEY NAME CHANGE - farmerProfile ani undali
      const data = await AsyncStorage.getItem('farmerProfile');
      if (data) {
        setProfile(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    } finally {
      setLoading(false); // ✅ Loading false chey
    }
  };

  const updateProfile = async (key: keyof Profile, value: string) => {
    try {
      const newProfile = {...profile, [key]: value };
      setProfile(newProfile);
      // ✅ KEY NAME CHANGE
      await AsyncStorage.setItem('farmerProfile', JSON.stringify(newProfile));
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  // ✅ FULL PROFILE OKESARI SAVE - Screen lo use cheyyadaniki
  const saveFullProfile = async (newProfile: Partial<Profile>) => {
    try {
      const updatedProfile = {...profile,...newProfile };
      setProfile(updatedProfile);
      await AsyncStorage.setItem('farmerProfile', JSON.stringify(updatedProfile));
      return true;
    } catch (error) {
      console.log('Error saving full profile:', error);
      return false;
    }
  };

  // ✅ PROFILE COMPLETE CHECK - App.tsx lo use cheyyadaniki
  const isProfileComplete = () => {
    return!!(profile.name && profile.district && profile.landSize);
  };

  const clearProfile = async () => {
    try {
      // ✅ KEY NAME CHANGE
      await AsyncStorage.removeItem('farmerProfile');
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
        crop: '', // ✅ ADD CHESA
      });
    } catch (error) {
      console.log('Error clearing profile:', error);
    }
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        profile, 
        updateProfile, 
        saveFullProfile, // ✅ ADD
        clearProfile, 
        isProfileComplete, // ✅ ADD
        loading // ✅ ADD
      }}
    >
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
