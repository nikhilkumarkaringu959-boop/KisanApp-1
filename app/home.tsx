import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const gridItems = [
    { id: 1, title: 'Crop\nInformation', icon: 'clipboard-text', bg: '#FDE4CF', iconBg: '#F4A261', route: '/crop' },
    { id: 2, title: 'Weather\nFerecast', icon: 'weather-sunny', bg: '#DDE9FF', iconBg: '#64B5F6', route: '/weather' },
    { id: 3, title: 'Fertilizer\nCalculator', icon: 'cup-water', bg: '#D8F3DC', iconBg: '#66BB6A', route: '/fertilizer' },
    { id: 4, title: 'Smart Pest\nControl', icon: 'bug', bg: '#FFD6E8', iconBg: '#F06292', route: '/pest' },
    { id: 5, title: 'Smart Farming\nTips', icon: 'lightbulb', bg: '#FFF3BF', iconBg: '#FFCA28', route: '/smarttips' },
    { id: 6, title: 'Govt.\nSchemes', icon: 'bank', bg: '#E8D5FF', iconBg: '#AB47BC', route: '/schemes' },
  ];

  return (
    <LinearGradient colors={['#3A7D44', '#1E4D2B']} style={styles.container}>
      
      {/* LEAVES - EXACT POSITION */}
      <View style={styles.leafWrap}>
        <Text style={styles.leafA}>🌿</Text>
        <Text style={styles.leafB}>🍃</Text>
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>KISAN</Text>
          <Text style={styles.subTitle}>THE SMART FARMING ASSISTANT</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="format-list-bulleted" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNER - EXACT ORANGE CARD */}
        <TouchableOpacity style={styles.banner} onPress={() => router.push('/market')}>
          <View style={{flex: 1}}>
            <Text style={styles.bannerTitle}>Market Prices</Text>
            <Text style={styles.bannerDesc}>Check latest grain rates{'\n'}to go cont here.</Text>
          </View>
          <View style={styles.bannerIcons}>
            <MaterialCommunityIcons name="cart" size={35} color="#A1887F" />
            <MaterialCommunityIcons name="tag-outline" size={35} color="#A1887F" />
          </View>
        </TouchableOpacity>

        {/* GRID - 3 COLUMNS EXACT */}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  leafWrap: { position: 'absolute', top: 90, left: 5 },
  leafA: { fontSize: 90, opacity: 0.25, transform: [{rotate: '-15deg'}] },
  leafB: { fontSize: 70, opacity: 0.18, marginTop: -30, marginLeft: 40, transform: [{rotate: '25deg'}] },
  
  header: { paddingHorizontal: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 30, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  subTitle: { fontSize: 10, color: '#C8E6C9', marginTop: 2 },

  banner: { backgroundColor: '#FDE4CF', marginHorizontal: 20, marginTop: 25, padding: 18, borderRadius: 18, flexDirection: 'row', alignItems: 'center' },
  bannerTitle: { fontSize: 17, fontWeight: 'bold', color: '#5D4037' },
  bannerDesc: { fontSize: 11, color: '#795548', marginTop: 4, lineHeight: 16 },
  bannerIcons: { alignItems: 'center' },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10 },
  gridCard: { width: '31.5%', paddingVertical: 14, paddingHorizontal: 5, borderRadius: 16, marginBottom: 14, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridText: { fontSize: 10.5, fontWeight: '700', color: '#2E2E2E', textAlign: 'center', lineHeight: 14 },
});
