import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n'; // i18n import

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export default function FertilizerScreen() {
  const router = useRouter();
  const [cropName, setCropName] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('farmerProfile').then(data => {
      if(data) setProfile(JSON.parse(data));
    });
  }, []);

  const callGeminiAPI = async (crop: string, acres: number, soil: string) => {
    if (!GEMINI_API_KEY) {
      throw new Error(i18n.t('geminiError'));
    }

    const prompt = `
    You are an expert AI Agronomist from India. Use ICAR recommendations.
    Crop: ${crop}, Land: ${acres} Acres, Soil: ${soil}

    Return ONLY a valid JSON object. Calculate all values for ${acres} acres:
    {
      "crop_summary": "1 line summary of nutrient needs",
      "chemical_calculator": {
        "Urea_kg": total_kg,
        "DAP_kg": total_kg,
        "MOP_kg": total_kg
      },
      "organic_calculator": {
        "Vermicompost_kg": total_kg,
        "Farmyard_Manure_tons": total_tons,
        "Neem_Cake_kg": total_kg
      },
      "situation_guide": [
        {
          "stage_name": "Basal / బేసల్",
          "chemical_dosage": "exact kg to apply",
          "organic_dosage": "exact kg/L to apply",
          "application_tip": "how to apply + warning"
        },
        {
          "stage_name": "Vegetative / పెరుగుదల దశ",
          "chemical_dosage": "...",
          "organic_dosage": "...",
          "application_tip": "..."
        },
        {
          "stage_name": "Flowering / పూత దశ",
          "chemical_dosage": "...",
          "organic_dosage": "...",
          "application_tip": "..."
        }
      ]
    }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if(!data.candidates ||!data.candidates[0]) {
      throw new Error(i18n.t('aiErrorMsg'))
    }

    const jsonText = data.candidates[0].content.parts[0].text;
    const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(cleanJson);
  }

  const calculateFertilizer = async () => {
    if(!cropName ||!profile?.land) {
      Alert.alert(i18n.t('error'), i18n.t('enterCropProfile'));
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const acres = parseFloat(profile.land);
      const soil = profile.soil;
      const geminiData = await callGeminiAPI(cropName, acres, soil);
      setResult(geminiData);
    } catch (err: any) {
      Alert.alert(i18n.t('aiError'), i18n.t('aiErrorMsg'));
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t('aiFertilizerCalc')}</Text>
        <Ionicons name="sparkles" size={24} color="#FFD700" />
      </View>

      <ScrollView contentContainerStyle={{padding: 15, paddingBottom: 100}}>
        <View style={styles.inputCard}>
          <Text style={styles.label}>{i18n.t('cropName')}</Text>
          <TextInput style={styles.input} placeholder={i18n.t('cropPlaceholder')} value={cropName} onChangeText={setCropName} />

          <View style={styles.infoRow}>
            <Text>{i18n.t('land')}: <Text style={{fontWeight: 'bold'}}>{profile?.land || '-'} {i18n.t('acres')}</Text></Text>
            <Text>{i18n.t('soil')}: <Text style={{fontWeight: 'bold'}}>{profile?.soil || '-'}</Text></Text>
          </View>
          <Text style={{fontSize: 12, color: 'gray', marginBottom: 10}}>{i18n.t('notePowered')}</Text>

          <TouchableOpacity style={styles.calcBtn} onPress={calculateFertilizer}>
            {loading? <ActivityIndicator color="white"/> : <Text style={styles.calcBtnText}>{i18n.t('askAI')}</Text>}
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>🌾 {cropName} {i18n.t('aiSchedule')}</Text>
            <Text style={styles.summary}>{result.crop_summary}</Text>

            <Text style={styles.sectionHeader}>{i18n.t('chemicalTotal')}</Text>
            <View style={styles.row}><Text>{i18n.t('urea')}:</Text><Text style={styles.value}>{result.chemical_calculator.Urea_kg} kg</Text></View>
            <View style={styles.row}><Text>{i18n.t('dap')}:</Text><Text style={styles.value}>{result.chemical_calculator.DAP_kg} kg</Text></View>
            <View style={styles.row}><Text>{i18n.t('mop')}:</Text><Text style={styles.value}>{result.chemical_calculator.MOP_kg} kg</Text></View>

            <Text style={styles.sectionHeader}>{i18n.t('organicTotal')}</Text>
            <View style={styles.row}><Text>{i18n.t('vermi')}:</Text><Text style={styles.value}>{result.organic_calculator.Vermicompost_kg} kg</Text></View>
            <View style={styles.row}><Text>{i18n.t('fym')}:</Text><Text style={styles.value}>{result.organic_calculator.Farmyard_Manure_tons} tons</Text></View>
            <View style={styles.row}><Text>{i18n.t('neemCake')}:</Text><Text style={styles.value}>{result.organic_calculator.Neem_Cake_kg} kg</Text></View>

            <Text style={styles.sectionHeader}>{i18n.t('stageGuide')}</Text>
            {result.situation_guide.map((stage: any, index: number) => (
              <View key={index} style={styles.stageCard}>
                <Text style={styles.stageName}>{stage.stage_name}</Text>
                <Text style={styles.stageText}><Text style={{fontWeight: 'bold'}}>{i18n.t('chemical')}:</Text> {stage.chemical_dosage}</Text>
                <Text style={styles.stageText}><Text style={{fontWeight: 'bold'}}>{i18n.t('organic')}:</Text> {stage.organic_dosage}</Text>
                <Text style={styles.tip}><Text style={{fontWeight: 'bold'}}>{i18n.t('tip')}:</Text> {stage.application_tip}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)')}><Ionicons name="home-outline" size={24} color="gray" /><Text style={styles.navText}>{i18n.t('home')}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn}><Ionicons name="leaf" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/profile')}><Ionicons name="person-outline" size={24} color="gray" /><Text style={styles.navText}>{i18n.t('profile')}</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F8E9' },
  header: { backgroundColor: '#2E7D32', padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  inputCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, elevation: 2 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  calcBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  calcBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  resultCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginTop: 15, elevation: 2 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginBottom: 10 },
  summary: { fontSize: 13, color: '#555', marginBottom: 15, fontStyle: 'italic' },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', color: '#2E7D32', marginTop: 10, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  value: { fontWeight: 'bold', color: '#D32F2F' },
  stageCard: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, marginBottom: 10 },
  stageName: { fontSize: 14, fontWeight: 'bold', color: '#1B5E20', marginBottom: 5 },
  stageText: { fontSize: 12, marginBottom: 4 },
  tip: { fontSize: 12, color: '#1976D2', marginTop: 5 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 }
});
