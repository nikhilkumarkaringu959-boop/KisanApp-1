import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CropInfoScreen() {
  const data = {
    "Kharif Crops": {
      "🌾 Cereals & Millets": ["Rice", "Paddy", "Corn", "Jowar", "Bajra", "Ragi"],
      "🌱 Pulses": ["Tur", "Moong", "Urad"],
      "🌻 Oil Seeds": ["Soybean", "Groundnut", "Sunflower", "Sesame"],
      "🧶 Fiber & Cash": ["Cotton", "Jute", "Sugarcane"],
      "🥒 Vegetables": ["Ladyfinger", "Brinjal", "Chili", "Bitter Gourd"]
    },
    "Rabi Crops": {
      "🌾 Cereals": ["Wheat", "Barley", "Oats", "Maize"],
      "🌱 Pulses": ["Bengal Gram", "Green Peas", "Lentils", "Black Gram"],
      "🌻 Oil Seeds": ["Mustard", "Linseed", "Safflower"],
      "🥒 Vegetables": ["Potato", "Onion", "Tomato", "Cauliflower", "Cabbage", "Garlic"]
    },
    "Zaid Crops": {
      "🍉 Fruits & Veg": ["Watermelon", "Muskmelon", "Cucumber", "Bitter Gourd", "Pumpkin", "Bottle Gourd"],
      "🌱 Pulses": ["Moong Dal", "Cowpea"],
      "🌻 Oil Seeds": ["Groundnut", "Sunflower", "Sesame"]
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>📚 Crop Information</Text>
        <Text style={styles.bannerDesc}>Complete seasonal guide for Indian farming</Text>
      </View>

      {Object.entries(data).map(([season, categories]) => (
        <View key={season} style={styles.seasonCard}>
          <View style={styles.seasonHeader}>
            <Text style={styles.seasonTitle}>{season}</Text>
          </View>
          {Object.entries(categories).map(([cat, crops]) => (
            <View key={cat} style={styles.categoryBox}>
              <Text style={styles.category}>{cat}</Text>
              <View style={styles.cropsWrap}>
                {crops.map(crop => (
                  <View key={crop} style={styles.cropTag}>
                    <Text style={styles.cropText}>{crop}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  banner: { backgroundColor: '#FEF3C7', margin: 15, padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#FDE68A' },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#92400E' },
  bannerDesc: { fontSize: 14, color: '#B45309', marginTop: 5 },
  seasonCard: { backgroundColor: 'white', margin: 15, marginTop: 5, borderRadius: 15, elevation: 2, overflow: 'hidden' },
  seasonHeader: { backgroundColor: '#2d5016', padding: 15 },
  seasonTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  categoryBox: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  category: { fontSize: 13, fontWeight: 'bold', color: '#4B5563', textTransform: 'uppercase', marginBottom: 10 },
  cropsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cropTag: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  cropText: { fontSize: 14, fontWeight: '600', color: '#374151' },
});
