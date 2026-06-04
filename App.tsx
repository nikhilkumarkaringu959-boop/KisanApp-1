import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput, 
  StyleSheet, SafeAreaView, StatusBar, Modal 
} from 'react-native';
import { 
  Menu, X, User, Leaf, Bell, Share2, Info, CloudRain, 
  Sprout, Bug, TrendingUp, Building, Camera, Search, 
  MapPin, Wind, Droplets, ArrowLeft, CheckCircle2, ChevronRight
} from 'lucide-react-native';

// --- MOCK DATA & CONSTANTS ---
const LANGUAGES = ['English', 'Telugu', 'Tamil', 'Hindi', 'Kannada'];
const GENDERS = ['Male', 'Female', 'Other'];
const STATES = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'];
const SOIL_TYPES = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil'];

const CROP_DATA = {
  Kharif: {
    "🌾 Cereals & Millets": ["Rice/Paddy", "Corn", "Jowar", "Bajra", "Ragi"],
    "🌱 Pulses": ["Tur", "Moong", "Urad"],
    "🌻 Oil Seeds": ["Soybean", "Groundnut", "Sunflower", "Sesame"],
    "🧵 Fiber & Cash Crops": ["Cotton", "Jute", "Sugarcane"],
    "🥗 Vegetables & Spices": ["Ladyfinger", "Brinjal", "Chili", "Bitter Gourd"]
  },
  Rabi: {
    "🌾 Cereals": ["Wheat", "Barley", "Oats", "Maize/Rabi Corn"],
    "🌱 Pulses": ["Bengal Gram", "Green Peas", "Lentils", "Black Gram/Urad"],
    "🌻 Oil Seeds": ["Mustard", "Linseed/Flaxseed", "Safflower"],
    "🧵 Cash Crops": ["Sugarcane"],
    "🥗 Vegetables & Spices": ["Potato", "Onion", "Tomato", "Cauliflower", "Cabbage", "Garlic", "Coriander"]
  },
  Zaid: {
    "🌾 Cereals": ["Summer Paddy", "Summer Maize"],
    "🌱 Pulses": ["Moong Dal/Green Gram", "Cowpea/Babbar"],
    "🌻 Oil Seeds": ["Groundnut", "Sunflower", "Sesame"],
    "🍏 Fruits & Vegetables": ["Watermelon", "Muskmelon", "Cucumber", "Bitter Gourd", "Pumpkin", "Bottle Gourd", "Ridge Gourd"]
  }
};

const BANNER_MESSAGES = [
  { type: 'alert', text: "🚨 Heavy rain expected tomorrow in your area. Secure harvested crops." },
  { type: 'tip', text: "💡 Trending: Time for top-dressing Urea for 30-day Paddy." },
  { type: 'govt', text: "🏛️ Govt Update: Rythu Bharosa next installment processing this week." }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [appState, setAppState] = useState('lang_select');
  const [activeTab, setActiveTab] = useState('home');
  const [activeFeature, setActiveFeature] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    language: '', name: '', age: '', gender: '', state: '', district: '', 
    mandal: '', village: '', landSize: '', soilType: ''
  });

  const openFeature = (feature) => setActiveFeature(feature);
  const closeFeature = () => setActiveFeature(null);

  if (appState === 'lang_select') {
    return <LanguageSelection setAppState={setAppState} userProfile={userProfile} setUserProfile={setUserProfile} />;
  }

  if (appState === 'profile_setup') {
    return <ProfileSetup setAppState={setAppState} userProfile={userProfile} setUserProfile={setUserProfile} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Leaf color="#FCD34D" size={32} />
          <View>
            <Text style={styles.headerTitle}>KISAN</Text>
            <Text style={styles.headerSub}>The Smart Farming Assistant</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={styles.menuBtn}>
          <Menu color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* SIDE MENU */}
      <Modal visible={isMenuOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>KISAN Menu</Text>
              <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                <X color="white" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <MenuOption icon={<User size={20} />} label="My Profile" onPress={() => { setActiveTab('profile'); setIsMenuOpen(false); }} />
              <MenuOption icon={<Wind size={20} />} label="Change Language" onPress={() => { setAppState('lang_select'); setIsMenuOpen(false); }} />
              <MenuOption icon={<Leaf size={20} color="#10B981" />} label="KISAN Assistant" onPress={() => { setActiveTab('assistant'); setIsMenuOpen(false); }} />
              <MenuOption icon={<Bell size={20} />} label="Notifications" />
              <MenuOption icon={<MapPin size={20} />} label="My Farm Details" subLabel={`${userProfile.landSize} Acres`} />
              <MenuOption icon={<Share2 size={20} />} label="Share App" />
              <MenuOption icon={<Info size={20} />} label="About Us" subLabel="Version 1.0.0" />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MAIN CONTENT */}
      <View style={styles.main}>
        {activeFeature? (
          <FeatureView feature={activeFeature} onBack={closeFeature} userProfile={userProfile} />
        ) : (
          <>
            {activeTab === 'home' && <HomeTab userProfile={userProfile} openFeature={openFeature} />}
            {activeTab === 'assistant' && <AssistantTab userProfile={userProfile} openFeature={openFeature} />}
            {activeTab === 'profile' && <ProfileTab userProfile={userProfile} />}
          </>
        )}
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavButton icon={<MapPin size={24} />} label="Home" active={activeTab === 'home'} onPress={() => {setActiveTab('home'); closeFeature();}} />
        <NavButton icon={<Leaf size={24} />} label="KISAN AI" active={activeTab === 'assistant'} onPress={() => {setActiveTab('assistant'); closeFeature();}} special />
        <NavButton icon={<User size={24} />} label="Profile" active={activeTab === 'profile'} onPress={() => {setActiveTab('profile'); closeFeature();}} />
      </View>
    </SafeAreaView>
  );
}

// --- SUB COMPONENTS --- 
function LanguageSelection({ setAppState, userProfile, setUserProfile }) {
  return (
    <SafeAreaView style={styles.langContainer}>
      <Leaf color="#059669" size={80} />
      <Text style={styles.langTitle}>Welcome to KISAN</Text>
      <Text style={styles.langSub}>Please select your preferred language</Text>
      <View style={styles.langList}>
        {LANGUAGES.map(lang => (
          <TouchableOpacity 
            key={lang}
            style={styles.langBtn}
            onPress={() => {
              setUserProfile({...userProfile, language: lang});
              setAppState('profile_setup');
            }}
          >
            <Text style={styles.langBtnText}>{lang}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

function ProfileSetup({ setAppState, userProfile, setUserProfile }) {
  const handleChange = (name, value) => {
    setUserProfile({...userProfile, [name]: value});
  };

  const isFormValid = userProfile.name && userProfile.age && userProfile.gender && userProfile.state && userProfile.landSize && userProfile.soilType;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Farmer Profile Setup</Text>
        <Text style={styles.profileSub}>Enter details for accurate AI advice</Text>
      </View>
      <ScrollView style={styles.profileForm}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          value={userProfile.name} 
          onChangeText={(v) => handleChange('name', v)} 
          placeholder="Enter your name" 
        />

        <Text style={styles.label}>Age</Text>
        <TextInput 
          style={styles.input} 
          value={userProfile.age} 
          onChangeText={(v) => handleChange('age', v)} 
          placeholder="e.g. 45" 
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {GENDERS.map(g => (
            <TouchableOpacity 
              key={g} 
              onPress={() => handleChange('gender', g)}
              style={[styles.genderBtn, userProfile.gender === g && styles.genderActive]}
            >
              <Text style={[styles.genderText, userProfile.gender === g && styles.genderActiveText]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>State</Text>
        <View style={styles.chipRow}>
          {STATES.map(s => (
            <TouchableOpacity key={s} onPress={() => handleChange('state', s)} style={[styles.chip, userProfile.state === s && styles.chipActive]}>
              <Text style={[styles.chipText, userProfile.state === s && styles.chipActiveText]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Total Land Size (Acres)</Text>
        <Text style={styles.hint}>Note: 40 Guntas = 1 Acre</Text>
        <TextInput 
          style={styles.input} 
          value={userProfile.landSize} 
          onChangeText={(v) => handleChange('landSize', v)} 
          placeholder="e.g. 2.50" 
          keyboardType="numeric"
        />

        <Text style={styles.label}>Soil Type</Text>
        <View style={styles.chipRow}>
          {SOIL_TYPES.map(s => (
            <TouchableOpacity key={s} onPress={() => handleChange('soilType', s)} style={[styles.chip, userProfile.soilType === s && styles.chipActive]}>
              <Text style={[styles.chipText, userProfile.soilType === s && styles.chipActiveText]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <View style={styles.profileFooter}>
        <TouchableOpacity 
          disabled={!isFormValid}
          onPress={() => setAppState('main')}
          style={[styles.startBtn,!isFormValid && styles.startBtnDisabled]}
        >
          <Text style={styles.startBtnText}>Start Smart Farming</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeTab({ userProfile, openFeature }) {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNER_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = BANNER_MESSAGES[bannerIndex];
  const bannerColor = banner.type === 'alert'? '#FEE2E2' : banner.type === 'tip'? '#FEF3C7' : '#DBEAFE';

  return (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.welcome}>Welcome back, {userProfile.name}! 👋</Text>
      <Text style={styles.welcomeSub}>Your smart farming dashboard is ready.</Text>

      <View style={[styles.banner, {backgroundColor: bannerColor}]}>
        <Text style={styles.bannerText}>{banner.text}</Text>
      </View>

      <Text style={styles.sectionTitle}>Essential Tools</Text>
      <View style={styles.grid}>
        <FeatureCard icon={<CloudRain color="#3B82F6" size={32}/>} title="Weather Forecast" onPress={() => openFeature('weather')} />
        <FeatureCard icon={<Building color="#6366F1" size={32}/>} title="Govt Schemes" onPress={() => openFeature('govt')} />
        <FeatureCard icon={<Sprout color="#10B981" size={32}/>} title="Crop Information" onPress={() => openFeature('crop_info')} />
        <FeatureCard icon={<Bug color="#EF4444" size={32}/>} title="Pest Control" onPress={() => openFeature('pest')} />
      </View>

      <View style={styles.aiPromo}>
        <Text style={styles.aiTitle}>Maximize Your Yield</Text>
        <Text style={styles.aiSub}>Get personalized fertilizer plans from KISAN AI.</Text>
        <TouchableOpacity onPress={() => openFeature('fertilizer')} style={styles.aiBtn}>
          <Text style={styles.aiBtnText}>Open AI Assistant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function AssistantTab({ userProfile, openFeature }) {
  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.assistantHeader}>
        <Leaf color="#059669" size={64} />
        <Text style={styles.assistantTitle}>KISAN AI</Text>
        <Text style={styles.assistantSub}>I am your expert Agronomist. Select a service below.</Text>
      </View>

      <TouchableOpacity onPress={() => openFeature('fertilizer')} style={styles.serviceCard}>
        <View style={[styles.serviceIcon, {backgroundColor: '#D1FAE5'}]}>
          <Sprout color="#059669" size={24}/>
        </View>
        <View style={styles.serviceText}>
          <Text style={styles.serviceTitle}>Smart Fertilizer Calculator</Text>
          <Text style={styles.serviceSub}>Get exact chemical & organic dosage</Text>
        </View>
        <ChevronRight color="#9CA3AF" size={20} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openFeature('pest')} style={styles.serviceCard}>
        <View style={[styles.serviceIcon, {backgroundColor: '#FEE2E2'}]}>
          <Camera color="#DC2626" size={24}/>
        </View>
        <View style={styles.serviceText}>
          <Text style={styles.serviceTitle}>Scan Crop Disease</Text>
          <Text style={styles.serviceSub}>Take a photo to identify pests</Text>
        </View>
        <ChevronRight color="#9CA3AF" size={20} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openFeature('tips')} style={styles.serviceCard}>
        <View style={[styles.serviceIcon, {backgroundColor: '#FEF3C7'}]}>
          <TrendingUp color="#D97706" size={24}/>
        </View>
        <View style={styles.serviceText}>
          <Text style={styles.serviceTitle}>Cash Crop Smart Tips</Text>
          <Text style={styles.serviceSub}>High-yield techniques for Cotton, Chilli etc.</Text>
        </View>
        <ChevronRight color="#9CA3AF" size={20} />
      </TouchableOpacity>
    </ScrollView>
  );
}

function ProfileTab({ userProfile }) {
  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userProfile.name.charAt(0)}</Text>
        </View>
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileLocation}>{userProfile.state}, India</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoHeader}>Farm Details</Text>
        <ProfileRow label="Land Size" value={`${userProfile.landSize} Acres`} />
        <ProfileRow label="Soil Type" value={userProfile.soilType} />
        <ProfileRow label="Location" value={`${userProfile.village}, ${userProfile.mandal}`} />
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoHeader}>Personal Info</Text>
        <ProfileRow label="Age / Gender" value={`${userProfile.age} Yrs, ${userProfile.gender}`} />
        <ProfileRow label="Language" value={userProfile.language} />
      </View>
    </ScrollView>
  );
}

function FeatureView({ feature, onBack, userProfile }) {
  const titles = {
    crop_info: 'Crop Information',
    weather: 'Live Weather Data',
    fertilizer: 'AI Agronomist',
    pest: 'Smart Pest Control',
    tips: 'High-Yield Tips',
    govt: 'Govt Schemes 2026'
  };

  return (
    <View style={styles.featureContainer}>
      <View style={styles.featureHeader}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.featureTitle}>{titles[feature]}</Text>
      </View>
      <ScrollView style={styles.featureContent}>
        <Text style={styles.comingSoon}>Coming Soon: {titles[feature]}</Text>
        <Text style={styles.comingSoonSub}>Full feature will be available in next update</Text>
      </ScrollView>
    </View>
  );
}

// --- UI HELPERS ---
function FeatureCard({ icon, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featureCard}>
      {icon}
      <Text style={styles.featureCardText}>{title}</Text>
    </TouchableOpacity>
  );
}

function NavButton({ icon, label, active, onPress, special }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.navBtn}>
      <View style={special? styles.navSpecial : null}>
        {React.cloneElement(icon, { color: active? '#059669' : '#9CA3AF' })}
      </View>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function ProfileRow({ label, value }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileRowLabel}>{label}</Text>
      <Text style={styles.profileRowValue}>{value}</Text>
    </View>
  );
}

function MenuOption({ icon, label, subLabel, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuOption}>
      <View style={styles.menuOptionLeft}>
        {icon}
        <View>
          <Text style={styles.menuOptionLabel}>{label}</Text>
          {subLabel && <Text style={styles.menuOptionSub}>{subLabel}</Text>}
        </View>
      </View>
      <ChevronRight color="#D1D5DB" size={16} />
    </TouchableOpacity>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { backgroundColor: '#059669', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  headerSub: { color: '#A7F3D0', fontSize: 12 },
  menuBtn: { backgroundColor: '#047857', padding: 8, borderRadius: 20 },
  main: { flex: 1 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 8 },
  navBtn: { alignItems: 'center', width: 80 },
  navSpecial: { backgroundColor: '#059669', padding: 12, borderRadius: 30, marginTop: -30, marginBottom: 4 },
  navLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 4, fontWeight: 'bold' },
  navLabelActive: { color: '#059669' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row', justifyContent: 'flex-end' },
  sideMenu: { width: '80%', maxWidth: 320, backgroundColor: 'white', height: '100%' },
  menuHeader: { backgroundColor: '#059669', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  menuOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  menuOptionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuOptionLabel: { fontWeight: '600', color: '#1F2937' },
  menuOptionSub: { fontSize: 12, color: '#6B7280' },
  tabContent: { flex: 1, padding: 16 },
  welcome: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  welcomeSub: { color: '#6B7280', marginBottom: 16 },
  banner: { padding: 16, borderRadius: 12, marginBottom: 24 },
  bannerText: { fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  featureCard: { backgroundColor: 'white', width: '48%', padding: 16, borderRadius: 16, alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#F3F4F6' },
  featureCardText: { fontWeight: 'bold', fontSize: 14, color: '#1F2937', textAlign: 'center' },
  aiPromo: { backgroundColor: '#059669', borderRadius: 16, padding: 20 },
  aiTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  aiSub: { color: '#A7F3D0', marginBottom: 16 },
  aiBtn: { backgroundColor: '#FCD34D', padding: 12, borderRadius: 8, alignItems: 'center' },
  aiBtnText: { color: '#065F46', fontWeight: 'bold' },
  assistantHeader: { backgroundColor: '#ECFDF5', padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  assistantTitle: { fontSize: 24, fontWeight: 'bold', color: '#065F46', marginTop: 12 },
  assistantSub: { color: '#6B7280', textAlign: 'center', marginTop: 8 },
  serviceCard: { backgroundColor: 'white', padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6' },
  serviceIcon: { padding: 12, borderRadius: 24 },
  serviceText: { flex: 1 },
  serviceTitle: { fontWeight: 'bold', color: '#1F2937' },
  serviceSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  profileCard: { backgroundColor: 'white', padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  avatar: { width: 80, height: 80, backgroundColor: '#D1FAE5', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#065F46' },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  profileLocation: { color: '#6B7280', marginTop: 4 },
  infoCard: { backgroundColor: 'white', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  infoHeader: { backgroundColor: '#F9FAFB', padding: 12, fontWeight: 'bold', color: '#374151' },
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  profileRowLabel: { color: '#6B7280', fontSize: 14 },
  profileRowValue: { fontWeight: '600', color: '#1F2937', fontSize: 14 },
  langContainer: { flex: 1, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center', padding: 24 },
  langTitle: { fontSize: 28, fontWeight: 'bold', color: '#065F46', marginTop: 24, marginBottom: 8 },
  langSub: { color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  langList: { width: '100%', gap: 12 },
  langBtn: { backgroundColor: 'white', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#A7F3D0', alignItems: 'center' },
  langBtnText: { color: '#065F46', fontWeight: 'bold', fontSize: 16 },
  profileHeader: { backgroundColor: '#059669', padding: 16 },
  profileTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  profileSub: { color: '#A7F3D0', fontSize: 12 },
  profileForm: { flex: 1, padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 16, marginBottom: 4 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#D1D5DB', padding: 12, borderRadius: 8, fontSize: 16 },
  hint: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  genderRow: { flexDirection: 'row', gap: 8 },
  genderBtn: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', alignItems: 'center' },
  genderActive: { backgroundColor: '#059669', borderColor: '#059669' },
  genderText: { fontWeight: '600', color: '#374151' },
  genderActiveText: { color: 'white' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  chipActive: { backgroundColor: '#D1FAE5', borderColor: '#10B981' },
  chipText: { color: '#374151', fontSize: 14 },
  chipActiveText: { color: '#065F46', fontWeight: '600' },
  profileFooter: { padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  startBtn: { backgroundColor: '#059669', padding: 16, borderRadius: 12, alignItems: 'center' },
  startBtnDisabled: { backgroundColor: '#D1D5DB' },
  startBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  featureContainer: { flex: 1, backgroundColor: 'white' },
  featureHeader: { backgroundColor: '#059669', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  featureContent: { flex: 1, padding: 16 },
  comingSoon: { fontSize: 20, fontWeight: 'bold', color: '#6B7280', textAlign: 'center', marginTop: 40 },
  comingSoonSub: { color: '#9CA3AF', textAlign: 'center', marginTop: 8 },
});
