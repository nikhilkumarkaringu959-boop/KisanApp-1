import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const GEMINI_API_KEY = "AQ.Ab8RN6LeixmRq8HhjOFaiqZFMHFMP43Ir0sO4mcbwfTR2oB41Q"; // Nee key

export default function PestScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('chemical');

  // CAMERA / GALLERY OPEN CHEYADAM
  const pickImage = async (fromCamera: boolean) => {
    let result = fromCamera
     ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8, base64: true })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8, base64: true });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].base64!);
    }
  };

  // GEMINI VISION API KI CALL
  const analyzeImage = async (base64: string) => {
    setLoading(true);
    setResult(null);

    const prompt = `
    You are an expert AI Plant Pathologist and Entomologist from India.
    Analyze this plant leaf image and identify the pest or disease.
    Return ONLY a valid JSON object in Telugu language:
    {
      "identified_issue": "disease/pest name in Telugu",
      "confidence_score": "85%",
      "symptoms": ["symptom1", "symptom2", "symptom3"],
      "solutions": {
        "chemical_control": ["Tricyclazole 75% WP - 2g per liter water", "Hexaconazole 5% EC - 2ml per liter"],
        "organic_control": ["Neem oil 5ml per liter spray", "3G Kashayam - Ginger, Garlic, Green Chilli"]
      },
      "prevention_tips": ["Crop rotation cheyadam", "Field lo nillu nillakunda choosukovadam"]
    }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: "image/jpeg", data: base64 } }
            ]
          }]
        })
      });

      const data = await response.json();
      const jsonText = data.candidates[0].content.parts[0].text;
      const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '');
      setResult(JSON.parse(cleanJson));
    } catch (err) {
      alert('Analysis failed. Clear photo tho malli try chey.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Pest & Disease Scan</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView>
        {!image && (
          // INITIAL SCREEN - SCAN BUTTON
          <View style={styles.scanCard}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={styles.cameraIcon} />
            <Text style={styles.scanTitle}>Identify Pests Instantly</Text>
            <Text style={styles.scanDesc}>Take a photo of infected leaf to get AI solutions</Text>

            <TouchableOpacity style={styles.scanBtn} onPress={() => pickImage(true)}>
              <Text style={styles.scanBtnText}>Scan Crop / Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryBtn} onPress={() => pickImage(false)}>
              <Text style={styles.galleryBtnText}>Gallery nunchi Select chey</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#D32F2F" />
            <Text style={styles.loadingText}>తెగులును గుర్తిస్తోంది...</Text>
          </View>
        )}

        {result && image && (
          // RESULTS DASHBOARD
          <View>
            {/* IMAGE COMPARISON */}
            <View style={styles.imageRow}>
              <View style={styles.imgBox}>
                <Text style={styles.imgLabel}>Your Photo</Text>
                <Image source={{uri: image}} style={styles.resultImage} />
              </View>
              <View style={styles.imgBox}>
                <Text style={styles.imgLabel}>Reference</Text>
                <Image source={{uri: 'https://www.icar.org.in/sites/default/files/rice-blast-disease.jpg'}} style={styles.resultImage} />
              </View>
            </View>

            {/* RESULT CARD */}
            <View style={styles.resultCard}>
              <Text style={styles.issueName}>{result.identified_issue}</Text>
              <Text style={styles.confidence}>Accuracy: {result.confidence_score}</Text>

              <Text style={styles.sectionHeader}>లక్షణాలు / Symptoms</Text>
              {result.symptoms.map((s: string, i: number) => <Text key={i} style={styles.bullet}>• {s}</Text>)}

              {/* TABS */}
              <View style={styles.tabRow}>
                <TouchableOpacity onPress={() => setActiveTab('chemical')} style={[styles.tab, activeTab==='chemical' && styles.activeTab]}>
                  <Text style={activeTab==='chemical'? styles.activeTabText : styles.tabText}>రసాయన నివారణ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('organic')} style={[styles.tab, activeTab==='organic' && styles.activeTab]}>
                  <Text style={activeTab==='organic'? styles.activeTabText : styles.tabText}>సేంద్రీయ నివారణ</Text>
                </TouchableOpacity>
              </View>

              {/* TAB CONTENT */}
              <View style={styles.solutionBox}>
                {activeTab === 'chemical' && result.solutions.chemical_control.map((s: string, i: number) => <Text key={i} style={styles.solutionText}>🌿 {s}</Text>)}
                {activeTab === 'organic' && result.solutions.organic_control.map((s: string, i: number) => <Text key={i} style={styles.solutionText}>🍃 {s}</Text>)}
              </View>

              <Text style={styles.sectionHeader}>నివారణ చిట్కాలు / Prevention</Text>
              {result.prevention_tips.map((p: string, i: number) => <Text key={i} style={styles.bullet}>✓ {p}</Text>)}
            </View>
          </View>
        )}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}><Ionicons name="home-outline" size={24} color="gray" /><Text style={styles.navText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.aiBtn}><Ionicons name="leaf" size={28} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}><Ionicons name="person-outline" size={24} color="gray" /><Text style={styles.navText}>Profile</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEBEE' },
  header: { backgroundColor: '#D32F2F', padding: 15, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  scanCard: { backgroundColor: 'white', margin: 20, padding: 30, borderRadius: 20, alignItems: 'center', elevation: 3 },
  cameraIcon: { width: 80, height: 80, marginBottom: 15 },
  scanTitle: { fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', marginBottom: 8 },
  scanDesc: { fontSize: 14, color: 'gray', textAlign: 'center', marginBottom: 20 },
  scanBtn: { backgroundColor: '#D32F2F', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  scanBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' },
  galleryBtn: { marginTop: 12 },
  galleryBtnText: { color: '#D32F2F', fontWeight: '600' },
  loadingBox: { alignItems: 'center', marginTop: 50 },
  loadingText: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#D32F2F' },
  imageRow: { flexDirection: 'row', padding: 15, gap: 10 },
  imgBox: { flex: 1 },
  imgLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  resultImage: { width: '100%', height: 150, borderRadius: 12 },
  resultCard: { backgroundColor: 'white', margin: 15, padding: 15, borderRadius: 12, elevation: 2 },
  issueName: { fontSize: 20, fontWeight: 'bold', color: '#D32F2F' },
  confidence: { fontSize: 12, color: 'gray', marginBottom: 10 },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', marginTop: 12, marginBottom: 6 },
  bullet: { fontSize: 13, marginLeft: 5, marginBottom: 4 },
  tabRow: { flexDirection: 'row', marginTop: 10, backgroundColor: '#F5F5F5', borderRadius: 8 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#D32F2F' },
  tabText: { color: 'gray', fontWeight: '600' },
  activeTabText: { color: 'white', fontWeight: 'bold' },
  solutionBox: { marginVertical: 10 },
  solutionText: { fontSize: 13, marginBottom: 6 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  aiBtn: { width: 65, height: 65, borderRadius: 32, backgroundColor: '#D32F2F', justifyContent: 'center', alignItems: 'center', marginTop: -20, elevation: 8 }
});
