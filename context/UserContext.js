import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    cropName: '',
    acres: '',
    soilType: '',
    location: '',
    language: 'english',
    isFirstTime: true
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (e) {
      console.log('Failed to load user data');
    }
  };

  const saveUserData = async (newData) => {
    try {
      const updated = {...userData,...newData, isFirstTime: false };
      await AsyncStorage.setItem('userData', JSON.stringify(updated));
      setUserData(updated);
    } catch (e) {
      console.log('Failed to save user data');
    }
  };

  return (
    <UserContext.Provider value={{ userData, saveUserData }}>
      {children}
    </UserContext.Provider>
  );
};
