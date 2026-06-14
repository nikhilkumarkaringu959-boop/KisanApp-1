// app/pest-control.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Upload, Bug, Leaf, FlaskConical, Shield, Sparkles, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function PestControl() {
  const router = useRouter();
  const [userLanguage, setUserLanguage] = useState('English');
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('chemical');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUserLanguage();
  }, []);

  const loadUserLanguage = async () => {
    const profile = await AsyncStorage.getItem('userProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      setUserLanguage(parsed.language || 'English');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status!== 'granted') {
      Alert.alert('Permission needed', 'Gallery access kavali mowa');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      analyzeImage(result.assets[0].base64);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status!== 'granted') {
      Alert.alert('Permission needed', 'Camera access kavali mowa');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      analyzeImage(result.assets[0].base64);
    }
  };

  const analyzeImage = async (base64Image) => {
    setAnalyzing(true);
    setResult(null);

    const prompt = `You are an expert AI Plant Pathologist and Entomologist (పంటతెగుళ్లుమరియుపురుగులశాస్త్రవేత్త) integrated with real-time Google Search capabilities.

The user uploaded an image of an infected plant, leaf, or pest from their farm.
User selected language: ${userLanguage}

Your task is to analyze the image, cross-reference it with vast agricultural knowledge and live search data, and return a clean, actionable JSON response containing:

1. "identified_issue": Name of the pest/disease in ${userLanguage}
2. "confidence_score": Percentage of accuracy in identifying the issue from the photo
3. "symptoms": Array of 2-3 main visual signs to help the farmer confirm the issue, in ${userLanguage}
4. "solutions": Object with:
   - "chemical_control": Array of specific, approved chemical pesticides with:
     * "name": Exact chemical name/active ingredient (Tricyclazole, Hexaconazole, Imidacloprid, etc)
     * "dosage": Recommended dosage per acre/liter
     * "brand_examples": 2 Indian brands (IFFCO, Bayer, Syngenta, UPL, etc)
   - "organic_control": Array of natural treatments in ${userLanguage}:
     * "method": Treatment name (Neem oil spray, yellow sticky traps, Kashayams, etc)
     * "preparation": How to prepare/apply
     * "dosage": Quantity per liter/acre
5. "prevention_tips": Array of 3 steps for next crop cycle in ${userLanguage}
6. "reference_image_url": Suggest a verified reference image URL if possible

Use simple terminology optimized for easy translation into ${userLanguage}. Include exact active ingredient names for chemicals.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: base64Image
                }
              }
            ]
          }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (!response.ok) throw new Error('API failed');

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(jsonText);
      setResult(parsed);
    } catch (err) {
      Alert.alert('Error', 'AI analysis fail ayyindi mowa. Malli try chey');
      console.error('Analysis Error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const searchByText = async () => {
    if (!searchQuery.trim()) return;

    setAnalyzing(true);
    setResult(null);

    const prompt = `You are an expert AI Plant Pathologist. User searched for: "${searchQuery}"
User language: ${userLanguage}

Return same JSON structure as image analysis with identified_issue, confidence_score, symptoms, solutions (chemical_control with exact active ingredients + dosage, organic_control), prevention_tips in ${userLanguage}.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      setResult(JSON.parse(jsonText));
    } catch (err) {
      Alert.alert('Error', 'Search fail ayyindi');
    } finally {
      setAnalyzing(false);
    }
  };

  const commonDiseases = [
    { name: 'Rice Blast', crop: 'Paddy', icon: '🌾' },
    { name: 'Bollworm', crop: 'Cotton', icon: '🌿' },
    { name: 'Leaf Curl', crop: 'Chilli', icon: '🌶️' },
    { name: 'Powdery Mildew', crop: 'Multiple', icon: '🍃' },
    { name: 'Stem Borer', crop: 'Paddy', icon: '🐛' },
    { name: 'Aphids', crop: 'Multiple', icon: '🪲' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#1B4332" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pest & Disease Control</Text>
        <Bug color="#1B4332" size={24} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Scan/Upload Section */}
        <View style={styles.scanSection}>
          <Text style={styles.sectionLabel}>SCAN CROP / UPLOAD PHOTO</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.scanBtn} onPress={takePhoto} activeOpacity={0.8}>
              <Camera color="#FFF" size={28} />
              <Text style={styles.scanBtnText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage} activeOpacity={0.8}>
              <Upload color="#1B4332" size={28} />
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>

          {/* Text Search */}
          <View style={styles.searchBox}>
            <Search color="#64748B" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search disease/pest name..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={searchByText}
            />
          </View>
        </View>

        {/* Analyzing State */}
        {analyzing && (
          <View style={styles.analyzingCard}>
            <View style={styles.scanningOverlay}>
              {selectedImage && (
                <Image source={{ uri: selectedImage.uri }} style={styles.scanningImage} />
              )}
              <View style={styles.scanLine} />
            </View>
            <ActivityIndicator size="large" color="#22C55E" style={{ marginTop: 16 }} />
            <Text style={styles.analyzingText}>
              {userLanguage === 'Telugu'? 'తెగులునుగుర్తిస్తోంది...' : 'Analyzing disease...'}
            </Text>
          </View>
        )}

        {/* Results Dashboard */}
        {result &&!analyzing && (
          <>
            {/* Issue Identified */}
            <View style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <Bug color="#EF4444" size={22} />
                <Text style={styles.sectionTitle}>Identified Issue</Text>
                <View style={styles.confidenceTag}>
                  <Text style={styles.confidenceText}>{result.confidence_score}%</Text>
                </View>
              </View>

              <Text style={styles.issueName}>{result.identified_issue}</Text>

              <View style={styles.symptomsBox}>
                <Text style={styles.symptomsTitle}>📋 Symptoms:</Text>
                {result.symptoms.map((symptom, idx) => (
                  <Text key={idx} style={styles.symptomItem}>• {symptom}</Text>
                ))}
              </View>
            </View>

            {/* Solutions Tabs */}
            <View style={styles.resultCard}>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, activeTab === 'chemical' && styles.activeTab]}
                  onPress={() => setActiveTab('chemical')}
                >
                  <FlaskConical size={18} color={activeTab === 'chemical'? '#FFF' : '#64748B'} />
                  <Text style={[styles.tabText, activeTab === 'chemical' && styles.activeTabText]}>
                    {userLanguage === 'Telugu'? 'రసాయననివారణ' : 'Chemical'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tab, activeTab === 'organic' && styles.activeTab]}
                  onPress={() => setActiveTab('organic')}
                >
                  <Leaf size={18} color={activeTab === 'organic'? '#FFF' : '#64748B'} />
                  <Text style={[styles.tabText, activeTab === 'organic' && styles.activeTabText]}>
                    {userLanguage === 'Telugu'? 'సేంద్రీయనివారణ' : 'Organic'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Chemical Solutions */}
              {activeTab === 'chemical' && (
                <View style={styles.solutionsList}>
                  {result.solutions.chemical_control.map((item, idx) => (
                    <View key={idx} style={styles.solutionBox}>
                      <View style={styles.solutionHeader}>
                        <FlaskConical color="#3B82F6" size={20} />
                        <Text style={styles.solutionName}>{item.name}</Text>
                      </View>
                      <Text style={styles.dosageText}>💧 Dosage: {item.dosage}</Text>
                      {item.brand_examples && (
                        <View style={styles.brandsBox}>
                          <Text style={styles.brandsLabel}>Brands:</Text>
                          <Text style={styles.brandsText}>{item.brand_examples.join(', ')}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Organic Solutions */}
              {activeTab === 'organic' && (
                <View style={styles.solutionsList}>
                  {result.solutions.organic_control.map((item, idx) => (
                    <View key={idx} style={styles.solutionBox}>
                      <View style={styles.solutionHeader}>
                        <Sprout color="#22C55E" size={20} />
                        <Text style={styles.solutionName}>{item.method}</Text>
                      </View>
                      <Text style={styles.prepText}>📝 {item.preparation}</Text>
                      <Text style={styles.dosageText}>💧 Dosage: {item.dosage}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Prevention Tips */}
            <View style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <Shield color="#F59E0B" size={22} />
                <Text style={styles.sectionTitle}>
                  {userLanguage === 'Telugu'? 'నివారణచిట్కాలు' : 'Prevention Tips'}
                </Text>
              </View>
              {result.prevention_tips.map((tip, idx) => (
                <View key={idx} style={styles.tipItem}>
                  <Text style={styles.tipNumber}>{idx + 1}</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Browse Library */}
        {!result &&!analyzing && (
          <View style={styles.librarySection}>
            <Text style={styles.sectionLabel}>BROWSE COMMON DISEASES</Text>
            <View style={styles.diseaseGrid}>
              {commonDiseases.map((disease, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.diseaseCard}
                  onPress={() => {
                    setSearchQuery(disease.name);
                    searchByText();
                  }}
                >
                  <Text style={styles.diseaseIcon}>{disease.icon}</Text>
                  <Text style={styles.diseaseName}>{disease.name}</Text>
                  <Text style={styles.diseaseCrop}>{disease.crop}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0'
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9',
    alignItems: 'center', justifyContent: 'center'
  },
  headerTitle: { fontSize: 19, fontWeight: '800', color: '#1B4332' },
  scrollView: { flex: 1 },
  scanSection: { padding: 16 },
  sectionLabel: {
    fontSize: 12, fontWeight: '800', color: '#334155',
    marginBottom: 12, letterSpacing: 0.5
  },
  buttonRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  scanBtn: {
    flex: 1, backgroundColor: '#10B981', padding: 20, borderRadius: 16,
    alignItems: 'center', gap: 8, elevation: 3
  },
  scanBtnText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
  uploadBtn: {
    flex: 1, backgroundColor: '#F1F5F9', padding: 20, borderRadius: 16,
    alignItems: 'center', gap: 8, borderWidth: 2, borderColor: '#CBD5E1'
  },
  uploadBtnText: { color: '#1B4332', fontWeight: '800', fontSize: 15 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#F8FAFC', padding: 14, borderRadius: 14,
    borderWidth: 1.5, borderColor: '#CBD5E1'
  },
  searchInput: { flex: 1, fontSize: 15, color: '#0F172A', fontWeight: '500' },
  analyzingCard: {
    margin: 16, padding: 20, backgroundColor: '#F0FDF4',
    borderRadius: 20, alignItems: 'center'
  },
  scanningOverlay: {
    width: '100%', height: 200, borderRadius: 16,
    overflow: 'hidden', position: 'relative', backgroundColor: '#000'
  },
  scanningImage: { width: '100%', height: '100%', opacity: 0.7 },
  scanLine: {
    position: 'absolute', left: 0, right: 0, height: 3,
    backgroundColor: '#22C55E', top: '50%',
    shadowColor: '#22C55E', shadowOpacity: 1, shadowRadius: 10
  },
  analyzingText: {
    fontSize: 16, fontWeight: '700', color: '#1B4332', marginTop: 12
  },
  resultCard: {
    backgroundColor: '#FFF', margin: 16, marginTop: 0, padding: 20,
    borderRadius: 20, elevation: 2, shadowColor: '#000',
    shadowOpacity: 0.06, shadowRadius: 8
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginBottom: 16, paddingBottom: 12,
    borderBottomWidth: 2, borderBottomColor: '#E2E8F0'
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1B4332', flex: 1 },
  confidenceTag: {
    backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 12
  },
  confidenceText: { fontSize: 13, fontWeight: '800', color: '#92400E' },
  issueName: {
    fontSize: 22, fontWeight: '800', color: '#EF4444',
    marginBottom: 16
  },
  symptomsBox: {
    backgroundColor: '#FEF2F2', padding: 14, borderRadius: 12,
    borderLeftWidth: 3, borderLeftColor: '#EF4444'
  },
  symptomsTitle: { fontSize: 14, fontWeight: '700', color: '#991B1B', marginBottom: 8 },
  symptomItem: { fontSize: 14, color: '#7F1D1D', lineHeight: 22, marginBottom: 4 },
  tabContainer: {
    flexDirection: 'row', backgroundColor: '#F1F5F9',
    borderRadius: 12, padding: 4, marginBottom: 16
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, padding: 12, borderRadius: 10
  },
  activeTab: { backgroundColor: '#1B4332' },
  tabText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  activeTabText: { color: '#FFF' },
  solutionsList: { gap: 12 },
  solutionBox: {
    backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14,
    borderWidth: 1, borderColor: '#E2E8F0'
  },
  solutionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  solutionName: { fontSize: 16, fontWeight: '800', color: '#1B4332', flex: 1 },
  dosageText: { fontSize: 14, color: '#1E40AF', fontWeight: '700', marginBottom: 6 },
  prepText: { fontSize: 13, color: '#475569', lineHeight: 20, marginBottom: 6 },
  brandsBox: {
    backgroundColor: '#DBEAFE', padding: 10, borderRadius: 8, marginTop: 6
  },
  brandsLabel: { fontSize: 12, fontWeight: '700', color: '#1E40AF', marginBottom: 2 },
  brandsText: { fontSize: 13, color: '#1E3A8A', fontWeight: '600' },
  tipItem: {
    flexDirection: 'row', gap: 12, marginBottom: 12,
    backgroundColor: '#FFFBEB', padding: 14, borderRadius: 12
  },
  tipNumber: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#F59E0B',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: '800', color: '#FFF'
  },
  tipText: { flex: 1, fontSize: 14, color: '#92400E', lineHeight: 20, fontWeight: '600' },
  librarySection: { padding: 16 },
  diseaseGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  diseaseCard: {
    width: '31%', backgroundColor: '#F8FAFC', padding: 16,
    borderRadius: 16, alignItems: 'center', borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  diseaseIcon: { fontSize: 32, marginBottom: 8 },
  diseaseName: {
    fontSize: 13, fontWeight: '700', color: '#1E293B',
    textAlign: 'center', marginBottom: 4
  },
  diseaseCrop: { fontSize: 11, color: '#64748B', fontWeight: '600' },
});
