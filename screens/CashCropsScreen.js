import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const cashCrops = [
  { id: 'cotton', name: 'Cotton', icon: '🌱' },
  { id: 'chilli', name: 'Chilli', icon: '🌶️' },
  { id: 'sugarcane', name: 'Sugarcane', icon: '🎋' },
  { id: 'maize', name: 'Maize', icon: '🌽' },
];

export default function CashCropsScreen({ navigation }) {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState(null);

  const fetchSmartTips = async () => {
    if (!selectedCrop) return;
    setLoading(true);
    try {
      const res = await axios.post('https://your-backend.com/api/cash-crop-tips', { crop: selectedCrop.id });
      setTips(res.data);
    } catch (err) { console.log('Error:', err); }
    finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerText}>Cash Crop Tips</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Cash Crop:</Text>
        <View style={styles.grid}>
          {cashCrops.map((crop) => (
            <TouchableOpacity key={crop.id} style={[styles.cropCard, selectedCrop?.id === crop.id && styles.selectedCard]} onPress={() => setSelectedCrop(crop)}>
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={styles.cropName}>{crop.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.smartBtn,!selectedCrop && styles.disabledBtn]} onPress={fetchSmartTips} disabled={!selectedCrop || loading}>
          <MaterialCommunityIcons name="lightbulb-on" size={24} color="#fff" />
          <Text style={styles.smartBtnText}>Smart Farming Tips</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.loadingBox}>
            <MaterialCommunityIcons name="sprout" size={48} color="#F59E0B" />
            <Text style={styles.loadingText}>లాభదాయకమైన చిట్కాలను AI లెక్కిస్తోంది...</Text>
            <Text style={styles.loadingSub}>AI calculating profitable tips + Google Search</Text>
          </View>
        )}

        {tips &&!loading && (
          <View style={styles.resultsBox}>
            <Text style={styles.cropTitle}>{tips.crop_overview}</Text>
            {['smart_sowing_tips', 'water_and_nutrient_efficiency', 'yield_boosting_techniques', 'market_and_harvest_strategy'].map((key, idx) => (
              <View key={key} style={styles.tipCard}>
                <View style={styles.tipHeader}>
                  <MaterialCommunityIcons name={['seed', 'water', 'trending-up', 'store'][idx]} size={24} color="#10B981" />
                  <Text style={styles.tipTitle}>{['Smart Sowing', 'Water & Nutrients', 'Yield Boosting', 'Market Strategy'][idx]}</Text>
                </View>
                <Text style={styles.tipContent}>{tips[key]}</Text>
              </View>
            ))}
            <View style={styles.profitBox}>
              <MaterialCommunityIcons name="crown" size={32} color="#F59E0B" />
              <Text style={styles.profitTitle}>Profit Multiplier Tip</Text>
              <Text style={styles.profitText}>Use Topping Technique at 80-90 days for Cotton. Increases bolls by 30%.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F59E0B', padding: 16, paddingTop: 50 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  cropCard: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB' },
  selectedCard: { borderColor: '#F59E0B', backgroundColor: '#FFFBEB' },
  cropIcon: { fontSize: 48, marginBottom: 8 },
  cropName: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  smartBtn: { backgroundColor: '#10B981', borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, elevation: 4 },
  disabledBtn: { backgroundColor: '#9CA3AF' },
  smartBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loadingBox: { backgroundColor: '#fff', borderRadius: 16, padding: 40, alignItems: 'center', marginTop: 20 },
  loadingText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginTop: 16, textAlign: 'center' },
  loadingSub: { fontSize: 13, color: '#6B7280', marginTop: 8 },
  resultsBox: { marginTop: 20 },
  cropTitle: { fontSize: 16, color: '#374151', marginBottom: 20, lineHeight: 24 },
  tipCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16, elevation: 2 },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  tipTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  tipContent: { fontSize: 15, color: '#4B5563', lineHeight: 24 },
  profitBox: { backgroundColor: '#FFFBEB', borderRadius: 16, padding: 20, borderWidth: 2, borderColor: '#F59E0B', alignItems: 'center', marginTop: 8 },
  profitTitle: { fontSize: 20, fontWeight: 'bold', color: '#92400E', marginTop: 12, marginBottom: 8 },
  profitText: { fontSize: 16, color: '#78350F', textAlign: 'center', lineHeight: 24, fontWeight: '600' },
});
