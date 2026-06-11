import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function FertilizerScreen({ navigation }) {
  const [crop, setCrop] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Sample calculation - replace with AI/Google API call
  const calculateFertilizer = async () => {
    if (!crop) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        crop_summary: `${crop} requires balanced NPK. High nitrogen in vegetative, phosphorus in flowering.`,
        chemical_calculator: { Urea: '2 bags (100kg)', DAP: '1 bag (50kg)', MOP: '1 bag (50kg)' },
        organic_calculator: { Vermicompost: '500 kg', 'Farmyard Manure': '2 tons', 'Neem Cake': '50 kg' },
        situation_guide: [
          { stage_name: 'Basal (బేసల్)', chemical_dosage: 'DAP: 25kg + MOP: 25kg', organic_dosage: 'FYM: 1 ton + Neem Cake: 25kg', application_tip: 'Apply before sowing when soil has moisture.' },
          { stage_name: 'Vegetative (పెరుగుదల)', chemical_dosage: 'Urea: 50kg', organic_dosage: 'Jeevamrutham: 200L/acre', application_tip: 'Apply 20-25 days after sowing. Split dose.' },
          { stage_name: 'Flowering (పూత)', chemical_dosage: 'Urea: 25kg + MOP: 25kg', organic_dosage: 'Vermiwash: 10L spray', application_tip: 'Avoid excess nitrogen. Apply at evening.' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Smart Fertilizer AI</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.contextHeader}>
            <MaterialCommunityIcons name="sprout" size={20} color="#8B5CF6" />
            <Text style={styles.contextTitle}>Farm Context</Text>
          </View>
          
          <View style={styles.contextRow}>
            <View style={styles.contextBox}>
              <Text style={styles.contextLabel}>LAND SIZE</Text>
              <Text style={styles.contextValue}>2.5 Acres</Text>
            </View>
            <View style={styles.contextBox}>
              <Text style={styles.contextLabel}>SOIL TYPE</Text>
              <Text style={styles.contextValue}>Red Soil</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>What crop are you planning?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Paddy, Cotton, Chilli..."
            value={crop}
            onChangeText={setCrop}
          />

          <TouchableOpacity style={styles.calcBtn} onPress={calculateFertilizer} disabled={loading}>
            {loading? <ActivityIndicator color="#fff" /> : <Text style={styles.calcBtnText}>Calculate Formula</Text>}
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 {crop} - Fertilizer Plan</Text>
            <Text style={styles.summary}>{result.crop_summary}</Text>

            <View style={styles.calcSection}>
              <Text style={styles.calcTitle}>Chemical Calculator</Text>
              {Object.entries(result.chemical_calculator).map(([k, v]) => (
                <Text key={k} style={styles.calcItem}>• {k}: {v}</Text>
              ))}
            </View>

            <View style={styles.calcSection}>
              <Text style={styles.calcTitle}>Organic Calculator</Text>
              {Object.entries(result.organic_calculator).map(([k, v]) => (
                <Text key={k} style={styles.calcItem}>• {k}: {v}</Text>
              ))}
            </View>

            {result.situation_guide.map((stage, idx) => (
              <View key={idx} style={styles.stageCard}>
                <Text style={styles.stageName}>{stage.stage_name}</Text>
                <Text style={styles.stageText}>Chemical: {stage.chemical_dosage}</Text>
                <Text style={styles.stageText}>Organic: {stage.organic_dosage}</Text>
                <Text style={styles.stageTip}>💡 {stage.application_tip}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#8B5CF6', padding: 16, paddingTop: 50 },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 2 },
  contextHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  contextTitle: { fontSize: 16, fontWeight: 'bold', color: '#8B5CF6' },
  contextRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  contextBox: { flex: 1, backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 },
  contextLabel: { fontSize: 11, color: '#8B5CF6', fontWeight: 'bold' },
  contextValue: { fontSize: 16, color: '#1F2937', fontWeight: '600', marginTop: 4 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 15 },
  calcBtn: { backgroundColor: '#8B5CF6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  calcBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 16, elevation: 2 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  summary: { fontSize: 14, color: '#6B7280', marginBottom: 16, lineHeight: 20 },
  calcSection: { marginBottom: 16 },
  calcTitle: { fontSize: 15, fontWeight: 'bold', color: '#8B5CF6', marginBottom: 8 },
  calcItem: { fontSize: 14, color: '#374151', marginBottom: 4 },
  stageCard: { backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8, marginBottom: 12 },
  stageName: { fontSize: 15, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  stageText: { fontSize: 13, color: '#4B5563', marginBottom: 4 },
  stageTip: { fontSize: 12, color: '#059669', marginTop: 4, fontStyle: 'italic' }
});
