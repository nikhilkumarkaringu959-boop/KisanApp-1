import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';

const { width } = Dimensions.get('window');
const GEMINI_API_KEY = "AQ.Ab8RN6LeixmRq8HhjOFaiqZFMHFMP43Ir0sO4mcbwfTR2oB41Q";

export default function HomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cottonPrice, setCottonPrice] = useState('Loading...');
  const scrollRef = useRef<ScrollView>(null);

  // 1. LIVE COTTON PRICE FOR BANNER
  const fetchCottonPrice = async () => {
    const prompt = `Get today's cotton price in Tirupati APMC mandi per Quintal. Return only JSON: {"price": 7500}`;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ "google_search": {} }]
        })
      });
      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      const result = JSON.parse(cleanJson);
      setCottonPrice(`₹${result.price}/Qtl`);
    } catch { 
      setCottonPrice('₹7500/Qtl'); // fallback
    }
  };

  // 2. AUTO BANNER SLIDE
  useEffect(() => {
    fetchCottonPrice();
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % bannerData.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const bannerData = [
    { id: 1, title: 'Market Prices', desc: `Cotton Today: ${cottonPrice}`, icon: 'trending-up', color: ['#FF8F00', '#E65100'] },
    { id: 2, title: 'Weather Alert', desc: 'Rain expected in 2 days', icon: 'wb-cloudy', color: ['#1E88E5', '#1565C0'] },
    { id: 3, title: 'KISAN AI', desc: 'Ask any farming question', icon: 'smart-toy', color: ['#43A047', '#2E7D32'] },
  ];

  const gridItems = [
    { id: 1, title: 'Crop\nInformation', icon: 'assignment', bg: '#FFE0B2', iconBg: '#FFCC80', route: '/crop' },
    { id: 2, title: 'Weather\nForecast', icon: 'wb-sunny', bg: '#D1E7FF', iconBg: '#90CAF9', route: '/weather' },
    { id: 3, title: 'Fertilizer\nCalculator', icon: 'water-drop', bg: '#D6F5E3', iconBg: '#81C784', route: '/fertilizer' },
    { id: 4, title: 'Smart Pest\nControl', icon: 'bug-report', bg: '#FFCDD2', iconBg: '#E57373', route: '/pest' },
    { id: 5, title: 'Smart Farming\nTips', icon: 'lightbulb', bg: '#FFF9C4', iconBg: '#FFD54F', route: '/smarttips' },
    { id: 6, title: 'Govt.\nSchemes', icon: 'account-balance', bg: '#E1BEE7', iconBg: '#BA68C8', route: '/schemes' },
  ];

  const handleBannerScroll = (e: any) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slide);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={['#1B5E20', '#2E7D32']} style={styles.header}>
        <Image source={{uri: 'https://i.imgur.com/8QkYgYp.png'}} style={styles.headerIcon} />
        <View>
          <Text style={styles.logo}>KISAN</Text>
          <Text style={styles.subTitle}>THE SMART FARMING APP</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle" size={35} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNER SLIDER */}
        <ScrollView 
          ref={scrollRef}
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          onScroll={handleBannerScroll}
          scrollEventThrottle={16}
        >
          {bannerData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => item.id === 1 ? router.push('/market') : {}}>
              <LinearGradient colors={item.color as any} style={styles.banner}>
                <MaterialIcons name={item.icon as any} size={40} color="white" />
                <View style={{flex: 1}}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerDesc}>{item.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* DOTS */}
        <View style={styles.dotsContainer}>
          {bannerData.map((_, i) => (
            <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
          ))}
        </View>

        {/* GRID */}
        <View style={styles.gridContainer}>
          {gridItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.gridCard, {backgroundColor: item.bg}]}
              onPress={() => router.push(item.route)} // CLICK WORK
            >
              <View style={[styles.iconCircle, {backgroundColor: item.iconBg}]}>
                <MaterialIcons name={item.icon as any} size={28} color="white" />
              </View>
              <Text style={styles.gridText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#2E7D32" />
          <Text style={[styles.navText, {color: '#2E7D32'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => alert('KISAN AI Coming Soon')}>
          <Ionicons name="chatbubbles" size={24} color="gray" />
          <Text style={styles.navText}>KISAN AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={24} color="gray" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F8E9' },
  header: { padding: 15, paddingTop: 50, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon: { width: 40, height: 40 },
  logo: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  subTitle: { fontSize: 10, color: '#C8E6C9' },

  banner: { width: width - 30, margin: 15, padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 15 },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  bannerDesc: { fontSize: 12, color: 'white', marginTop: 4 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C8E6C9' },
  activeDot: { width: 20, backgroundColor: '#2E7D32' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, paddingBottom: 80 },
  gridCard: { width: '48%', padding: 15, borderRadius: 15, marginBottom: 15, elevation: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  gridText: { fontSize: 14, fontWeight: '600', color: '#1B5E20' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 11, color: 'gray', marginTop: 2 }
});
