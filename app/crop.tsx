import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../i18n'; // i18n import

export default function CropScreen() {
  const router = useRouter();

  const cropData = {
    Kharif: {
      "🌾 CEREALS & MILLETS": ["Rice", "Paddy", "Corn", "Jowar", "Bajra", "Ragi"],
      "🌱 PULSES": ["Tur", "Moong", "Urad"],
      "🌻 OIL SEEDS": ["Soybean", "Groundnut", "Sunflower", "Sesame"],
      "🧶 FIBER & CASH CROPS": ["Cotton", "Jute", "Sugarcane"],
      "🥒 VEGETABLES & SPICES": ["Ladyfinger", "Brinjal", "Chili", "Bitter Gourd"]
    },
    Rabi: {
      "🌾 CEREALS": ["Wheat", "Barley", "Oats", "Maize/Rabi Corn"],
      "🌱 PULSES": ["Bengal Gram", "Green Peas", "Lentils", "Black Gram/Urad"],
      "🌻 OIL SEEDS": ["Mustard", "Linseed/Flaxseed", "Safflower"],
      "🧶 CASH CROPS": ["Sugarcane"],
      "🥒 VEGETABLES & SPICES": ["Potato", "Onion", "Tomato", "Cauliflower", "Cabbage", "Garlic", "Coriander"]
    },
    Zaid: {
      "🌾 CEREALS": ["Summer Paddy", "Summer Maize"],
      "🌱 PULSES": ["Moong Dal/Green Gram", "Cowpea/Babbar"],
      "🌻 OIL SEEDS": ["Groundnut", "Sunflower", "Sesame"],
      "🍉 FRUITS & VEGETABLES": ["Watermelon", "Muskmelon", "Cucumber", "Bitter Gourd", "Pumpkin", "Bottle Gourd", "Ridge Gourd"]
    }
  };

  const seasonNames: any = {
    Kharif: i18n.t('kharifCrops'),
    Rabi: i18n.t('rabiCrops'),
    Zaid: i18n.t('zaidCrops'),
  }

  const renderSeason = (seasonName: string, categories: any) => (
    <View style={styles.seasonCard} key={seasonName}>
      <View style={styles.seasonHeader}>
        <Text style={styles.seasonTitle}>{seasonNames[seasonName]}</Text>
      </View>
      {Object.keys(categories).map(category => (
        <View key={category} style={styles.categoryBlock}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.chipContainer}>
            {categories[category].map((crop: string) => (
              <TouchableOpacity key={crop} style={styles.cropChip} onPress={() => Alert.alert(crop, `${crop} ${i18n.t('comingSoon')}`)}>
                <Text style={styles.cropChipText}>{crop}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="leaf" size={24} color="white" />
          <View style={{marginLeft: 10}}>
            <Text style={styles.headerTitle}>{i18n.t('appName')}</Text>
            <Text style={styles.headerSub}>{i18n.t('subTitle')}</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </View>

      <ScrollView>
        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="book" size={20} color="#D84315" />
            <Text style={styles.infoTitle}> {i18n.t('cropInfo')}</Text>
          </View>
          <Text style={styles.infoDesc}>{i18n.t('cropInfoDesc')}</Text>
        </View>

        {/* 3 SEASONS */}
        {renderSeason('Kharif', cropData.Kharif)}
        {renderSeason('Rabi', cropData.Rabi)}
        {renderSeason('Zaid', cropData.Zaid)}

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
          <Text>🏠</Text>
          <Text style={styles.navText}>{i18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn} onPress={() => router.push('/chat')}>
          <Ionicons name="leaf" size={28} color="white" />
          <Text style={styles.aiText}>{i18n.t('appName')} AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Text>👤</Text>
          <Text style={styles.navText}>{i18n.t('profile')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#2E7D32', padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', fontStyle: 'italic' },
  headerSub: { fontSize: 10, color: '#A5D6A7' },
  infoCard: { backgroundColor: '#FFE8D6', margin: 15, padding: 15, borderRadius: 12 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#D84315' },
  infoDesc: { fontSize: 12, color: '#BF360C', marginTop: 5 },
  seasonCard: { backgroundColor: 'white', marginHorizontal: 15, marginBottom: 15, borderRadius: 12, overflow: 'hidden', elevation: 2 },
  seasonHeader: { backgroundColor: '#2E7D32', padding: 12 },
  seasonTitle: { fontSize: 16, fontWeight: 'bold', color: 'white', fontStyle: 'italic' },
  categoryBlock: { padding: 12 },
  categoryTitle: { fontSize: 13, fontWeight: 'bold', color: '#555', marginBottom: 8, letterSpacing: 0.5 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  cropChip: { backgroundColor: '#F1F8E9', borderWidth: 1, borderColor: '#C8E6C9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, margin: 4 },
  cropChipText: { fontSize: 13, color: '#2E7D32', fontWeight: '500' },
  bottomNav: { height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 },
  aiText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});
