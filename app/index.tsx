import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  
  const features = [
    { id: 1, title: 'Weather Forecast', icon: 'cloudy', color: '#4CAF50', route: '/weather' },
    { id: 2, title: 'Fertilizer Calculator', icon: 'flask', color: '#8BC34A', route: '/fertilizer' },
    { id: 3, title: 'Pest & Disease Control', icon: 'bug', color: '#FF9800', route: '/pest' },
    { id: 4, title: 'Crop Information', icon: 'leaf', color: '#4CAF50', route: '/crop' },
    { id: 5, title: 'Smart Farming Tips', icon: 'bulb', color: '#FFC107', route: '/tips' },
    { id: 6, title: 'Govt Schemes', icon: 'document-text', color: '#2196F3', route: '/schemes' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌾 KISAN - Smart Farmer</Text>
        <Text style={styles.headerSub}>Your Farming Assistant</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.grid}>
        {features.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.card, {borderLeftColor: item.color}]} onPress={() => router.push(item.route)}>
            <Ionicons name={item.icon} size={40} color={item.color} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="home" size={28} color="#4CAF50" /><Text>Home</Text></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person" size={28} color="gray" /><Text>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#2E7D32', padding: 20, paddingTop: 50 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: 'white', fontSize: 14, opacity: 0.8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderLeftWidth: 4, elevation: 3 },
  cardTitle: { fontSize: 14, fontWeight: '600', marginTop: 8 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#ddd' }
});
