import { Tabs } from 'expo-router';
import { Home, Sprout, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1B4332',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#52B788',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="kisan-ai"
        options={{
          title: 'KISAN AI',
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#2D6A4F',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              borderWidth: 4,
              borderColor: '#1B4332',
            }}>
              <Sprout color="#FFF" size={28} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
