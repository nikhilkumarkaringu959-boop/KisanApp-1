import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { Home, Sprout, User } from 'lucide-react-native';
import { ProfileProvider } from './Context/ProfileContext';
// Screens Import
import LanguageScreen from './screens/LanguageScreen';
import OnboardingScreen from './screens/OnboardingScreen';
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

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen 
        name="HOME" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen 
        name="KISAN_AI_TAB" 
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.aiButton}>
              <Sprout color="white" size={28} />
            </View>
          ),
          tabBarLabel: () => <Text style={styles.aiLabel}>KISAN AI</Text>
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('KISAN_AI');
          },
        })}
      />
      <Tab.Screen 
        name="PROFILE" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator 
          initialRouteName="LANGUAGE"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LANGUAGE" component={LanguageScreen} />
          <Stack.Screen name="ONBOARDING" component={OnboardingScreen} />
          <Stack.Screen name="MAIN" component={TabNavigator} />
          <Stack.Screen name="CROP" component={CropInfoScreen} />
          <Stack.Screen name="WEATHER" component={WeatherScreen} />
          <Stack.Screen name="FERTILIZER" component={FertilizerScreen} />
          <Stack.Screen name="PEST" component={PestControlScreen} />
          <Stack.Screen name="TIPS" component={TipsScreen} />
          <Stack.Screen name="SCHEMES" component={GovtSchemesScreen} />
          <Stack.Screen name="KISAN_AI" component={KisanAIScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
  aiButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  aiLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: -15,
  },
});
