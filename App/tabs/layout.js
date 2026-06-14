import { Tabs } from 'expo-router';
import { Home, Leaf, User } from 'lucide-react-native';
import { View } from 'react-native';
import { COLORS } from '../../constants/Theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { 
        height: 70, 
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingBottom: 8,
        paddingTop: 8,
      }
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Home 
              color={focused ? COLORS.primary : '#9CA3AF'} 
              size={26} 
              strokeWidth={2.5}
            />
          ) 
        }} 
      />
      
      <Tabs.Screen 
        name="kisan-ai" 
        options={{ 
          tabBarIcon: () => (
            <View style={{ 
              width: 60, 
              height: 60, 
              borderRadius: 30, 
              backgroundColor: COLORS.primaryLight, 
              marginBottom: 25, 
              alignItems: 'center', 
              justifyContent: 'center',
              elevation: 8,
              shadowColor: '#00C853',
              shadowOpacity: 0.4,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 }
            }}>
              <Leaf color="#FFFFFF" size={28} strokeWidth={2.5} />
            </View>
          )
        }} 
      />
      
      <Tabs.Screen 
        name="profile" 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <User 
              color={focused ? COLORS.primary : '#9CA3AF'} 
              size={26} 
              strokeWidth={2.5}
            />
          ) 
        }} 
      />
    </Tabs>
  );
          }
