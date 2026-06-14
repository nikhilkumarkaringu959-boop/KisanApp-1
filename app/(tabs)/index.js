import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Cloud, TrendingUp, Sprout, FlaskConical, Bug, Lightbulb, Award, ChevronRight, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const menuCards = [
  { 
    id: 1, 
    title: 'Market Prices', 
    subtitle: 'Live mandi rates', 
    icon: TrendingUp, 
    color: '#10B981',
    route: '/market'
  },
  { 
    id: 2, 
    title: 'Crop Info', 
    subtitle: 'Seasonal guide', 
    icon: Sprout, 
    color: '#22C55E',
    route: '/crop-info'
  },
  { 
    id: 3, 
    title: 'Weather Forecast', 
    subtitle: '7-day updates', 
    icon: Cloud, 
    color: '#3B82F6',
    route: '/weather'
  },
  { 
    id: 4, 
    title: 'Fertilizer Advice', 
    subtitle: 'NPK recommendations', 
    icon: FlaskConical, 
    color: '#F59E0B',
    route: '/fertilizer'
  },
  { 
    id: 5, 
    title: 'Pest Control', 
    subtitle: 'Disease detection', 
    icon: Bug, 
    color: '#EF4444',
    route: '/pest-control'
  },
  { 
    id: 6, 
    title: 'Farming Tips', 
    subtitle: 'Expert advice', 
    icon: Lightbulb, 
    color: '#8B5CF6',
    route: '/tips'
  },
  { 
    id: 7, 
    title: 'Govt Schemes', 
    subtitle: 'Rythu Bharosa', 
    icon: Award, 
    color: '#EC4899',
    route: '/schemes'
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Namaste, Ramesh! 👋</Text>
          <Text style={styles.subGreeting}>Warangal, Telangana</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
            style={styles.avatar} 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.aiCard} 
        onPress={() => router.push('/kisan-ai')}
      >
        <View style={styles.aiIcon}>
          <Sparkles color="#FFF" size={28} />
        </View>
        <View style={styles.aiTextBox}>
          <Text style={styles.aiTitle}>Ask KISAN AI</Text>
          <Text style={styles.aiSubtitle}>Groq AI + Internet Live • Ask anything</Text>
        </View>
        <ChevronRight color="#FFF" size={24} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Quick Services</Text>
        
        <View style={styles.grid}>
          {menuCards.map((card) => (
            <TouchableOpacity 
              key={card.id} 
              style={styles.card}
              onPress={() => router.push(card.route)}
            >
              <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                <card.icon color={card.color} size={28} strokeWidth={2.5} />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>⚠️ Weather Alert</Text>
          <Text style={styles.alertText}>
            Heavy rain expected next 48 hours in Warangal. Drainage check chey mowa.
          </Text>
          <TouchableOpacity onPress={() => router.push('/weather')}>
            <Text style={styles.alertLink}>View Details →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Today's Tip</Text>
          <Text style={styles.tipText}>
            Paddy lo 25-30 days tarvata urea top dressing chey. 1 acre ki 40kg saripotundi.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { 
    backgroundColor: '#1B4332', 
    padding: 20, 
    paddingTop: 60, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  subGreeting: { fontSize: 14, color: '#D8F3DC', marginTop: 4 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#D8F3DC' },
  aiCard: { 
    backgroundColor: '#2D6A4F', 
    margin: 16, 
    padding: 20, 
    borderRadius: 16, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  aiIcon: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#1B4332', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  aiTextBox: { flex: 1, marginLeft: 16 },
  aiTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  aiSubtitle: { fontSize: 13, color: '#D8F3DC', marginTop: 2 },
  scrollView: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginHorizontal: 16, marginBottom: 12 },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  card: { 
    width: '47%', 
    backgroundColor: '#FFF', 
    margin: 8, 
    padding: 16, 
    borderRadius: 16, 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  cardIcon: { 
    width: 56, 
    height: 56, 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 12
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: '#64748B' },
  alertCard: { 
    backgroundColor: '#FEF3C7', 
    margin: 16, 
    padding: 16, 
    borderRadius: 12, 
    borderLeftWidth: 4, 
    borderLeftColor: '#F59E0B' 
  },
  alertTitle: { fontSize: 15, fontWeight: 'bold', color: '#92400E', marginBottom: 6 },
  alertText: { fontSize: 14, color: '#78350F', lineHeight: 20 },
  alertLink: { fontSize: 14, color: '#D97706', fontWeight: '600', marginTop: 8 },
  tipCard: { 
    backgroundColor: '#DBEAFE', 
    margin: 16, 
    marginTop: 0,
    padding: 16, 
    borderRadius: 12, 
    borderLeftWidth: 4, 
    borderLeftColor: '#3B82F6',
    marginBottom: 32
  },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E40AF', marginBottom: 6 },
  tipText: { fontSize: 14, color: '#1E3A8A', lineHeight: 20 },
});
