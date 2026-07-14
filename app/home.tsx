import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  // Top Slider Data
  const sliderData = [
    { id: '1', title: 'Market Prices', desc: 'Check latest grain rates to go cont here.', icon: 'cart' },
    { id: '2', title: 'Crop Advisory', desc: 'Get expert advice for your crops.', icon: 'leaf' },
  ];

  // 6 Main Cards Data
  const menuItems = [
    { id: '1', title: 'Crop\nInformation', icon: 'clipboard-text', color: '#FFE8D6', iconBg: '#FFB07C', route: '/crop' },
    { id: '2', title: 'Weather\nForecast', icon: 'weather-sunny', color: '#D6E8FF', iconBg: '#7CB4FF', route: '/weather' },
    { id: '3', title: 'Fertilizer\nCalculator', icon: 'beaker', color: '#D6FFE8', iconBg: '#4CAF50', route: '/fertilizer' },
    { id: '4', title: 'Smart Pest\nControl', icon: 'bug', color: '#FFD6E8', iconBg: '#FF7CAE', route: '/pest' },
    { id: '5', title: 'Smart Farming\nTips', icon: 'lightbulb', color: '#FFF9D6', iconBg: '#FFD700', route: '/tips' },
    { id: '6', title: 'Govt.\nSchemes', icon: 'bank', color: '#E8D6FF', iconBg: '#A57CFF', route: '/schemes' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>KISAN</Text>
            <Text style={styles.subtitle}>THE SMART FARMING ASSISTANT</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
          {/* Background Leaves */}
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/628/628324.png'}} style={styles.leafImg} />
        </View>

        {/* TOP SLIDER */}
        <FlatList
          data={sliderData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingHorizontal: 20}}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.sliderCard}>
              <View style={{flex: 1}}>
                <Text style={styles.sliderTitle}>{item.title}</Text>
                <Text style={styles.sliderDesc}>{item.desc}</Text>
              </View>
              <View>
                <Ionicons name={item.icon as any} size={50} color="#8B5E3C" />
                <MaterialCommunityIcons name="tag" size={40} color="#8B5E3C" style={{marginTop: -15}} />
              </View>
            </TouchableOpacity>
          )}
        />

        {/* 6 CARDS GRID */}
        <View style={styles.grid}>
          {menuItems.map(item => (
            <TouchableOpacity key={item.id} style={[styles.card, {backgroundColor: item.color}]} onPress={() => router.push(item.route as any)}>
              <View style={[styles.iconCircle, {backgroundColor: item.iconBg}]}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color="white" />
              </View>
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#4CAF50" />
          <Text style={[styles.navText, {color: '#4CAF50'}]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.aiBtn} onPress={() => router.push('/chat')}>
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
  container: { flex: 1, backgroundColor: '#1A4D2E' },
  header: { padding: 20, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 12, color: '#A5D6A7' },
  leafImg: { position: 'absolute', width: 120, height: 120, left: 10, top: 80, opacity: 0.3, tintColor: '#A5D6A7' },
  
  sliderCard: { 
    width: width - 40, 
    backgroundColor: '#FFE0B2', 
    borderRadius: 20, 
    padding: 20, 
    flexDirection: 'row', 
    marginRight: 15,
    marginTop: 20
  },
  sliderTitle: { fontSize: 18, fontWeight: 'bold', color: '#4E342E' },
  sliderDesc: { fontSize: 12, color: '#5D4037', marginTop: 5 },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    padding: 20, 
    paddingBottom: 100 
  },
  card: { 
    width: '31%', 
    aspectRatio: 0.9, 
    borderRadius: 16, 
    padding: 10, 
    marginBottom: 15, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconCircle: { 
    width: 45, 
    height: 45, 
    borderRadius: 22, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  cardText: { 
    fontSize: 12, 
    fontWeight: '600', 
    textAlign: 'center', 
    color: '#333' 
  },

  bottomNav: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 70, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    elevation: 10 
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { 
    width: 65, 
    height: 65, 
    borderRadius: 32, 
    backgroundColor: '#4CAF50', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: -20, 
    elevation: 8 
  },
  aiText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});
