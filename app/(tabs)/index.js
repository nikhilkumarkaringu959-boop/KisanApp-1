// app/(tabs)/index.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Menu, ShoppingCart, ClipboardList, CloudSun, FlaskConical, Bug, Lightbulb, Landmark } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const cards = [
  { 
    id: 1, 
    title: 'Crop\nInformation', 
    icon: ClipboardList, 
    bg: '#FEF3C7',
    iconBg: '#F59E0B',
    route: '/crop-info' 
  },
  { 
    id: 2, 
    title: 'Weather\nForecast', 
    icon: CloudSun, 
    bg: '#DBEAFE',
    iconBg: '#3B82F6',
    route: '/weather' 
  },
  { 
    id: 3, 
    title: 'Fertilizer\nCalculator', 
    icon: FlaskConical, 
    bg: '#D1FAE5',
    iconBg: '#10B981',
    route: '/fertilizer' 
  },
  { 
    id: 4, 
    title: 'Smart Pest\nControl', 
    icon: Bug, 
    bg: '#FEE2E2',
    iconBg: '#EF4444',
    route: '/pest-control' 
  },
  { 
    id: 5, 
    title: 'Smart Farming\nTips', 
    icon: Lightbulb, 
    bg: '#FEF9C3',
    iconBg: '#EAB308',
    route: '/tips' 
  },
  { 
    id: 6, 
    title: 'Govt.\nSchemes', 
    icon: Landmark, 
    bg: '#E9D5FF',
    iconBg: '#A855F7',
    route: '/schemes' 
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>KISAN</Text>
          <Text style={styles.headerSub}>THE SMART FARMING ASSISTANT</Text>
        </View>
        <TouchableOpacity>
          <Menu color="#FFF" size={26} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Leaf Background Decoration */}
        <View style={styles.leafBg}>
          <View style={[styles.leaf, { transform: [{ rotate: '20deg' }] }]} />
          <View style={[styles.leaf2, { transform: [{ rotate: '-15deg' }] }]} />
        </View>

        {/* Market Prices Card */}
        <TouchableOpacity 
          style={styles.marketCard} 
          onPress={() => router.push('/market')}
          activeOpacity={0.9}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.marketTitle}>Market Prices</Text>
            <Text style={styles.marketSub}>Check latest grain rates to go cont here.</Text>
          </View>
          <View style={styles.marketIconBox}>
            <ShoppingCart color="#92400E" size={36} strokeWidth={2} />
            <View style={styles.tagIcon}>
              <Text style={styles.tagText}>%</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* 6 Cards Grid */}
        <View style={styles.grid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, { backgroundColor: card.bg }]}
              onPress={() => router.push(card.route)}
              activeOpacity={0.85}
            >
              <View style={[styles.iconBox, { backgroundColor: '#FFF' }]}>
                <card.icon color={card.iconBg} size={26} strokeWidth={2.5} />
              </View>
              <Text style={styles.cardText}>{card.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1B4332' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: { 
    fontSize: 34, 
    fontWeight: '900', 
    color: '#FFF', 
    letterSpacing: 1.5 
  },
  headerSub: { 
    fontSize: 11, 
    color: '#86EFAC', 
    marginTop: 3, 
    letterSpacing: 1,
    fontWeight: '600'
  },
  scrollView: { flex: 1 },
  leafBg: { 
    position: 'absolute', 
    top: -20, 
    left: 10, 
    opacity: 0.12 
  },
  leaf: {
    width: 140,
    height: 140,
    backgroundColor: '#22C55E',
    borderRadius: 70,
    position: 'absolute',
  },
  leaf2: {
    width: 100,
    height: 100,
    backgroundColor: '#22C55E',
    borderRadius: 50,
    position: 'absolute',
    top: 60,
    left: 80,
  },
  marketCard: {
    backgroundColor: '#FED7AA',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    padding: 22,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }
  },
  marketTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#92400E',
    marginBottom: 4
  },
  marketSub: { 
    fontSize: 13, 
    color: '#92400E', 
    opacity: 0.85,
    lineHeight: 18
  },
  marketIconBox: {
    position: 'relative',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagIcon: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FED7AA'
  },
  tagText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 14,
    justifyContent: 'space-between'
  },
  card: {
    width: (width - 46) / 3, 
    aspectRatio: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  cardText: { 
    fontSize: 12.5, 
    fontWeight: '700', 
    color: '#1E293B', 
    lineHeight: 17 
  },
});
