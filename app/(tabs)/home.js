import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Menu, ClipboardList, Sun, Calculator, Bug, Lightbulb, Building2, ShoppingCart, Tag, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState } from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

const { width } = Dimensions.get('window');

const features = [
  { id: 1, title: 'Crop\nInformation', icon: ClipboardList, screen: '/screens/CropInfo', bg: '#FDE68A', iconBg: '#F59E0B' },
  { id: 2, title: 'Weather\nFerecast', icon: Sun, screen: '/screens/Weather', bg: '#BFDBFE', iconBg: '#3B82F6' },
  { id: 3, title: 'Fertilizer\nCalculator', icon: Calculator, screen: '/screens/FertilizerCalc', bg: '#A7F3D0', iconBg: '#10B981' },
  { id: 4, title: 'Smart Pest\nControl', icon: Bug, screen: '/screens/PestControl', bg: '#FECACA', iconBg: '#EF4444' },
  { id: 5, title: 'Smart Farming\nTips', icon: Lightbulb, screen: '/screens/FarmingTips', bg: '#FEF08A', iconBg: '#EAB308' },
  { id: 6, title: 'Govt.\nSchemes', icon: Building2, screen: '/screens/GovtSchemes', bg: '#DDD6FE', iconBg: '#8B5CF6' },
];

const banners = [
  { id: 1, title: 'Market Prices', desc: 'Check latest grain rates\nto go cont here.' },
  { id: 2, title: 'Weather Alert', desc: 'Heavy rain expected\nin next 48 hours.' },
  { id: 3, title: 'Crop Advisory', desc: 'Best time to sow Paddy\nthis season.' },
];

export default function HomeScreen() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: nextIndex * (width - 40), animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    scrollRef.current?.scrollTo({ x: index * (width - 40), animated: true });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>KISAN</Text>
            <Text style={styles.tagline}>THE SMART FARMING ASSISTANT</Text>
          </View>
          <TouchableOpacity>
            <Menu color="#FFF" size={24} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* REALISTIC LEAF SVG - SCREENSHOT EXACT */}
        <View style={styles.leafContainer}>
          <Svg height="180" width="150" viewBox="0 0 150 180">
            {/* Leaf 1 - Left */}
            <Ellipse cx="40" cy="90" rx="25" ry="60" fill="#52B788" rotation="-15" origin="40,90" />
            <Path d="M40 30 L40 150" stroke="#2D6A4F" strokeWidth="2" />

            {/* Leaf 2 - Middle */}
            <Ellipse cx="75" cy="85" rx="28" ry="65" fill="#6BCB77" rotation="5" origin="75,85" />
            <Path d="M75 20 L75 150" stroke="#2D6A4F" strokeWidth="2" />

            {/* Leaf 3 - Right */}
            <Ellipse cx="110" cy="95" rx="25" ry="58" fill="#52B788" rotation="20" origin="110,95" />
            <Path d="M110 35 L110 155" stroke="#2D6A4F" strokeWidth="2" />
          </Svg>
        </View>

        {/* AUTO SLIDING BANNER */}
        <View style={styles.bannerWrapper}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => scrollToIndex(currentIndex === 0? banners.length - 1 : currentIndex - 1)}
          >
            <ChevronLeft color="#FFF" size={24} strokeWidth={3} />
          </TouchableOpacity>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.bannerScroll}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
              setCurrentIndex(index);
            }}
          >
            {banners.map((banner) => (
              <View key={banner.id} style={styles.marketCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.marketTitle}>{banner.title}</Text>
                  <Text style={styles.marketDesc}>{banner.desc}</Text>
                </View>
                <View style={styles.marketIcons}>
                  <ShoppingCart color="#7C2D12" size={32} strokeWidth={2} />
                  <View style={styles.tagContainer}>
                    <Tag color="#7C2D12" size={24} strokeWidth={2.5} fill="#FDBA74" />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => scrollToIndex((currentIndex + 1) % banners.length)}
          >
            <ChevronRight color="#FFF" size={24} strokeWidth={3} />
          </TouchableOpacity>
        </View>

        {/* 6 Feature Cards */}
        <View style={styles.grid}>
          {features.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(item.screen)}
              style={[styles.featureCard, { backgroundColor: item.bg }]}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                <item.icon color="#FFF" size={26} strokeWidth={2.5} />
              </View>
              <Text style={styles.featureText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1B4332' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20, paddingTop: 60, zIndex: 10 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#FFF', letterSpacing: 0.5 },
  tagline: { fontSize: 11, color: '#A7F3D0', letterSpacing: 1.5, marginTop: 2 },
  leafContainer: { position: 'absolute', top: 100, left: 20, zIndex: 1 },
  bannerWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 40, paddingHorizontal: 10, zIndex: 5 },
  arrowBtn: { padding: 8 },
  bannerScroll: { flex: 1 },
  marketCard: { width: width - 80, marginHorizontal: 10, backgroundColor: '#FDBA74', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  marketTitle: { fontSize: 20, fontWeight: 'bold', color: '#7C2D12', marginBottom: 6 },
  marketDesc: { fontSize: 13, color: '#7C2D12', lineHeight: 18 },
  marketIcons: { alignItems: 'center', marginLeft: 10 },
  tagContainer: { marginTop: 10, backgroundColor: 'rgba(124, 45, 18, 0.15)', borderRadius: 25, padding: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14, paddingTop: 25, paddingBottom: 20, gap: 12, justifyContent: 'space-between', zIndex: 5 },
  featureCard: { width: '31.5%', aspectRatio: 1, borderRadius: 20, padding: 14, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  iconCircle: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  featureText: { fontSize: 13, fontWeight: '700', color: '#1E293B', textAlign: 'center', lineHeight: 17 },
});
