import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileProvider } from './context/ProfileContext';
import { Sprout, Home as HomeIcon, User } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

import LanguageScreen from './screens/LanguageScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import CropInfoScreen from './screens/CropInfoScreen';
import WeatherScreen from './screens/WeatherScreen';
import FertilizerScreen from './screens/FertilizerScreen';
import PestControlScreen from './screens/PestControlScreen';
import TipsScreen from './screens/TipsScreen';
import GovtSchemesScreen from './screens/GovtSchemesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 5 },
        tabBarActiveTintColor: '#2d5016',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({color}) => <HomeIcon color={color} size={24}/> }} />
      <Tab.Screen name="KISAN AI" component={HomeScreen} options={{
        tabBarIcon: () => <View style={styles.aiButton}><Sprout color="white" size={28}/></View>,
        tabBarLabel: () => <Text style={styles.aiLabel}>KISAN AI</Text>
      }} />
      <Tab.Screen name="Profile" component={HomeScreen} options={{ tabBarIcon: ({color}) => <User color={color} size={24}/> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LANGUAGE">
          <Stack.Screen name="LANGUAGE" component={LanguageScreen} />
          <Stack.Screen name="ONBOARDING" component={OnboardingScreen} />
          <Stack.Screen name="MAIN" component={TabNavigator} />
          <Stack.Screen name="CROP" component={CropInfoScreen} />
          <Stack.Screen name="WEATHER" component={WeatherScreen} />
          <Stack.Screen name="FERTILIZER" component={FertilizerScreen} />
          <Stack.Screen name="PEST" component={PestControlScreen} />
          <Stack.Screen name="TIPS" component={TipsScreen} />
          <Stack.Screen name="SCHEMES" component={GovtSchemesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  aiButton: { backgroundColor: '#4CAF50', width: 55, height: 55, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  aiLabel: { fontSize: 12, color: '#2d5016', marginTop: -5, fontWeight: '600' }
});
