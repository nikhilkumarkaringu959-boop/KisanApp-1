import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function FertilizerScreen() {
  const { profile } = useProfile();
  const [crop, setCrop] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const acres = parseFloat(profile.landSize) || 1;
  const soil = profile.soilType || 'Black Soil';

  const calculate = () => {
    if (!crop) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        summary: `Optimal nutrients for ${acres} acres of ${crop} in ${soil}`,
        chemical: { Urea: `${(acres * 45).toFixed(1)} kg`, DAP: `${(acres * 20).toFixed(1)} kg`, MOP: `${(acres * 15).toFixed(1)} kg` },
        organic: { Vermicompost: `${(acres * 1.5).toFixed(1)} tons`, FYM: `${(acres * 2).toFixed(1)} tons`, NeemCake: `${(acres * 100).toFixed(0)} kg` },
        stages: [
          { name: "Basal Stage", chemical: "100% DAP, 50% MOP", organic: "FYM fully", tip: "Mix well before sowing" },
          { name: "Vegetative", chemical: "50% Urea", organic: "Jeevamrutham 200L/Acre", tip: "Apply with moisture" },
          { name: "Flowering", chemical: "50% Urea & 50% MOP", organic: "Panchagavya 3%", tip: "Avoid excess Nitrogen" }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.farmData}>
          <Text style={styles.farmIcon}>🚜</Text>
          <View>
            <Text style={styles.farmLabel}>FARM DATA</Text>
            <Text style={styles.farmValue}>{acres} Acres • {soil}</Text>
          </View>
        </View>

        <Text style={styles.label}>Crop Name</Text>
        <TextInput style={styles.input} placeholder="e.g. Paddy, Cotton" value={crop} onChangeText={setCrop} />

        <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={calculate} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Calculate Fertilizers</Text>}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryIcon}>💡</Text>
            <Text style={styles.summaryText}>{result.summary}</Text>
          </View>

          <Text style={styles.resultTitle}>🧪 Chemical (Total)</Text>
          <View style={styles.grid}>
            {Object.entries(result.chemical).map(([k, v]) => (
              <View key={k} style={styles.gridItem}>
                <Text style={styles.gridLabel}>{k}</Text>
                <Text style={styles.gridValue}>{v}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.resultTitle}>🌿 Organic (Total)</Text>
          <View style={styles.grid}>
            {Object.entries(result.organic).map(([k, v]) => (
              <View key={k} style={[styles.gridItem, styles.gridItemGreen]}>
                <Text style={styles.gridLabelGreen}>{k}</Text>
                <Text style={styles.gridValueGreen}>{v}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.stageTitle}>Stage-wise Guide</Text>
          {result.stages.map((s, i) => (
            <View key={i} style={styles.stageBox}>
              <Text style={styles.stageName}>{s.name}</Text>
              <Text style={styles.stageLine}><Text style={styles.bold}>Chemical:</Text> {s.chemical}</Text>
              <Text style={styles.stageLine}><Text style={styles.bold}>Organic:</Text> {s.organic}</Text>
              <View style={styles.tipBox}>
                <Text style={styles.tipText}>⚠️ {s.tip}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc' },
  card: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 2 },
  farmData: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#ECFDF5', padding: 15, borderRadius: 12, marginBottom: 20 },
  farmIcon: { fontSize: 24 },
  farmLabel: { fontSize: 10, fontWeight: 'bold', color: '#047857' },
  farmValue: { fontSize: 14, fontWeight: 'bold', color: '#065F46' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#4B5563', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#f9fafb', padding: 15, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 15 },
  btn: { backgroundColor: '#10B981', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#6EE7B7' },
  btnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  resultCard: { backgroundColor: 'white', margin: 15, padding: 20, borderRadius: 15, elevation: 3 },
  summaryBox: { flexDirection: 'row', gap: 10, backgroundColor: '#ECFDF5', padding: 15, borderRadius: 12, marginBottom: 20 },
  summaryIcon: { fontSize: 20 },
  summaryText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#065F46', lineHeight: 20 },
  resultTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginTop: 15, marginBottom: 10 },
  grid: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  gridItem: { flex: 1, backgroundColor: '#f9fafb', padding: 15, borderRadius: 10, alignItems: 'center' },
  gridItemGreen: { backgroundColor: '#ECFDF5' },
  gridLabel: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  gridValue: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginTop: 5 },
  gridLabelGreen: { fontSize: 11, fontWeight: 'bold', color: '#047857' },
  gridValueGreen: { fontSize: 18, fontWeight: 'bold', color: '#065F46', marginTop: 5 },
  stageTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginTop: 15, marginBottom: 10 },
  stageBox: { backgroundColor: '#f9fafb', padding: 15, borderRadius: 12, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#10B981' },
  stageName: { fontSize: 15, fontWeight: 'bold', color: '#047857', marginBottom: 8 },
  stageLine: { fontSize: 14, color: '#4B5563', marginBottom: 5 },
  bold: { fontWeight: 'bold' },
  tipBox: { backgroundColor: '#FFFBEB', padding: 10, borderRadius: 8, marginTop: 8 },
  tipText: { fontSize: 12, fontWeight: '600', color: '#92400E' },
});
