import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cropData = {
  Kharif: {
    'Cereals & Millets': ['Paddy/Rice', 'Corn', 'Jowar', 'Bajra', 'Ragi'],
    'Pulses': ['Tur', 'Moong', 'Urad'],
    'Oil Seeds': ['Soybean', 'Groundnut', 'Sunflower', 'Sesame'],
    'Fiber & Cash Crops': ['Cotton', 'Jute', 'Sugarcane'],
    'Vegetables & Spices': ['Ladyfinger', 'Brinjal', 'Chili', 'Bitter Gourd']
  },
  Rabi: {
    'Cereals': ['Wheat', 'Barley', 'Oats', 'Maize/Rabi Corn'],
    'Pulses': ['Bengal Gram', 'Green Peas', 'Lentils', 'Black Gram/Urad'],
    'Oil Seeds': ['Mustard', 'Linseed/Flaxseed', 'Safflower'],
    'Cash Crops': ['Sugarcane'],
    'Vegetables & Spices': ['Potato', 'Onion', 'Tomato', 'Cauliflower', 'Cabbage', 'Garlic', 'Coriander']
  },
  Zaid: {
    'Cereals': ['Summer Paddy', 'Summer Maize'],
    'Pulses': ['Moong Dal/Green Gram', 'Cowpea/Babbar'],
    'Oil Seeds': ['Groundnut', 'Sunflower', 'Sesame'],
    'Fruits & Vegetables': ['Watermelon', 'Muskmelon', 'Cucumber', 'Bitter Gourd', 'Pumpkin', 'Bottle Gourd', 'Ridge Gourd']
  }
};

export default function CropInfoScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Kharif');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Crop Information</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabs}>
        {['Kharif', 'Rabi', 'Zaid'].map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab} Crops</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {Object.entries(cropData[activeTab]).map(([category, crops]) => (
          <View key={category} style={styles.section}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>
            </View>
            {crops.map((crop, idx) => (
              <TouchableOpacity key={idx} style={styles.cropRow}>
                <Text style={styles.cropText}>{crop}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16A34A', padding: 16, paddingTop: 50 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#16A34A' },
  tabText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  activeTabText: { color: '#16A34A' },
  content: { flex: 1 },
  section: { marginTop: 12, backgroundColor: '#fff' },
  categoryHeader: { backgroundColor: '#F0FDF4', padding: 12 },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#166534' },
  cropRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  cropText: { fontSize: 15, color: '#1F2937' }
});
