import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

// ⚠️ API KEY - OpenWeatherMap
const API_KEY = '8b5553bee19b77af9b96c40a2b0c2cbf';

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto slide every 4 seconds
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % banners.length;
      setCurrentSlide(nextSlide);
      scrollRef.current?.scrollTo({ x: nextSlide * (width - 32), animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, banners]);

  useEffect(() => {
    fetchLiveData();
  }, []);

  const fetchLiveData = async () => {
    setLoading(true);
    const liveBanners = [];

    try {
      // 1. CRITICAL WEATHER ALERT - Live from OpenWeatherMap
      const lat = 17.385; // Hyderabad
      const lon = 78.4867;
      
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const tomorrow = weatherRes.data.list[8];
      const rainProb = tomorrow.pop * 100;
      const weatherMain = tomorrow.weather[0].main;
      const temp = Math.round(tomorrow.main.temp);

      if (rainProb > 60 || weatherMain === 'Rain' || weatherMain === 'Thunderstorm') {
        liveBanners.push({
          type: 'CRITICAL',
          icon: 'alert-circle',
          color: '#DC2626',
          text: 'Heavy rain expected tomorrow in your area.',
          subtext: `${Math.round(rainProb)}% probability. Temp: ${temp}°C`
        });
      } else {
        liveBanners.push({
          type: 'INFO',
          icon: 'information-circle',
          color: '#3B82F6',
          text: 'Clear weather expected tomorrow',
          subtext: `Temperature: ${temp}°C. Good for farming`
        });
      }

      // 2. PEST ALERT - Seasonal
      const month = new Date().getMonth();
      if (month >= 5 && month <= 9) {
        liveBanners.push({
          type: 'PEST ALERT',
          icon: 'bug',
          color: '#EA580C',
          text: 'Fall Armyworm risk high for Maize crops',
          subtext: 'Spray Emamectin Benzoate 5% SG @ 0.5g/L'
        });
      }

      // 3. GOVT UPDATE - Latest
      liveBanners.push({
        type: 'GOVT UPDATE',
        icon: 'bank',
        color: '#2563EB',
        text: 'PM-KISAN 18th installment releasing this month',
        subtext: 'Check status on pmkisan.gov.in portal'
      });

      // 4. TRENDING TIP - Seasonal
      if (month >= 5 && month <= 9) {
        liveBanners.push({
          type: 'TRENDING TIP',
          icon: 'sprout',
          color: '#16A34A',
          text: 'Kharif Season: Apply basal DAP before sowing',
          subtext: 'Use 50kg/acre for better root development'
        });
      } else {
        liveBanners.push({
          type: 'TRENDING TIP',
          icon: 'leaf',
          color: '#10B981',
          text: 'Rabi Season: Wheat sowing optimal now',
          subtext: 'Maintain 20-25°C soil temperature'
        });
      }

      setBanners(liveBanners);

    } catch (error) {
      console.log('API Error:', error);
      // Fallback banner
      setBanners([{
        type: 'CRITICAL',
        icon: 'alert-circle',
        color: '#DC2626',
        text: 'Heavy rain expected tomorrow in your area.',
        subtext: 'Check weather forecast for details'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { name: 'Crop Information', icon: 'leaf', color: '#16A34A', bgColor: '#E8F5E9', screen: 'CropInfo' },
    { name: 'Weather Forecast', icon: 'weather-pouring', color: '#3B82F6', bgColor: '#E3F2FD', screen: 'Weather' },
    { name: 'Smart Fertilizer', icon: 'water', color: '#8B5CF6', bgColor: '#F3E5F5', screen: 'Fertilizer' },
    { name: 'Pest & Disease', icon: 'bug', color: '#EF4444', bgColor: '#FFEBEE', screen: 'PestControl' },
    { name: 'Cash Crop Tips', icon: 'trending-up', color: '#10B981', bgColor: '#E8F5E9', screen: 'CashCrops' },
    { name: 'Govt Schemes', icon: 'office-building', color: '#F97316', bgColor: '#FFF3E0', screen: 'GovtSchemes' },
  ];

  const renderBannerIcon = (iconName) => {
    if (iconName === 'bug') return <FontAwesome5 name="bug" size={24} color="#fff" />;
    return <Ionicons name={iconName} size={26} color="#fff" />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>KISAN</Text>
          <MaterialCommunityIcons name="leaf" size={24} color="#16A34A" />
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Welcome back, Nikhil! 👋</Text>
          <Text style={styles.welcomeSub}>Your smart farming is ready.</Text>
        </View>

        {/* AUTO SLIDING BANNER - Live Data */}
        {loading ? (
          <View style={styles.loadingBanner}>
            <ActivityIndicator size="small" color="#DC2626" />
          </View>
        ) : (
          <>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const slide = Math.round(e.nativeEvent.contentOffset.x / (width - 32));
                setCurrentSlide(slide);
              }}
              style={styles.bannerContainer}
            >
              {banners.map((banner, idx) => (
                <View key={idx} style={[styles.banner, { backgroundColor: banner.color, width: width - 32 }]}>
                  <View style={styles.bannerIcon}>
                    {renderBannerIcon(banner.icon)}
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.bannerType}>{banner.type}</Text>
                    <Text style={styles.bannerText}>{banner.text}</Text>
                    {banner.subtext && (
                      <Text style={styles.bannerSub}>{banner.subtext}</Text>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Dots Indicator */}
            <View style={styles.dotsContainer}>
              {banners.map((_, idx) => (
                <View key={idx} style={[styles.dot, { 
                  backgroundColor: currentSlide === idx ? '#16A34A' : '#D1D5DB',
                  width: currentSlide === idx ? 20 : 8
                }]} />
              ))}
            </View>
          </>
        )}

        {/* Grid Cards */}
        <View style={styles.grid}>
          {cards.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(item.screen)} activeOpacity={0.7}>
              <View style={[styles.cardIcon, { backgroundColor: item.bgColor }]}>
                <MaterialCommunityIcons name={item.icon} size={36} color={item.color} />
              </View>
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={26} color="#16A34A" />
          <Text style={[styles.tabText, { color: '#16A34A' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('KisanAI')}>
          <MaterialCommunityIcons name="leaf" size={26} color="#6B7280" />
          <Text style={styles.tabText}>AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={26} color="#6B7280" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#166534', fontStyle: 'italic' },
  scrollView: { flex: 1 },
  welcome: { padding: 20, paddingBottom: 12 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', fontStyle: 'italic' },
  welcomeSub: { fontSize: 16, color: '#16A34A', fontWeight: '600', marginTop: 6, fontStyle: 'italic' },
  loadingBanner: { margin: 16, padding: 20, backgroundColor: '#fff', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  bannerContainer: { marginHorizontal: 16, marginTop: 8 },
  banner: { padding: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, marginRight: 16 },
  bannerIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  bannerType: { fontSize: 11, fontWeight: 'bold', color: '#fff', opacity: 0.95, textTransform: 'uppercase', letterSpacing: 0.8 },
  bannerText: { fontSize: 15, fontWeight: '700', color: '#fff', marginTop: 4, lineHeight: 21, fontStyle: 'italic' },
  bannerSub: { fontSize: 12, color: '#fff', marginTop: 3, opacity: 0.9, lineHeight: 17 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12, marginBottom: 8 },
  dot: { height: 8, borderRadius: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8, paddingBottom: 20 },
  card: { width: '46%', backgroundColor: '#fff', margin: '2%', padding: 24, borderRadius: 20, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } },
  cardIcon: { width: 68, height: 68, borderRadius: 34, marginBottom: 14, alignItems: 'center', justifyContent: 'center' },
  cardText: { fontSize: 14, fontWeight: '600', color: '#1F2937', textAlign: 'center', lineHeight: 19, fontStyle: 'italic' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 10, paddingBottom: 14 },
  tabItem: { flex: 1, alignItems: 'center', padding: 8 },
  tabText: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: '500', fontStyle: 'italic' },
});
