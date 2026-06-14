import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const profile = await AsyncStorage.getItem('farmerProfile');
    setHasProfile(!!profile);
    setIsReady(true);
  };

  if (!isReady) return <View style={{flex: 1, backgroundColor: '#1B5E20'}} />;
  
  return <Redirect href={hasProfile ? "/(tabs)/home" : "/screens/LanguageScreen"} />;
}
