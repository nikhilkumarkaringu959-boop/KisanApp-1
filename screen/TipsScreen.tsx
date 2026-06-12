import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function TipsScreen() {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState(null);

  const crops = [
    { name: 'Cotton', icon: '🦺' },
    { name: 'Chilli', icon: '🌶️' },
    { name: 'Sugarcane', icon: '🎋' },
    { name: 'Maize', icon: '🌽' }
  ];

  const getTips = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setTips({
        overview: `Maximize ${selected} profits with precision farming`,
        sowing: "Use HDPS with 90x30 cm spacing. Treat seeds with Imidacloprid",
        water: "Drip irrigation mandatory. Stop watering 15 days before harvest",
        yield: selected === 'Cotton' ? "Topping at 80-90 days for more bolls" : "Apply growth regulators at flowering",
        profit: "Hold grade A produce for 2 months. Expected 15% price rise"
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Select High-Yield Cash Crop</Text>
        <View style={styles.grid}>
          {crops.map(c => (
            <TouchableOpacity key={c.name} style={[styles.cropBtn, selected === c.name && styles.cropActive]} onPress={() => {setSelected(c.name); setTips(null)}}>
              <Text style={styles.cropIcon}>{c.icon}</Text>
              <Text style={[styles.cropName, selected === c.name && styles.cropNameActive]}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.getBtn, !selected && styles.getBtnDisabled]} onPress={getTips} disabled={!selected || loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.getBtnText}>Get Smart Farming Tips</Text>}
        </TouchableOpacity>
      </View>

      {tips && (
        <View style={styles.tipsCard}>
          <View style={styles.tipItem}>
            <View style={[styles.tipBar, {backgroundColor: '#3B82F6'}]} />
            <View style={styles.flex1}>
              <Text style={styles.tipTitle}>🌱 Smart Sowing</Text>
              <Text style={styles.tipText}>{tips.sowing}</Text>
            </View>
          </View>

          <View style={styles.tipItem}>
            <View style={[styles.tipBar, {backgroundColor: '#06B6D4'}]} />
            <View style={styles.flex1}>
              <Text style={styles.tipTitle}>💧 Water Management</Text>
              <Text style={styles.tipText}>{tips.water}</Text>
            </View>
          </View>

          <View style={styles.tipItem}>
            <View style={[styles.tipBar, {backgroundColor: '#8B5CF6'}]} />
            <View style={styles.flex1}>
              <Text style={styles.tipTitle}>🚀 Yield Boosting</Text>
              <Text style={styles.tipTextPurple}>{tips.yield}</Text>
            </View>
          </View>

          <View style={styles.profitBox}>
            <Text style={styles.profitTitle}>🏆 Profit Multiplier Tip</Text>
            <Text style={styles.profitText}>{tips.profit}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  card: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  cropBtn: { width: '48%', backgroundColor: '#f9fafb', padding: 20, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#e5e7eb' },
  cropActive: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
  cropIcon: { fontSize: 32, marginBottom: 8 },
  cropName: { fontSize: 12, fontWeight: 'bold', color: '#6B7280' },
  cropNameActive: { color: '#92400E' },
  getBtn: { backgroundColor: '#F59E0B', padding: 18, borderRadius: 12, alignItems: 'center' },
  getBtnDisabled: { backgroundColor: '#D1D5DB' },
  getBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  tipsCard: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 2 },
  tipItem: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  tipBar: { width: 4, borderRadius: 2 },
  flex1: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: '#1F2937', marginBottom: 6 },
  tipText: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  tipTextPurple: { fontSize: 14, color: '#5B21B6', fontWeight: '600', backgroundColor: '#F3E8FF', padding: 12, borderRadius: 8 },
  profitBox: { backgroundColor: '#FEF3C7', padding: 20, borderRadius: 15, borderWidth: 2, borderColor: '#FCD34D', marginTop: 10 },
  profitTitle: { fontSize: 16, fontWeight: 'bold', color: '#78350F', marginBottom: 8 },
  profitText: { fontSize: 14, color: '#92400E', fontWeight: '600', lineHeight: 20 },
});
