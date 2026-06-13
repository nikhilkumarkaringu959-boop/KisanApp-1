import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Home, Leaf, User } from 'lucide-react-native';
import { ProfileProvider, useProfile } from './Context/ProfileContext';

// Screens
import LanguageScreen from './screens/LanguageScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import FarmerProfileScreen from './screens/FarmerProfileScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';
import FarmDetailsScreen from './screens/FarmDetailsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HomeScreen from './screens/HomeScreen';
import CropInfoScreen from './screens/CropInfoScreen';
import WeatherScreen from './screens/WeatherScreen';
import FertilizerScreen from './screens/FertilizerScreen';
import PestControlScreen from './screens/PestControlScreen';
import TipsScreen from './screens/TipsScreen';
import GovtSchemesScreen from './screens/GovtSchemesScreen';
import KisanAIScreen from './screens/KisanAIScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'HOME') {
            return <Home color={color} size={24} strokeWidth={focused ? 2.5 : 2} />;
          } else if (route.name === 'AI') {
            return <Leaf color={color} size={24} strokeWidth={focused ? 2.5 : 2} />;
          } else if (route.name === 'PROFILE') {
            return <User color={color} size={24} strokeWidth={focused ? 2.5 : 2} />;
          }
        },
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HOME" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="AI" 
        component={KisanAIScreen}
        options={{ tabBarLabel: 'AI' }}
      />
      <Tab.Screen 
        name="PROFILE" 
        component={FarmerProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { profile, isLoading } = useProfile();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      if (!profile.language) {
        setInitialRoute('LANGUAGE');
      } else if (!profile.hasCompletedOnboarding) {
        setInitialRoute('ONBOARDING');
      } else if (!profile.name || !profile.district) {
        setInitialRoute('FARMER_PROFILE');
      } else {
        setInitialRoute('MAIN');
      }
    }
  }, [profile, isLoading]);

  if (isLoading || !initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
        <Text style={styles.loadingText}>Loading Kisan AI...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LANGUAGE" component={LanguageScreen} />
        <Stack.Screen name="ONBOARDING" component={OnboardingScreen} />
        <Stack.Screen name="FARMER_PROFILE" component={FarmerProfileScreen} />
        <Stack.Screen name="MAIN" component={TabNavigator} />
        <Stack.Screen name="PROFILE_DETAIL" component={ProfileDetailScreen} />
        <Stack.Screen name="FARM_DETAILS" component={FarmDetailsScreen} />
        <Stack.Screen name="ABOUT_US" component={AboutUsScreen} />
        <Stack.Screen name="NOTIFICATIONS" component={NotificationsScreen} />
        <Stack.Screen name="CROP" component={CropInfoScreen} />
        <Stack.Screen name="WEATHER" component={WeatherScreen} />
        <Stack.Screen name="FERTILIZER" component={FertilizerScreen} />
        <Stack.Screen name="PEST" component={PestControlScreen} />
        <Stack.Screen name="TIPS" component={TipsScreen} />
        <Stack.Screen name="SCHEMES" component={GovtSchemesScreen} />
        <Stack.Screen name="KISAN_AI" component={KisanAIScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <AppNavigator />
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});
