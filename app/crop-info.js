// app/crop-info.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CropInfo() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Information</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* KHARIF CROPS */}
        <View style={styles.seasonCard}>
          <Text style={styles.seasonTitle}>Kharif Crops</Text>
          
          <Text style={styles.category}>🌾 Cereals & Millets</Text>
          <Text style={styles.cropItem}>Rice</Text>
          <Text style={styles.cropItem}>Paddy</Text>
          <Text style={styles.cropItem}>Corn</Text>
          <Text style={styles.cropItem}>Jowar</Text>
          <Text style={styles.cropItem}>Bajra</Text>
          <Text style={styles.cropItem}>Ragi</Text>

          <Text style={styles.category}>🌱 Pulses</Text>
          <Text style={styles.cropItem}>Tur</Text>
          <Text style={styles.cropItem}>Moong</Text>
          <Text style={styles.cropItem}>Urad</Text>

          <Text style={styles.category}>🌻 Oil Seeds</Text>
          <Text style={styles.cropItem}>Soybean</Text>
          <Text style={styles.cropItem}>Groundnut</Text>
          <Text style={styles.cropItem}>Sunflower</Text>
          <Text style={styles.cropItem}>Sesame</Text>

          <Text style={styles.category}>🧶 Fiber & Cash Crops</Text>
          <Text style={styles.cropItem}>Cotton</Text>
          <Text style={styles.cropItem}>Jute</Text>
          <Text style={styles.cropItem}>Sugarcane</Text>

          <Text style={styles.category}>🥒 Vegetables & Spices</Text>
          <Text style={styles.cropItem}>Ladyfinger</Text>
          <Text style={styles.cropItem}>Brinjal</Text>
          <Text style={styles.cropItem}>Chili</Text>
          <Text style={styles.cropItem}>Bitter Gourd</Text>
        </View>

        {/* RABI CROPS */}
        <View style={styles.seasonCard}>
          <Text style={styles.seasonTitle}>Rabi Crops</Text>
          
          <Text style={styles.category}>🌾 Cereals</Text>
          <Text style={styles.cropItem}>Wheat</Text>
          <Text style={styles.cropItem}>Barley</Text>
          <Text style={styles.cropItem}>Oats</Text>
          <Text style={styles.cropItem}>Maize/Rabi Corn</Text>

          <Text style={styles.category}>🌱 Pulses</Text>
          <Text style={styles.cropItem}>Bengal Gram</Text>
          <Text style={styles.cropItem}>Green Peas</Text>
          <Text style={styles.cropItem}>Lentils</Text>
          <Text style={styles.cropItem}>Black Gram/Urad</Text>

          <Text style={styles.category}>🌻 Oil Seeds</Text>
          <Text style={styles.cropItem}>Mustard</Text>
          <Text style={styles.cropItem}>Linseed/Flaxseed</Text>
          <Text style={styles.cropItem}>Safflower</Text>

          <Text style={styles.category}>🧶 Cash Crops</Text>
          <Text style={styles.cropItem}>Sugarcane</Text>

          <Text style={styles.category}>🥒 Vegetables & Spices</Text>
          <Text style={styles.cropItem}>Potato</Text>
          <Text style={styles.cropItem}>Onion</Text>
          <Text style={styles.cropItem}>Tomato</Text>
          <Text style={styles.cropItem}>Cauliflower</Text>
          <Text style={styles.cropItem}>Cabbage</Text>
          <Text style={styles.cropItem}>Garlic</Text>
          <Text style={styles.cropItem}>Coriander</Text>
        </View>

        {/* ZAID CROPS */}
        <View style={[styles.seasonCard, { marginBottom: 40 }]}>
          <Text style={styles.seasonTitle}>Zaid Crops</Text>
          
          <Text style={styles.category}>🌾 Cereals</Text>
          <Text style={styles.cropItem}>Summer Paddy</Text>
          <Text style={styles.cropItem}>Summer Maize</Text>

          <Text style={styles.category}>🌱 Pulses</Text>
          <Text style={styles.cropItem}>Moong Dal/Green Gram</Text>
          <Text style={styles.cropItem}>Cowpea/Babbar</Text>

          <Text style={styles.category}>🌻 Oil Seeds</Text>
          <Text style={styles.cropItem}>Groundnut</Text>
          <Text style={styles.cropItem}>Sunflower</Text>
          <Text style={styles.cropItem}>Sesame</Text>

          <Text style={styles.category}>🍉 Fruits & Vegetables</Text>
          <Text style={styles.cropItem}>Watermelon</Text>
          <Text style={styles.cropItem}>Muskmelon</Text>
          <Text style={styles.cropItem}>Cucumber</Text>
          <Text style={styles.cropItem}>Bitter Gourd</Text>
          <Text style={styles.cropItem}>Pumpkin</Text>
          <Text style={styles.cropItem}>Bottle Gourd</Text>
          <Text style={styles.cropItem}>Ridge Gourd</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    backgroundColor: '#1B4332',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF'
  },
  scrollView: {
    flex: 1
  },
  seasonCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }
  },
  seasonTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B4332',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#22C55E'
  },
  category: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 10
  },
  cropItem: {
    fontSize: 15,
    color: '#475569',
    paddingVertical: 8,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E2E8F0',
    marginBottom: 4
  },
});
