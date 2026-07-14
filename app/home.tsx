import 'react-native-reanimated';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const gridItems = [
    { id: 1, title: 'Crop\nInformation', icon: 'clipboard-list', bg: '#FFEFD5', iconBg: '#FFB347', route: '/crop' },
    { id: 2, title: 'Weather\nForecast', icon: 'weather-sunny', bg: '#E3F2FD', iconBg: '#64B5F6', route: '/weather' }, // Ferecast -> Forecast
    { id: 3, title: 'Fertilizer\nCalculator', icon: 'cup', bg: '#E8F5E9', iconBg: '#81C784', route: '/fertilizer' },
    { id: 4, title: 'Smart Pest\nControl', icon: 'bug', bg: '#FFEBEE', iconBg: '#E57373', route: '/pest' },
    { id: 5, title: 'Smart Farming\nTips', icon: 'lightbulb', bg: '#FFFDE7', iconBg: '#FFD54F', route: '/smarttips' },
    { id: 6, title: 'Govt.\nSchemes', icon: 'bank', bg: '#F3E5F5', iconBg: '#BA68C8', route: '/schemes' },
  ];

  return (
    <LinearGradient colors={['#2E7D32', '#1B5E20']} style={styles.container}>
      
      {/* EXACT LEAVES TOP LEFT */}
      <Image 
        source={{uri: 'https://i.imgur.com/8QkYgYp.png'}} 
        style={styles.leafImage} 
        resizeMode="contain"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>KISAN</Text>
          <Text style={styles.subTitle}>THE SMART FARMING ASSISTANT</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="format-list-bulleted" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 90}}>
        
        {/* EXACT BANNER */}
        <TouchableOpacity style={styles.banner} onPress={() => router.push('/market')}>
          <View style={{flex: 1}}>
            <Text style={styles.bannerTitle}>Market Prices</Text>
            <Text style={styles.bannerDesc}>Check latest grain rates{'\n'}to go cont here.</Text>
          </View>
          <View style={styles.bannerRight}>
            <MaterialCommunityIcons name="cart" size={30} color="#8D6E63" />
            <MaterialCommunityIcons name="tag" size={30} color="#8D6E63" style={{marginTop: -5}} />
          </View>
        </TouchableOpacity>

        {/* EXACT 3x2 GRID */}
        <View style={styles.gridContainer}>
          {gridItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.gridCard, {backgroundColor: item.bg}]}
              onPress={() => router.push(item.route)}
            >
              <View style={[styles.iconCircle, {backgroundColor: item.iconBg}]}>
                <MaterialCommunityIcons name={item.icon as any} size={22} color="white" />
              </View>
              <Text style={styles.gridText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* EXACT BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
          <Ionicons name="home" size={22} color="#2E7D32" />
          <Text style={[styles.navText, {color: '#2E7D32'}]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiBtn} onPress={() => alert('KISAN AI Coming Soon')}>
          <MaterialCommunityIcons name="sprout" size={28} color="white" />
          <Text style={styles.aiText}>KISAN AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={22} color="gray" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  leafImage: { position: 'absolute', top: 80, left: 10, width: 120, height: 120, opacity: 0.9 },
  
  header: { paddingHorizontal: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  subTitle: { fontSize: 10, color: '#C8E6C9', marginTop: 2 },

  banner: { backgroundColor: '#FFEFD5', marginHorizontal: 20, marginTop: 20, padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  bannerTitle: { fontSize: 16, fontWeight: 'bold', color: '#4E342E' },
  bannerDesc: { fontSize: 11, color: '#6D4C41', marginTop: 4 },
  bannerRight: { alignItems: 'center', marginLeft: 10 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 15 },
  gridCard: { width: '31%', paddingVertical: 16, borderRadius: 18, marginBottom: 14, alignItems: 'center', elevation: 3 },
  iconCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridText: { fontSize: 11, fontWeight: '700', color: '#2E2E2E', textAlign: 'center', lineHeight: 14 },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 75, backgroundColor: '#E8F5E9', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  navItem: { alignItems: 'center', flex: 1 },
  navText: { fontSize: 11, marginTop: 3, color: 'gray', fontWeight: '500' },
  aiBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems: 'center', marginBottom: 25, borderWidth: 4, borderColor: '#E8F5E9' },
  aiText: { color: 'white', fontSize: 9, fontWeight: 'bold', marginTop: 2 }
});
