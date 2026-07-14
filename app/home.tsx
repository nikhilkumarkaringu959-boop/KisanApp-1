import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  const gridItems = [
    { id: 1, title: 'Crop\nInformation', icon: 'document-text', bg: '#FFE8D6', iconBg: '#FFCCBC' },
    { id: 2, title: 'Weather\nForecast', icon: 'sunny', bg: '#D6EFFF', iconBg: '#BBDEFB' },
    { id: 3, title: 'Fertilizer\nCalculator', icon: 'flask', bg: '#D6F5E3', iconBg: '#C8E6C9' },
    { id: 4, title: 'Smart Pest\nControl', icon: 'bug', bg: '#FFD6E8', iconBg: '#F8BBD0' },
    { id: 5, title: 'Smart Farming\nTips', icon: 'bulb', bg: '#FFF9D6', iconBg: '#FFF9C4' },
    { id: 6, title: 'Govt.\nSchemes', icon: 'business', bg: '#E8D6FF', iconBg: '#E1BEE7' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#2E7D32', '#1B5E20']} style={styles.bg} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>KISAN</Text>
            <Text style={styles.subtitle}>THE SMART FARMING ASSISTANT</Text>
          </View>
          <TouchableOpacity><Ionicons name="menu" size={28} color="white" /></TouchableOpacity>
        </View>

        {/* MARKET PRICES CARD - SCROLLABLE */}
        <TouchableOpacity style={styles.marketCard}>
          <View style={{flex: 1}}>
            <Text style={styles.marketTitle}>Market Prices</Text>
            <Text style={styles.marketDesc}>Check latest grain rates{'\n'}to go cont here.</Text>
          </View>
          <View>
            <Ionicons name="cart" size={40} color="#8D6E63" />
            <Ionicons name="pricetag" size={30} color="#8D6E63" style={{marginTop: -10}} />
          </View>
        </TouchableOpacity>

        {/* 6 GRID BUTTONS */}
        <View style={styles.grid}>
          {gridItems.map(item => (
            <TouchableOpacity key={item.id} style={[styles.gridCard, {backgroundColor: item.bg}]}>
              <View style={[styles.iconCircle, {backgroundColor: item.iconBg}]}>
                <Ionicons name={item.icon as any} size={24} color="#333" />
              </View>
              <Text style={styles.gridText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* KINDA SCROLL BAR - 3 BUTTONS */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#2E7D32" />
          <Text style={[styles.navText, {color: '#2E7D32'}]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiBtn} onPress={() => alert('KISAN AI Coming Soon')}>
          <Ionicons name="leaf" size={28} color="white" />
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
  header: { padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 12, color: '#C8E6C9' },

  // MARKET CARD
  marketCard: { backgroundColor: '#FFE0B2', margin: 15, padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center', elevation: 3 },
  marketTitle: { fontSize: 18, fontWeight: 'bold', color: '#4E342E' },
  marketDesc: { fontSize: 12, color: '#5D4037', marginTop: 5 },

  // GRID
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 15, paddingBottom: 100 },
  gridCard: { width: '31%', height: 110, borderRadius: 20, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12, elevation: 2 },
  iconCircle: { width: 45, height: 45, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridText: { fontSize: 11, fontWeight: 'bold', textAlign: 'center', color: '#333' },

  // BOTTOM NAV
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 10 },
  navItem: { alignItems: 'center', flex: 1 },
  navText: { fontSize: 12, marginTop: 4, color: 'gray' },
  aiBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems: 'center', marginTop: -25, elevation: 8 },
  aiText: { fontSize: 9, fontWeight: 'bold', color: 'white', marginTop: 2 }
});
