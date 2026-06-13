import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList, Dimensions, Share } from 'react-native';
import { useProfile } from '../Context/ProfileContext';
import { LanguageContext } from '../Context/LanguageContext';
import { ClipboardList, Sun, Beaker, Bug, Lightbulb, Landmark, User, Globe, Bell, FileText, Share2, Info, Sprout, AlertCircle, Menu, Leaf } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { profile } = useProfile();
  const { language } = useContext(LanguageContext);
  const [menu, setMenu] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const flatListRef = useRef(null);

  const languageMap = {
    'en': 'English',
    'te': 'తెలుగు',
    'ta': 'தமிழ்',
    'hi': 'हिंदी',
    'kn': 'ಕನ್ನಡ'
  };

  const [banners, setBanners] = useState([
    {
      id: '1',
      type: 'CRITICAL',
      bg: '#DC2626',
      icon: AlertCircle,
      title: 'Heavy rain expected tomorrow',
      desc: `in ${profile?.location || 'your area'}. Protect crops now.`
    },
    {
      id: '2',
      type: 'TRENDING TIP',
      bg: '#2563EB',
      icon: Lightbulb,
      title: 'Best time for Urea application',
      desc: 'Soil moisture is optimal today. Apply within 24 hours.'
    },
    {
      id: '3',
      type: 'GOVT UPDATE',
      bg: '#16A34A',
      icon: Landmark,
      title: 'PM-KISAN 17th Installment',
      desc: 'Released this week. Check status in Profile.'
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBanner + 1) % banners.length;
      setCurrentBanner(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentBanner, banners.length]);

  // ✅ CHANGE 1: SHARE FUNCTION ADDED
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'KISAN - The Smart Farming Assistant\nDownload now: https://play.google.com/store/apps/kisanai',
        title: 'KISAN App'
      });
      setMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Card = ({ icon, title, color, screen }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(screen)}>
      <View style={[styles.iconCircle, {backgroundColor: color}]}>{icon}</View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  const MenuItem = ({ icon, label, sub, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.flex1}>
        <Text style={styles.menuLabel}>{label}</Text>
        {sub ? <Text style={styles.menuSub}>{sub}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  const renderBanner = ({ item }) => {
    const Icon = item.icon;
    return (
      <View style={[styles.bannerCard, { backgroundColor: item.bg, width: width - 30 }]}>
        <View style={styles.bannerHeader}>
          <Icon color="#FFF" size={20} fill="#FFF" />
          <Text style={styles.bannerLabel}>{item.type}</Text>
        </View>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerDesc}>{item.desc}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ✅ CHANGE 2: HEADER - HAMBURGER LEFT + 3 DOTS RIGHT */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenu(true)} style={styles.iconBtn}>
          <Menu color="#16A34A" size={26} strokeWidth={2.5} />
        </TouchableOpacity>
        
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>KISAN</Text>
          <Leaf color="#16A34A" size={22} strokeWidth={2.5} fill="#16A34A" />
        </View>
        
        <TouchableOpacity onPress={() => setMenu(true)} style={styles.iconBtn}>
          <Text style={styles.threeDots}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Welcome {profile.name || 'Farmer'},</Text>
          <Text style={styles.welcomeSub}>Your smart farming assistant is ready 🌾</Text>
        </View>

        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (width - 30));
              setCurrentBanner(index);
            }}
          />
          <View style={styles.dotsContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentBanner === index ? styles.dotActive : styles.dotInactive
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Farm Management</Text>
        <View style={styles.grid}>
          <Card icon={<ClipboardList color="#F97316" size={28} />} title="Crop Information" color="#FFEDD5" screen="CROP" />
          <Card icon={<Sun color="#3B82F6" size={28} />} title="Weather Forecast" color="#DBEAFE" screen="WEATHER" />
          <Card icon={<Beaker color="#10B981" size={28} />} title="Fertilizer Calculator" color="#D1FAE5" screen="FERTILIZER" />
          <Card icon={<Bug color="#EF4444" size={28} />} title="Smart Pest Control" color="#FEE2E2" screen="PEST" />
          <Card icon={<Lightbulb color="#EAB308" size={28} />} title="Smart Farming Tips" color="#FEF3C7" screen="TIPS" />
          <Card icon={<Landmark color="#8B5CF6" size={28} />} title="Govt Schemes" color="#EDE9FE" screen="SCHEMES" />
        </View>
      </ScrollView>

      <Modal visible={menu} transparent animationType="fade">
        <TouchableOpacity style={styles.modalBg} activeOpacity={1} onPress={() => setMenu(false)}>
          <View style={styles.menuBox}>
            <MenuItem icon={<User color="#16A34A" size={20} />} label="My Profile" sub={profile.name || 'Nikhil'} onPress={() => {setMenu(false); navigation.navigate('PROFILE_DETAIL')}} />
            <MenuItem
              icon={<Globe color="#3B82F6" size={20} />}
              label="Change Language"
              sub={languageMap[language] || 'English'}
              onPress={() => {setMenu(false); navigation.navigate('LANGUAGE')}}
            />
            <MenuItem icon={<Sprout color="#10B981" size={20} />} label="KISAN AI Assistant" onPress={() => {setMenu(false); navigation.navigate('KISAN_AI')}} />
            <MenuItem icon={<Bell color="#F59E0B" size={20} />} label="Notifications" sub="Weather & Govt Alerts" onPress={() => {setMenu(false); navigation.navigate('NOTIFICATIONS')}} />
            <MenuItem icon={<FileText color="#6366F1" size={20} />} label="My Farm Details" sub={`${profile.landSize || '2.8'} Ac, ${profile.soilType || 'Black Soil'}`} onPress={() => {setMenu(false); navigation.navigate('FARM_DETAILS')}} />
            <View style={styles.divider} />
            <MenuItem icon={<Share2 color="#8B5CF6" size={20} />} label="Share App" onPress={handleShare} />
            <MenuItem icon={<Info color="#6B7280" size={20} />} label="About Us" sub="v1.0.0" onPress={() => {setMenu(false); navigation.navigate('ABOUT_US')}} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { 
    backgroundColor: '#fff', 
    padding: 15, 
    paddingTop: 50, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  // ✅ CHANGE 3: ICONBTN + THREEDOTS STYLES ADDED
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  threeDots: {
    fontSize: 28,
    color: '#16A34A',
    fontWeight: 'bold',
  },
  logoBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: { fontSize: 24, fontWeight: '800', color: '#16A34A', letterSpacing: 1 },
  scroll: { flex: 1 },
  welcomeBox: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
  welcomeText: { fontSize: 26, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  welcomeSub: { fontSize: 16, color: '#16A34A', fontWeight: '600' },
  bannerContainer: { marginBottom: 10 },
  bannerCard: { padding: 18, borderRadius: 12, marginHorizontal: 15, marginBottom: 8 },
  bannerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  bannerLabel: { color: '#FFF', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  bannerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  bannerDesc: { color: '#FFF', fontSize: 14, opacity: 0.95, lineHeight: 20 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: '#16A34A', width: 24 },
  dotInactive: { backgroundColor: '#D1D5DB' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginLeft: 15, marginTop: 10, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 14 },
  card: { backgroundColor: 'white', width: '47.5%', padding: 20, borderRadius: 16, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardText: { fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#1F2937' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  menuBox: { position: 'absolute', top: 90, right: 15, backgroundColor: 'white', borderRadius: 20, paddingVertical: 12, width: 310, elevation: 12, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, gap: 15 },
  menuIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  flex1: { flex: 1 },
  menuLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
  menuSub: { fontSize: 13, color: '#16A34A', fontWeight: '600', marginTop: 3 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8, marginHorizontal: 20 },
});
