import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// --- MOCK DATA ---
const CROP_DATA = {
  Kharif: [
    { category: "Cereals & Millets", items: ["Paddy/Rice", "Corn", "Jowar", "Bajra", "Ragi"] },
    { category: "Pulses", items: ["Tur", "Moong", "Urad"] },
    { category: "Oil Seeds", items: ["Soybean", "Groundnut", "Sunflower", "Sesame"] },
    { category: "Fiber & Cash Crops", items: ["Cotton", "Jute", "Sugarcane"] },
    { category: "Vegetables & Spices", items: ["Ladyfinger", "Brinjal", "Chili", "Bitter Gourd"] }
  ],
  Rabi: [
    { category: "Cereals", items: ["Wheat", "Barley", "Oats", "Maize/Rabi Corn"] },
    { category: "Pulses", items: ["Bengal Gram", "Green Peas", "Lentils", "Black Gram/Urad"] },
    { category: "Oil Seeds", items: ["Mustard", "Linseed/Flaxseed", "Safflower"] },
    { category: "Cash Crops", items: ["Sugarcane"] },
    { category: "Vegetables & Spices", items: ["Potato", "Onion", "Tomato", "Cauliflower", "Cabbage", "Garlic", "Coriander"] }
  ],
  Zaid: [
    { category: "Cereals", items: ["Summer Paddy", "Summer Maize"] },
    { category: "Pulses", items: ["Moong Dal/Green Gram", "Cowpea/Babbar"] },
    { category: "Oil Seeds", items: ["Groundnut", "Sunflower", "Sesame"] },
    { category: "Fruits & Vegetables", items: ["Watermelon", "Muskmelon", "Cucumber", "Bitter Gourd", "Pumpkin", "Bottle Gourd", "Ridge Gourd"] }
  ]
};

const BANNERS = [
  { type: "Critical", text: "Heavy rain expected tomorrow in your area.", color: "#DC2626" },
  { type: "Trending", text: "Apply Neem Oil now to prevent early pest attacks.", color: "#EA580C" },
  { type: "Govt Update", text: "PM-KISAN next installment releasing soon. Check status.", color: "#2563EB" }
];

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- GLOBAL STATE ---
let globalProfile = {
  language: '', name: '', age: '', gender: '', state: '', 
  district: '', mandal: '', village: '', landSize: '', soilType: ''
};

// --- LANGUAGE SCREEN ---
function LanguageScreen({ navigation }) {
  const selectLang = (lang) => {
    globalProfile.language = lang;
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.langContainer}>
        <Ionicons name="leaf" size={80} color="#16A34A" />
        <Text style={styles.appTitle}>KISAN</Text>
        <Text style={styles.appSubtitle}>The Smart Farming Assistant</Text>
        <Text style={styles.langHint}>Please select your language / దయచేసి మీ భాషను ఎంచుకోండి</Text>
        
        {['English', 'Telugu (తెలుగు)', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Kannada (ಕನ್ನಡ)'].map((lang) => (
          <TouchableOpacity key={lang} style={styles.langButton} onPress={() => selectLang(lang)}>
            <Text style={styles.langText}>{lang}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --- ONBOARDING SCREEN ---
function OnboardingScreen({ navigation }) {
  const [profile, setProfile] = useState(globalProfile);

  const handleSave = () => {
    if(!profile.name ||!profile.state ||!profile.landSize) {
      Alert.alert("Error", "Please fill important details!");
      return;
    }
    globalProfile = profile;
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.screenTitle}>Farmer Profile Setup</Text>
        
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" value={profile.name} 
          onChangeText={(text) => setProfile({...profile, name: text})} />
        
        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} placeholder="e.g. 45" keyboardType="numeric" value={profile.age}
          onChangeText={(text) => setProfile({...profile, age: text})} />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {['Male', 'Female', 'Other'].map(g => (
            <TouchableOpacity key={g} style={[styles.genderBtn, profile.gender === g && styles.genderActive]} 
              onPress={() => setProfile({...profile, gender: g})}>
              <Text style={[styles.genderText, profile.gender === g && styles.genderTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>State</Text>
        <TextInput style={styles.input} placeholder="e.g. Telangana" value={profile.state}
          onChangeText={(text) => setProfile({...profile, state: text})} />

        <Text style={styles.label}>District</Text>
        <TextInput style={styles.input} value={profile.district}
          onChangeText={(text) => setProfile({...profile, district: text})} />

        <Text style={styles.label}>Village</Text>
        <TextInput style={styles.input} value={profile.village}
          onChangeText={(text) => setProfile({...profile, village: text})} />

        <Text style={styles.label}>Land Size (Acres)</Text>
        <TextInput style={styles.input} placeholder="e.g. 2.40" keyboardType="numeric" value={profile.landSize}
          onChangeText={(text) => setProfile({...profile, landSize: text})} />

        <Text style={styles.label}>Soil Type</Text>
        <View style={styles.soilGrid}>
          {['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil'].map(s => (
            <TouchableOpacity key={s} style={[styles.soilBtn, profile.soilType === s && styles.soilActive]}
              onPress={() => setProfile({...profile, soilType: s})}>
              <Text style={[styles.soilText, profile.soilType === s && styles.soilTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Complete Setup</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- HOME SCREEN ---
function HomeScreen({ navigation }) {
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setBannerIdx(prev => (prev + 1) % BANNERS.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const gridItems = [
    { title: "Crop Information", icon: "leaf", color: "#059669", screen: "CropInfo" },
    { title: "Weather Forecast", icon: "rainy", color: "#2563EB", screen: "Weather" },
    { title: "Smart Fertilizer", icon: "water", color: "#7C3AED", screen: "Fertilizer" },
    { title: "Pest & Disease", icon: "bug", color: "#DC2626", screen: "PestControl" },
    { title: "Cash Crop Tips", icon: "trending-up", color: "#16A34A", screen: "CashCrops" },
    { title: "Govt Schemes", icon: "business", color: "#EA580C", screen: "GovtSchemes" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity><Ionicons name="menu" size={28} color="#166534" /></TouchableOpacity>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>KISAN</Text>
            <Ionicons name="leaf" size={24} color="#16A34A" />
          </View>
          <View style={{width: 28}} />
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Welcome back, {globalProfile.name || 'Farmer'}! 👋</Text>
          <Text style={styles.welcomeSub}>Your smart farming is ready.</Text>
        </View>

        <View style={[styles.banner, {backgroundColor: BANNERS[bannerIdx].color}]}>
          <Ionicons name={bannerIdx === 0? "alert-circle" : bannerIdx === 1? "leaf" : "business"} size={32} color="#fff" />
          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={styles.bannerType}>{BANNERS[bannerIdx].type}</Text>
            <Text style={styles.bannerText}>{BANNERS[bannerIdx].text}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {gridItems.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.card} onPress={() => navigation.navigate(item.screen)}>
              <View style={[styles.cardIcon, {backgroundColor: item.color + '20'}]}>
                <Ionicons name={item.icon as any} size={32} color={item.color} />
              </View>
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- CROP INFO SCREEN ---
function CropInfoScreen({ navigation }) {
  const [activeSeason, setActiveSeason] = useState('Kharif');
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.screenHeaderTitle}>Crop Information</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.tabRow}>
        {Object.keys(CROP_DATA).map(season => (
          <TouchableOpacity key={season} style={[styles.tab, activeSeason === season && styles.tabActive]} 
            onPress={() => setActiveSeason(season)}>
            <Text style={[styles.tabText, activeSeason === season && styles.tabTextActive]}>{season}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        {CROP_DATA[activeSeason].map((cat, idx) => (
          <View key={idx} style={styles.cropCard}>
            <Text style={styles.cropCategory}>{cat.category}</Text>
            {cat.items.map((item, i) => (
              <View key={i} style={styles.cropItem}>
                <Text style={styles.cropItemText}>{item}</Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- PLACEHOLDER SCREENS ---
function PlaceholderScreen({ navigation, title, icon, color }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.screenHeader, {backgroundColor: color}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.screenHeaderTitle}>{title}</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.placeholder}>
        <Ionicons name={icon as any} size={80} color={color} />
        <Text style={styles.placeholderText}>{title} Coming Soon...</Text>
      </View>
    </SafeAreaView>
  );
}

function WeatherScreen({ navigation }) {
  return <PlaceholderScreen navigation={navigation} title="Weather Forecast" icon="rainy" color="#2563EB" />;
}
function FertilizerScreen({ navigation }) {
  return <PlaceholderScreen navigation={navigation} title="Smart Fertilizer AI" icon="water" color="#7C3AED" />;
}
function PestControlScreen({ navigation }) {
  return <PlaceholderScreen navigation={navigation} title="Pest & Disease" icon="bug" color="#DC2626" />;
}
function CashCropsScreen({ navigation }) {
  return <PlaceholderScreen navigation={navigation} title="Cash Crop Tips" icon="trending-up" color="#16A34A" />;
}
function GovtSchemesScreen({ navigation }) {
  return <PlaceholderScreen navigation={navigation} title="Govt Schemes" icon="business" color="#EA580C" />;
}
function ProfileScreen({ navigation }) {
  return <PlaceholderScreen navigation={navigation} title="My Profile" icon="person" color="#16A34A" />;
}

// --- TAB NAVIGATOR ---
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#16A34A',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
      }} />
      <Tab.Screen name="AI" component={PlaceholderScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="leaf" size={size} color={color} />
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
      }} />
    </Tab.Navigator>
  );
}

// --- ROOT APP ---
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="CropInfo" component={CropInfoScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Fertilizer" component={FertilizerScreen} />
          <Stack.Screen name="PestControl" component={PestControlScreen} />
          <Stack.Screen name="CashCrops" component={CashCropsScreen} />
          <Stack.Screen name="GovtSchemes" component={GovtSchemesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollView: { flex: 1 },
  langContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F0FDF4' },
  appTitle: { fontSize: 36, fontWeight: 'bold', color: '#166534', marginTop: 16 },
  appSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 8 },
  langHint: { fontSize: 12, color: '#6B7280', marginTop: 24, marginBottom: 32, textAlign: 'center' },
  langButton: { width: '100%', padding: 16, backgroundColor: '#fff', borderWidth: 2, borderColor: '#16A34A', borderRadius: 12, marginBottom: 12 },
  langText: { fontSize: 18, fontWeight: '600', color: '#16A34A', textAlign: 'center' },
  screenTitle: { fontSize: 24, fontWeight: 'bold', color: '#166534', marginBottom: 24, paddingHorizontal: 16, paddingTop: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 12 },
  label: { fontSize: 14, color: '#6B7280', marginBottom: 8, marginTop: 16, paddingHorizontal: 16 },
  input: { borderBottomWidth: 2, borderBottomColor: '#BBF7D0', paddingVertical: 12, paddingHorizontal: 16, fontSize: 16, backgroundColor: '#fff', marginHorizontal: 16 },
  genderRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginBottom: 8 },
  genderBtn: { flex: 1, padding: 12, borderRadius: 24, borderWidth: 1, borderColor: '#16A34A', alignItems: 'center' },
  genderActive: { backgroundColor: '#16A34A' },
  genderText: { color: '#16A34A', fontWeight: '600' },
  genderTextActive: { color: '#fff' },
  soilGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16 },
  soilBtn: { width: '48%', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#8B4513', alignItems: 'center' },
  soilActive: { backgroundColor: '#8B4513' },
  soilText: { color: '#8B4513', fontWeight: '600' },
  soilTextActive: { color: '#fff' },
  saveButton: { backgroundColor: '#16A34A', padding: 16, borderRadius: 12, margin: 16, marginTop: 32 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#166534' },
  welcome: { padding: 16 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  welcomeSub: { fontSize: 14, color: '#16A34A', fontWeight: '600', marginTop: 4 },
  banner: { margin: 16, padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center' },
  bannerType: { fontSize: 10, fontWeight: 'bold', color: '#fff', opacity: 0.8, textTransform: 'uppercase' },
  bannerText: { fontSize: 14, fontWeight: '600', color: '#fff', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  card: { width: '46%', backgroundColor: '#fff', margin: '2%', padding: 16, borderRadius: 16, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  cardIcon: { padding: 12, borderRadius: 24, marginBottom: 12 },
  cardText: { fontSize: 13, fontWeight: '600', color: '#374151', textAlign: 'center' },
  screenHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#16A34A' },
  screenHeaderTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  tabRow: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#16A34A' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  tabTextActive: { color: '#16A34A' },
  cropCard: { backgroundColor: '#fff', margin: 16, borderRadius: 12, overflow: 'hidden', elevation: 1 },
  cropCategory: { backgroundColor: '#F0FDF4', padding: 12, fontWeight: 'bold', color: '#166534', borderBottomWidth: 1, borderBottomColor: '#DCFCE7' },
  cropItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  cropItemText: { fontSize: 14, color: '#374151' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  placeholderText: { fontSize: 18, fontWeight: 'bold', color: '#6B7280', marginTop: 16 },
});
