import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#A5D6A7', tabBarInactiveTintColor: '#81C784', tabBarStyle: { backgroundColor: '#1E4D2B', height: 65, borderTopWidth: 0 }}}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({color}) => <Ionicons name="home" size={22} color={color}/> }} />
      <Tabs.Screen 
        name="ai" 
        options={{ 
          title: 'KISAN AI',
          tabBarIcon: () => (
            <View style={{width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#1E4D2B', marginBottom: 20}}>
              <MaterialCommunityIcons name="sprout" size={30} color="white" />
            </View>
          )
        }} 
        listeners={{ tabPress: e => { e.preventDefault(); alert('KISAN AI Coming Soon') } }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({color}) => <Ionicons name="person" size={22} color={color}/> }} />
    </Tabs>
  );
}
