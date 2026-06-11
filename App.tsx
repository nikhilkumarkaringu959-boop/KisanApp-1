import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Screens Import
import HomeScreen from './screens/HomeScreen';
import CropInfoScreen from './screens/CropInfoScreen';
import WeatherScreen from './screens/WeatherScreen';
import FertilizerScreen from './screens/FertilizerScreen';
import PestControlScreen from './screens/PestControlScreen';
import CashCropsScreen from './screens/CashCropsScreen';
import GovtSchemesScreen from './screens/GovtSchemesScreen';
import KisanAIScreen from './screens/KisanAIScreen';
import ProfileScreen from './screens/ProfileScreen';
import CropDetailScreen from './screens/CropDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Center AI Button
const CustomTabBarButton = ({ onPress }: any) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.customButtonInner}>
      <MaterialCommunityIcons name="leaf" size={28} color="#fff" />
    </View>
  </TouchableOpacity>
);

// Bottom Tab Navigator - Screenshot la exact
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="location-outline" size={26} color={color} />
        }}
      />
      
      <Tab.Screen 
        name="KisanAI" 
        component={KisanAIScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarLabel: () => null,
        }}
      />
      
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={26} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Stack
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Bottom Tab Screens */}
        <Stack.Screen name="Main" component={MainTabs} />
        
        {/* Feature Screens - 6 Buttons */}
        <Stack.Screen 
          name="CropInfo" 
          component={CropInfoScreen}
          options={{
            headerShown: true,
            title: 'Crop Information',
            headerStyle: { backgroundColor: '#16A34A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />
        
        <Stack.Screen 
          name="Weather" 
          component={WeatherScreen}
          options={{
            headerShown: true,
            title: 'Real-time Weather',
            headerStyle: { backgroundColor: '#2563EB' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />
        
        <Stack.Screen 
          name="Fertilizer" 
          component={FertilizerScreen}
          options={{
            headerShown: true,
            title: 'Smart Fertilizer AI',
            headerStyle: { backgroundColor: '#8B5CF6' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />
        
        <Stack.Screen 
          name="PestControl" 
          component={PestControlScreen}
          options={{
            headerShown: true,
            title: 'Smart Pest Control',
            headerStyle: { backgroundColor: '#DC2626' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />
        
        <Stack.Screen 
          name="CashCrops" 
          component={CashCropsScreen}
          options={{
            headerShown: true,
            title: 'High-Yield Cash Crops',
            headerStyle: { backgroundColor: '#F59E0B' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />
        
        <Stack.Screen 
          name="GovtSchemes" 
          component={GovtSchemesScreen}
          options={{
            headerShown: true,
            title: 'Govt Schemes & Updates',
            headerStyle: { backgroundColor: '#1E40AF' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />

        {/* Detail Screen */}
        <Stack.Screen 
          name="CropDetail" 
          component={CropDetailScreen}
          options={{
            headerShown: true,
            title: 'Crop Details',
            headerStyle: { backgroundColor: '#16A34A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontStyle: 'italic', fontWeight: 'bold' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 4,
  },
  customButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
