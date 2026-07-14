import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';

const { width } = Dimensions.get('window');
const GEMINI_API_KEY = "AQ.Ab8RN6LeixmRq8HhjOFaiqZFMHFMP43Ir0sO4mcbwfTR2oB41Q";

export default function HomeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [cottonPrice, setCottonPrice] = useState('Loading...');
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCottonPrice = async () => {
    const prompt = `Get TODAY'S Cotton price per Quintal in Tirupati APMC Mandi. Return JSON: {"price": 7500}`;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], tools: [{ "google_search": {} }] })
      });
      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const result = JSON.parse(jsonText.replace(/```json/g, '').replace(/```/g, ''));
      setCottonPrice(`₹${result.price}/Qtl`);
    } catch { setCottonPrice('₹7500/Qtl'); }
  };

  useEffect(() => {
    fetchCottonPrice();
    const interval = setInterval(() => {
      setCurrentIndex(prev => { const next = (prev + 1) % 3; scrollRef.current?.scrollTo({ x: next * (width - 30), animated: true }); return next; });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const bannerData = [
    { id: 1, title: 'Market Prices', desc: `Cotton Today: ${cottonPrice}`, icon1: 'cart', icon2: 'local-offer', color: '#FFD8B2', route: '/market' },
    { id: 2, title: 'Weather Alert', desc: 'Rain expected in next 3 days', icon1: 'cloud', icon2: 'water-drop', color: '#BBDEFB', route: '/weather' },
    { id: 3, title: 'KISAN AI', desc: 'Ask any farming question', icon1: 'smart-toy', icon2: 'psychology', color: '#C8E6C9', route: null },
  ];

  const gridItems = [
  { id: 1, title: 'Crop\nInformation', icon: 'assignment', bg: '#FFE0B2', iconBg: '#FFCC80', route: '/crop' },
  { id: 2, title: 'Weather\nForecast', icon: 'wb-sunny', bg: '#D1E7FF', iconBg: '#90CAF9', route: '/weather' },
  { id: 3, title: 'Fertilizer\nCalculator', icon: 'water-drop', bg: '#D6F5E3', iconBg: '#81C784', route: '/fertilizer' },
  { id: 4, title: 'Smart Pest\nControl', icon: 'bug-report', bg: '#FFCDD2', iconBg: '#E57373', route: '/pest' },
  { id: 5, title: 'Smart Farming\nTips', icon: 'lightbulb', bg: '#FFF9C4', iconBg: '#FFD54F', route: '/smarttips' },
  { id: 6, title: 'Govt.\nSchemes', icon: 'account-balance', bg: '#E1BEE7', iconBg: '#BA68C8', route: '/schemes' },
];

// Then in map:
<TouchableOpacity key={item.id} style={[styles.gridCard, {backgroundColor: item.bg}]} onPress={() => router.push(item.route)}>
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1B5E20', '#2E7D32']} style={styles.bg} />
      <Image source={{uri: 'https://i.imgur.com/8QkYg3L.png'}} style={styles.leaf} /> {/* LEAF IMAGE */}
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>KISAN</Text>
            <Text style={styles.subtitle}>THE SMART FARMING ASSISTANT</Text>
          </View>
          <TouchableOpacity><Ionicons name="menu" size={28} color="white" /></TouchableOpacity>
        </View>

        {/* AUTO SLIDING BANNER */}
        <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bannerContainer}>
          {bannerData.map(item => (
            <TouchableOpacity key={item.id} style={[styles.bannerCard, {backgroundColor: item.color}]} onPress={() => item.route ? router.push(item.route) : alert('KISAN AI Coming Soon')}>
              <View style={{flex: 1}}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <Text style={styles.bannerDesc}>{item.desc}</Text>
              </View>
              <View>
                <MaterialIcons name={item.icon1 as any} size={35} color="#5D4037" />
                <MaterialIcons name={item.icon2 as any} size={30} color="#5D4037" style={{marginLeft: 10}} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 6 GRID */}
        <View style={styles.grid}>
          {gridItems.map(item => (
            <TouchableOpacity key={item.id} style={[styles.gridCard, {backgroundColor: item.bg}]}>
              <View style={[styles.iconCircle, {backgroundColor: item.iconBg}]}>
                <MaterialIcons name={item.icon as any} size={26} color="white" />
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
        <TouchableOpacity style={styles.aiBtn} onPress={() => alert('KISAN AI Coming Soon')}>
          <MaterialCommunityIcons name="sprout" size={30} color="white" />
          <Text style={styles.aiText}>KISAN AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { position: 'absolute', width: '100%', height: '100%' },
  leaf: { position: 'absolute', top: 80, left: 0, width: 120, height: 120, opacity: 0.3 }, // TOP LEFT LEAF
  header: { padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 },
  logo: { fontSize: 30, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 11, color: '#C8E6C9', letterSpacing: 0.5 },
  
  bannerContainer: { paddingHorizontal: 15, marginTop: 10 },
  bannerCard: { width: width - 30, height: 110, borderRadius: 20, padding: 15, marginRight: 10, flexDirection: 'row', alignItems: 'center', elevation: 4 },
  bannerTitle: { fontSize: 17, fontWeight: 'bold', color: '#3E2723' },
  bannerDesc: { fontSize: 12, color: '#4E342E', marginTop: 5 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 15, paddingBottom: 100 },
  gridCard: { width: '31%', height: 115, borderRadius: 20, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12, elevation: 3 },
  iconCircle: { width: 45, height: 45, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridText: { fontSize: 11, fontWeight: '600', textAlign: 'center', color: '#212121' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 75, backgroundColor: '#E8F5E9', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 10 },
  navItem: { alignItems: 'center', flex: 1 },
  navText: { fontSize: 12, marginTop: 4, color: 'gray', fontWeight: '500' },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems: 'center', marginTop: -30, elevation: 8 },
  aiText: { fontSize: 9, fontWeight: 'bold', color: 'white', marginTop: 2 }
});
