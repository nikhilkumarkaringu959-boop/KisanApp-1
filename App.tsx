import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileProvider } from './context/ProfileContext';

import LanguageScreen from './screens/LanguageScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LANGUAGE">
          <Stack.Screen name="LANGUAGE" component={LanguageScreen} />
          <Stack.Screen name="ONBOARDING" component={OnboardingScreen} />
          <Stack.Screen name="HOME" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}
