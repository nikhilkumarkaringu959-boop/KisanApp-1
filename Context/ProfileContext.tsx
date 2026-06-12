import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    language: '', name: '', age: '', gender: '', state: 'Telangana',
    district: '', mandal: '', village: '', landSize: '', soilType: ''
  });

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem('kisanProfile');
    if (data) setProfile(JSON.parse(data));
  };

  const updateProfile = async (key, value) => {
    const newProfile = {...profile, [key]: value };
    setProfile(newProfile);
    await AsyncStorage.setItem('kisanProfile', JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
