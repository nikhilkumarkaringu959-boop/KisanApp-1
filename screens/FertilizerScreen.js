import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FertilizerScreen({ navigation }) {
  const [cropName, setCropName] = useState('');
  const [landSize, setLandSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profile = await AsyncStorage.getItem('farmerProfile');
    if (profile) {
      const data = JSON.parse(profile);
      setFarmerProfile(data);
      setLandSize(data.landSize || '');
      setSoilType(data.soilType || '');
      setCropName(data.primaryCrop || '');
    }
  };

  const calculateFertilizer = async () => {
    if (!cropName || !landSize || !soilType) {
      Alert.alert('Missing Info', 'Please enter Crop Name, Land Size and Soil Type');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // MOCK AI RESPONSE - Real AI integration tarvata cheddam
      // Ippudu standard calculation logic
      const acres = parseFloat(landSize);
      
      // Standard NPK per acre for common crops - Sample logic
      let npkData = {
        'Paddy': { urea: 100, dap: 50, mop: 25, vermicompost: 2000, fym: 5, neem: 100 },
        'Cotton': { urea: 120, dap: 60, mop: 40, vermicompost: 2500, fym: 6, neem: 120 },
        'Wheat': { urea: 90, dap: 45, mop: 20, vermicompost: 1800, fym: 4, neem: 90 },
        'Sugarcane': { urea: 150, dap: 75, mop: 50, vermicompost: 3000, fym: 8, neem: 150 },
      };

      const base = npkData || npkData['Paddy']; // Default to Paddy if crop not found

      const response = {
        crop_summary: `${cropName} requires balanced NPK with high nitrogen during vegetative stage and potash during flowering.`,
        chemical_calculator: {
          urea: `${Math.round(base.urea * acres)} kg (${Math.ceil(base.urea * acres / 45)} bags)`,
          dap: `${Math.round(base.dap * acres)} kg (${Math.ceil(base.dap * acres / 50)} bags)`,
          mop: `${Math.round(base.mop * acres)} kg (${Math.ceil(base.mop * acres / 50)} bags)`
        },
        organic_calculator: {
          vermicompost: `${Math.round(base.vermicompost * acres)} kg`,
          farmyard_manure: `${(base.fym * acres).toFixed(1)} tons`,
          neem_cake: `${Math.round(base.neem * acres)} kg`
        },
        situation_guide: [
          {
            stage_name: 'Basal / నాటే సమయం',
            chemical_dosage: `DAP: ${Math.round(base.dap * acres * 0.5)} kg + MOP: ${Math.round(base.mop * acres * 0.5)} kg`,
            organic_dosage: `FYM: ${(base.fym * acres * 0.5).toFixed(1)} tons + Neem Cake: ${Math.round(base.neem * acres * 0.5)} kg`,
            application_tip: 'Apply before sowing/transplanting. Mix well with soil. Ensure soil has moisture.'
          },
          {
            stage_name: 'Vegetative / పెరుగుదల దశ',
            chemical_dosage: `Urea: ${Math.round(base.urea * acres * 0.5)} kg in 2 splits`,
            organic_dosage: `Jeevamrutham: 200L per acre or Vermiwash spray`,
            application_tip: 'Apply 20-25 days after sowing. Second dose after 40 days. Avoid during heavy rain.'
          },
          {
            stage_name: 'Flowering / పూత దశ',
            chemical_dosage: `Urea: ${Math.round(base.urea * acres * 0.5)} kg + MOP: ${Math.round(base.mop * acres * 0.5)} kg`,
            organic_dosage: `Vermicompost: ${Math.round(base.vermicompost * acres * 0.5)} kg top dressing`,
            application_tip: 'Critical stage. Apply when 50% flowering. Light irrigation after application.'
          }
        ]
      };

      setResult(response);
    } catch (error) {
      Alert.alert('Error', 'Could not calculate. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Fertilizer</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Enter Crop Details</Text>
          
          <Text style={styles.label}>Crop Name / పంట పేరు *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Paddy, Cotton, Wheat"
            value={cropName}
            onChangeText={setCropName}
          />

          <Text style={styles.label}>Total Acres / ఎకరాలు *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2.5"
            value={landSize}
            onChangeText={setLandSize}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Soil Type / నేల రకం *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Black Soil, Red Soil"
            value={soilType}
            onChangeText={setSoilType}
          />

          <TouchableOpacity 
            style={styles.calcBtn} 
            onPress={calculateFertilizer}
            disabled={loading}
          >
            {loading? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="calculator" size={20} color="#fff" />
                <Text style={styles.calcBtnText}>Calculate Fertilizer</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Calculation Result</Text>
            
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>{result.crop_summary}</Text>
            </View>

            <Text style={styles.sectionTitle}>🧪 Chemical Fertilizer</Text>
            <View style={styles.dosageBox}>
              <Text style={styles.dosageItem}>Urea: {result.chemical_calculator.urea}</Text>
              <Text style={styles.dosageItem}>DAP: {result.chemical_calculator.dap}</Text>
              <Text style={styles.dosageItem}>MOP: {result.chemical_calculator.mop}</Text>
            </View>

            <Text style={styles.sectionTitle}>🌱 Organic Alternatives</Text>
            <View style={styles.dosageBox}>
              <Text style={styles.dosageItem}>Vermicompost: {result.organic_calculator.vermicompost}</Text>
              <Text style={styles.dosageItem}>Farmyard Manure: {result.organic_calculator.farmyard_manure}</Text>
              <Text style={styles.dosageItem}>Neem Cake: {result.organic_calculator.neem_cake}</Text>
            </View>

            <Text style={styles.sectionTitle}>📅 Stage-wise Guide</Text>
            {result.situation_guide.map((stage, index) => (
              <View key={index} style={styles.stageCard}>
                <Text style={styles.stageName}>{index + 1}. {stage.stage_name}</Text>
                <Text style={styles.stageLabel}>Chemical:</Text>
                <Text style={styles.stageText}>{stage.chemical_dosage}</Text>
                <Text style={styles.stageLabel}>Organic:</Text>
                <Text style={styles.stageText}>{stage.organic_dosage}</Text>
                <Text style={styles.tipText}>💡 {stage.application_tip}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#16A34A' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  scrollView: { flex: 1 },
  card: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#F9FAFB' },
  calcBtn: { backgroundColor: '#16A34A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 8, marginTop: 20 },
  calcBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  resultCard: { backgroundColor: '#fff', margin: 16, marginTop: 0, padding: 20, borderRadius: 12 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  summaryBox: { backgroundColor: '#DCFCE7', padding: 12, borderRadius: 8, marginBottom: 16 },
  summaryText: { fontSize: 14, color: '#166534', lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginTop: 16, marginBottom: 10 },
  dosageBox: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8 },
  dosageItem: { fontSize: 15, color: '#374151', marginBottom: 6 },
  stageCard: { backgroundColor: '#F9FAFB', padding: 14, borderRadius: 8, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#16A34A' },
  stageName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  stageLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginTop: 6 },
  stageText: { fontSize: 14, color: '#374151', marginBottom: 4 },
  tipText: { fontSize: 13, color: '#059669', marginTop: 8, fontStyle: 'italic' },
});
